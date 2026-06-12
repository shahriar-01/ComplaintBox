<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$in = !empty($_POST) ? $_POST : readJsonInput();
$id = (int)($in['id'] ?? 0);
if (!$id) sendError('id required', 422);
$pdo->prepare("UPDATE feedback_messages SET is_deleted = 1 WHERE id = ?")->execute([$id]);
sendSuccess([], 'Feedback deleted.');
