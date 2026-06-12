<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$in = !empty($_POST) ? $_POST : readJsonInput();
if (empty($in) || !is_array($in)) sendError('No settings provided', 422);

$stmt = $pdo->prepare(
    "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)"
);
foreach ($in as $k => $v) {
    if (!is_string($k)) continue;
    $stmt->execute([$k, (string)$v]);
}
sendSuccess([], 'Settings updated.');
