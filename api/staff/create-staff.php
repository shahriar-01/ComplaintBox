<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';
require_once __DIR__ . '/../../includes/uid-generator.php';
require_once __DIR__ . '/../../includes/upload.php';

requireMethod('POST');
requireAuth(['admin']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();

$name      = trim((string)($in['full_name'] ?? ''));
$idcard    = trim((string)($in['id_card_number'] ?? ''));
$email     = trim((string)($in['email'] ?? ''));
$phone     = trim((string)($in['phone'] ?? ''));
$password  = (string)($in['password'] ?? '');
$deptId    = (int)($in['department_id'] ?? 0);
$desig     = trim((string)($in['designation'] ?? ''));
$districtId= !empty($in['district_id']) ? (int)$in['district_id'] : null;
$ashonId   = !empty($in['ashon_id'])    ? (int)$in['ashon_id']    : null;
$nid       = trim((string)($in['nid_number'] ?? '')) ?: null;
$joined    = $in['joined_date'] ?? date('Y-m-d');

if ($name === '' || $idcard === '' || $email === '' || $phone === '' || $password === '' || !$deptId || $desig === '') {
    sendError('All required fields must be filled.', 422);
}
if (strlen($password) < 8) sendError('Password must be at least 8 chars.', 422);

$dupe = $pdo->prepare("SELECT 1 FROM department_staff WHERE (email = ? OR id_card_number = ?) AND is_deleted = 0");
$dupe->execute([$email, $idcard]);
if ($dupe->fetchColumn()) sendError('Email or ID card already exists.', 409);

$profilePath = null;
if (!empty($_FILES['profile_picture'])) {
    $r = handleFileUpload('profile_picture', 'uploads/profiles/', ['image']);
    if ($r) $profilePath = $r['path'];
}

$uid  = generateStaffUID($pdo);
$hash = password_hash($password, PASSWORD_BCRYPT);
$pdo->prepare(
    "INSERT INTO department_staff
     (staff_uid, id_card_number, full_name, email, phone, nid_number, password_hash,
      department_id, designation, profile_picture, district_id, ashon_id, work_status, joined_date)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?, 'active', ?)"
)->execute([$uid, $idcard, $name, $email, $phone, $nid, $hash, $deptId, $desig, $profilePath, $districtId, $ashonId, $joined]);

$newId = (int)$pdo->lastInsertId();
$pdo->prepare("INSERT INTO activity_log (actor_type, actor_id, action) VALUES ('admin', ?, ?)")
    ->execute([$me, "Created staff $uid"]);
sendSuccess(['id' => $newId, 'staff_uid' => $uid], 'Staff created.');
