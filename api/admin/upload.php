<?php
declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['error' => 'Method not allowed'], 405);
}

global $CONFIG;

if (!isset($_FILES['file']) || !is_array($_FILES['file'])) {
  json_response(['error' => 'No file uploaded'], 400);
}

$file = $_FILES['file'];
if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
  json_response(['error' => 'Upload failed'], 400);
}

$maxBytes = 5 * 1024 * 1024;
if (($file['size'] ?? 0) > $maxBytes) {
  json_response(['error' => 'File too large (max 5MB)'], 400);
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']) ?: '';
$allowed = [
  'image/jpeg' => 'jpg',
  'image/png' => 'png',
  'image/webp' => 'webp',
  'image/gif' => 'gif',
];

if (!isset($allowed[$mime])) {
  json_response(['error' => 'Only JPG, PNG, WEBP or GIF allowed'], 400);
}

$uploadsPath = (string) $CONFIG['uploads_path'];
if (!is_dir($uploadsPath) && !mkdir($uploadsPath, 0755, true) && !is_dir($uploadsPath)) {
  json_response(['error' => 'Uploads directory missing on server'], 500);
}

$filename = 'blog-' . date('YmdHis') . '-' . bin2hex(random_bytes(4)) . '.' . $allowed[$mime];
$destination = rtrim($uploadsPath, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
  json_response(['error' => 'Could not save uploaded file'], 500);
}

$url = rtrim((string) $CONFIG['uploads_url'], '/') . '/' . $filename;

json_response([
  'url' => $url,
  'path' => $filename,
]);
