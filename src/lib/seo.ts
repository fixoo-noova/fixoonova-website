export const SITE_URL = "https://fixoonova.ae";

export const SITE_NAME = "Fixoo Nova";

export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1780903670/hero-banner-1_xdunup.jpg";

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
      "Fixoo Nova is a trusted building maintenance company in Dubai offering 24/7 property maintenance, AC services, plumbing, electrical, handyman and AMC — with dedicated support in Dubai South.",
    path: "/",
    h1: "Building Maintenance Company in Dubai",
  },
  "/about": {
    title: "About Fixoo Nova | Building Maintenance Company in Dubai",
    description:
      "Meet Fixoo Nova, a licensed building maintenance company in Dubai with 28+ years of experience in AC, plumbing, electrical and property care, including Dubai South.",
    path: "/about",
    h1: "About Fixoo Nova — Building Maintenance Company in Dubai",
    crawlerHtml: `
      <main>
        <section>
          <h1>About Fixoo Nova — Building Maintenance Company in Dubai</h1>
          <p>Fixoo Nova is a licensed and insured building maintenance company in Dubai with more than 28 years of hands-on experience. We deliver AC, plumbing, electrical, handyman and property maintenance services for homes, villas and commercial buildings, with dedicated support in Dubai South.</p>
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
    title: "Building Maintenance Services in Dubai | AC, Plumbing & Electrical",
    description:
      "Explore Fixoo Nova building maintenance services in Dubai: AC services, plumbing, electrical, renovation, deep cleaning, handyman and annual maintenance contracts.",
    path: "/services",
    h1: "Building Maintenance Services in Dubai",
    crawlerHtml: `
      <main>
        <section>
          <h1>Building Maintenance Services in Dubai</h1>
          <p>Fixoo Nova provides a complete suite of building maintenance services in Dubai for villas, apartments, offices and commercial properties, with dedicated support in Dubai South.</p>
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
    title: "Annual Maintenance Contract in Dubai | AC, Plumbing & Electrical",
    description:
      "Book a yearly maintenance plan in Dubai covering AC, plumbing, electrical and general property upkeep. Flexible AMC packages for apartments, villas and offices.",
    path: "/maintenance-plan",
    h1: "Annual Maintenance Contract in Dubai",
    crawlerHtml: `
      <main>
        <section>
          <h1>Annual Maintenance Contract in Dubai</h1>
          <p>Protect your home or business with a single annual maintenance contract covering AC, plumbing, electrical and general property care across Dubai, including Dubai South.</p>
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
    title: "Contact Fixoo Nova | Book Building Maintenance in Dubai",
    description:
      "Contact Fixoo Nova to book building maintenance in Dubai. Call, email or WhatsApp for AC, plumbing, electrical, handyman and annual maintenance support.",
    path: "/contact",
    h1: "Contact Fixoo Nova — Book Building Maintenance in Dubai",
    crawlerHtml: `
      <main>
        <section>
          <h1>Contact Fixoo Nova — Book Building Maintenance in Dubai</h1>
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
          <p>Email: <a href="mailto:info@fixoonova.ae">info@fixoonova.ae</a></p>
          <p>WhatsApp: <a href="https://wa.me/971508001238">Chat with our team</a></p>
          <p>Address: Dubai South, Dubai, United Arab Emirates</p>
          <p>Hours: 24/7 — always on call</p>
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
};

export function getPageSeo(pathname: string): PageSeo {
  const known = PAGE_SEO[pathname];
  if (known) return known;

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
