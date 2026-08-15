import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { absoluteUrl, DEFAULT_OG_IMAGE, PAGE_SEO, SITE_NAME, type PageSeo } from "./src/lib/seo";

const ROUTES_TO_PRERENDER = ["/about", "/services", "/maintenance-plan", "/contact", "/blog"] as const;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceAttr(html: string, attr: "name" | "property", key: string, content: string) {
  const pattern = new RegExp(
    `(<meta\\s+${attr}="${key}"\\s+content=")([\\s\\S]*?)("\\s*/>)`,
    "i",
  );
  if (pattern.test(html)) {
    return html.replace(pattern, `$1${escapeHtml(content)}$3`);
  }
  return html;
}

function applyPageSeo(html: string, page: PageSeo) {
  const url = absoluteUrl(page.path);
  const image = page.ogImage ?? DEFAULT_OG_IMAGE;
  const robots = page.noindex ? "noindex, nofollow" : "index, follow";

  let next = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  next = replaceAttr(next, "name", "description", page.description);
  next = replaceAttr(next, "name", "robots", robots);
  next = next.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
  );
  next = replaceAttr(next, "property", "og:url", url);
  next = replaceAttr(next, "property", "og:title", page.title);
  next = replaceAttr(next, "property", "og:description", page.description);
  next = replaceAttr(next, "property", "og:image", image);
  next = replaceAttr(next, "property", "og:site_name", SITE_NAME);
  next = replaceAttr(next, "name", "twitter:title", page.title);
  next = replaceAttr(next, "name", "twitter:description", page.description);
  next = replaceAttr(next, "name", "twitter:image", image);

  if (page.crawlerHtml) {
    next = next.replace(
      /<!--SSR_START-->[\s\S]*?<!--SSR_END-->/,
      `<!--SSR_START-->\n      <div class="seo-crawler" aria-hidden="true">\n${page.crawlerHtml.trim()}\n      </div>\n      <!--SSR_END-->`,
    );
  }

  return next;
}

function copyDir(src: string, dest: string, skipNames: Set<string> = new Set()) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (skipNames.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to, skipNames);
    else fs.copyFileSync(from, to);
  }
}

function copyHostingerBackend(distDir: string) {
  const root = process.cwd();
  copyDir(path.join(root, "api"), path.join(distDir, "api"), new Set(["config.php"]));
  copyDir(path.join(root, "uploads"), path.join(distDir, "uploads"));
  copyDir(path.join(root, "sql"), path.join(distDir, "sql"));

  // Ensure uploads exists even if empty
  fs.mkdirSync(path.join(distDir, "uploads"), { recursive: true });
  const keep = path.join(distDir, "uploads", ".gitkeep");
  if (!fs.existsSync(keep)) fs.writeFileSync(keep, "");
}

export function prerenderRouteHtml(): Plugin {
  return {
    name: "prerender-route-html",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");
      const sourcePath = path.join(distDir, "index.html");
      if (!fs.existsSync(sourcePath)) return;

      const source = fs.readFileSync(sourcePath, "utf8");

      for (const route of ROUTES_TO_PRERENDER) {
        const page = PAGE_SEO[route];
        if (!page) continue;

        const html = applyPageSeo(source, page);
        const outDir = path.join(distDir, route.replace(/^\//, ""));
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, "index.html"), html);
      }

      // Hostinger deploys only `dist` — include PHP API + uploads every build
      copyHostingerBackend(distDir);
      console.log("Hostinger: copied api/, uploads/, sql/ into dist/");
    },
  };
}
