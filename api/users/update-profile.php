<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';
require_once __DIR__ . '/../../includes/upload.php';

requireMethod('POST');
requireAuth(['citizen']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();

$allowed = ['full_name','username','phone','nid_number','district_id','ashon_id','area_id','email'];
$fields = []; $params = [];
foreach ($allowed as $f) {
    if (array_key_exists($f, $in)) {
        $val = $in[$f];
        if ($val === '') $val = null;
        $fields[] = "$f = ?";
        $params[] = $val;
    }
}

// File uploads
if (!empty($_FILES['profile_picture'])) {
    $r = handleFileUpload('profile_picture', 'uploads/profiles/', ['image']);
    if ($r) { $fields[] = 'profile_picture = ?'; $params[] = $r['path']; }
}
if (!empty($_FILES['nid_front_image'])) {
    $r = handleFileUpload('nid_front_image', 'uploads/nid/', ['image']);
    if ($r) { $fields[] = 'nid_front_image = ?'; $params[] = $r['path']; }
}
if (!empty($_FILES['nid_back_image'])) {
    $r = handleFileUpload('nid_back_image', 'uploads/nid/', ['image']);
    if ($r) { $fields[] = 'nid_back_image = ?'; $params[] = $r['path']; }
}

if (empty($fields)) sendError('No changes provided', 422);

// Reset verification to pending whenever profile is updated
$fields[] = "profile_verified = 'pending'";
$params[] = $me;
$pdo->prepare("UPDATE users SET " . implode(',', $fields) . " WHERE id = ?")->execute($params);

$pdo->prepare(
    "INSERT INTO notifications (recipient_type, recipient_id, type, title, message)
     VALUES ('citizen', ?, 'profile_update', 'Profile update submitted',
             'Your profile changes are pending admin verification.')"
)->execute([$me]);
$pdo->prepare("INSERT INTO activity_log (actor_type, actor_id, action, related_user_id) VALUES ('citizen', ?, 'Updated profile', ?)")
    ->execute([$me, $me]);

sendSuccess([], 'Profile updated. Pending verification.');
