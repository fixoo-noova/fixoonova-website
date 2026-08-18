import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Cctv,
  CheckCircle2,
  Home,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Wind,
  Wrench,
  Zap,
  Droplets,
  Paintbrush,
} from "lucide-react";
import { DUBAI_SOUTH_PATH, SITE_URL } from "@/lib/seo";
import {
  injectJsonLd,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/structuredData";

const WHATSAPP_URL = "https://wa.me/971508001238";

const highlights = ["24/7 Support", "Professional Technicians", "Residential & Commercial"];

const services = [
  {
    icon: Wind,
    title: "AC & HVAC",
    desc: "Servicing, cleaning and repairs to keep things running through the heat.",
  },
  {
    icon: Droplets,
    title: "Plumbing",
    desc: "Leaks, blockages, drainage and fixture issues.",
  },
  {
    icon: Zap,
    title: "Electrical",
    desc: "Repairs and maintenance for homes and businesses.",
  },
  {
    icon: Wrench,
    title: "Handyman",
    desc: "Everyday fixes and small installations.",
  },
  {
    icon: Paintbrush,
    title: "Renovation",
    desc: "Updates and repair work for properties that need refreshing.",
  },
  {
    icon: Cctv,
    title: "ELV Systems",
    desc: "Support for selected low-voltage systems.",
  },
  {
    icon: ShieldCheck,
    title: "Annual Maintenance Contracts",
    desc: "Planned servicing so nothing gets missed.",
    href: "/maintenance-plan",
  },
];

const reasons = [
  "28+ years in property maintenance, since 1998",
  "Available 24/7, including urgent jobs",
  "Technicians who know what they're doing",
  "Clear pricing before work starts",
  "One team for every maintenance need, instead of juggling different contractors",
];

const alsoServing = [
  "DIP",
  "Expo City",
  "Villanova",
  "Discovery Gardens",
  "DAMAC Hills 2",
  "JVC",
  "JVT",
];

const dubaiSouthFaqs = [
  {
    q: "Do you cover Dubai South?",
    a: "Yes, it's one of our main service areas for homes, offices and commercial properties.",
  },
  {
    q: "What services do you offer there?",
    a: "AC, plumbing, electrical, handyman, renovation and more. See the list above.",
  },
  {
    q: "Do you maintain apartments and villas?",
    a: "Yes, both.",
  },
  {
    q: "Can I set up an annual maintenance contract?",
    a: "Yes, tailored to your property's needs.",
  },
];

export default function DubaiSouthPage() {
  useEffect(() => {
    document.getElementById("fixoo-nova-home-schema")?.remove();
    const pageUrl = `${SITE_URL}${DUBAI_SOUTH_PATH}`;
    return injectJsonLd("fixoo-nova-dubai-south-schema", {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        localBusinessSchema,
        {
          "@type": "Service",
          "@id": `${pageUrl}#service`,
          name: "Building Maintenance in Dubai South",
          serviceType: "Building Maintenance",
          url: pageUrl,
          description:
            "Building and property maintenance in Dubai South. AC, plumbing, electrical and more. 24/7 support from Fixoo Nova.",
          provider: { "@id": `${SITE_URL}/#localbusiness` },
          areaServed: [
            "Dubai South",
            "Dubai Investment Park",
            "Expo City",
            "Villanova",
            "Discovery Gardens",
            "Damac Hills 2",
            "JVC",
            "JVT",
          ],
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
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
              name: "Building Maintenance in Dubai South",
              item: pageUrl,
            },
          ],
        },
        {
          "@type": "FAQPage",
          "@id": `${pageUrl}#faq`,
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
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Need something fixed, serviced, or looked after in Dubai South? Fixoo Nova handles
          building and property maintenance for apartments, villas, offices and commercial spaces
          across the community, from a quick repair to ongoing care.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/contact" className="btn-primary">
            Request a Service <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={WHATSAPP_URL} className="btn-outline" target="_blank" rel="noreferrer noopener">
            <Phone className="h-4 w-4" /> Call / WhatsApp
          </a>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-16 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl mb-8">
          What We Handle in <span className="text-gradient-gold">Dubai South</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const Card = (
              <div className="h-full p-7 premium-card premium-card-hover">
                <div className="icon-gold mb-4">
                  <service.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
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
          Homes and Businesses, <span className="text-gradient-gold">Covered</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-8 premium-card">
            <div className="icon-gold mb-4">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl mb-2">Residential</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Apartments, villas and homes across Dubai South.
            </p>
          </div>
          <div className="p-8 premium-card">
            <div className="icon-gold mb-4">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl mb-2">Commercial</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Offices and businesses that need reliable upkeep.
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#0a1018] py-20 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl sm:text-5xl mb-8 text-white">
            Why People Choose <span className="text-gradient-gold">Fixoo Nova</span>
          </h2>
          <ul className="space-y-4 max-w-3xl">
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
        <h2 className="font-display text-4xl sm:text-5xl mb-5">Also Serving</h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed mb-6">
          Dubai South is our main focus, but we cover other communities too:
        </p>
        <ul className="flex flex-wrap gap-3">
          {alsoServing.map((area) => (
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
          <h2 className="font-display text-4xl sm:text-5xl mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
            Small repair or ongoing maintenance. Reach out and we'll take it from there.
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
              <MessageSquare className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <a href={WHATSAPP_URL} className="hover:text-primary" target="_blank" rel="noreferrer noopener">
                WhatsApp chat
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <a href="mailto:info@fixoonova.ae" className="hover:text-primary">
                info@fixoonova.ae
              </a>
            </li>
          </ul>
          <Link to="/contact" className="btn-primary">
            Request a Service <ArrowRight className="h-4 w-4" />
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
