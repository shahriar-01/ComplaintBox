<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
$id = (int)($_GET['district_id'] ?? 0);
if (!$id) sendError('district_id required', 422);
$stmt = $pdo->prepare("SELECT id, district_id, ashon_code FROM ashon_numbers WHERE district_id = ? ORDER BY ashon_code ASC");
$stmt->execute([$id]);
$rows = $stmt->fetchAll();
sendSuccess(['ashons' => $rows, 'total' => count($rows)]);
