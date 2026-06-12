<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

$role = $_SESSION['role'] ?? null;
$me   = $_SESSION['user_id'] ?? null;

$key = $_GET['complaint_id'] ?? $_GET['id'] ?? null;
if (!$key) sendError('complaint_id required', 422);

if (is_numeric($key)) {
    $sql = "SELECT c.*, d.name AS district_name, a.ashon_code, ar.name AS area_name,
                   dep.name AS department_name, dep.contact_email AS dept_email,
                   dep.contact_phone AS dept_phone,
                   u.full_name AS citizen_name, u.user_uid AS citizen_uid,
                   u.email AS citizen_email, u.phone AS citizen_phone, u.nid_number AS citizen_nid,
                   u.profile_picture AS citizen_pic
            FROM complaints c
            JOIN districts d ON c.district_id = d.id
            JOIN ashon_numbers a ON c.ashon_id = a.id
            LEFT JOIN areas ar ON c.area_id = ar.id
            LEFT JOIN departments dep ON c.assigned_department_id = dep.id
            JOIN users u ON c.submitted_by_user_id = u.id
            WHERE c.id = ? AND c.is_deleted = 0";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([(int)$key]);
} else {
    $sql = "SELECT c.*, d.name AS district_name, a.ashon_code, ar.name AS area_name,
                   dep.name AS department_name, dep.contact_email AS dept_email,
                   dep.contact_phone AS dept_phone,
                   u.full_name AS citizen_name, u.user_uid AS citizen_uid,
                   u.email AS citizen_email, u.phone AS citizen_phone, u.nid_number AS citizen_nid,
                   u.profile_picture AS citizen_pic
            FROM complaints c
            JOIN districts d ON c.district_id = d.id
            JOIN ashon_numbers a ON c.ashon_id = a.id
            LEFT JOIN areas ar ON c.area_id = ar.id
            LEFT JOIN departments dep ON c.assigned_department_id = dep.id
            JOIN users u ON c.submitted_by_user_id = u.id
            WHERE c.complaint_id = ? AND c.is_deleted = 0";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$key]);
}
$r = $stmt->fetch();
if (!$r) sendError('Complaint not found', 404);

$id = (int)$r['id'];

// Categories
$catStmt = $pdo->prepare("SELECT category FROM complaint_categories WHERE complaint_id = ?");
$catStmt->execute([$id]);
$cats = $catStmt->fetchAll(PDO::FETCH_COLUMN);

// Media split into citizen vs proof
$mStmt = $pdo->prepare("SELECT id, file_path, file_type, uploaded_by, is_proof, created_at
                        FROM complaint_media WHERE complaint_id = ? ORDER BY id ASC");
$mStmt->execute([$id]);
$citizen_media = [];
$proof_media   = [];
foreach ($mStmt->fetchAll() as $m) {
    $m['url'] = absUrl($m['file_path']);
    if ((int)$m['is_proof'] === 1) $proof_media[] = $m;
    else $citizen_media[] = $m;
}

// Status history
$hStmt = $pdo->prepare("SELECT status, changed_by_type, changed_by_id, notes, changed_at
                       FROM complaint_status_history WHERE complaint_id = ? ORDER BY changed_at ASC");
$hStmt->execute([$id]);
$history = $hStmt->fetchAll();

// Active assignment + staff
$aStmt = $pdo->prepare("SELECT ca.staff_id, ca.assigned_at, s.full_name AS staff_name, s.designation,
                              s.staff_uid
                       FROM complaint_assignments ca
                       LEFT JOIN department_staff s ON s.id = ca.staff_id
                       WHERE ca.complaint_id = ? AND ca.is_active = 1
                       ORDER BY ca.id DESC LIMIT 1");
$aStmt->execute([$id]);
$assignment = $aStmt->fetch() ?: null;

// Rating
$rStmt = $pdo->prepare("SELECT rating, created_at FROM complaint_ratings WHERE complaint_id = ?");
$rStmt->execute([$id]);
$rating = $rStmt->fetch() ?: null;

// Has upvoted
$hasUp = false;
if ($role === 'citizen' && $me) {
    $u = $pdo->prepare("SELECT 1 FROM upvotes WHERE complaint_id = ? AND user_id = ?");
    $u->execute([$id, (int)$me]);
    $hasUp = (bool)$u->fetchColumn();
}

$result = [
    'id'                     => $id,
    'complaint_id'           => $r['complaint_id'],
    'subject'                => $r['subject'],
    'description'            => $r['description'],
    'priority'               => $r['priority'],
    'status'                 => $r['status'],
    'approval_status'        => $r['approval_status'],
    'is_approved'            => (int)$r['is_approved'],
    'is_featured'            => (int)$r['is_featured'],
    'rejection_reason'       => $r['rejection_reason'],
    'rejected_complaint_ref' => $r['rejected_complaint_ref'],
    'upvote_count'           => (int)$r['upvote_count'],
    'comment_count'          => (int)$pdo->query("SELECT COUNT(*) FROM comments WHERE complaint_id = ".(int)$id." AND is_deleted = 0")->fetchColumn(),
    'map_lat'                => $r['map_lat'] !== null ? (float)$r['map_lat'] : null,
    'map_lng'                => $r['map_lng'] !== null ? (float)$r['map_lng'] : null,
    'map_address'            => $r['map_address'],
    'district_id'            => (int)$r['district_id'],
    'ashon_id'               => (int)$r['ashon_id'],
    'area_id'                => $r['area_id'] ? (int)$r['area_id'] : null,
    'district_name'          => $r['district_name'],
    'ashon_code'             => $r['ashon_code'],
    'area_name'              => $r['area_name'],
    'assigned_department_id' => $r['assigned_department_id'] ? (int)$r['assigned_department_id'] : null,
    'department_name'        => $r['department_name'],
    'department_email'       => $r['dept_email'],
    'department_phone'       => $r['dept_phone'],
    'categories'             => $cats,
    'citizen_media'          => $citizen_media,
    'proof_media'            => $proof_media,
    'status_history'         => $history,
    'assignment'             => $assignment,
    'rating'                 => $rating,
    'has_upvoted'            => $hasUp,
    'submitted_at'           => $r['submitted_at'],
    'approved_at'            => $r['approved_at'],
    'resolved_at'            => $r['resolved_at'],
];

$result['is_own'] = ((int)$r['submitted_by_user_id'] === (int)$me);
if ($role === 'admin' || $result['is_own']) {
    $result['citizen_name']    = $r['citizen_name'];
    $result['citizen_uid']     = $r['citizen_uid'];
    $result['citizen_email']   = $r['citizen_email'];
    $result['citizen_phone']   = $r['citizen_phone'];
    $result['citizen_nid']     = $r['citizen_nid'];
    $result['citizen_picture'] = absUrl($r['citizen_pic']);
} else {
    $name = $r['citizen_name'] ?: 'Citizen';
    $parts = preg_split('/\s+/', trim($name));
    $alias = ucfirst(strtolower($parts[0] ?? 'Citizen'));
    if (!empty($parts[1])) $alias .= ' ' . strtoupper($parts[1][0]) . '.';
    $result['citizen_name'] = $alias;
}

sendSuccess($result);
