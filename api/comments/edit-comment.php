<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['citizen']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();

$id   = (int)($in['id'] ?? 0);
$text = trim((string)($in['comment_text'] ?? ''));
if (!$id || $text === '') sendError('id and comment_text required', 422);

$stmt = $pdo->prepare("SELECT user_id FROM comments WHERE id = ? AND is_deleted = 0");
$stmt->execute([$id]);
$row = $stmt->fetch();
if (!$row) sendError('Not found', 404);
if ((int)$row['user_id'] !== $me) sendError('Forbidden', 403);

$pdo->prepare("UPDATE comments SET comment_text = ?, is_edited = 1 WHERE id = ?")->execute([$text, $id]);
sendSuccess([], 'Comment updated.');
