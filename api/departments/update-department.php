<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$in = !empty($_POST) ? $_POST : readJsonInput();
$id = (int)($in['id'] ?? 0);
if (!$id) sendError('id required', 422);
$allowed = ['name','category_key','contact_email','contact_phone','description','icon'];
$fields = []; $params = [];
foreach ($allowed as $f) {
    if (array_key_exists($f, $in)) { $fields[] = "$f = ?"; $params[] = $in[$f]; }
}
if (empty($fields)) sendError('No fields', 422);
$params[] = $id;
$pdo->prepare("UPDATE departments SET " . implode(',', $fields) . " WHERE id = ?")->execute($params);
sendSuccess([], 'Department updated.');
