<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireAuth(['admin','staff']);
$role = $_SESSION['role'];

$where=['1=1']; $params=[];
if (!empty($_GET['actor_type'])) { $where[] = 'actor_type = ?'; $params[] = $_GET['actor_type']; }
if (!empty($_GET['actor_id']))   { $where[] = 'actor_id = ?';   $params[] = (int)$_GET['actor_id']; }
if ($role === 'staff') {
    // limit to staff's own actions
    $where[] = 'actor_type = ? AND actor_id = ?';
    $params[] = 'staff';
    $params[] = (int)$_SESSION['user_id'];
}
$per = min(200, max(1, (int)($_GET['per_page'] ?? 50)));
$whereSql = implode(' AND ', $where);
$sql = "SELECT * FROM activity_log WHERE $whereSql ORDER BY created_at DESC LIMIT $per";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();
sendSuccess(['activity' => $rows, 'total' => count($rows)]);
