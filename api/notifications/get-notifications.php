<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireAuth();
$me   = (int)$_SESSION['user_id'];
$role = $_SESSION['role'];
$type = $_GET['type'] ?? null;
$page = max(1, (int)($_GET['page'] ?? 1));
$per  = min(100, max(1, (int)($_GET['per_page'] ?? 20)));
$offset = ($page - 1) * $per;

$recipientType = $role === 'staff' ? 'staff' : 'citizen';

$where  = 'recipient_type = ? AND recipient_id = ?';
$params = [$recipientType, $me];
if ($type) { $where .= ' AND type = ?'; $params[] = $type; }

$total = (int)(function() use ($pdo,$where,$params) {
    $s = $pdo->prepare("SELECT COUNT(*) FROM notifications WHERE $where");
    $s->execute($params);
    return $s->fetchColumn();
})();

$sql = "SELECT id, type, title, message, related_complaint_id, is_read, created_at
        FROM notifications WHERE $where ORDER BY created_at DESC LIMIT $per OFFSET $offset";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();

$unread = (int)(function() use ($pdo,$recipientType,$me) {
    $s = $pdo->prepare("SELECT COUNT(*) FROM notifications WHERE recipient_type = ? AND recipient_id = ? AND is_read = 0");
    $s->execute([$recipientType, $me]);
    return $s->fetchColumn();
})();

sendSuccess([
    'notifications' => $rows,
    'total'         => $total,
    'unread'        => $unread,
    'page'          => $page,
    'per_page'      => $per,
]);
