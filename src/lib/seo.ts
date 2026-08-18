export const SITE_URL = "https://fixoonova.ae";

export const SITE_NAME = "Fixoo Nova";

export const OFFICE_ADDRESS = {
  name: "Fixoo Nova Building Maintenance",
  streetAddress: "ML7 Office, Wafi Residence",
  addressLocality: "Oud Metha",
  addressRegion: "Dubai",
  addressCountry: "AE",
  display: "Fixoo Nova Building Maintenance, ML7 Office, Wafi Residence, Oud Metha, Dubai",
};

export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1780903670/hero-banner-1_xdunup.jpg";

export const DUBAI_SOUTH_PATH = "/building-maintenance-dubai-south";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  h1: string;
  ogImage?: string;
  noindex?: boolean;
  crawlerHtml?: string;
};

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Building Maintenance Company in Dubai | Fixoo Nova",
    description:
      "Trusted building maintenance company in Dubai providing AC, plumbing, electrical, handyman and renovation services across Dubai, with dedicated support in Dubai South.",
    path: "/",
    h1: "Building Maintenance Company in Dubai",
  },
  "/about": {
    title: "About Fixoo Nova | Building Maintenance Company Dubai",
    description:
      "Learn about Fixoo Nova, a building maintenance company in Dubai with 28+ years of experience serving residential, office and commercial properties.",
    path: "/about",
    h1: "About Fixoo Nova Building Maintenance Company in Dubai",
    crawlerHtml: `
      <main>
        <section>
          <h1>About Fixoo Nova Building Maintenance Company in Dubai</h1>
          <p>Fixoo Nova is a building maintenance company in Dubai with more than 28 years of hands-on experience. We deliver AC, plumbing, electrical, handyman and property maintenance services for homes, villas and commercial buildings.</p>
          <p>Fixoo Nova provides maintenance support across Dubai, with dedicated support in <a href="/building-maintenance-dubai-south">Dubai South</a>.</p>
          <img src="https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto/f_auto/v1780903670/hero-banner-3_nmgyob.jpg" alt="Dubai villa maintained by Fixoo Nova building maintenance technicians" width="1920" height="1080" />
        </section>
        <section>
          <h2>Our legacy in Dubai building maintenance</h2>
          <p>For over 28 years we have served homeowners, landlords and businesses with dependable property maintenance across Dubai.</p>
        </section>
        <section>
          <h2>How we work</h2>
          <h3>Our Mission</h3>
          <p>To make property maintenance effortless with practical, convenient solutions delivered on time.</p>
          <h3>Our Vision</h3>
          <p>To be the most trusted name in premium building maintenance in Dubai.</p>
          <h3>Our Promise</h3>
          <p>Master-level execution, transparent reporting and the same enthusiasm on every job.</p>
        </section>
        <section>
          <h2>Our people and values</h2>
          <h3>Integrity</h3>
          <p>Transparent quotes, honest reporting and zero hidden charges.</p>
          <h3>Craftsmanship</h3>
          <p>Every fitting, finish and fixture treated with professional care.</p>
          <h3>Responsiveness</h3>
          <p>We pick up, show up and follow up on every building maintenance request in Dubai.</p>
        </section>
        <nav aria-label="Primary">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/maintenance-plan">Maintenance Plan</a>
          <a href="/contact">Contact</a>
        </nav>
      </main>
    `,
  },
  "/services": {
    title: "Building Maintenance Services in Dubai | Fixoo Nova",
    description:
      "Professional AC, plumbing, electrical, renovation, cleaning, handyman and ELV services for homes, offices and commercial properties across Dubai.",
    path: "/services",
    h1: "Building Maintenance Services in Dubai",
    crawlerHtml: `
      <main>
        <section>
          <h1>Building Maintenance Services in Dubai</h1>
          <p>Fixoo Nova provides a complete suite of building maintenance services in Dubai for villas, apartments, offices and commercial properties, with dedicated support in <a href="/building-maintenance-dubai-south">Dubai South</a>.</p>
        </section>
        <section>
          <h2>Featured building maintenance services</h2>
          <article>
            <h3>AC & HVAC</h3>
            <p>AC cleaning, duct sanitization, gas top-up, repair and full HVAC maintenance across Dubai.</p>
          </article>
          <article>
            <h3>Renovation</h3>
            <p>Villa, apartment, office and bathroom renovation with premium finishes.</p>
          </article>
          <article>
            <h3>Deep Cleaning</h3>
            <p>Home and office deep cleaning, sofa, mattress, carpet and curtain sanitization.</p>
          </article>
          <article>
            <h3>Electrical & ELV</h3>
            <p>Wiring, panels, lighting, CCTV, intercom and access control by certified electricians.</p>
          </article>
          <article>
            <h3>Plumbing</h3>
            <p>Leak repairs, drain cleaning, pipe replacement and emergency plumbing in Dubai.</p>
          </article>
          <article>
            <h3>Kitchen & Joinery</h3>
            <p>Kitchen upgrades, joinery, marble surfaces and fittings installed end-to-end.</p>
          </article>
        </section>
        <section>
          <h2>Maintenance</h2>
          <h3>AC Duct Cleaning</h3>
          <p>Regular sanitization for clean, healthy indoor air.</p>
          <h3>AC Service</h3>
          <p>Keep your home cool and fresh year-round with professional AC service in Dubai.</p>
          <h3>Painting</h3>
          <p>Interior and exterior painting that transforms spaces.</p>
          <h3>Annual Maintenance Contracts</h3>
          <p>Preventive, routine, corrective and civil maintenance under one plan.</p>
          <h3>Handyman</h3>
          <p>From a light bulb to custom fixes, completed by trained technicians.</p>
        </section>
        <section>
          <h2>Renovation</h2>
          <h3>Villa & Office Renovation</h3>
          <p>Full transformations with premium materials and fixtures.</p>
          <h3>Bathroom Renovation</h3>
          <p>360° renovation and upgrade with luxurious finishes.</p>
        </section>
        <section>
          <h2>Cleaning</h2>
          <h3>Deep Cleaning</h3>
          <p>Apartments, villas and offices with eco-friendly agents.</p>
          <h3>Sofa Cleaning</h3>
          <p>Pollution-free sofas and extended fabric life.</p>
          <h3>Mattress & Carpet</h3>
          <p>Removes dust mites, allergens and stains.</p>
          <h3>Curtain Cleaning</h3>
          <p>Onsite curtain cleaning, sanitized in place.</p>
        </section>
        <section>
          <h2>ELV Systems</h2>
          <h3>Intercom & CCTV</h3>
          <p>Audio-video intercom and surveillance integration.</p>
          <h3>Access Control</h3>
          <p>Smart, sensor-based door access solutions.</p>
          <h3>Gate Barriers & Sliding Doors</h3>
          <p>Durable, smart entry systems.</p>
        </section>
        <section>
          <h2>Specialized services</h2>
          <h3>Pest Control & AMC</h3>
          <p>Licensed, safe and effective pest management.</p>
          <h3>Water Tank Cleaning</h3>
          <p>Drain, disinfect and scrub with minimal interruption.</p>
          <h3>Sump Pit & Grease Trap</h3>
          <p>Commercial cleaning to municipal standards.</p>
        </section>
        <section>
          <h2>Request a building maintenance quote</h2>
          <p>Share your requirements and our team will contact you with a tailored plan. <a href="/contact">Contact Fixoo Nova</a> or call <a href="tel:+971508001238">+971 50 800 1238</a>.</p>
        </section>
        <nav aria-label="Primary">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/maintenance-plan">Maintenance Plan</a>
          <a href="/contact">Contact</a>
        </nav>
      </main>
    `,
  },
  "/maintenance-plan": {
    title: "Annual Maintenance Contract Dubai | Fixoo Nova",
    description:
      "Annual maintenance contracts for homes, villas, offices and commercial properties in Dubai covering AC, plumbing, electrical and general property maintenance.",
    path: "/maintenance-plan",
    h1: "Annual Maintenance Contract in Dubai",
    crawlerHtml: `
      <main>
        <section>
          <h1>Annual Maintenance Contract in Dubai</h1>
          <p>Protect your home or business with a single annual maintenance contract covering AC, plumbing, electrical and general property care across Dubai, including <a href="/building-maintenance-dubai-south">Dubai South</a>.</p>
          <img src="https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1780903670/hero-banner-1_xdunup.jpg" alt="Fixoo Nova technician performing scheduled AC maintenance in Dubai" width="1200" height="900" />
        </section>
        <section>
          <h2>What is covered in our yearly maintenance plan</h2>
          <h3>AC & HVAC</h3>
          <p>Scheduled AC servicing, filter changes, duct inspection and priority emergency call-outs.</p>
          <h3>Plumbing</h3>
          <p>Leak detection, fixture maintenance, water tank inspection and drainage checks.</p>
          <h3>Electrical & ELV</h3>
          <p>Panel inspections, lighting checks, CCTV and access control reviews.</p>
          <h3>General Property Care</h3>
          <p>Handyman visits, preventive inspections and detailed maintenance reports.</p>
        </section>
        <section>
          <h2>Choose a maintenance plan</h2>
          <h3>Essential</h3>
          <p>Best for apartments and studios, with 4 scheduled visits per year.</p>
          <h3>Complete</h3>
          <p>Best for villas and townhouses, with 6 scheduled visits and priority response.</p>
          <h3>Premium</h3>
          <p>Best for offices and multi-unit properties, with monthly inspections and 24/7 support.</p>
        </section>
        <section>
          <h2>Request a free AMC quote</h2>
          <p>Call <a href="tel:+971508001238">+971 50 800 1238</a> or use our <a href="/contact">contact form</a>.</p>
        </section>
        <nav aria-label="Primary">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/maintenance-plan">Maintenance Plan</a>
          <a href="/contact">Contact</a>
        </nav>
      </main>
    `,
  },
  "/contact": {
    title: "Contact Fixoo Nova | Building Maintenance Dubai",
    description:
      "Contact Fixoo Nova for building maintenance, AC, plumbing, electrical and property maintenance services in Dubai and Dubai South. Request a service visit.",
    path: "/contact",
    h1: "Contact Fixoo Nova Book Building Maintenance in Dubai",
    crawlerHtml: `
      <main>
        <section>
          <h1>Contact Fixoo Nova Book Building Maintenance in Dubai</h1>
          <p>Hassle-free booking for AC, plumbing, electrical, handyman and full property maintenance across Dubai and Dubai South.</p>
          <img src="https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto/f_auto/v1780903670/hero-banner-1_xdunup.jpg" alt="Dubai property ready for a Fixoo Nova building maintenance visit" width="1920" height="1080" />
        </section>
        <section>
          <h2>Same-day visits across Dubai</h2>
          <p>Reach us by phone, email or WhatsApp. We usually respond within an hour.</p>
        </section>
        <section>
          <h2>Contact details</h2>
          <p>Phone: <a href="tel:+971508001238">+971 50 800 1238</a></p>
          <p>Email: info [at] fixoonova [dot] ae</p>
          <p>WhatsApp: <a href="https://wa.me/971508001238">Chat with our team</a></p>
          <p>Address: Fixoo Nova Building Maintenance, ML7 Office, Wafi Residence, Oud Metha, Dubai</p>
          <p>Hours: 24/7 always on call</p>
        </section>
        <section>
          <h2>Send a maintenance enquiry</h2>
          <p>Share your name, phone, email, required service and message. Our team will contact you with the next steps.</p>
        </section>
        <nav aria-label="Primary">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/maintenance-plan">Maintenance Plan</a>
          <a href="/contact">Contact</a>
        </nav>
      </main>
    `,
  },
  "/blog": {
    title: "Building Maintenance Blog Dubai | Fixoo Nova",
    description:
      "Tips and guides from Fixoo Nova on AC, plumbing, electrical and property maintenance for homes and businesses in Dubai.",
    path: "/blog",
    h1: "Fixoo Nova Blog",
    crawlerHtml: `
      <main>
        <section>
          <h1>Fixoo Nova Blog</h1>
          <p>Practical guides on building maintenance, AC care, plumbing and property upkeep across Dubai and Dubai South.</p>
        </section>
        <nav aria-label="Primary">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/maintenance-plan">Maintenance Plan</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </nav>
      </main>
    `,
  },
  "/building-maintenance-dubai-south": {
    title: "Building Maintenance in Dubai South | Fixoo Nova",
    description:
      "Professional building and property maintenance services in Dubai South for homes, offices and commercial properties. Get reliable support from Fixoo Nova.",
    path: "/building-maintenance-dubai-south/",
    h1: "Building Maintenance in Dubai South",
    crawlerHtml: `
      <main>
        <section>
          <h1>Building Maintenance in Dubai South</h1>
          <h2>Professional Property Maintenance in Dubai South</h2>
          <p>Fixoo Nova provides professional building and property maintenance services in Dubai South for residential, commercial and office properties. With 28+ years of experience, our team supports property owners, landlords, businesses and residents with reliable maintenance, repairs and ongoing property care. Dubai South is our primary local service area, while Fixoo Nova also provides maintenance services across Dubai.</p>
        </section>
        <section>
          <h2>Property Maintenance Services in Dubai South</h2>
          <ul>
            <li>AC &amp; HVAC maintenance</li>
            <li>Plumbing</li>
            <li>Electrical services</li>
            <li>Handyman services</li>
            <li>Renovation</li>
            <li>Deep cleaning</li>
            <li>ELV systems</li>
            <li><a href="/maintenance-plan">Annual maintenance contracts</a></li>
          </ul>
          <p><a href="/services">View All Services</a></p>
        </section>
        <section>
          <h2>Maintenance for Homes &amp; Businesses</h2>
          <h3>Residential Properties</h3>
          <p>Maintenance support for villas, apartments and homes, including routine maintenance and repair requirements.</p>
          <h3>Offices &amp; Commercial Properties</h3>
          <p>Maintenance support for offices, businesses and commercial properties requiring reliable ongoing property care.</p>
        </section>
        <section>
          <h2>Why Fixoo Nova?</h2>
          <ul>
            <li>28+ years of experience</li>
            <li>Residential &amp; commercial maintenance</li>
            <li>Professional technicians</li>
            <li>Transparent quotations</li>
            <li>24/7 support</li>
            <li>One maintenance partner for multiple services</li>
          </ul>
        </section>
        <section>
          <h2>Serving Dubai South &amp; Across Dubai</h2>
          <p>Dubai South is our primary service area, while Fixoo Nova also provides building maintenance services across Dubai. We serve areas including: Dubai South, Dubai Investment Park (DIP), Expo City, Villanova, Discovery Gardens, Damac Hills 2, JVC, JVT, Business Bay, Dubai Marina, Downtown Dubai, Al Barsha and Palm Jumeirah.</p>
        </section>
        <section>
          <h2>Need Maintenance in Dubai South?</h2>
          <p>Whether you need a one-time repair or ongoing property maintenance, contact Fixoo Nova to discuss your requirement.</p>
          <p>Call/WhatsApp: <a href="tel:+971508001238">+971 50 800 1238</a></p>
          <p>Email: info [at] fixoonova [dot] ae</p>
          <p><a href="/contact">Request a Quote</a></p>
        </section>
        <section>
          <h2>FAQs</h2>
          <h3>Do you provide building maintenance in Dubai South?</h3>
          <p>Yes. Dubai South is one of Fixoo Nova's primary service areas for residential, office and commercial property maintenance.</p>
          <h3>Do you provide maintenance for offices and commercial properties?</h3>
          <p>Yes. We support both residential and commercial properties.</p>
          <h3>Do you offer AC, plumbing and electrical services in Dubai South?</h3>
          <p>Yes. These are among our core property maintenance services.</p>
          <h3>Do you provide Annual Maintenance Contracts in Dubai South?</h3>
          <p>Yes. Maintenance plans can be arranged according to the property's requirements.</p>
        </section>
        <nav aria-label="Primary">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/maintenance-plan">Maintenance Plan</a>
          <a href="/building-maintenance-dubai-south/">Dubai South</a>
          <a href="/contact">Contact</a>
        </nav>
      </main>
    `,
  },
};

export function getPageSeo(pathname: string): PageSeo {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const known = PAGE_SEO[normalized];
  if (known) return known;

  if (normalized === "/blog" || normalized.startsWith("/blog/")) {
    const base = PAGE_SEO["/blog"];
    return {
      title: base?.title ?? "Blog | Fixoo Nova",
      description:
        base?.description ?? "Building maintenance tips and guides from Fixoo Nova in Dubai.",
      path: pathname,
      h1: base?.h1 ?? "Blog",
    };
  }

  if (pathname.startsWith("/admin/")) {
    return {
      title: "Admin | Fixoo Nova",
      description: "Fixoo Nova content administration.",
      path: pathname,
      h1: "Admin",
      noindex: true,
    };
  }

  return {
    title: "Page Not Found | Fixoo Nova",
    description: "The page you are looking for does not exist or has been moved.",
    path: pathname,
    h1: "Page not found",
    noindex: true,
  };
}

export function absoluteUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}
