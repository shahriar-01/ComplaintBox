<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
$rows = $pdo->query("SELECT setting_key, setting_value FROM site_settings")->fetchAll();
$out = [];
foreach ($rows as $r) $out[$r['setting_key']] = $r['setting_value'];
sendSuccess($out);
