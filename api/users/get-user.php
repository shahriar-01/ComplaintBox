<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireAuth();
$me   = (int)$_SESSION['user_id'];
$role = $_SESSION['role'];

$id = (int)($_GET['id'] ?? $me);
if ($role !== 'admin' && $id !== $me) sendError('Forbidden', 403);

$sql = "SELECT u.*, d.name AS district_name, a.ashon_code, ar.name AS area_name
        FROM users u
        LEFT JOIN districts d ON u.district_id = d.id
        LEFT JOIN ashon_numbers a ON u.ashon_id = a.id
        LEFT JOIN areas ar ON u.area_id = ar.id
        WHERE u.id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$user = $stmt->fetch();
if (!$user) sendError('Not found', 404);
unset($user['password_hash']);
$user['nid_front_image_url'] = absUrl($user['nid_front_image']);
$user['nid_back_image_url']  = absUrl($user['nid_back_image']);
$user['profile_picture_url'] = absUrl($user['profile_picture']);
sendSuccess($user);
