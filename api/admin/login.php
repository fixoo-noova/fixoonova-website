<?php
declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['error' => 'Method not allowed'], 405);
}

global $CONFIG;
$body = read_json_body();
$username = trim((string) ($body['username'] ?? ''));
$password = (string) ($body['password'] ?? '');

if ($username === '' || $password === '') {
  json_response(['error' => 'Username and password required'], 400);
}

if (
  !hash_equals((string) $CONFIG['admin_username'], $username) ||
  !password_verify($password, (string) $CONFIG['admin_password_hash'])
) {
  json_response(['error' => 'Invalid credentials'], 401);
}

$token = bin2hex(random_bytes(32));
$hash = hash('sha256', $token);
$hours = max(1, (int) ($CONFIG['token_ttl_hours'] ?? 24));

$stmt = db()->prepare(
  'INSERT INTO blog_admin_tokens (token_hash, expires_at) VALUES (?, DATE_ADD(NOW(), INTERVAL ? HOUR))'
);
$stmt->execute([$hash, $hours]);
db()->exec('DELETE FROM blog_admin_tokens WHERE expires_at < NOW()');

json_response([
  'token' => $token,
  'expiresInHours' => $hours,
]);
