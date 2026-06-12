<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

requireAuth(['citizen']);
$me = (int)$_SESSION['user_id'];
$page = max(1, (int)($_GET['page'] ?? 1));
$per  = min(100, max(1, (int)($_GET['per_page'] ?? 50)));
$offset = ($page - 1) * $per;

$total = (int)$pdo->query(
    "SELECT COUNT(*) FROM comments c
     JOIN complaints cp ON cp.id = c.complaint_id
     WHERE c.user_id = $me AND c.is_deleted = 0 AND cp.is_deleted = 0"
)->fetchColumn();

$sql = "SELECT c.id, c.comment_text, c.is_edited, c.created_at, c.updated_at,
               cp.id AS cmp_server_id, cp.complaint_id, cp.subject, cp.status,
               cp.priority, cp.approval_status, cp.upvote_count, cp.comment_count,
               cp.map_lat, cp.map_lng,
               d.name AS district_name, a.ashon_code, ar.name AS area_name,
               (SELECT cm.file_path FROM complaint_media cm
                WHERE cm.complaint_id = cp.id AND cm.is_proof = 0
                ORDER BY cm.id ASC LIMIT 1) AS first_image,
               (SELECT GROUP_CONCAT(cc.category) FROM complaint_categories cc
                WHERE cc.complaint_id = cp.id) AS categories
        FROM comments c
        JOIN complaints cp ON cp.id = c.complaint_id
        JOIN districts d ON cp.district_id = d.id
        JOIN ashon_numbers a ON cp.ashon_id = a.id
        LEFT JOIN areas ar ON cp.area_id = ar.id
        WHERE c.user_id = ? AND c.is_deleted = 0 AND cp.is_deleted = 0
        ORDER BY c.created_at DESC
        LIMIT $per OFFSET $offset";
$stmt = $pdo->prepare($sql);
$stmt->execute([$me]);
$rows = $stmt->fetchAll();

$out = [];
foreach ($rows as $r) {
    $out[] = [
        'id'                => (int)$r['id'],
        'comment_text'      => $r['comment_text'],
        'is_edited'         => (int)$r['is_edited'],
        'created_at'        => $r['created_at'],
        'updated_at'        => $r['updated_at'],
        'complaint_server_id' => (int)$r['cmp_server_id'],
        'complaint_id'      => $r['complaint_id'],
        'subject'           => $r['subject'],
        'status'            => $r['status'],
        'priority'          => $r['priority'],
        'approval_status'   => $r['approval_status'],
        'upvote_count'      => (int)$r['upvote_count'],
        'comment_count'     => (int)$r['comment_count'],
        'map_lat'           => $r['map_lat'] !== null ? (float)$r['map_lat'] : null,
        'map_lng'           => $r['map_lng'] !== null ? (float)$r['map_lng'] : null,
        'district_name'     => $r['district_name'],
        'ashon_code'        => $r['ashon_code'],
        'area_name'         => $r['area_name'],
        'first_image_url'   => absUrl($r['first_image']),
        'categories'        => $r['categories'] ? explode(',', $r['categories']) : [],
    ];
}

sendSuccess([
    'comments' => $out,
    'total'    => $total,
    'page'     => $page,
    'per_page' => $per,
]);
