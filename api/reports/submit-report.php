<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';
require_once __DIR__ . '/../../includes/upload.php';

requireMethod('POST');
requireAuth(['citizen','staff']);
$me   = (int)$_SESSION['user_id'];
$role = $_SESSION['role'];
$in   = !empty($_POST) ? $_POST : readJsonInput();

$topic = trim((string)($in['topic'] ?? ''));
$desc  = trim((string)($in['description'] ?? ''));
$cat   = (string)($in['category'] ?? '');
$rel   = !empty($in['related_id']) ? (int)$in['related_id'] : null;

if ($topic === '' || $desc === '' || $cat === '') sendError('topic, description and category required', 422);

$paths = [];
if (!empty($_FILES['images'])) {
    $files = handleMultipleFileUploads('images', 'uploads/reports/', ['image']);
    foreach ($files as $f) $paths[] = $f['path'];
}

$pdo->prepare(
    "INSERT INTO reports (reporter_type, reporter_id, topic, description, category, related_id, image_paths)
     VALUES (?,?,?,?,?,?,?)"
)->execute([$role === 'staff' ? 'staff' : 'citizen', $me, $topic, $desc, $cat, $rel, json_encode($paths)]);

sendSuccess(['id' => (int)$pdo->lastInsertId()], 'Report submitted.');
