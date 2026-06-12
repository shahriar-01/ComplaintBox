<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();
$id = (int)($in['id'] ?? $in['user_id'] ?? 0);
if (!$id) sendError('id required', 422);

$pdo->prepare("UPDATE users SET is_deleted = 1 WHERE id = ?")->execute([$id]);
$pdo->prepare("INSERT INTO activity_log (actor_type, actor_id, action, related_user_id) VALUES ('admin', ?, ?, ?)")
    ->execute([$me, "Deleted user $id", $id]);
sendSuccess([], 'User deleted.');
