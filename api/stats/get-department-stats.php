<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';

$rows = $pdo->query(
    "SELECT dep.id, dep.name, dep.category_key, dep.icon,
            COUNT(c.id) AS total,
            SUM(CASE WHEN c.status='resolved' THEN 1 ELSE 0 END) AS resolved,
            SUM(CASE WHEN c.status='in_progress' THEN 1 ELSE 0 END) AS in_progress,
            SUM(CASE WHEN c.status IN ('submitted','pending','assigned','in_review') THEN 1 ELSE 0 END) AS pending
     FROM departments dep
     LEFT JOIN complaints c ON dep.id = c.assigned_department_id AND c.is_deleted = 0
     GROUP BY dep.id, dep.name, dep.category_key, dep.icon
     ORDER BY total DESC"
)->fetchAll();
foreach ($rows as &$r) {
    $r['total']       = (int)$r['total'];
    $r['resolved']    = (int)$r['resolved'];
    $r['in_progress'] = (int)$r['in_progress'];
    $r['pending']     = (int)$r['pending'];
    $r['resolution_rate'] = $r['total'] > 0 ? round($r['resolved'] / $r['total'] * 100, 1) : 0.0;
}
sendSuccess(['departments' => $rows]);
