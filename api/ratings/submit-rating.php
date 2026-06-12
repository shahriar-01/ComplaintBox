<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['citizen']);
$me  = (int)$_SESSION['user_id'];
$in  = !empty($_POST) ? $_POST : readJsonInput();
$cid = (int)($in['complaint_id'] ?? 0);
$r   = (int)($in['rating'] ?? 0);
if (!$cid || $r < 1 || $r > 5) sendError('Valid complaint_id and 1-5 rating required', 422);

$stmt = $pdo->prepare("SELECT submitted_by_user_id, status FROM complaints WHERE id = ? AND is_deleted = 0");
$stmt->execute([$cid]);
$row = $stmt->fetch();
if (!$row) sendError('Not found', 404);
if ((int)$row['submitted_by_user_id'] !== $me) sendError('Only the submitter can rate.', 403);
if ($row['status'] !== 'resolved') sendError('Only resolved complaints can be rated.', 409);

try {
    $pdo->prepare(
        "INSERT INTO complaint_ratings (complaint_id, user_id, rating) VALUES (?,?,?)
         ON DUPLICATE KEY UPDATE rating = VALUES(rating)"
    )->execute([$cid, $me, $r]);
} catch (PDOException $e) {
    sendError('Rating failed: ' . $e->getMessage(), 500);
}
sendSuccess(['rating' => $r], 'Rating saved.');
