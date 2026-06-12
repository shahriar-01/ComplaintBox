<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth();
$me   = (int)$_SESSION['user_id'];
$role = $_SESSION['role'];
$recipientType = $role === 'staff' ? 'staff' : 'citizen';

$stmt = $pdo->prepare("UPDATE notifications SET is_read = 1 WHERE recipient_type = ? AND recipient_id = ?");
$stmt->execute([$recipientType, $me]);
sendSuccess(['affected' => $stmt->rowCount()]);
