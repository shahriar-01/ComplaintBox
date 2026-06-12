<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['citizen','admin']);
$me   = (int)$_SESSION['user_id'];
$role = $_SESSION['role'];
$in   = !empty($_POST) ? $_POST : readJsonInput();
$id   = (int)($in['id'] ?? 0);
if (!$id) sendError('id required', 422);

$stmt = $pdo->prepare("SELECT user_id, complaint_id FROM comments WHERE id = ? AND is_deleted = 0");
$stmt->execute([$id]);
$row = $stmt->fetch();
if (!$row) sendError('Not found', 404);
if ($role !== 'admin' && (int)$row['user_id'] !== $me) sendError('Forbidden', 403);

$pdo->prepare("UPDATE comments SET is_deleted = 1 WHERE id = ?")->execute([$id]);
$pdo->prepare("UPDATE complaints SET comment_count = GREATEST(0, comment_count - 1) WHERE id = ?")
    ->execute([(int)$row['complaint_id']]);

sendSuccess([], 'Comment deleted.');
