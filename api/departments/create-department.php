<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireMethod('POST');
requireAuth(['admin']);
$in = !empty($_POST) ? $_POST : readJsonInput();
$name  = trim((string)($in['name'] ?? ''));
$key   = trim((string)($in['category_key'] ?? ''));
$email = trim((string)($in['contact_email'] ?? ''));
$phone = trim((string)($in['contact_phone'] ?? ''));
$desc  = (string)($in['description'] ?? '');
$icon  = trim((string)($in['icon'] ?? 'category'));
if ($name === '' || $key === '') sendError('name and category_key required', 422);

$stmt = $pdo->prepare("INSERT INTO departments (name, category_key, contact_email, contact_phone, description, icon)
                       VALUES (?,?,?,?,?,?)");
$stmt->execute([$name, $key, $email ?: null, $phone ?: null, $desc, $icon]);
sendSuccess(['id' => (int)$pdo->lastInsertId()], 'Department created.');
