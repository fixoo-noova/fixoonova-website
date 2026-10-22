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

function seedUploadsPlaceholder() {
  const uploadsDir = path.join(dist, "uploads");
  fs.mkdirSync(uploadsDir, { recursive: true });
  const htaccessSrc = path.join(root, "uploads", ".htaccess");
  if (fs.existsSync(htaccessSrc)) {
    fs.copyFileSync(htaccessSrc, path.join(uploadsDir, ".htaccess"));
  }
  fs.writeFileSync(path.join(uploadsDir, ".gitkeep"), "");
  fs.writeFileSync(
    path.join(uploadsDir, "DO_NOT_OVERWRITE.txt"),
    [
      "This folder only exists so the path is present after a fresh install.",
      "On Hostinger, NEVER replace public_html/uploads when deploying a new build.",
      "Upload/extract dist without overwriting the existing uploads folder,",
      "or skip this folder entirely so live blog images stay intact.",
      "",
    ].join("\n"),
  );
}

copyDir(path.join(root, "api"), path.join(dist, "api"));
copyDir(path.join(root, "sql"), path.join(dist, "sql"));
seedUploadsPlaceholder();

console.log("Hostinger backend copied into dist/ (api, sql)");
console.log("uploads/ is a placeholder only — do NOT overwrite public_html/uploads on deploy");
console.log("Remember: upload api/config.php separately to the server");
