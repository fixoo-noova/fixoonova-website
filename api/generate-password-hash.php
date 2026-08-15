<?php
$password = $argv[1] ?? '';
if ($password === '') {
  fwrite(STDERR, "Usage: php api/generate-password-hash.php \"YourPassword\"\n");
  exit(1);
}
echo password_hash($password, PASSWORD_DEFAULT) . PHP_EOL;
