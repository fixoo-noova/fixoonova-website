import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Cctv,
  CheckCircle2,
  Home,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Wind,
  Wrench,
  Zap,
  Droplets,
  Paintbrush,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import {
  injectJsonLd,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/structuredData";

const services = [
  { icon: Wind, title: "AC & HVAC maintenance" },
  { icon: Droplets, title: "Plumbing" },
  { icon: Zap, title: "Electrical services" },
  { icon: Wrench, title: "Handyman services" },
  { icon: Paintbrush, title: "Renovation" },
  { icon: Sparkles, title: "Deep cleaning" },
  { icon: Cctv, title: "ELV systems" },
  { icon: ShieldCheck, title: "Annual maintenance contracts", href: "/maintenance-plan" },
];

const reasons = [
  "28+ years of experience",
  "Residential & commercial maintenance",
  "Professional technicians",
  "Transparent quotations",
  "24/7 support",
  "One maintenance partner for multiple services",
];

const areasServed = [
  "Dubai South",
  "Dubai Investment Park (DIP)",
  "Expo City",
  "Villanova",
  "Discovery Gardens",
  "Damac Hills 2",
  "JVC",
  "JVT",
  "Business Bay",
  "Dubai Marina",
  "Downtown Dubai",
  "Al Barsha",
  "Palm Jumeirah",
];

const dubaiSouthFaqs = [
  {
    q: "Do you provide building maintenance in Dubai South?",
    a: "Yes. Dubai South is one of Fixoo Nova's primary service areas for residential, office and commercial property maintenance.",
  },
  {
    q: "Do you provide maintenance for offices and commercial properties?",
    a: "Yes. We support both residential and commercial properties.",
  },
  {
    q: "Do you offer AC, plumbing and electrical services in Dubai South?",
    a: "Yes. These are among our core property maintenance services.",
  },
  {
    q: "Do you provide Annual Maintenance Contracts in Dubai South?",
    a: "Yes. Maintenance plans can be arranged according to the property's requirements.",
  },
];

export default function DubaiSouthPage() {
  useEffect(() => {
    document.getElementById("fixoo-nova-home-schema")?.remove();
    const canonical = `${SITE_URL}/building-maintenance-dubai-south/`;
    return injectJsonLd("fixoo-nova-dubai-south-schema", {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        localBusinessSchema,
        {
          "@type": "Service",
          "@id": `${canonical}#service`,
          name: "Building Maintenance in Dubai South",
          serviceType: "Building Maintenance",
          url: canonical,
          description:
            "Professional building and property maintenance services in Dubai South for homes, offices and commercial properties.",
          provider: { "@id": `${SITE_URL}/#localbusiness` },
          areaServed: areasServed,
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonical}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${SITE_URL}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Building Maintenance Dubai South",
              item: canonical,
            },
          ],
        },
        {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          mainEntity: dubaiSouthFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        },
      ],
    });
  }, []);

  return (
    <>
      <section className="px-6 lg:px-10 pt-24 pb-12 max-w-7xl mx-auto">
        <span className="eyebrow">DUBAI SOUTH</span>
        <h1 className="font-display text-5xl sm:text-6xl mt-4 mb-6 max-w-4xl leading-tight">
          Building Maintenance in{" "}
          <span className="text-gradient-gold">Dubai South</span>
        </h1>
        <h2 className="font-display text-2xl sm:text-3xl mb-5 max-w-3xl">
          Professional Property Maintenance in Dubai South
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Fixoo Nova provides professional building and property maintenance services in Dubai South
          for residential, commercial and office properties. With 28+ years of experience, our team
          supports property owners, landlords, businesses and residents with reliable maintenance,
          repairs and ongoing property care. Dubai South is our primary local service area, while
          Fixoo Nova also provides maintenance services across Dubai.
        </p>
      </section>

      <section className="px-6 lg:px-10 pb-16 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl mb-8">
          Property Maintenance Services in{" "}
          <span className="text-gradient-gold">Dubai South</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const Card = (
              <div className="h-full p-6 premium-card premium-card-hover">
                <div className="icon-gold mb-4">
                  <service.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-base">{service.title}</h3>
              </div>
            );
            return service.href ? (
              <Link key={service.title} to={service.href} className="block">
                {Card}
              </Link>
            ) : (
              <div key={service.title}>{Card}</div>
            );
          })}
        </div>
        <Link to="/services" className="btn-outline mt-8">
          View All Services <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="px-6 lg:px-10 pb-16 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl mb-8">
          Maintenance for Homes &amp; <span className="text-gradient-gold">Businesses</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-8 premium-card">
            <div className="icon-gold mb-4">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl mb-2">Residential Properties</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Maintenance support for villas, apartments and homes, including routine maintenance
              and repair requirements.
            </p>
          </div>
          <div className="p-8 premium-card">
            <div className="icon-gold mb-4">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl mb-2">Offices &amp; Commercial Properties</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Maintenance support for offices, businesses and commercial properties requiring
              reliable ongoing property care.
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#0a1018] py-20 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl sm:text-5xl mb-8 text-white">
            Why <span className="text-gradient-gold">Fixoo Nova?</span>
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {reasons.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-16 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl mb-5">
          Serving Dubai South &amp; Across Dubai
        </h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed mb-6">
          Dubai South is our primary service area, while Fixoo Nova also provides building
          maintenance services across Dubai. We serve areas including:
        </p>
        <ul className="flex flex-wrap gap-3">
          {areasServed.map((area) => (
            <li
              key={area}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
            >
              {area}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 lg:px-10 pb-16 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-primary/20 bg-card p-10 lg:p-14 shadow-elegant">
          <h2 className="font-display text-4xl sm:text-5xl mb-4">
            Need Maintenance in <span className="text-gradient-gold">Dubai South?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
            Whether you need a one-time repair or ongoing property maintenance, contact Fixoo Nova
            to discuss your requirement.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground mb-8">
            <li className="flex items-start gap-3">
              <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>
                Call/WhatsApp:{" "}
                <a href="tel:+971508001238" className="text-foreground hover:text-primary">
                  +971 50 800 1238
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <a href="mailto:info@fixoonova.ae" className="hover:text-primary">
                info@fixoonova.ae
              </a>
            </li>
          </ul>
          <Link to="/contact" className="btn-primary">
            Request a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#0a1018] py-20 px-6 lg:px-10" id="faq">
        <div className="relative mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow text-white/65">FAQ</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 text-white">
              Questions, <span className="text-gradient-gold">answered</span>
            </h2>
          </div>
          <div className="space-y-3">
            {dubaiSouthFaqs.map((faq) => (
              <details
                key={faq.q}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <summary className="cursor-pointer list-none p-5 text-left font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden sm:p-6">
                  <span className="flex items-center justify-between gap-4">
                    {faq.q}
                    <span className="shrink-0 text-primary transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="border-t border-white/10 px-5 pb-5 pt-0 text-sm leading-relaxed text-white/70 sm:px-6 sm:pb-6">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
