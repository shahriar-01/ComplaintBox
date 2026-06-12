<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireAuth(['admin','citizen','staff']);
$me = (int)$_SESSION['user_id'];
$role = $_SESSION['role'];

$where  = ['1=1'];
$params = [];
if ($role !== 'admin') {
    $where[] = 'r.reporter_type = ? AND r.reporter_id = ?';
    $params[] = $role === 'staff' ? 'staff' : 'citizen';
    $params[] = $me;
}
if (!empty($_GET['category'])) { $where[] = 'r.category = ?'; $params[] = $_GET['category']; }
if (!empty($_GET['status']))   { $where[] = 'r.status = ?';   $params[] = $_GET['status']; }
if (!empty($_GET['reporter_type'])) { $where[] = 'r.reporter_type = ?'; $params[] = $_GET['reporter_type']; }
$whereSql = implode(' AND ', $where);

// LEFT JOIN both users and department_staff to resolve the reporter's name.
$sql = "SELECT r.id, r.reporter_type, r.reporter_id, r.topic, r.description, r.category,
               r.related_id, r.image_paths, r.admin_reply, r.status, r.created_at,
               u.full_name      AS citizen_name,
               u.user_uid       AS citizen_uid,
               u.email          AS citizen_email,
               u.phone          AS citizen_phone,
               s.full_name      AS staff_name,
               s.staff_uid      AS staff_uid,
               s.email          AS staff_email,
               s.phone          AS staff_phone,
               s.designation    AS staff_designation,
               d.name           AS staff_department
        FROM reports r
        LEFT JOIN users u             ON r.reporter_type = 'citizen' AND r.reporter_id = u.id
        LEFT JOIN department_staff s  ON r.reporter_type = 'staff'   AND r.reporter_id = s.id
        LEFT JOIN departments d       ON d.id = s.department_id
        WHERE $whereSql
        ORDER BY r.created_at DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();

$out = [];
foreach ($rows as $r) {
    $isStaff = $r['reporter_type'] === 'staff';
    $reporterName = $isStaff ? ($r['staff_name'] ?? 'Staff') : ($r['citizen_name'] ?? 'Citizen');
    $reporterUid  = $isStaff ? ($r['staff_uid']  ?? '') : ($r['citizen_uid'] ?? '');
    $reporterEmail= $isStaff ? ($r['staff_email'] ?? '') : ($r['citizen_email'] ?? '');
    $reporterPhone= $isStaff ? ($r['staff_phone'] ?? '') : ($r['citizen_phone'] ?? '');
    $imgPaths = $r['image_paths'] ? json_decode($r['image_paths'], true) : [];
    if (!is_array($imgPaths)) $imgPaths = [];

    $out[] = [
        'id'              => (int)$r['id'],
        'reporter_type'   => $r['reporter_type'],
        'reporter_id'     => (int)$r['reporter_id'],
        'reporter_name'   => $reporterName,
        'reporter_uid'    => $reporterUid,
        'reporter_email'  => $reporterEmail,
        'reporter_phone'  => $reporterPhone,
        'staff_department'=> $r['staff_department'],
        'staff_designation'=> $r['staff_designation'],
        'topic'           => $r['topic'],
        'description'     => $r['description'],
        // Provide both keys so any frontend that reads either works
        'message'         => $r['description'],
        'category'        => $r['category'] ?: 'others',
        'related_id'      => $r['related_id'] !== null ? (int)$r['related_id'] : null,
        'image_paths'     => $imgPaths,
        'image_urls'      => array_map('absUrl', $imgPaths),
        'admin_reply'     => $r['admin_reply'],
        'status'          => $r['status'],
        'created_at'      => $r['created_at'],
    ];
}

sendSuccess(['reports' => $out, 'total' => count($out)]);
