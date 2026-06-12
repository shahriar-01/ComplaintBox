<?php
/**
 * JSON response helpers.
 */

if (!function_exists('sendSuccess')) {
    function sendSuccess($data = [], string $message = 'Success', int $code = 200): void
    {
        if (!headers_sent()) {
            http_response_code($code);
            header('Content-Type: application/json; charset=utf-8');
        }
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data'    => $data,
        ]);
        exit;
    }
}

if (!function_exists('sendError')) {
    function sendError(string $message = 'Error', int $code = 400, array $extra = []): void
    {
        if (!headers_sent()) {
            http_response_code($code);
            header('Content-Type: application/json; charset=utf-8');
        }
        echo json_encode(array_merge([
            'success' => false,
            'message' => $message,
        ], $extra));
        exit;
    }
}

if (!function_exists('readJsonInput')) {
    /**
     * Reads JSON or POST body and returns assoc array.
     */
    function readJsonInput(): array
    {
        $raw = file_get_contents('php://input');
        if ($raw) {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) return $decoded;
        }
        return $_POST ?: [];
    }
}

if (!function_exists('requireMethod')) {
    function requireMethod(string $method): void
    {
        if (strtoupper($_SERVER['REQUEST_METHOD'] ?? '') !== strtoupper($method)) {
            sendError('Method not allowed', 405);
        }
    }
}

if (!function_exists('absUrl')) {
    function absUrl(?string $relativePath): ?string
    {
        if (!$relativePath) return null;
        if (preg_match('#^https?://#', $relativePath)) return $relativePath;
        return rtrim(BASE_URL, '/') . '/' . ltrim($relativePath, '/');
    }
}
