<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['citizen']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();
$cid = (int)($in['complaint_id'] ?? 0);
if (!$cid) sendError('complaint_id required', 422);

$pdo->beginTransaction();
try {
    $stmt = $pdo->prepare("SELECT id FROM upvotes WHERE complaint_id = ? AND user_id = ?");
    $stmt->execute([$cid, $me]);
    $existing = $stmt->fetchColumn();

    if ($existing) {
        $pdo->prepare("DELETE FROM upvotes WHERE id = ?")->execute([(int)$existing]);
        $pdo->prepare("UPDATE complaints SET upvote_count = GREATEST(0, upvote_count - 1) WHERE id = ?")->execute([$cid]);
        $upvoted = false;
    } else {
        $pdo->prepare("INSERT INTO upvotes (complaint_id, user_id) VALUES (?,?)")->execute([$cid, $me]);
        $pdo->prepare("UPDATE complaints SET upvote_count = upvote_count + 1 WHERE id = ?")->execute([$cid]);
        $upvoted = true;
    }
    $newCount = (int)$pdo->query("SELECT upvote_count FROM complaints WHERE id = $cid")->fetchColumn();
    $pdo->commit();
} catch (Exception $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    sendError('Failed to toggle: ' . $e->getMessage(), 500);
}

sendSuccess(['upvoted' => $upvoted, 'new_count' => $newCount]);
