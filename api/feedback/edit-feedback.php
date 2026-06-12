<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$in = !empty($_POST) ? $_POST : readJsonInput();
$id = (int)($in['id'] ?? 0);
if (!$id) sendError('id required', 422);
$fields=[]; $params=[];
foreach (['topic','message','rating'] as $f) {
    if (array_key_exists($f, $in)) { $fields[] = "$f = ?"; $params[] = $in[$f]; }
}
if (empty($fields)) sendError('No fields', 422);
$params[] = $id;
$pdo->prepare("UPDATE feedback_messages SET " . implode(',', $fields) . " WHERE id = ?")->execute($params);
sendSuccess([], 'Feedback updated.');
