<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();
$id = (int)($in['id'] ?? $in['complaint_id'] ?? 0);
if (!$id) sendError('id required', 422);

$stmt = $pdo->prepare(
    "SELECT complaint_id, submitted_by_user_id, status, assigned_department_id, approval_status
       FROM complaints WHERE id = ? AND is_deleted = 0"
);
$stmt->execute([$id]);
$row = $stmt->fetch();
if (!$row) sendError('Not found', 404);

$wasApproved = ($row['approval_status'] === 'approved');

/* --------------------------------------------------------------------
   Approving means:
     - approval_status = 'approved' (publicly visible)
     - if status was 'submitted', bump it to 'pending' (ready for dept
       to start work). If status was already further along, leave it.
-------------------------------------------------------------------- */
$pdo->prepare(
    "UPDATE complaints
        SET is_approved     = 1,
            approval_status = 'approved',
            status          = CASE WHEN status = 'submitted' THEN 'pending' ELSE status END,
            approved_at     = COALESCE(approved_at, NOW())
      WHERE id = ?"
)->execute([$id]);

// Status history only if the status actually moved
if ($row['status'] === 'submitted') {
    $pdo->prepare(
        "INSERT INTO complaint_status_history (complaint_id, status, changed_by_type, changed_by_id, notes)
         VALUES (?, 'pending', 'admin', ?, 'Approved by admin')"
    )->execute([$id, $me]);
}

// Notify the citizen
$pdo->prepare(
    "INSERT INTO notifications (recipient_type, recipient_id, type, title, message, related_complaint_id)
     VALUES ('citizen', ?, 'complaint_update', 'Complaint Approved', ?, ?)"
)->execute([
    $row['submitted_by_user_id'],
    "Your complaint {$row['complaint_id']} has been approved and is now visible to the public.",
    $id,
]);

/* --------------------------------------------------------------------
   If a department is already assigned and this is a fresh approval,
   notify all staff of that department so the complaint shows up in
   their dashboard (which is scoped to approved complaints).
-------------------------------------------------------------------- */
$notifiedStaff = 0;
if (!$wasApproved && !empty($row['assigned_department_id'])) {
    $depId = (int)$row['assigned_department_id'];
    $depName = $pdo->prepare("SELECT name FROM departments WHERE id = ?");
    $depName->execute([$depId]);
    $depName = $depName->fetchColumn() ?: 'your department';

    $staffRows = $pdo->prepare("SELECT id FROM department_staff WHERE department_id = ? AND is_deleted = 0");
    $staffRows->execute([$depId]);
    $staffIds = $staffRows->fetchAll(PDO::FETCH_COLUMN);
    if (!empty($staffIds)) {
        $notifStmt = $pdo->prepare(
            "INSERT INTO notifications (recipient_type, recipient_id, type, title, message, related_complaint_id)
             VALUES ('staff', ?, 'admin_message', 'New complaint assigned', ?, ?)"
        );
        foreach ($staffIds as $sid) {
            $notifStmt->execute([
                (int)$sid,
                "Complaint {$row['complaint_id']} has been approved and assigned to your department ({$depName}).",
                $id,
            ]);
            $notifiedStaff++;
        }
    }
}

$pdo->prepare(
    "INSERT INTO activity_log (actor_type, actor_id, action, related_complaint_id)
     VALUES ('admin', ?, ?, ?)"
)->execute([$me, "Approved complaint {$row['complaint_id']}", $id]);

sendSuccess([
    'notified_staff' => $notifiedStaff,
], 'Complaint approved.');
