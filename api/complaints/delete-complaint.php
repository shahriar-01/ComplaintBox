<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['citizen','admin']);
$me   = (int)$_SESSION['user_id'];
$role = $_SESSION['role'];
$in   = !empty($_POST) ? $_POST : readJsonInput();
$id   = (int)($in['id'] ?? $in['complaint_id'] ?? 0);
if (!$id) sendError('id required', 422);

$stmt = $pdo->prepare("SELECT submitted_by_user_id, complaint_id FROM complaints WHERE id = ? AND is_deleted = 0");
$stmt->execute([$id]);
$row = $stmt->fetch();
if (!$row) sendError('Not found', 404);
if ($role === 'citizen' && (int)$row['submitted_by_user_id'] !== $me) sendError('Forbidden', 403);

$pdo->prepare("UPDATE complaints SET is_deleted = 1 WHERE id = ?")->execute([$id]);
$pdo->prepare(
    "INSERT INTO activity_log (actor_type, actor_id, action, related_complaint_id)
     VALUES (?, ?, ?, ?)"
)->execute([$role, $me, "Deleted complaint {$row['complaint_id']}", $id]);

sendSuccess([], 'Complaint deleted.');
