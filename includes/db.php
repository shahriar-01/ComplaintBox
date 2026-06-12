<?php
/**
 * Database connection (PDO).
 * All other PHP files include this to obtain $pdo.
 */

$host    = '127.0.0.1';   // use IPv4 explicitly — on Windows XAMPP, 'localhost'
                          // sometimes resolves to ::1 (IPv6) and MySQL only
                          // listens on 127.0.0.1, causing WinError 10061.
$dbname  = 'complaintbox';
$db_user = 'root';
$db_pass = '';

if (!defined('BASE_URL')) {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host_h = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $script = $_SERVER['SCRIPT_NAME'] ?? '';
    $base   = '';
    if (preg_match('#^(/[^/]+)/(api|includes|css|js|uploads)#', $script, $m)) {
        $base = $m[1];
    } elseif (strpos($script, '/api/') !== false) {
        $base = substr($script, 0, strpos($script, '/api/'));
    }
    define('BASE_URL', $scheme . '://' . $host_h . $base . '/');
}

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $db_user, $db_pass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
