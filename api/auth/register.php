<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';
require_once __DIR__ . '/../../includes/uid-generator.php';
require_once __DIR__ . '/../../includes/upload.php';

requireMethod('POST');

// Registration supports multipart/form-data (NID files) and JSON body.
$in = !empty($_POST) ? $_POST : readJsonInput();

$full_name        = trim((string)($in['full_name'] ?? ''));
$username         = trim((string)($in['username'] ?? ''));
$phone            = trim((string)($in['phone'] ?? ''));
$email            = trim((string)($in['email'] ?? ''));
$nid_number       = trim((string)($in['nid_number'] ?? ''));
$district_id      = (int)($in['district_id'] ?? 0);
$ashon_id         = (int)($in['ashon_id'] ?? 0);
$area_id          = !empty($in['area_id']) ? (int)$in['area_id'] : null;
$password         = (string)($in['password'] ?? '');
$confirm_password = (string)($in['confirm_password'] ?? $password);

if ($full_name === '' || $phone === '' || $password === '') {
    sendError('Full name, phone and password are required.', 422);
}
if (!preg_match('/^01[0-9]{9}$/', $phone)) {
    sendError('Phone must be in 01XXXXXXXXX format.', 422);
}
if (strlen($password) < 8 || !preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password)) {
    sendError('Password must be at least 8 chars and contain an uppercase letter and a number.', 422);
}
if ($password !== $confirm_password) {
    sendError('Passwords do not match.', 422);
}

// Uniqueness checks
$check = function ($field, $value) use ($pdo) {
    if ($value === '' || $value === null) return;
    $stmt = $pdo->prepare("SELECT 1 FROM users WHERE $field = ? AND is_deleted = 0 LIMIT 1");
    $stmt->execute([$value]);
    if ($stmt->fetchColumn()) sendError(ucfirst(str_replace('_', ' ', $field)) . ' already exists.', 409);
};
$check('email', $email);
$check('phone', $phone);
$check('username', $username);
$check('nid_number', $nid_number);

// Handle NID image uploads (optional but recommended)
$nid_front_image = null;
$nid_back_image  = null;
if (!empty($_FILES['nid_front_image'])) {
    $r = handleFileUpload('nid_front_image', 'uploads/nid/', ['image']);
    if ($r) $nid_front_image = $r['path'];
}
if (!empty($_FILES['nid_back_image'])) {
    $r = handleFileUpload('nid_back_image', 'uploads/nid/', ['image']);
    if ($r) $nid_back_image = $r['path'];
}

try {
    $user_uid = generateUserUID($pdo);
    $hash     = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare(
        "INSERT INTO users
         (user_uid, full_name, username, email, phone, nid_number,
          nid_front_image, nid_back_image, password_hash,
          district_id, ashon_id, area_id, role, profile_verified)
         VALUES
         (:uid, :name, :uname, :email, :phone, :nid,
          :nidf, :nidb, :hash,
          :did, :aid, :areaid, 'citizen', 'pending')"
    );
    $stmt->execute([
        'uid'   => $user_uid,
        'name'  => $full_name,
        'uname' => $username ?: null,
        'email' => $email ?: null,
        'phone' => $phone,
        'nid'   => $nid_number ?: null,
        'nidf'  => $nid_front_image,
        'nidb'  => $nid_back_image,
        'hash'  => $hash,
        'did'   => $district_id ?: null,
        'aid'   => $ashon_id ?: null,
        'areaid'=> $area_id,
    ]);
    $newId = (int)$pdo->lastInsertId();
} catch (PDOException $e) {
    sendError('Registration failed: ' . $e->getMessage(), 500);
}

// Auto-login
$_SESSION['user_id']   = $newId;
$_SESSION['role']      = 'citizen';
$_SESSION['user_uid']  = $user_uid;
$_SESSION['full_name'] = $full_name;
$_SESSION['email']     = $email;

// Welcome notification
$pdo->prepare(
    "INSERT INTO notifications (recipient_type, recipient_id, type, title, message)
     VALUES ('citizen', ?, 'system', 'Welcome to ComplaintBox',
             'Your account has been created. Please complete profile verification to submit complaints.')"
)->execute([$newId]);

// Activity log
$pdo->prepare(
    "INSERT INTO activity_log (actor_type, actor_id, action, related_user_id)
     VALUES ('citizen', ?, 'Account registered', ?)"
)->execute([$newId, $newId]);

sendSuccess([
    'role'         => 'citizen',
    'user_uid'     => $user_uid,
    'full_name'    => $full_name,
    'redirect_url' => 'citizen-dashboard.php',
], 'Account created. Welcome!');
