import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, DEFAULT_OG_IMAGE, getPageSeo, SITE_NAME } from "@/lib/seo";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getPageSeo(pathname);
    const url = absoluteUrl(seo.path.startsWith("/") ? seo.path : pathname);
    const image = seo.ogImage ?? DEFAULT_OG_IMAGE;
    const robots = seo.noindex ? "noindex, nofollow" : "index, follow";

    document.title = seo.title;

    setMeta("description", seo.description);
    setMeta("robots", robots);

    setMeta("og:title", seo.title, "property");
    setMeta("og:description", seo.description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:image", image, "property");
    setMeta("og:locale", "en_AE", "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", seo.title);
    setMeta("twitter:description", seo.description);
    setMeta("twitter:image", image);

    setLink("canonical", url);
  }, [pathname]);

  return null;
}
