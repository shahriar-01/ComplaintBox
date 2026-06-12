<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth();
$me   = (int)$_SESSION['user_id'];
$role = $_SESSION['role'];
$recipientType = $role === 'staff' ? 'staff' : 'citizen';
$in   = !empty($_POST) ? $_POST : readJsonInput();
$ids  = $in['ids'] ?? (isset($in['notification_id']) ? [$in['notification_id']] : []);
if (!is_array($ids) || empty($ids)) sendError('ids required', 422);
$ids = array_map('intval', $ids);
$ph  = implode(',', array_fill(0, count($ids), '?'));

$stmt = $pdo->prepare("UPDATE notifications SET is_read = 1
                       WHERE recipient_type = ? AND recipient_id = ? AND id IN ($ph)");
$stmt->execute(array_merge([$recipientType, $me], $ids));
sendSuccess(['affected' => $stmt->rowCount()]);
