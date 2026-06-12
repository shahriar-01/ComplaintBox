<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$in = !empty($_POST) ? $_POST : readJsonInput();
$id = (int)($in['id'] ?? 0);
if (!$id) sendError('id required', 422);

$allowed = ['full_name','username','email','phone','nid_number','district_id','ashon_id','area_id','profile_verified'];
$fields = []; $params = [];
foreach ($allowed as $f) {
    if (array_key_exists($f, $in)) {
        $fields[] = "$f = ?";
        $params[] = $in[$f] !== '' ? $in[$f] : null;
    }
}
if (empty($fields)) sendError('No fields to update', 422);
$params[] = $id;
$pdo->prepare("UPDATE users SET " . implode(',', $fields) . " WHERE id = ?")->execute($params);
sendSuccess([], 'User updated.');
