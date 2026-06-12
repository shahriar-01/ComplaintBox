<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireAuth(['admin','staff']);

$where  = ['s.is_deleted = 0'];
$params = [];
if (!empty($_GET['department_id'])) { $where[] = 's.department_id = ?'; $params[] = (int)$_GET['department_id']; }
if (!empty($_GET['search'])) {
    $where[] = '(s.full_name LIKE ? OR s.email LIKE ? OR s.staff_uid LIKE ?)';
    $like = "%{$_GET['search']}%";
    array_push($params, $like, $like, $like);
}
$whereSql = implode(' AND ', $where);

$sql = "SELECT s.id, s.staff_uid, s.id_card_number, s.full_name, s.email, s.phone, s.nid_number,
               s.designation, s.profile_picture, s.work_status, s.joined_date,
               s.department_id, d.name AS department_name,
               s.district_id, dt.name AS district_name,
               s.ashon_id, ash.ashon_code,
               (SELECT COUNT(DISTINCT ca.complaint_id)
                  FROM complaint_assignments ca
                  WHERE ca.staff_id = s.id) AS complaints_handled,
               (SELECT COUNT(DISTINCT ca.complaint_id)
                  FROM complaint_assignments ca
                  JOIN complaints c ON c.id = ca.complaint_id
                  WHERE ca.staff_id = s.id AND c.status = 'resolved') AS complaints_resolved
        FROM department_staff s
        LEFT JOIN departments d ON d.id = s.department_id
        LEFT JOIN districts dt ON dt.id = s.district_id
        LEFT JOIN ashon_numbers ash ON ash.id = s.ashon_id
        WHERE $whereSql
        ORDER BY s.full_name ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();
foreach ($rows as &$r) $r['profile_picture'] = absUrl($r['profile_picture']);
sendSuccess(['staff' => $rows, 'total' => count($rows)]);
