<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

$featuredOnly = isset($_GET['featured']) && $_GET['featured'] === '1';
$role = $_SESSION['role'] ?? null;

$where = ['f.is_deleted = 0'];
$params = [];
if ($featuredOnly || $role !== 'admin') {
    if ($featuredOnly) { $where[] = 'f.is_featured = 1'; }
}
$whereSql = implode(' AND ', $where);

$sql = "SELECT f.id, f.topic, f.rating, f.message, f.is_featured, f.created_at,
               u.id AS user_id, u.user_uid, u.full_name, u.profile_picture
        FROM feedback_messages f
        JOIN users u ON u.id = f.user_id
        WHERE $whereSql
        ORDER BY f.is_featured DESC, f.created_at DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();
foreach ($rows as &$r) {
    $r['profile_picture'] = absUrl($r['profile_picture']);
    $r['rating']      = (int)$r['rating'];
    $r['is_featured'] = (int)$r['is_featured'];
}
sendSuccess(['feedback' => $rows, 'total' => count($rows)]);
