<?php
declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

require_admin();

$method = request_method();
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

try {
  if ($method === 'GET' && $id > 0) {
    $stmt = db()->prepare('SELECT * FROM blog_posts WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
      json_response(['error' => 'Post not found'], 404);
    }
    json_response(['post' => map_post($row, true)]);
  }

  if ($method === 'GET') {
    $stmt = db()->query('SELECT * FROM blog_posts ORDER BY updated_at DESC');
    $rows = $stmt->fetchAll();
    json_response([
      'posts' => array_map(static fn(array $row) => map_post($row, false), $rows),
    ]);
  }

  if ($method === 'POST') {
    $body = read_json_body();
    $title = trim((string) ($body['title'] ?? ''));
    $content = trim((string) ($body['content'] ?? ''));
    if ($title === '' || $content === '') {
      json_response(['error' => 'Title and content are required'], 400);
    }

    $excerpt = trim((string) ($body['excerpt'] ?? ''));
    if ($excerpt === '') {
      $excerpt = mb_substr(strip_tags($content), 0, 180);
    }

    $slugInput = trim((string) ($body['slug'] ?? ''));
    $slug = unique_slug(db(), $slugInput !== '' ? $slugInput : $title);
    $status = ($body['status'] ?? 'draft') === 'published' ? 'published' : 'draft';
    $cover = trim((string) ($body['coverImage'] ?? '')) ?: null;
    $metaTitle = trim((string) ($body['metaTitle'] ?? '')) ?: null;
    $metaDescription = trim((string) ($body['metaDescription'] ?? '')) ?: null;
    $publishedAt = $status === 'published' ? date('Y-m-d H:i:s') : null;

    $stmt = db()->prepare(
      'INSERT INTO blog_posts
        (title, slug, excerpt, content, cover_image, meta_title, meta_description, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
      $title,
      $slug,
      mb_substr($excerpt, 0, 320),
      $content,
      $cover,
      $metaTitle ? mb_substr($metaTitle, 0, 60) : null,
      $metaDescription ? mb_substr($metaDescription, 0, 160) : null,
      $status,
      $publishedAt,
    ]);

    $newId = (int) db()->lastInsertId();
    $stmt = db()->prepare('SELECT * FROM blog_posts WHERE id = ?');
    $stmt->execute([$newId]);
    json_response(['post' => map_post($stmt->fetch(), true)], 201);
  }

  if ($method === 'PUT' && $id > 0) {
    $stmt = db()->prepare('SELECT * FROM blog_posts WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $existing = $stmt->fetch();
    if (!$existing) {
      json_response(['error' => 'Post not found'], 404);
    }

    $body = read_json_body();
    $title = trim((string) ($body['title'] ?? $existing['title']));
    $content = trim((string) ($body['content'] ?? $existing['content']));
    if ($title === '' || $content === '') {
      json_response(['error' => 'Title and content are required'], 400);
    }

    $excerpt = trim((string) ($body['excerpt'] ?? $existing['excerpt']));
    if ($excerpt === '') {
      $excerpt = mb_substr(strip_tags($content), 0, 180);
    }

    $slugInput = trim((string) ($body['slug'] ?? $existing['slug']));
    $slug = unique_slug(db(), $slugInput !== '' ? $slugInput : $title, $id);
    $status = ($body['status'] ?? $existing['status']) === 'published' ? 'published' : 'draft';
    $cover = array_key_exists('coverImage', $body)
      ? (trim((string) $body['coverImage']) ?: null)
      : $existing['cover_image'];
    $metaTitle = array_key_exists('metaTitle', $body)
      ? (trim((string) $body['metaTitle']) ?: null)
      : $existing['meta_title'];
    $metaDescription = array_key_exists('metaDescription', $body)
      ? (trim((string) $body['metaDescription']) ?: null)
      : $existing['meta_description'];

    $publishedAt = $existing['published_at'];
    if ($status === 'published' && !$publishedAt) {
      $publishedAt = date('Y-m-d H:i:s');
    }
    if ($status === 'draft') {
      $publishedAt = null;
    }

    $stmt = db()->prepare(
      'UPDATE blog_posts SET
        title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?,
        meta_title = ?, meta_description = ?, status = ?, published_at = ?
       WHERE id = ?'
    );
    $stmt->execute([
      $title,
      $slug,
      mb_substr($excerpt, 0, 320),
      $content,
      $cover,
      $metaTitle ? mb_substr($metaTitle, 0, 60) : null,
      $metaDescription ? mb_substr($metaDescription, 0, 160) : null,
      $status,
      $publishedAt,
      $id,
    ]);

    $stmt = db()->prepare('SELECT * FROM blog_posts WHERE id = ?');
    $stmt->execute([$id]);
    json_response(['post' => map_post($stmt->fetch(), true)]);
  }

  if ($method === 'DELETE' && $id > 0) {
    $stmt = db()->prepare('DELETE FROM blog_posts WHERE id = ?');
    $stmt->execute([$id]);
    json_response(['ok' => true]);
  }

  json_response(['error' => 'Method not allowed'], 405);
} catch (Throwable $e) {
  json_response(['error' => 'Server error', 'detail' => $e->getMessage()], 500);
}
