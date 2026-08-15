<?php
/**
 * Copy to config.php and fill values.
 * Never commit config.php.
 */

return [
  'db_host' => 'localhost',
  'db_name' => 'u434216461_FixooNova',
  'db_user' => 'u434216461_Fixoo',
  'db_pass' => 'YOUR_MYSQL_PASSWORD_HERE',

  'admin_username' => 'admin',
  // php api/generate-password-hash.php "YourPassword"
  'admin_password_hash' => 'REPLACE_WITH_PASSWORD_HASH',

  'site_url' => 'https://fixoonova.ae',
  'uploads_path' => __DIR__ . '/../uploads',
  'uploads_url' => 'https://fixoonova.ae/uploads',
  'token_ttl_hours' => 24,
];
