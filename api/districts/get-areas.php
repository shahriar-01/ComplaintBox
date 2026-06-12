<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
$id = (int)($_GET['ashon_id'] ?? 0);
if (!$id) sendError('ashon_id required', 422);
$stmt = $pdo->prepare("SELECT id, ashon_id, name FROM areas WHERE ashon_id = ? ORDER BY name ASC");
$stmt->execute([$id]);
$rows = $stmt->fetchAll();
sendSuccess(['areas' => $rows, 'total' => count($rows)]);
