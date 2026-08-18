<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: public, max-age=3600');

$site = rtrim((string) ($CONFIG['site_url'] ?? 'https://fixoonova.ae'), '/');

$urls = [
  ['loc' => $site . '/', 'changefreq' => 'weekly', 'priority' => '1.0'],
  ['loc' => $site . '/about', 'changefreq' => 'monthly', 'priority' => '0.8'],
  ['loc' => $site . '/services', 'changefreq' => 'weekly', 'priority' => '0.9'],
  ['loc' => $site . '/maintenance-plan', 'changefreq' => 'weekly', 'priority' => '0.9'],
  ['loc' => $site . '/blog', 'changefreq' => 'weekly', 'priority' => '0.7'],
  ['loc' => $site . '/building-maintenance-dubai-south/', 'changefreq' => 'weekly', 'priority' => '0.9'],
  ['loc' => $site . '/contact', 'changefreq' => 'monthly', 'priority' => '0.7'],
];

try {
  $stmt = db()->query(
    "SELECT slug, COALESCE(published_at, updated_at, created_at) AS lastmod
     FROM blog_posts
     WHERE status = 'published'
     ORDER BY COALESCE(published_at, created_at) DESC"
  );
  foreach ($stmt->fetchAll() as $row) {
    $slug = trim((string) ($row['slug'] ?? ''));
    if ($slug === '') continue;
    $lastmod = substr((string) ($row['lastmod'] ?? ''), 0, 10);
    $urls[] = [
      'loc' => $site . '/blog/' . rawurlencode($slug),
      'changefreq' => 'monthly',
      'priority' => '0.6',
      'lastmod' => preg_match('/^\d{4}-\d{2}-\d{2}$/', $lastmod) ? $lastmod : null,
    ];
  }
} catch (Throwable $e) {
  // Static URLs still output if the database is unavailable.
}

function xml_escape(string $value): string
{
  return htmlspecialchars($value, ENT_XML1 | ENT_QUOTES, 'UTF-8');
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $url) {
  echo "  <url>\n";
  echo '    <loc>' . xml_escape($url['loc']) . "</loc>\n";
  if (!empty($url['lastmod'])) {
    echo '    <lastmod>' . xml_escape((string) $url['lastmod']) . "</lastmod>\n";
  }
  echo '    <changefreq>' . xml_escape($url['changefreq']) . "</changefreq>\n";
  echo '    <priority>' . xml_escape($url['priority']) . "</priority>\n";
  echo "  </url>\n";
}
echo "</urlset>\n";
exit;
