<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin','staff']);
$me   = (int)$_SESSION['user_id'];
$role = $_SESSION['role'];
$in   = !empty($_POST) ? $_POST : readJsonInput();
$cid  = (int)($in['complaint_id'] ?? 0);
$sid  = (int)($in['staff_id'] ?? 0);
if (!$cid || !$sid) sendError('complaint_id and staff_id required', 422);

// Verify staff belongs to dept of complaint
$c = $pdo->prepare("SELECT assigned_department_id, complaint_id FROM complaints WHERE id = ?");
$c->execute([$cid]);
$cmp = $c->fetch();
if (!$cmp) sendError('Complaint not found', 404);
$s = $pdo->prepare("SELECT department_id FROM department_staff WHERE id = ? AND is_deleted = 0");
$s->execute([$sid]);
$st = $s->fetch();
if (!$st) sendError('Staff not found', 404);
if ($cmp['assigned_department_id'] && (int)$cmp['assigned_department_id'] !== (int)$st['department_id']) {
    sendError('Staff is not in the assigned department of this complaint.', 409);
}
if ($role === 'staff' && (int)$_SESSION['department_id'] !== (int)$st['department_id']) {
    sendError('Forbidden', 403);
}

// Deactivate any active assignments
$pdo->prepare("UPDATE complaint_assignments SET is_active = 0, removed_at = NOW() WHERE complaint_id = ? AND is_active = 1")
    ->execute([$cid]);
$pdo->prepare(
    "INSERT INTO complaint_assignments (complaint_id, staff_id, assigned_by_type, assigned_by_id, is_active)
     VALUES (?,?, ?, ?, 1)"
)->execute([$cid, $sid, $role, $me]);

// Set complaint status to assigned (if currently earlier)
$pdo->prepare(
    "UPDATE complaints SET status = CASE WHEN status IN ('submitted','pending','in_review') THEN 'assigned' ELSE status END
     WHERE id = ?"
)->execute([$cid]);

// Notify the staff member
$pdo->prepare(
    "INSERT INTO notifications (recipient_type, recipient_id, type, title, message, related_complaint_id)
     VALUES ('staff', ?, 'admin_message', 'New complaint assigned',
             ?, ?)"
)->execute([$sid, "Complaint {$cmp['complaint_id']} has been assigned to you.", $cid]);

$pdo->prepare("INSERT INTO activity_log (actor_type, actor_id, action, related_complaint_id) VALUES (?, ?, ?, ?)")
    ->execute([$role, $me, "Assigned complaint to staff $sid", $cid]);

sendSuccess([], 'Assigned.');
