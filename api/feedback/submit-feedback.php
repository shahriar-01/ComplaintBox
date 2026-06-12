<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['citizen']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();
$topic   = trim((string)($in['topic'] ?? ''));
$rating  = (int)($in['rating'] ?? 0);
$message = trim((string)($in['message'] ?? ''));
if ($topic === '' || $message === '' || $rating < 1 || $rating > 5) sendError('All fields required, rating 1-5', 422);

$pdo->prepare("INSERT INTO feedback_messages (user_id, topic, rating, message) VALUES (?,?,?,?)")
    ->execute([$me, $topic, $rating, $message]);
sendSuccess(['id' => (int)$pdo->lastInsertId()], 'Thank you for your feedback!');
