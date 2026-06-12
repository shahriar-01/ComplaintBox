<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

$cid     = (int)($_GET['complaint_id'] ?? 0);
$page    = max(1, (int)($_GET['page'] ?? 1));
$perPage = min(50, max(1, (int)($_GET['per_page'] ?? 10)));
if (!$cid) sendError('complaint_id required', 422);

$total = (int)$pdo->query("SELECT COUNT(*) FROM comments WHERE complaint_id = $cid AND is_deleted = 0")->fetchColumn();
$offset = ($page - 1) * $perPage;

$sql = "SELECT c.id, c.comment_text, c.is_edited, c.created_at, c.updated_at,
               u.id AS user_id, u.user_uid, u.full_name, u.profile_picture
        FROM comments c
        JOIN users u ON u.id = c.user_id
        WHERE c.complaint_id = ? AND c.is_deleted = 0
        ORDER BY c.created_at DESC
        LIMIT $perPage OFFSET $offset";
$stmt = $pdo->prepare($sql);
$stmt->execute([$cid]);
$rows = $stmt->fetchAll();

$me = (int)($_SESSION['user_id'] ?? 0);
$out = [];
foreach ($rows as $r) {
    $out[] = [
        'id'             => (int)$r['id'],
        'comment_text'   => $r['comment_text'],
        'is_edited'      => (int)$r['is_edited'],
        'created_at'     => $r['created_at'],
        'updated_at'     => $r['updated_at'],
        'user_id'        => (int)$r['user_id'],
        'user_uid'       => $r['user_uid'],
        'full_name'      => $r['full_name'],
        'profile_picture'=> absUrl($r['profile_picture']),
        'is_own'         => $me === (int)$r['user_id'],
    ];
}

sendSuccess([
    'comments' => $out,
    'total'    => $total,
    'page'     => $page,
    'per_page' => $perPage,
    'pages'    => (int)ceil($total / $perPage),
]);
