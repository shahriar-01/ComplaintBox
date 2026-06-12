<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();
$id     = (int)($in['id'] ?? $in['complaint_id'] ?? 0);
$reason = trim((string)($in['rejection_reason'] ?? ''));
$ref    = trim((string)($in['rejected_complaint_ref'] ?? '')) ?: null;
if (!$id || $reason === '') sendError('id and rejection_reason required', 422);

$stmt = $pdo->prepare("SELECT complaint_id, submitted_by_user_id FROM complaints WHERE id = ? AND is_deleted = 0");
$stmt->execute([$id]);
$row = $stmt->fetch();
if (!$row) sendError('Not found', 404);

$pdo->prepare(
    "UPDATE complaints SET approval_status='rejected', status='rejected',
                           rejection_reason = ?, rejected_complaint_ref = ?
     WHERE id = ?"
)->execute([$reason, $ref, $id]);

$pdo->prepare(
    "INSERT INTO complaint_status_history (complaint_id, status, changed_by_type, changed_by_id, notes)
     VALUES (?, 'rejected', 'admin', ?, ?)"
)->execute([$id, $me, $reason]);

$pdo->prepare(
    "INSERT INTO notifications (recipient_type, recipient_id, type, title, message, related_complaint_id)
     VALUES ('citizen', ?, 'complaint_update', 'Complaint Rejected', ?, ?)"
)->execute([$row['submitted_by_user_id'],
            "Your complaint {$row['complaint_id']} was rejected. Reason: $reason",
            $id]);

$pdo->prepare(
    "INSERT INTO activity_log (actor_type, actor_id, action, related_complaint_id)
     VALUES ('admin', ?, ?, ?)"
)->execute([$me, "Rejected complaint {$row['complaint_id']}", $id]);

sendSuccess([], 'Complaint rejected.');
