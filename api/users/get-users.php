<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireAuth(['admin']);

$search   = trim((string)($_GET['search']   ?? ''));
$verified = $_GET['verified']  ?? null;
$banned   = $_GET['banned']    ?? null;
$page     = max(1, (int)($_GET['page'] ?? 1));
$per      = min(100, max(1, (int)($_GET['per_page'] ?? 20)));
$offset   = ($page - 1) * $per;

$where  = ['u.is_deleted = 0', "u.role = 'citizen'"];
$params = [];
if ($search !== '') {
    $where[] = '(u.full_name LIKE ? OR u.email LIKE ? OR u.phone LIKE ? OR u.user_uid LIKE ? OR u.nid_number LIKE ?)';
    $like    = "%$search%";
    array_push($params, $like, $like, $like, $like, $like);
}
if ($verified !== null && $verified !== '') {
    $where[] = 'u.profile_verified = ?';
    $params[]= $verified;
}
if ($banned !== null && $banned !== '') {
    $where[] = 'u.is_banned = ?';
    $params[]= (int)$banned;
}
$whereSql = implode(' AND ', $where);

$total = (int)(function() use ($pdo,$whereSql,$params) {
    $s = $pdo->prepare("SELECT COUNT(*) FROM users u WHERE $whereSql");
    $s->execute($params);
    return $s->fetchColumn();
})();

$sql = "SELECT u.id, u.user_uid, u.full_name, u.username, u.email, u.phone, u.nid_number,
               u.profile_picture, u.nid_front_image, u.nid_back_image,
               u.role, u.profile_verified, u.is_banned,
               u.created_at, d.name AS district_name, a.ashon_code, ar.name AS area_name,
               (SELECT COUNT(*) FROM complaints WHERE submitted_by_user_id = u.id AND is_deleted = 0) AS complaint_count,
               (SELECT COUNT(*) FROM upvotes WHERE user_id = u.id) AS upvotes_given,
               (SELECT COUNT(*) FROM comments WHERE user_id = u.id AND is_deleted = 0) AS comments_made
        FROM users u
        LEFT JOIN districts d ON u.district_id = d.id
        LEFT JOIN ashon_numbers a ON u.ashon_id = a.id
        LEFT JOIN areas ar ON u.area_id = ar.id
        WHERE $whereSql
        ORDER BY u.created_at DESC LIMIT $per OFFSET $offset";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();
foreach ($rows as &$r) {
    $r['profile_picture']     = absUrl($r['profile_picture']);
    $r['nid_front_image_url'] = absUrl($r['nid_front_image']);
    $r['nid_back_image_url']  = absUrl($r['nid_back_image']);
}
sendSuccess(['users' => $rows, 'total' => $total, 'page' => $page, 'per_page' => $per]);
