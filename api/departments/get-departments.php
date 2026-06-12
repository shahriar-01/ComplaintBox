<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';

$sql = "SELECT d.id, d.name, d.category_key, d.contact_email, d.contact_phone,
               d.description, d.icon,
               (SELECT COUNT(*) FROM complaints c WHERE c.assigned_department_id = d.id AND c.is_deleted = 0) AS total,
               (SELECT COUNT(*) FROM complaints c WHERE c.assigned_department_id = d.id AND c.is_deleted = 0 AND c.status='resolved') AS resolved,
               (SELECT COUNT(*) FROM complaints c WHERE c.assigned_department_id = d.id AND c.is_deleted = 0 AND c.status='in_progress') AS in_progress,
               (SELECT COUNT(*) FROM department_staff s WHERE s.department_id = d.id AND s.is_deleted = 0) AS staff_count
        FROM departments d
        ORDER BY d.id ASC";
$rows = $pdo->query($sql)->fetchAll();
foreach ($rows as &$r) {
    $r['total']       = (int)$r['total'];
    $r['resolved']    = (int)$r['resolved'];
    $r['in_progress'] = (int)$r['in_progress'];
    $r['staff_count'] = (int)$r['staff_count'];
    $r['resolution_rate'] = $r['total'] > 0 ? round($r['resolved'] / $r['total'] * 100, 1) : 0.0;
}
sendSuccess(['departments' => $rows, 'total' => count($rows)]);
