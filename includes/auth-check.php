<?php
/**
 * Session-based auth helpers.
 */

require_once __DIR__ . '/response.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!function_exists('isAuthenticated')) {
    function isAuthenticated(): bool
    {
        return !empty($_SESSION['user_id']) && !empty($_SESSION['role']);
    }
}

if (!function_exists('requireAuth')) {
    /**
     * @param array $allowedRoles e.g. ['citizen','admin','staff']
     */
    function requireAuth(array $allowedRoles = []): void
    {
        if (!isAuthenticated()) {
            sendError('Unauthorized', 401);
        }
        if (!empty($allowedRoles) && !in_array($_SESSION['role'], $allowedRoles, true)) {
            sendError('Forbidden', 403);
        }
    }
}

if (!function_exists('getCurrentUser')) {
    function getCurrentUser(): ?array
    {
        if (!isAuthenticated()) return null;
        return [
            'id'            => $_SESSION['user_id'],
            'role'          => $_SESSION['role'],
            'user_uid'      => $_SESSION['user_uid'] ?? null,
            'full_name'     => $_SESSION['full_name'] ?? null,
            'email'         => $_SESSION['email'] ?? null,
            'department_id' => $_SESSION['department_id'] ?? null,
        ];
    }
}
