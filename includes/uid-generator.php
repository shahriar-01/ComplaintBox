<?php
/**
 * UID generators.
 */

if (!function_exists('randomAlphaNumeric')) {
    function randomAlphaNumeric(int $len = 6): string
    {
        $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // omit confusing chars
        $out = '';
        for ($i = 0; $i < $len; $i++) {
            $out .= $chars[random_int(0, strlen($chars) - 1)];
        }
        return $out;
    }
}

if (!function_exists('generateUserUID')) {
    function generateUserUID(PDO $pdo): string
    {
        do {
            $uid = 'CB-USR-' . randomAlphaNumeric(6);
            $stmt = $pdo->prepare('SELECT 1 FROM users WHERE user_uid = ?');
            $stmt->execute([$uid]);
        } while ($stmt->fetchColumn());
        return $uid;
    }
}

if (!function_exists('generateStaffUID')) {
    function generateStaffUID(PDO $pdo): string
    {
        do {
            $uid = 'CB-STF-' . randomAlphaNumeric(6);
            $stmt = $pdo->prepare('SELECT 1 FROM department_staff WHERE staff_uid = ?');
            $stmt->execute([$uid]);
        } while ($stmt->fetchColumn());
        return $uid;
    }
}

if (!function_exists('generateComplaintID')) {
    function generateComplaintID(PDO $pdo): string
    {
        $year = date('Y');
        $stmt = $pdo->prepare(
            "SELECT complaint_id FROM complaints
             WHERE complaint_id LIKE ?
             ORDER BY complaint_id DESC LIMIT 1"
        );
        $stmt->execute(["CB-$year-%"]);
        $last = $stmt->fetchColumn();
        $nextNum = 1;
        if ($last && preg_match('/CB-\d{4}-(\d+)/', $last, $m)) {
            $nextNum = ((int)$m[1]) + 1;
        }
        return sprintf('CB-%s-%05d', $year, $nextNum);
    }
}
