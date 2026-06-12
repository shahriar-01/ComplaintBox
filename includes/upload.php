<?php
/**
 * File-upload helpers.
 */

const UPLOAD_MAX_IMAGE = 10 * 1024 * 1024;  // 10 MB
const UPLOAD_MAX_VIDEO = 50 * 1024 * 1024;  // 50 MB

const ALLOWED_IMAGE_MIME = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_MIME = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];

if (!function_exists('detectMime')) {
    function detectMime(string $path): string
    {
        if (function_exists('mime_content_type')) {
            $m = @mime_content_type($path);
            if ($m) return $m;
        }
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        $map = [
            'jpg'=>'image/jpeg','jpeg'=>'image/jpeg','png'=>'image/png','gif'=>'image/gif','webp'=>'image/webp',
            'mp4'=>'video/mp4','webm'=>'video/webm','ogg'=>'video/ogg','mov'=>'video/quicktime'
        ];
        return $map[$ext] ?? 'application/octet-stream';
    }
}

if (!function_exists('ensureDir')) {
    function ensureDir(string $dir): void
    {
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }
    }
}

if (!function_exists('handleFileUpload')) {
    /**
     * Saves a single uploaded file.
     * @param string $fileKey      $_FILES key
     * @param string $uploadDir    relative dir (e.g. 'uploads/complaints/')
     * @param array  $allowedTypes ['image','video'] OR specific MIME list
     * @return array|false ['path'=>relative_path,'type'=>'image'|'video','mime'=>...] OR false
     */
    function handleFileUpload(string $fileKey, string $uploadDir, array $allowedTypes = ['image','video'])
    {
        if (empty($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) {
            return false;
        }
        $tmp  = $_FILES[$fileKey]['tmp_name'];
        $orig = $_FILES[$fileKey]['name'];
        $size = (int)$_FILES[$fileKey]['size'];

        $mime = detectMime($tmp);
        $isImg = in_array($mime, ALLOWED_IMAGE_MIME, true);
        $isVid = in_array($mime, ALLOWED_VIDEO_MIME, true);

        if (!$isImg && !$isVid) return false;
        if ($isImg && !in_array('image', $allowedTypes, true)) return false;
        if ($isVid && !in_array('video', $allowedTypes, true)) return false;
        if ($isImg && $size > UPLOAD_MAX_IMAGE) return false;
        if ($isVid && $size > UPLOAD_MAX_VIDEO) return false;

        $uploadDir = rtrim($uploadDir, '/') . '/';
        $absDir    = __DIR__ . '/../' . $uploadDir;
        ensureDir($absDir);

        $ext  = strtolower(pathinfo($orig, PATHINFO_EXTENSION));
        if (!$ext) $ext = $isImg ? 'jpg' : 'mp4';
        $name = uniqid('f_', true) . '.' . preg_replace('/[^a-z0-9]/', '', $ext);
        $dest = $absDir . $name;

        if (!move_uploaded_file($tmp, $dest)) return false;

        return [
            'path' => $uploadDir . $name,
            'type' => $isImg ? 'image' : 'video',
            'mime' => $mime,
        ];
    }
}

if (!function_exists('handleMultipleFileUploads')) {
    /**
     * Saves multiple uploaded files (file input with [] / multiple).
     * @return array list of ['path','type','mime']
     */
    function handleMultipleFileUploads(string $fileKey, string $uploadDir, array $allowedTypes = ['image','video']): array
    {
        $results = [];
        if (empty($_FILES[$fileKey]) || !is_array($_FILES[$fileKey]['tmp_name'])) {
            // try single fallback
            $single = handleFileUpload($fileKey, $uploadDir, $allowedTypes);
            if ($single) $results[] = $single;
            return $results;
        }

        $count = count($_FILES[$fileKey]['tmp_name']);
        for ($i = 0; $i < $count; $i++) {
            if ($_FILES[$fileKey]['error'][$i] !== UPLOAD_ERR_OK) continue;

            // Reuse single helper with a synthetic $_FILES entry
            $bak = $_FILES[$fileKey] ?? null;
            $_FILES[$fileKey] = [
                'name'     => $_FILES[$fileKey]['name'][$i],
                'type'     => $_FILES[$fileKey]['type'][$i],
                'tmp_name' => $_FILES[$fileKey]['tmp_name'][$i],
                'error'    => $_FILES[$fileKey]['error'][$i],
                'size'     => $_FILES[$fileKey]['size'][$i],
            ];
            $r = handleFileUpload($fileKey, $uploadDir, $allowedTypes);
            $_FILES[$fileKey] = $bak;
            if ($r) $results[] = $r;
        }
        return $results;
    }
}
