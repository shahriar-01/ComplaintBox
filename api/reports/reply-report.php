<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();
$id    = (int)($in['id'] ?? $in['report_id'] ?? 0);
$reply = trim((string)($in['reply'] ?? $in['admin_reply'] ?? ''));
if (!$id || $reply === '') sendError('id and reply required', 422);

$pdo->prepare("UPDATE reports SET admin_reply = ?, status = 'reviewed' WHERE id = ?")->execute([$reply, $id]);

// Notify reporter
$r = $pdo->prepare("SELECT reporter_type, reporter_id, topic FROM reports WHERE id = ?");
$r->execute([$id]);
$row = $r->fetch();
if ($row) {
    $pdo->prepare(
        "INSERT INTO notifications (recipient_type, recipient_id, type, title, message)
         VALUES (?, ?, 'admin_message', 'Reply on your report', ?)"
    )->execute([$row['reporter_type'], (int)$row['reporter_id'],
                "Admin replied to your report \"{$row['topic']}\": $reply"]);
}
$pdo->prepare("INSERT INTO activity_log (actor_type, actor_id, action) VALUES ('admin', ?, ?)")
    ->execute([$me, "Replied to report $id"]);
sendSuccess([], 'Reply sent.');
