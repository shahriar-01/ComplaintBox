<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$in = !empty($_POST) ? $_POST : readJsonInput();
$id  = (int)($in['id'] ?? $in['feedback_id'] ?? 0);
$val = (int)($in['is_featured'] ?? 1) ? 1 : 0;
if (!$id) sendError('id required', 422);
$pdo->prepare("UPDATE feedback_messages SET is_featured = ? WHERE id = ?")->execute([$val, $id]);
sendSuccess(['is_featured' => $val]);
