<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$configPath = __DIR__ . '/config.php';
$CONFIG = null;

if (is_file($configPath)) {
  /** @var array $CONFIG */
  $CONFIG = require $configPath;
} else {
  // Fallback for Hostinger Git deploys (set these in hPanel → Environment variables)
  $dbName = getenv('BLOG_DB_NAME') ?: '';
  $dbUser = getenv('BLOG_DB_USER') ?: '';
  $dbPass = getenv('BLOG_DB_PASS') ?: '';
  $adminUser = getenv('BLOG_ADMIN_USER') ?: 'admin';
  $adminHash = getenv('BLOG_ADMIN_PASSWORD_HASH') ?: '';

  if ($dbName !== '' && $dbUser !== '' && $dbPass !== '' && $adminHash !== '') {
    $CONFIG = [
      'db_host' => getenv('BLOG_DB_HOST') ?: 'localhost',
      'db_name' => $dbName,
      'db_user' => $dbUser,
      'db_pass' => $dbPass,
      'admin_username' => $adminUser,
      'admin_password_hash' => $adminHash,
      'site_url' => rtrim(getenv('BLOG_SITE_URL') ?: 'https://fixoonova.ae', '/'),
      'uploads_path' => getenv('BLOG_UPLOADS_PATH') ?: (__DIR__ . '/../uploads'),
      'uploads_url' => rtrim(getenv('BLOG_UPLOADS_URL') ?: 'https://fixoonova.ae/uploads', '/'),
      'token_ttl_hours' => (int) (getenv('BLOG_TOKEN_TTL_HOURS') ?: 24),
    ];
  }
}

if (!is_array($CONFIG)) {
  http_response_code(500);
  echo json_encode([
    'error' => 'API not configured. Add api/config.php on the server, or set BLOG_DB_* environment variables in Hostinger.',
  ]);
  exit;
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = rtrim((string) $CONFIG['site_url'], '/');
if ($origin !== '' && (str_starts_with($origin, 'http://localhost') || $origin === $allowed)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Headers: Content-Type, Authorization, X-HTTP-Method-Override');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

function json_response(mixed $data, int $status = 200): void
{
  http_response_code($status);
  echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  exit;
}

function request_method(): string
{
  $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
  if ($method === 'POST') {
    $override = strtoupper((string) ($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] ?? ''));
    if (in_array($override, ['PUT', 'PATCH', 'DELETE'], true)) {
      return $override;
    }
  }
  return $method;
}

function read_json_body(): array
{
  $raw = file_get_contents('php://input');
  if ($raw === false || trim($raw) === '') {
    return [];
  }
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

function db(): PDO
{
  global $CONFIG;
  static $pdo = null;
  if ($pdo instanceof PDO) {
    return $pdo;
  }

  $dsn = sprintf(
    'mysql:host=%s;dbname=%s;charset=utf8mb4',
    $CONFIG['db_host'],
    $CONFIG['db_name']
  );

  $pdo = new PDO($dsn, $CONFIG['db_user'], $CONFIG['db_pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);

  return $pdo;
}

function slugify(string $text): string
{
  $text = strtolower(trim($text));
  $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
  $text = trim($text, '-');
  return $text !== '' ? $text : 'post-' . time();
}

function unique_slug(PDO $pdo, string $base, ?int $excludeId = null): string
{
  $slug = slugify($base);
  $candidate = $slug;
  $i = 2;

  while (true) {
    $sql = 'SELECT id FROM blog_posts WHERE slug = ?';
    $params = [$candidate];
    if ($excludeId !== null) {
      $sql .= ' AND id <> ?';
      $params[] = $excludeId;
    }
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    if (!$stmt->fetch()) {
      return $candidate;
    }
    $candidate = $slug . '-' . $i;
    $i++;
  }
}

function bearer_token(): ?string
{
  $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
  if (preg_match('/Bearer\s+(\S+)/i', $header, $m)) {
    return $m[1];
  }
  return null;
}

function require_admin(): void
{
  $token = bearer_token();
  if (!$token) {
    json_response(['error' => 'Unauthorized'], 401);
  }

  $hash = hash('sha256', $token);
  $stmt = db()->prepare(
    'SELECT id FROM blog_admin_tokens WHERE token_hash = ? AND expires_at > NOW() LIMIT 1'
  );
  $stmt->execute([$hash]);
  if (!$stmt->fetch()) {
    json_response(['error' => 'Unauthorized'], 401);
  }
}

function map_post(array $row, bool $includeContent = true): array
{
  global $CONFIG;
  $cover = $row['cover_image'] ?? null;
  if ($cover && !preg_match('#^https?://#i', $cover)) {
    $cover = rtrim($CONFIG['uploads_url'], '/') . '/' . ltrim($cover, '/');
  }

  $post = [
    'id' => (int) $row['id'],
    'title' => $row['title'],
    'slug' => $row['slug'],
    'excerpt' => $row['excerpt'],
    'coverImage' => $cover,
    'metaTitle' => $row['meta_title'],
    'metaDescription' => $row['meta_description'],
    'status' => $row['status'],
    'publishedAt' => $row['published_at'],
    'createdAt' => $row['created_at'],
    'updatedAt' => $row['updated_at'],
  ];

  if ($includeContent) {
    $post['content'] = $row['content'];
  }

  return $post;
}
