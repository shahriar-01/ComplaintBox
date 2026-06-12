<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireAuth(['admin','staff']);
$id = (int)($_GET['id'] ?? 0);
if (!$id) sendError('id required', 422);
$stmt = $pdo->prepare("SELECT s.*, d.name AS department_name FROM department_staff s
                        LEFT JOIN departments d ON d.id = s.department_id WHERE s.id = ?");
$stmt->execute([$id]);
$s = $stmt->fetch();
if (!$s) sendError('Not found', 404);
unset($s['password_hash']);
$s['profile_picture_url'] = absUrl($s['profile_picture']);
sendSuccess($s);
