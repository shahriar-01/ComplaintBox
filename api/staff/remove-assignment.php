<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin','staff']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();
$cid = (int)($in['complaint_id'] ?? 0);
if (!$cid) sendError('complaint_id required', 422);

$pdo->prepare("UPDATE complaint_assignments SET is_active = 0, removed_at = NOW() WHERE complaint_id = ? AND is_active = 1")
    ->execute([$cid]);
$pdo->prepare("INSERT INTO activity_log (actor_type, actor_id, action, related_complaint_id) VALUES (?, ?, 'Removed assignment', ?)")
    ->execute([$_SESSION['role'], $me, $cid]);
sendSuccess([], 'Assignment removed.');
