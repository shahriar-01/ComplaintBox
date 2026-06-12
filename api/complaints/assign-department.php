<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();
$id  = (int)($in['id'] ?? $in['complaint_id'] ?? 0);
$dep = (int)($in['department_id'] ?? 0);
if (!$id || !$dep) sendError('id and department_id required', 422);

$stmt = $pdo->prepare(
    "SELECT complaint_id, submitted_by_user_id, approval_status, status, assigned_department_id
       FROM complaints WHERE id = ? AND is_deleted = 0"
);
$stmt->execute([$id]);
$row = $stmt->fetch();
if (!$row) sendError('Not found', 404);

$d = $pdo->prepare("SELECT name FROM departments WHERE id = ?");
$d->execute([$dep]);
$dept = $d->fetch();
if (!$dept) sendError('Department not found', 404);
$depName = $dept['name'];

$alreadyApproved   = ($row['approval_status'] === 'approved');
$reassign          = !empty($row['assigned_department_id'])
                        && (int)$row['assigned_department_id'] !== $dep;

/* --------------------------------------------------------------------
   Assigning a DEPARTMENT only sets the dept. Status / approval are
   NOT changed here — those are explicit admin actions ("Approve" /
   staff updating status). A specific staff member is the one that
   pushes status -> "assigned" (via api/staff/assign-complaint.php).
-------------------------------------------------------------------- */
$pdo->prepare(
    "UPDATE complaints
       SET assigned_department_id = ?,
           assigned_by_admin      = 1
     WHERE id = ?"
)->execute([$dep, $id]);

$pdo->prepare(
    "INSERT INTO complaint_status_history (complaint_id, status, changed_by_type, changed_by_id, notes)
     VALUES (?, ?, 'admin', ?, ?)"
)->execute([
    $id, $row['status'], $me,
    ($reassign ? "Reassigned to {$depName}" : "Assigned to {$depName}")
]);

// Notify the citizen
$pdo->prepare(
    "INSERT INTO notifications (recipient_type, recipient_id, type, title, message, related_complaint_id)
     VALUES ('citizen', ?, 'complaint_update', 'Complaint Assigned', ?, ?)"
)->execute([
    $row['submitted_by_user_id'],
    "Your complaint {$row['complaint_id']} has been assigned to the {$depName}.",
    $id,
]);

/* --------------------------------------------------------------------
   Notify the department staff ONLY if the complaint is already
   approved — staff dashboards filter by approval_status='approved',
   so notifying them about an unapproved complaint would point them
   to something they cannot see in their list yet.
-------------------------------------------------------------------- */
$notifiedStaff = 0;
if ($alreadyApproved) {
    $staffRows = $pdo->prepare("SELECT id FROM department_staff WHERE department_id = ? AND is_deleted = 0");
    $staffRows->execute([$dep]);
    $staffIds = $staffRows->fetchAll(PDO::FETCH_COLUMN);
    if (!empty($staffIds)) {
        $notifStmt = $pdo->prepare(
            "INSERT INTO notifications (recipient_type, recipient_id, type, title, message, related_complaint_id)
             VALUES ('staff', ?, 'admin_message', 'New complaint assigned', ?, ?)"
        );
        foreach ($staffIds as $sid) {
            $notifStmt->execute([
                (int)$sid,
                "Complaint {$row['complaint_id']} has been assigned to your department ({$depName}).",
                $id,
            ]);
            $notifiedStaff++;
        }
    }
}

$pdo->prepare(
    "INSERT INTO activity_log (actor_type, actor_id, action, related_complaint_id)
     VALUES ('admin', ?, ?, ?)"
)->execute([$me, ($reassign ? "Reassigned {$row['complaint_id']} to {$depName}"
                             : "Assigned {$row['complaint_id']} to {$depName}"), $id]);

sendSuccess([
    'department_id'   => $dep,
    'department_name' => $depName,
    'notified_staff'  => $notifiedStaff,
    'pending_approval'=> !$alreadyApproved,
], 'Department assigned.');
