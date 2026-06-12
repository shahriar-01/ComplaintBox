<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['citizen']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();

$cid  = (int)($in['complaint_id'] ?? 0);
$text = trim((string)($in['comment_text'] ?? ''));
if (!$cid || $text === '') sendError('complaint_id and comment_text required', 422);

// Verify complaint exists
$stmt = $pdo->prepare("SELECT complaint_id, submitted_by_user_id FROM complaints WHERE id = ? AND is_deleted = 0");
$stmt->execute([$cid]);
$c = $stmt->fetch();
if (!$c) sendError('Complaint not found', 404);

$pdo->prepare("INSERT INTO comments (complaint_id, user_id, comment_text) VALUES (?,?,?)")
    ->execute([$cid, $me, $text]);
$newId = (int)$pdo->lastInsertId();

$pdo->prepare("UPDATE complaints SET comment_count = comment_count + 1 WHERE id = ?")->execute([$cid]);

// Notify the original submitter unless it's the same user
if ((int)$c['submitted_by_user_id'] !== $me) {
    $pdo->prepare(
        "INSERT INTO notifications (recipient_type, recipient_id, type, title, message, related_complaint_id)
         VALUES ('citizen', ?, 'comment', 'New comment on your complaint',
                 ?, ?)"
    )->execute([$c['submitted_by_user_id'],
                "Someone commented on {$c['complaint_id']}.",
                $cid]);
}

// Return fresh comment
$u = $pdo->prepare("SELECT user_uid, full_name, profile_picture FROM users WHERE id = ?");
$u->execute([$me]);
$user = $u->fetch();

sendSuccess([
    'id'             => $newId,
    'comment_text'   => $text,
    'is_edited'      => 0,
    'created_at'     => date('Y-m-d H:i:s'),
    'user_id'        => $me,
    'user_uid'       => $user['user_uid'] ?? null,
    'full_name'      => $user['full_name'] ?? null,
    'profile_picture'=> absUrl($user['profile_picture'] ?? null),
    'is_own'         => true,
], 'Comment posted.');
