<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';
require_once __DIR__ . '/../../includes/upload.php';

requireMethod('POST');
requireAuth(['admin','staff']);
$me   = (int)$_SESSION['user_id'];
$role = $_SESSION['role'];
$in   = !empty($_POST) ? $_POST : readJsonInput();
$id   = (int)($in['id'] ?? 0);
if (!$id) sendError('id required', 422);
if ($role === 'staff' && $id !== $me) sendError('Forbidden', 403);

$allowedAdmin = ['full_name','email','phone','department_id','designation','work_status','district_id','ashon_id'];
$allowedSelf  = ['full_name','phone','designation'];
$allowed = $role === 'admin' ? $allowedAdmin : $allowedSelf;

$fields = []; $params = [];
foreach ($allowed as $f) {
    if (array_key_exists($f, $in)) {
        $fields[] = "$f = ?";
        $params[] = $in[$f] !== '' ? $in[$f] : null;
    }
}
if (!empty($_FILES['profile_picture'])) {
    $r = handleFileUpload('profile_picture', 'uploads/profiles/', ['image']);
    if ($r) { $fields[] = 'profile_picture = ?'; $params[] = $r['path']; }
}
if (!empty($in['password']) && strlen($in['password']) >= 8) {
    $fields[] = 'password_hash = ?';
    $params[] = password_hash($in['password'], PASSWORD_BCRYPT);
}
if (empty($fields)) sendError('No changes', 422);
$params[] = $id;
$pdo->prepare("UPDATE department_staff SET " . implode(',', $fields) . " WHERE id = ?")->execute($params);
sendSuccess([], 'Staff updated.');
