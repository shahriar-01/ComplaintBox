<?php
require_once __DIR__ . '/../../includes/response.php';
require_once __DIR__ . '/../../includes/auth-check.php';

$user = getCurrentUser();
if (!$user) {
    sendSuccess(null, 'Not authenticated.');
}
sendSuccess($user, 'Authenticated.');
