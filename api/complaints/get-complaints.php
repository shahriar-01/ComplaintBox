<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

$role = $_SESSION['role'] ?? null;

// Filter inputs
$status          = $_GET['status']          ?? null;
$district_id     = $_GET['district_id']     ?? null;
$ashon_id        = $_GET['ashon_id']        ?? null;
$area_id         = $_GET['area_id']         ?? null;
$category        = $_GET['category']        ?? null;
$priority        = $_GET['priority']        ?? null;
$month           = $_GET['month']           ?? null;
$year            = $_GET['year']            ?? null;
$search          = trim((string)($_GET['search'] ?? ''));
$sort            = $_GET['sort']            ?? 'newest';
$page            = max(1, (int)($_GET['page'] ?? 1));
$per_page        = min(100, max(1, (int)($_GET['per_page'] ?? 12)));
$user_id_filter  = $_GET['user_id']         ?? null;
$department_id   = $_GET['department_id']   ?? null;
$approval_status = $_GET['approval_status'] ?? null;
$is_featured     = $_GET['is_featured']     ?? null;
$public          = $_GET['public']          ?? null;

// Public requests (no session, or public=1) — restrict to approved & not deleted
$publicMode = ($role === null) || $public === '1';

$where  = ['c.is_deleted = 0'];
$params = [];

if ($publicMode) {
    $where[] = "c.approval_status = 'approved'";
    $where[] = 'c.is_approved = 1';
} else {
    if ($approval_status !== null && $approval_status !== '') {
        $where[]  = 'c.approval_status = ?';
        $params[] = $approval_status;
    }
    // staff sees only their department's approved complaints
    if ($role === 'staff') {
        $where[]  = 'c.assigned_department_id = ?';
        $params[] = (int)($_SESSION['department_id'] ?? 0);
        $where[]  = "c.approval_status = 'approved'";
    }
}

if ($status) {
    $where[]  = 'c.status = ?';
    $params[] = $status;
}
if ($district_id) { $where[] = 'c.district_id = ?'; $params[] = (int)$district_id; }
if ($ashon_id)    { $where[] = 'c.ashon_id = ?';    $params[] = (int)$ashon_id; }
if ($area_id)     { $where[] = 'c.area_id = ?';     $params[] = (int)$area_id; }
if ($priority)    { $where[] = 'c.priority = ?';    $params[] = $priority; }
if ($month)       { $where[] = 'MONTH(c.submitted_at) = ?'; $params[] = (int)$month; }
if ($year)        { $where[] = 'YEAR(c.submitted_at) = ?';  $params[] = (int)$year; }
if ($user_id_filter) {
    $where[]  = 'c.submitted_by_user_id = ?';
    $params[] = (int)$user_id_filter;
}
if ($department_id) {
    $where[]  = 'c.assigned_department_id = ?';
    $params[] = (int)$department_id;
}
if ($is_featured !== null && $is_featured !== '') {
    $where[]  = 'c.is_featured = ?';
    $params[] = (int)$is_featured;
}
if ($category) {
    $where[]  = 'EXISTS (SELECT 1 FROM complaint_categories cc WHERE cc.complaint_id = c.id AND cc.category = ?)';
    $params[] = $category;
}
if ($search !== '') {
    $where[]  = '(c.subject LIKE ? OR c.description LIKE ? OR c.complaint_id LIKE ?)';
    $like     = "%$search%";
    array_push($params, $like, $like, $like);
}

$orderBy = 'c.submitted_at DESC';
switch ($sort) {
    case 'oldest':       $orderBy = 'c.submitted_at ASC'; break;
    case 'most_upvotes': $orderBy = 'c.upvote_count DESC'; break;
    case 'trending':     $orderBy = '(c.upvote_count * 0.7 + c.comment_count * 0.3) DESC'; break;
    case 'newest':       default: $orderBy = 'c.submitted_at DESC';
}

$whereSql = implode(' AND ', $where);

// Count
$countSql = "SELECT COUNT(*) FROM complaints c WHERE $whereSql";
$stmt = $pdo->prepare($countSql);
$stmt->execute($params);
$total = (int)$stmt->fetchColumn();

// Page data
$offset = ($page - 1) * $per_page;
$sql = "
SELECT
    c.id, c.complaint_id, c.subject, c.description, c.priority, c.status,
    c.approval_status, c.rejection_reason, c.rejected_complaint_ref,
    c.upvote_count, c.is_featured, c.is_approved,
    (SELECT COUNT(*) FROM comments cmt WHERE cmt.complaint_id = c.id AND cmt.is_deleted = 0) AS comment_count,
    c.map_lat, c.map_lng, c.map_address,
    c.submitted_at, c.approved_at, c.resolved_at,
    c.submitted_by_user_id,
    c.district_id, c.ashon_id, c.area_id,
    d.name AS district_name,
    a.ashon_code,
    ar.name AS area_name,
    dep.name AS department_name, dep.id AS department_id,
    (SELECT GROUP_CONCAT(cc.category) FROM complaint_categories cc WHERE cc.complaint_id = c.id) AS categories,
    (SELECT cm.file_path FROM complaint_media cm WHERE cm.complaint_id = c.id AND cm.is_proof = 0 ORDER BY cm.id ASC LIMIT 1) AS first_image,
    (SELECT COUNT(*) FROM complaint_media cm WHERE cm.complaint_id = c.id) AS media_count,
    (SELECT s.id        FROM complaint_assignments ca JOIN department_staff s ON s.id = ca.staff_id
       WHERE ca.complaint_id = c.id AND ca.is_active = 1 ORDER BY ca.id DESC LIMIT 1) AS assigned_staff_id,
    (SELECT s.full_name FROM complaint_assignments ca JOIN department_staff s ON s.id = ca.staff_id
       WHERE ca.complaint_id = c.id AND ca.is_active = 1 ORDER BY ca.id DESC LIMIT 1) AS assigned_staff_name,
    (SELECT cr.rating FROM complaint_ratings cr WHERE cr.complaint_id = c.id LIMIT 1) AS rating_value,
    u.full_name AS citizen_name, u.user_uid AS citizen_uid,
    u.phone AS citizen_phone, u.email AS citizen_email, u.nid_number AS citizen_nid
FROM complaints c
JOIN districts d ON c.district_id = d.id
JOIN ashon_numbers a ON c.ashon_id = a.id
LEFT JOIN areas ar ON c.area_id = ar.id
LEFT JOIN departments dep ON c.assigned_department_id = dep.id
JOIN users u ON c.submitted_by_user_id = u.id
WHERE $whereSql
ORDER BY $orderBy
LIMIT $per_page OFFSET $offset
";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();

// Get current user upvotes for these complaints
$myUpvotes = [];
if ($role === 'citizen' && !empty($rows)) {
    $ids = array_column($rows, 'id');
    $ph  = implode(',', array_fill(0, count($ids), '?'));
    $q   = $pdo->prepare("SELECT complaint_id FROM upvotes WHERE user_id = ? AND complaint_id IN ($ph)");
    $q->execute(array_merge([(int)$_SESSION['user_id']], $ids));
    $myUpvotes = array_flip($q->fetchAll(PDO::FETCH_COLUMN));
}

$out = [];
foreach ($rows as $r) {
    $cats = $r['categories'] ? explode(',', $r['categories']) : [];
    $item = [
        'id'                     => (int)$r['id'],
        'complaint_id'           => $r['complaint_id'],
        'subject'                => $r['subject'],
        'description'            => $r['description'],
        'priority'               => $r['priority'],
        'status'                 => $r['status'],
        'approval_status'        => $r['approval_status'],
        'rejection_reason'       => $r['rejection_reason'],
        'rejected_complaint_ref' => $r['rejected_complaint_ref'],
        'is_approved'            => (int)$r['is_approved'],
        'is_featured'            => (int)$r['is_featured'],
        'upvote_count'           => (int)$r['upvote_count'],
        'comment_count'          => (int)$r['comment_count'],
        'map_lat'                => $r['map_lat'] !== null ? (float)$r['map_lat'] : null,
        'map_lng'                => $r['map_lng'] !== null ? (float)$r['map_lng'] : null,
        'map_address'            => $r['map_address'],
        'district_id'            => (int)$r['district_id'],
        'ashon_id'               => (int)$r['ashon_id'],
        'area_id'                => $r['area_id'] !== null ? (int)$r['area_id'] : null,
        'district_name'          => $r['district_name'],
        'ashon_code'             => $r['ashon_code'],
        'area_name'              => $r['area_name'],
        'department_name'        => $r['department_name'],
        'department_id'          => $r['department_id'] ? (int)$r['department_id'] : null,
        'assigned_staff_id'      => $r['assigned_staff_id']   ? (int)$r['assigned_staff_id'] : null,
        'assigned_staff_name'    => $r['assigned_staff_name'] ?: null,
        'rating'                 => $r['rating_value'] !== null ? (int)$r['rating_value'] : null,
        'categories'             => $cats,
        'first_image_url'        => absUrl($r['first_image']),
        'media_count'            => (int)$r['media_count'],
        'submitted_at'           => $r['submitted_at'],
        'approved_at'            => $r['approved_at'],
        'resolved_at'            => $r['resolved_at'],
        'has_upvoted'            => isset($myUpvotes[$r['id']]),
        'is_own'                 => ($role === 'citizen' && (int)$r['submitted_by_user_id'] === (int)($_SESSION['user_id'] ?? 0)),
    ];
    // Citizen identity visibility rules
    if ($role === 'admin') {
        $item['citizen_name']  = $r['citizen_name'];
        $item['citizen_uid']   = $r['citizen_uid'];
        $item['citizen_phone'] = $r['citizen_phone'];
        $item['citizen_email'] = $r['citizen_email'];
        $item['citizen_nid']   = $r['citizen_nid'];
    } elseif ($role === 'citizen' && (int)$r['submitted_by_user_id'] === (int)$_SESSION['user_id']) {
        $item['citizen_name']  = $r['citizen_name'];
        $item['citizen_uid']   = $r['citizen_uid'];
        $item['citizen_phone'] = $r['citizen_phone'];
        $item['citizen_email'] = $r['citizen_email'];
    } else {
        // Show display alias only — initials-ish anonymization
        $name = $r['citizen_name'] ?: 'Citizen';
        $parts = preg_split('/\s+/', trim($name));
        $alias = ucfirst(strtolower($parts[0] ?? 'Citizen'));
        if (!empty($parts[1])) $alias .= ' ' . strtoupper($parts[1][0]) . '.';
        $item['citizen_name'] = $alias;
    }
    $out[] = $item;
}

sendSuccess([
    'complaints' => $out,
    'total'      => $total,
    'page'       => $page,
    'per_page'   => $per_page,
    'pages'      => (int)ceil($total / $per_page),
]);
