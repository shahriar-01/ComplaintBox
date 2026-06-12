<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';
require_once __DIR__ . '/../../includes/upload.php';

requireMethod('POST');
requireAuth(['citizen']);
$me = (int)$_SESSION['user_id'];
$in = !empty($_POST) ? $_POST : readJsonInput();

$id = (int)($in['id'] ?? $in['complaint_id'] ?? 0);
if (!$id) sendError('id required', 422);

$stmt = $pdo->prepare("SELECT submitted_by_user_id, status, approval_status FROM complaints WHERE id = ? AND is_deleted = 0");
$stmt->execute([$id]);
$row = $stmt->fetch();
if (!$row) sendError('Not found', 404);
if ((int)$row['submitted_by_user_id'] !== $me) sendError('Forbidden', 403);
if (!in_array($row['status'], ['submitted','pending'], true)) {
    sendError('Cannot edit once complaint has been processed.', 409);
}

try {
    $pdo->beginTransaction();

    // Scalar fields
    $fields = [];
    $params = [];
    foreach (['subject','description','priority','map_address'] as $f) {
        if (isset($in[$f])) { $fields[] = "$f = ?"; $params[] = $in[$f]; }
    }
    foreach (['district_id','ashon_id','area_id'] as $f) {
        if (isset($in[$f]) && $in[$f] !== '') { $fields[] = "$f = ?"; $params[] = (int)$in[$f]; }
    }
    if (isset($in['map_lat']) && $in['map_lat'] !== '') { $fields[] = "map_lat = ?"; $params[] = (float)$in['map_lat']; }
    if (isset($in['map_lng']) && $in['map_lng'] !== '') { $fields[] = "map_lng = ?"; $params[] = (float)$in['map_lng']; }

    if (!empty($fields)) {
        $params[] = $id;
        $pdo->prepare("UPDATE complaints SET " . implode(',', $fields) . " WHERE id = ?")->execute($params);
    }

    // Categories — replace if provided
    if (isset($in['category']) || isset($in['categories'])) {
        $cats = $in['category'] ?? $in['categories'];
        if (is_string($cats)) {
            $tmp = json_decode($cats, true);
            $cats = is_array($tmp) ? $tmp : array_map('trim', explode(',', $cats));
        }
        if (is_array($cats) && !empty($cats)) {
            $pdo->prepare("DELETE FROM complaint_categories WHERE complaint_id = ?")->execute([$id]);
            $catStmt = $pdo->prepare("INSERT INTO complaint_categories (complaint_id, category) VALUES (?, ?)");
            foreach ($cats as $c) {
                $c = trim((string)$c);
                if ($c !== '') $catStmt->execute([$id, $c]);
            }
        }
    }

    // Remove specific media by id (sent as remove_media[])
    if (!empty($in['remove_media']) && is_array($in['remove_media'])) {
        $ids = array_map('intval', $in['remove_media']);
        $ph  = implode(',', array_fill(0, count($ids), '?'));
        $del = $pdo->prepare("DELETE FROM complaint_media WHERE complaint_id = ? AND id IN ($ph)");
        $del->execute(array_merge([$id], $ids));
    } elseif (isset($in['remove_media'])) {
        // Single value (string) form
        $rid = (int)$in['remove_media'];
        if ($rid) {
            $del = $pdo->prepare("DELETE FROM complaint_media WHERE complaint_id = ? AND id = ?");
            $del->execute([$id, $rid]);
        }
    }

    // Add new media (input name `media[]`)
    if (!empty($_FILES['media'])) {
        $files = handleMultipleFileUploads('media', 'uploads/complaints/', ['image','video']);
        $m = $pdo->prepare(
            "INSERT INTO complaint_media (complaint_id, file_path, file_type, uploaded_by, is_proof)
             VALUES (?, ?, ?, 'citizen', 0)"
        );
        foreach ($files as $f) $m->execute([$id, $f['path'], $f['type']]);
    }

    $pdo->prepare(
        "INSERT INTO activity_log (actor_type, actor_id, action, related_complaint_id)
         VALUES ('citizen', ?, ?, ?)"
    )->execute([$me, "Edited complaint $id", $id]);

    $pdo->commit();
} catch (Exception $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    sendError('Failed to update: ' . $e->getMessage(), 500);
}

sendSuccess([], 'Complaint updated.');
