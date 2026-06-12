<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';

$id = (int)($_GET['id'] ?? 0);
if (!$id) sendError('id required', 422);
$stmt = $pdo->prepare("SELECT * FROM departments WHERE id = ?");
$stmt->execute([$id]);
$d = $stmt->fetch();
if (!$d) sendError('Not found', 404);

$counts = $pdo->prepare(
    "SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status='resolved' THEN 1 ELSE 0 END) AS resolved,
        SUM(CASE WHEN status='in_progress' THEN 1 ELSE 0 END) AS in_progress,
        SUM(CASE WHEN status='assigned' THEN 1 ELSE 0 END) AS assigned
     FROM complaints WHERE assigned_department_id = ? AND is_deleted = 0"
);
$counts->execute([$id]);
$d['stats'] = $counts->fetch();
sendSuccess($d);
