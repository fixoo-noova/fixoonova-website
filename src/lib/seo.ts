export const SITE_URL = "https://fixoonova.ae";

export const SITE_NAME = "Fixoo Nova";

export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1780903670/hero-banner-1_xdunup.jpg";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
};

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Building Maintenance Company in Dubai | Fixoo Nova",
    description:
      "Fixoo Nova is a trusted building maintenance company in Dubai offering 24/7 property maintenance, AC services, plumbing, electrical, handyman and AMC — with dedicated support in Dubai South.",
    path: "/",
  },
  "/about": {
    title: "About Fixoo Nova — Trusted Property Maintenance in the UAE",
    description:
      "Learn about Fixoo Nova — licensed, insured building maintenance experts serving homes, villas and businesses across Dubai and the UAE.",
    path: "/about",
  },
  "/services": {
    title: "Our Services — AC, Plumbing, Electrical & More | Fixoo Nova",
    description:
      "Explore Fixoo Nova services: AC & HVAC, plumbing, electrical & ELV, renovation, deep cleaning, pest control and specialized property care across the UAE.",
    path: "/services",
  },
  "/maintenance-plan": {
    title: "Yearly Maintenance Plan — AC, Plumbing & Electrical AMC | Fixoo Nova",
    description:
      "One annual contract for AC, plumbing, electrical and general property upkeep. Flexible maintenance plans for apartments, villas and offices across the UAE.",
    path: "/maintenance-plan",
  },
  "/contact": {
    title: "Contact Fixoo Nova — Book Property Maintenance in the UAE",
    description:
      "Get in touch with Fixoo Nova for hassle-free booking. Call, email or WhatsApp our team for AC, plumbing, electrical and full property maintenance.",
    path: "/contact",
  },
};

export function getPageSeo(pathname: string): PageSeo {
  const known = PAGE_SEO[pathname];
  if (known) return known;

  return {
    title: "Page Not Found | Fixoo Nova",
    description: "The page you are looking for does not exist or has been moved.",
    path: pathname,
    noindex: true,
  };
}

export function absoluteUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}
