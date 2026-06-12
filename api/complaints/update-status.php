<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';
require_once __DIR__ . '/../../includes/upload.php';

requireMethod('POST');
requireAuth(['staff','admin']);
$me     = (int)$_SESSION['user_id'];
$role   = $_SESSION['role'];
$myDept = (int)($_SESSION['department_id'] ?? 0);
$in     = !empty($_POST) ? $_POST : readJsonInput();

$id        = (int)($in['id'] ?? $in['complaint_id'] ?? 0);
$newStatus = (string)($in['new_status'] ?? $in['status'] ?? '');
$notes     = (string)($in['notes'] ?? '');

if (!$id || $newStatus === '') sendError('id and new_status required', 422);
if (!in_array($newStatus, ['in_review','assigned','in_progress','resolved'], true)) {
    sendError('Invalid new_status.', 422);
}

$stmt = $pdo->prepare("SELECT complaint_id, submitted_by_user_id, assigned_department_id FROM complaints WHERE id = ? AND is_deleted = 0");
$stmt->execute([$id]);
$row = $stmt->fetch();
if (!$row) sendError('Not found', 404);
if ($role === 'staff' && (int)$row['assigned_department_id'] !== $myDept) {
    sendError('This complaint does not belong to your department.', 403);
}

try {
    $pdo->beginTransaction();

    if ($newStatus === 'resolved') {
        // Require at least one proof
        $files = handleMultipleFileUploads('proof', 'uploads/proofs/', ['image','video']);
        if (empty($files)) {
            // Fallback single name
            $single = handleFileUpload('proof_file', 'uploads/proofs/', ['image','video']);
            if ($single) $files = [$single];
        }
        if (empty($files)) {
            $pdo->rollBack();
            sendError('At least one proof file is required to mark resolved.', 422);
        }
        $m = $pdo->prepare("INSERT INTO complaint_media (complaint_id, file_path, file_type, uploaded_by, is_proof) VALUES (?,?,?, 'staff', 1)");
        foreach ($files as $f) $m->execute([$id, $f['path'], $f['type']]);
        $pdo->prepare("UPDATE complaints SET status = ?, resolved_at = NOW() WHERE id = ?")->execute([$newStatus, $id]);
    } else {
        $pdo->prepare("UPDATE complaints SET status = ? WHERE id = ?")->execute([$newStatus, $id]);
    }

    $pdo->prepare(
        "INSERT INTO complaint_status_history (complaint_id, status, changed_by_type, changed_by_id, notes)
         VALUES (?, ?, ?, ?, ?)"
    )->execute([$id, $newStatus, $role, $me, $notes]);

    $title = 'Complaint Status Updated';
    $msg   = "Your complaint {$row['complaint_id']} status changed to " . str_replace('_',' ', $newStatus) . ".";
    if ($notes !== '') $msg .= " Notes: $notes";
    $pdo->prepare(
        "INSERT INTO notifications (recipient_type, recipient_id, type, title, message, related_complaint_id)
         VALUES ('citizen', ?, 'complaint_update', ?, ?, ?)"
    )->execute([$row['submitted_by_user_id'], $title, $msg, $id]);

    $pdo->prepare(
        "INSERT INTO activity_log (actor_type, actor_id, action, related_complaint_id)
         VALUES (?, ?, ?, ?)"
    )->execute([$role, $me, "Updated {$row['complaint_id']} status to $newStatus", $id]);

    $pdo->commit();
} catch (Exception $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    sendError('Failed to update status: ' . $e->getMessage(), 500);
}

sendSuccess([], 'Status updated.');
