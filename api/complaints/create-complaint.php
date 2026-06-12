<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';
require_once __DIR__ . '/../../includes/uid-generator.php';
require_once __DIR__ . '/../../includes/upload.php';

requireMethod('POST');
requireAuth(['citizen']);
$me = (int)$_SESSION['user_id'];

// Profile verification gate
$stmt = $pdo->prepare("SELECT profile_verified FROM users WHERE id = ?");
$stmt->execute([$me]);
$verified = $stmt->fetchColumn();
if ($verified !== 'verified') {
    sendError('Please complete your profile verification first.', 403, ['code' => 'profile_unverified']);
}

$in = !empty($_POST) ? $_POST : readJsonInput();

$categories  = $in['category'] ?? $in['categories'] ?? [];
if (is_string($categories)) {
    // Possibly JSON string from FormData
    $tmp = json_decode($categories, true);
    if (is_array($tmp)) $categories = $tmp;
    else $categories = array_map('trim', explode(',', $categories));
}
$subject     = trim((string)($in['subject'] ?? ''));
$description = trim((string)($in['description'] ?? ''));
$priority    = $in['priority'] ?? 'medium';
$district_id = (int)($in['district_id'] ?? 0);
$ashon_id    = (int)($in['ashon_id'] ?? 0);
$area_id     = !empty($in['area_id']) ? (int)$in['area_id'] : null;
$map_lat     = ($in['map_lat'] ?? '') !== '' ? (float)$in['map_lat'] : null;
$map_lng     = ($in['map_lng'] ?? '') !== '' ? (float)$in['map_lng'] : null;
$map_address = trim((string)($in['map_address'] ?? ''));

if (empty($categories) || $subject === '' || $description === '' || !$district_id || !$ashon_id) {
    sendError('Please fill all required fields.', 422);
}
if (!in_array($priority, ['low','medium','high','critical'], true)) {
    sendError('Invalid priority.', 422);
}

try {
    $pdo->beginTransaction();
    $cid = generateComplaintID($pdo);

    $stmt = $pdo->prepare(
        "INSERT INTO complaints
         (complaint_id, submitted_by_user_id, subject, description, priority, status,
          district_id, ashon_id, area_id, map_lat, map_lng, map_address,
          approval_status, is_approved)
         VALUES (?,?,?,?,?, 'submitted', ?,?,?, ?, ?, ?, 'pending', 0)"
    );
    $stmt->execute([
        $cid, $me, $subject, $description, $priority,
        $district_id, $ashon_id, $area_id, $map_lat, $map_lng, $map_address
    ]);
    $newId = (int)$pdo->lastInsertId();

    // Categories
    $catStmt = $pdo->prepare("INSERT INTO complaint_categories (complaint_id, category) VALUES (?, ?)");
    foreach ($categories as $c) {
        $c = trim((string)$c);
        if ($c === '') continue;
        $catStmt->execute([$newId, $c]);
    }

    // Media uploads (input name `media[]`)
    $files = handleMultipleFileUploads('media', 'uploads/complaints/', ['image','video']);
    $mStmt = $pdo->prepare(
        "INSERT INTO complaint_media (complaint_id, file_path, file_type, uploaded_by, is_proof)
         VALUES (?,?,?, 'citizen', 0)"
    );
    foreach ($files as $f) {
        $mStmt->execute([$newId, $f['path'], $f['type']]);
    }

    // Status history
    $pdo->prepare(
        "INSERT INTO complaint_status_history (complaint_id, status, changed_by_type, changed_by_id, notes)
         VALUES (?, 'submitted', 'citizen', ?, 'Complaint submitted')"
    )->execute([$newId, $me]);

    // Auto-assignment if enabled
    $auto = $pdo->query("SELECT setting_value FROM site_settings WHERE setting_key='auto_assignment'")->fetchColumn();
    if ($auto === '1' && !empty($categories)) {
        $firstCat = $categories[0];
        $dep = $pdo->prepare("SELECT id, name FROM departments WHERE category_key = ? LIMIT 1");
        $dep->execute([$firstCat]);
        $depRow = $dep->fetch();
        if ($depRow) {
            $depId   = (int)$depRow['id'];
            $depName = $depRow['name'];

            // Auto-assignment also auto-approves so the complaint becomes
            // visible to the department staff dashboard (which is scoped to
            // approved complaints of their department).
            // Status -> 'pending' (i.e. waiting for the department to start
            // work). A specific staff being assigned later will move it to
            // 'assigned' via api/staff/assign-complaint.php.
            $pdo->prepare(
                "UPDATE complaints
                    SET assigned_department_id = ?,
                        auto_assigned          = 1,
                        is_approved            = 1,
                        approval_status        = 'approved',
                        approved_at            = COALESCE(approved_at, NOW()),
                        status                 = 'pending'
                  WHERE id = ?"
            )->execute([$depId, $newId]);

            $pdo->prepare(
                "INSERT INTO complaint_status_history (complaint_id, status, changed_by_type, changed_by_id, notes)
                 VALUES (?, 'pending', 'admin', 0, ?)"
            )->execute([$newId, "Auto-approved & auto-assigned to {$depName}"]);

            // Notify every staff member of the assigned department
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
                        "Complaint $cid has been auto-assigned to your department ({$depName}).",
                        $newId,
                    ]);
                }
            }

            // Citizen gets a status notification too
            $pdo->prepare(
                "INSERT INTO notifications (recipient_type, recipient_id, type, title, message, related_complaint_id)
                 VALUES ('citizen', ?, 'complaint_update', 'Complaint Auto-Assigned', ?, ?)"
            )->execute([$me, "Your complaint $cid has been automatically assigned to the {$depName}.", $newId]);

            $pdo->prepare(
                "INSERT INTO activity_log (actor_type, actor_id, action, related_complaint_id)
                 VALUES ('system', 0, ?, ?)"
            )->execute(["Auto-assigned complaint $cid to {$depName}", $newId]);
        }
    }

    $pdo->prepare(
        "INSERT INTO activity_log (actor_type, actor_id, action, related_complaint_id)
         VALUES ('citizen', ?, ?, ?)"
    )->execute([$me, "Submitted complaint $cid", $newId]);

    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    sendError('Failed to submit complaint: ' . $e->getMessage(), 500);
}

sendSuccess([
    'id'           => $newId,
    'complaint_id' => $cid,
], 'Complaint submitted successfully.');
