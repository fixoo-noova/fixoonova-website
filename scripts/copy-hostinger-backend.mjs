import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === "config.php") continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

copyDir(path.join(root, "api"), path.join(dist, "api"));
copyDir(path.join(root, "uploads"), path.join(dist, "uploads"));
copyDir(path.join(root, "sql"), path.join(dist, "sql"));

console.log("Hostinger backend copied into dist/ (api, uploads, sql)");
console.log("Remember: upload api/config.php separately to the server");
