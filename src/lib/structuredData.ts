import { SITE_URL } from "@/lib/seo";

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Fixoo Nova",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.png`,
  telephone: "+971508001238",
  email: "info@fixoonova.ae",
  sameAs: [
    "https://www.instagram.com/fixoonova/",
    "https://www.facebook.com/profile.php?id=61591712577093",
  ],
};

export const localBusinessSchema = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Fixoo Nova",
  url: `${SITE_URL}/`,
  image:
    "https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1780903670/hero-banner-1_xdunup.jpg",
  logo: `${SITE_URL}/favicon.png`,
  telephone: "+971508001238",
  email: "info@fixoonova.ae",
  description:
    "Building maintenance company in Dubai South and across Dubai for AC, plumbing, electrical, renovation and AMC services.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  areaServed: [
    "Dubai",
    "Dubai South",
    "Dubai Investment Park",
    "Villanova",
    "Discovery Gardens",
    "Damac Hills 2",
    "Expo City",
    "JVC",
    "JVT",
    "Business Bay",
    "Dubai Marina",
    "Palm Jumeirah",
    "Downtown Dubai",
    "Al Barsha",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: [
    "https://www.instagram.com/fixoonova/",
    "https://www.facebook.com/profile.php?id=61591712577093",
  ],
  parentOrganization: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export function injectJsonLd(scriptId: string, data: Record<string, unknown>) {
  const existing = document.getElementById(scriptId);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);
  document.head.appendChild(script);

  return () => {
    document.getElementById(scriptId)?.remove();
  };
}
