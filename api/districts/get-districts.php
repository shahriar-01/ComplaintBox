<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
$rows = $pdo->query("SELECT id, name, division FROM districts ORDER BY name ASC")->fetchAll();
sendSuccess(['districts' => $rows, 'total' => count($rows)]);
