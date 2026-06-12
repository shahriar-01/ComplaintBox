<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();
$id     = (int)($in['id'] ?? $in['user_id'] ?? 0);
$action = (string)($in['action'] ?? 'ban');
if (!$id) sendError('id required', 422);

$val = $action === 'ban' ? 1 : 0;
$pdo->prepare("UPDATE users SET is_banned = ? WHERE id = ?")->execute([$val, $id]);

if ($val) {
    $pdo->prepare(
        "INSERT INTO notifications (recipient_type, recipient_id, type, title, message)
         VALUES ('citizen', ?, 'system', 'Account suspended',
                 'Your account has been suspended by the administrator. Please contact support.')"
    )->execute([$id]);
}
$pdo->prepare("INSERT INTO activity_log (actor_type, actor_id, action, related_user_id) VALUES ('admin', ?, ?, ?)")
    ->execute([$me, ($val ? 'Banned user ' : 'Unbanned user ') . $id, $id]);
sendSuccess([], $val ? 'User banned.' : 'User unbanned.');
