<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'];
$slug = isset($_GET['slug']) ? trim((string) $_GET['slug']) : '';

try {
  if ($method === 'GET' && $slug !== '') {
    $stmt = db()->prepare(
      "SELECT * FROM blog_posts WHERE slug = ? AND status = 'published' LIMIT 1"
    );
    $stmt->execute([$slug]);
    $row = $stmt->fetch();
    if (!$row) {
      json_response(['error' => 'Post not found'], 404);
    }
    json_response(['post' => map_post($row, true)]);
  }

  if ($method === 'GET') {
    $page = max(1, (int) ($_GET['page'] ?? 1));
    $limit = min(50, max(1, (int) ($_GET['limit'] ?? 12)));
    $offset = ($page - 1) * $limit;

    $countStmt = db()->query("SELECT COUNT(*) AS total FROM blog_posts WHERE status = 'published'");
    $total = (int) ($countStmt->fetch()['total'] ?? 0);

    $stmt = db()->prepare(
      "SELECT * FROM blog_posts
       WHERE status = 'published'
       ORDER BY COALESCE(published_at, created_at) DESC
       LIMIT {$limit} OFFSET {$offset}"
    );
    $stmt->execute();
    $rows = $stmt->fetchAll();

    json_response([
      'posts' => array_map(static fn(array $row) => map_post($row, false), $rows),
      'pagination' => [
        'page' => $page,
        'limit' => $limit,
        'total' => $total,
        'totalPages' => (int) ceil($total / max(1, $limit)),
      ],
    ]);
  }

  json_response(['error' => 'Method not allowed'], 405);
} catch (Throwable $e) {
  json_response(['error' => 'Server error', 'detail' => $e->getMessage()], 500);
}
