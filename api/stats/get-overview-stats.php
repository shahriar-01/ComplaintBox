<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

$role = $_SESSION['role'] ?? null;
$me   = (int)($_SESSION['user_id'] ?? 0);
$out  = [];

// Public-style numbers (always returned)
$pub = $pdo->query(
    "SELECT
        COUNT(*) AS total_complaints,
        SUM(CASE WHEN status='resolved' THEN 1 ELSE 0 END) AS resolved,
        SUM(CASE WHEN status='in_progress' THEN 1 ELSE 0 END) AS in_progress,
        SUM(CASE WHEN status IN ('submitted','pending','in_review','assigned') THEN 1 ELSE 0 END) AS pending
     FROM complaints WHERE is_deleted = 0 AND approval_status = 'approved'"
)->fetch();
$out['public'] = [
    'total_complaints' => (int)$pub['total_complaints'],
    'resolved'         => (int)$pub['resolved'],
    'in_progress'      => (int)$pub['in_progress'],
    'pending'          => (int)$pub['pending'],
    'resolution_rate'  => $pub['total_complaints'] > 0 ? round((int)$pub['resolved'] / (int)$pub['total_complaints'] * 100, 1) : 0,
    'citizens_count'   => (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role='citizen' AND is_deleted=0")->fetchColumn(),
    'departments_count'=> (int)$pdo->query("SELECT COUNT(*) FROM departments")->fetchColumn(),
];

if ($role === 'citizen') {
    $stmt = $pdo->prepare(
        "SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status='resolved' THEN 1 ELSE 0 END) AS resolved,
            SUM(CASE WHEN status='in_progress' THEN 1 ELSE 0 END) AS in_progress,
            SUM(CASE WHEN status='rejected' OR approval_status='rejected' THEN 1 ELSE 0 END) AS rejected,
            SUM(CASE WHEN status IN ('submitted','pending') THEN 1 ELSE 0 END) AS pending,
            SUM(upvote_count) AS total_upvotes
         FROM complaints WHERE submitted_by_user_id = ? AND is_deleted = 0"
    );
    $stmt->execute([$me]);
    $row = $stmt->fetch();
    $out['citizen'] = array_map('intval', $row);
}
if ($role === 'staff') {
    $dept = (int)($_SESSION['department_id'] ?? 0);
    $stmt = $pdo->prepare(
        "SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status='resolved' THEN 1 ELSE 0 END) AS resolved,
            SUM(CASE WHEN status='in_progress' THEN 1 ELSE 0 END) AS in_progress,
            SUM(CASE WHEN status='assigned' THEN 1 ELSE 0 END) AS assigned,
            SUM(CASE WHEN status IN ('submitted','pending') THEN 1 ELSE 0 END) AS pending
         FROM complaints WHERE assigned_department_id = ? AND is_deleted = 0"
    );
    $stmt->execute([$dept]);
    $row = $stmt->fetch();
    $out['staff'] = array_map('intval', $row);
}
if ($role === 'admin') {
    $row = $pdo->query(
        "SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status='resolved' THEN 1 ELSE 0 END) AS resolved,
            SUM(CASE WHEN status='in_progress' THEN 1 ELSE 0 END) AS in_progress,
            SUM(CASE WHEN status IN ('submitted','pending') THEN 1 ELSE 0 END) AS pending,
            SUM(CASE WHEN approval_status='rejected' THEN 1 ELSE 0 END) AS rejected,
            SUM(CASE WHEN approval_status='pending' THEN 1 ELSE 0 END) AS approval_pending
         FROM complaints WHERE is_deleted=0"
    )->fetch();
    $out['admin'] = [
        'complaints'        => array_map('intval', $row),
        'users'             => (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role='citizen' AND is_deleted=0")->fetchColumn(),
        'staff'             => (int)$pdo->query("SELECT COUNT(*) FROM department_staff WHERE is_deleted=0")->fetchColumn(),
        'departments'       => (int)$pdo->query("SELECT COUNT(*) FROM departments")->fetchColumn(),
        'reports_pending'   => (int)$pdo->query("SELECT COUNT(*) FROM reports WHERE status='pending'")->fetchColumn(),
        'pending_verifications' => (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role='citizen' AND profile_verified='pending' AND is_deleted=0")->fetchColumn(),
    ];
}

sendSuccess($out);
