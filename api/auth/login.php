<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');

$in         = readJsonInput();
$identifier = trim((string)($in['identifier'] ?? $in['email'] ?? ''));
$password   = (string)($in['password'] ?? '');

if ($identifier === '' || $password === '') {
    sendError('Please provide both identifier and password.', 422);
}

// 1) Try staff (matched by email or staff_uid)
$stmt = $pdo->prepare(
    "SELECT s.id, s.staff_uid, s.full_name, s.email, s.password_hash,
            s.department_id, s.work_status, s.is_deleted
     FROM department_staff s
     WHERE (s.email = ? OR s.staff_uid = ?) AND s.is_deleted = 0
     LIMIT 1"
);
$stmt->execute([$identifier, $identifier]);
$staff = $stmt->fetch();

if ($staff && password_verify($password, $staff['password_hash'])) {
    if ($staff['work_status'] === 'on_leave') {
        sendError('Your account is on leave. Please contact the administrator.', 403);
    }
    $_SESSION['user_id']       = (int)$staff['id'];
    $_SESSION['role']          = 'staff';
    $_SESSION['user_uid']      = $staff['staff_uid'];
    $_SESSION['full_name']     = $staff['full_name'];
    $_SESSION['email']         = $staff['email'];
    $_SESSION['department_id'] = (int)$staff['department_id'];

    sendSuccess([
        'role'         => 'staff',
        'user_uid'     => $staff['staff_uid'],
        'full_name'    => $staff['full_name'],
        'email'        => $staff['email'],
        'department_id'=> (int)$staff['department_id'],
        'redirect_url' => 'staff-dashboard.php',
    ], 'Signed in successfully.');
}

// 2) Try citizen/admin from users
$stmt = $pdo->prepare(
    "SELECT id, user_uid, full_name, username, email, phone, password_hash,
            role, is_banned, is_deleted, profile_verified
     FROM users
     WHERE (email = ? OR username = ? OR phone = ? OR nid_number = ? OR user_uid = ?)
       AND is_deleted = 0
     LIMIT 1"
);
$stmt->execute([$identifier, $identifier, $identifier, $identifier, $identifier]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    sendError('Invalid credentials. Please try again.', 401);
}

if ((int)$user['is_banned'] === 1) {
    sendError('Your account has been suspended. Please contact support.', 403);
}

$_SESSION['user_id']   = (int)$user['id'];
$_SESSION['role']      = $user['role'];
$_SESSION['user_uid']  = $user['user_uid'];
$_SESSION['full_name'] = $user['full_name'];
$_SESSION['email']     = $user['email'];

$redirect = $user['role'] === 'admin' ? 'admin-dashboard.php' : 'citizen-dashboard.php';

sendSuccess([
    'role'             => $user['role'],
    'user_uid'         => $user['user_uid'],
    'full_name'        => $user['full_name'],
    'email'            => $user['email'],
    'profile_verified' => $user['profile_verified'],
    'redirect_url'     => $redirect,
], 'Signed in successfully.');
