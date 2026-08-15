import { useEffect } from "react";
import { FORM_SOURCES } from "@/lib/emailjs";
import {
  FormSubmitFeedback,
  FormSuccessMessage,
  useContactFormSubmit,
} from "@/hooks/useContactFormSubmit";
import { SITE_URL } from "@/lib/seo";
import {
  injectJsonLd,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/structuredData";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Droplets,
  Phone,
  ShieldCheck,
  Sparkles,
  Wind,
  Zap,
  Wrench,
  Building2,
} from "lucide-react";
import ac from "@/assets/service-ac.jpg";

const includedServices = [
  {
    icon: Wind,
    title: "AC & HVAC",
    items: [
      "Scheduled AC servicing and filter changes",
      "Duct inspection and coil cleaning",
      "Gas top-up and performance checks",
      "Priority emergency call-outs",
    ],
  },
  {
    icon: Droplets,
    title: "Plumbing",
    items: [
      "Leak detection and minor repairs",
      "Fixture and tap maintenance",
      "Water tank inspection and cleaning",
      "Drainage checks and clearing",
    ],
  },
  {
    icon: Zap,
    title: "Electrical & ELV",
    items: [
      "Panel and wiring safety inspections",
      "Light, switch and socket checks",
      "CCTV and intercom health checks",
      "Access control and gate system review",
    ],
  },
  {
    icon: Wrench,
    title: "General Property Care",
    items: [
      "Handyman visits for small fixes",
      "Preventive walk-through inspections",
      "Detailed maintenance reports",
      "Dedicated account manager",
    ],
  },
];

const plans = [
  {
    name: "Essential",
    bestFor: "Apartments & studios",
    visits: "4 scheduled visits / year",
    highlights: [
      "AC servicing (2× per year)",
      "Plumbing & electrical checks",
      "2 handyman call-outs included",
      "Standard response time",
    ],
    featured: false,
  },
  {
    name: "Complete",
    bestFor: "Villas & townhouses",
    visits: "6 scheduled visits / year",
    highlights: [
      "Full AC, plumbing & electrical care",
      "Water tank cleaning (1× per year)",
      "4 handyman call-outs included",
      "Priority same-day response",
      "Quarterly property inspection report",
    ],
    featured: true,
  },
  {
    name: "Premium",
    bestFor: "Offices & multi-unit properties",
    visits: "12 scheduled visits / year",
    highlights: [
      "Everything in Complete, plus",
      "Monthly preventive inspections",
      "Unlimited minor repairs (fair use)",
      "24/7 emergency hotline",
      "Dedicated technician team",
    ],
    featured: false,
  },
];

const benefits = [
  "One contract covers AC, plumbing, electrical and general upkeep",
  "Predictable yearly cost — no surprise emergency bills",
  "Certified technicians who know your property",
  "Written reports after every visit",
  "Workmanship warranty on all maintenance work",
  "Flexible plans for homes, villas and commercial spaces",
];

const faqs = [
  {
    q: "What does the yearly maintenance plan include?",
    a: "Our annual maintenance contract (AMC) bundles scheduled AC servicing, plumbing checks, electrical inspections and general handyman support into one plan — tailored to your property type and size.",
  },
  {
    q: "Can I customize the plan for my villa or office?",
    a: "Yes. After a free site survey, we build a plan around your equipment, unit count and usage. You only pay for the coverage you actually need.",
  },
  {
    q: "How quickly do you respond to emergencies?",
    a: "Complete and Premium plan holders receive priority scheduling. Premium clients get 24/7 emergency access with our fastest response times.",
  },
  {
    q: "Is there a contract lock-in?",
    a: "Plans run on a 12-month basis with transparent renewal terms. We review your plan annually and adjust coverage as your property evolves.",
  },
];

export default function MaintenancePlanPage() {
  const quoteForm = useContactFormSubmit(FORM_SOURCES.maintenancePlan);

  useEffect(() => {
    return injectJsonLd("fixoo-nova-maintenance-schema", {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        localBusinessSchema,
        {
          "@type": "Service",
          "@id": `${SITE_URL}/maintenance-plan#service`,
          name: "Annual Maintenance Contract",
          serviceType: "Annual Maintenance Contract",
          url: `${SITE_URL}/maintenance-plan`,
          description:
            "Annual maintenance contracts in Dubai covering AC, plumbing, electrical and preventive property maintenance.",
          provider: { "@id": `${SITE_URL}/#localbusiness` },
          areaServed: ["Dubai", "Dubai South"],
        },
      ],
    });
  }, []);

  return (
    <>
      <section className="relative overflow-hidden px-6 lg:px-10 pt-24 pb-16">
        <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.18)_0%,transparent_72%)] blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">YEARLY MAINTENANCE OFFER</span>
            <h1 className="font-display mt-4 max-w-xl text-5xl leading-tight sm:text-6xl">
              Annual Maintenance Contract in{" "}
              <span className="text-gradient-gold">Dubai</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Protect your home or business with a single annual contract — AC, plumbing,
              electrical and general maintenance handled by one trusted team across Dubai.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#get-quote" className="btn-primary">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </a>
              <a href="tel:+971508001238" className="btn-outline">
                <Phone className="h-4 w-4" /> Call Us
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Licensed & insured
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> 12-month plans
              </span>
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> Homes & commercial
              </span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-elegant">
            <img
              src={ac}
              alt="Fixoo Nova technician performing scheduled AC maintenance for a Dubai property"
              loading="eager"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                Limited-time yearly maintenance offer
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/30 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="eyebrow">WHAT&apos;S COVERED</span>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">
              All your core services,{" "}
              <span className="text-gradient-gold">under one roof</span>.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {includedServices.map((service) => (
              <div key={service.title} className="premium-card premium-card-hover p-8">
                <div className="icon-gold mb-5">
                  <service.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display mb-4 text-2xl">{service.title}</h3>
                <ul className="space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="eyebrow">CHOOSE YOUR PLAN</span>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">
              Flexible packages for every{" "}
              <span className="text-gradient-gold">property type</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Pricing is tailored after a free site survey. Below are our most popular plan
              structures — we&apos;ll match the right coverage to your property.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 transition ${
                  plan.featured
                    ? "border-primary/40 bg-card shadow-elegant ring-1 ring-primary/20"
                    : "border-border bg-card premium-card-hover"
                }`}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium tracking-wide text-primary-foreground">
                    Most Popular
                  </span>
                ) : null}
                <h3 className="font-display text-3xl">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.bestFor}</p>
                <p className="mt-4 text-sm font-medium text-primary">{plan.visits}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#get-quote" className={`mt-8 justify-center ${plan.featured ? "btn-primary" : "btn-outline"}`}>
                  Request Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a1018] px-6 py-24 lg:px-10">
        <div className="pointer-events-none absolute -left-16 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.34)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute right-[10%] bottom-[14%] h-44 w-44 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.24)_0%,transparent_76%)] blur-3xl mix-blend-screen" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow text-white/65">WHY GO ANNUAL</span>
              <h2 className="font-display mt-3 text-4xl text-white sm:text-5xl">
                Save time, money and{" "}
                <span className="text-gradient-gold">stress</span> all year.
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-white/70">
                Stop juggling separate vendors for AC, plumbing and electrical work. Our yearly
                maintenance plan keeps your property running smoothly with one point of contact.
              </p>
            </div>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/85 backdrop-blur-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">
              Common <span className="text-gradient-gold">questions</span>.
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group premium-card overflow-hidden"
              >
                <summary className="cursor-pointer list-none p-6 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.q}
                    <span className="text-primary transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="border-t border-border px-6 pb-6 pt-0 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="get-quote" className="px-6 pb-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="eyebrow">GET YOUR QUOTE</span>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">
              Start your yearly{" "}
              <span className="text-gradient-gold">maintenance plan</span>.
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Tell us about your property and we&apos;ll arrange a free survey with a transparent
              quote — no obligation.
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p>Phone: +971 50 800 1238</p>
              <p>Email: info@fixoonova.ae</p>
              <p>
                Prefer to browse first?{" "}
                <Link to="/services" className="text-primary hover:underline">
                  View all services
                </Link>
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => quoteForm.handleSubmit(e)}
            className="premium-card space-y-5 p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
            </div>
            <Field label="Email" name="email" type="email" required />
            <div>
              <label htmlFor="property-type" className="text-xs uppercase tracking-widest text-muted-foreground">
                Property Type
              </label>
              <select
                id="property-type"
                name="property-type"
                required
                defaultValue=""
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
              >
                <option value="" disabled>
                  Select property type
                </option>
                <option value="apartment">Apartment / Studio</option>
                <option value="villa">Villa / Townhouse</option>
                <option value="office">Office / Commercial</option>
                <option value="multi">Multi-unit / Building</option>
              </select>
            </div>
            <div>
              <label htmlFor="plan" className="text-xs uppercase tracking-widest text-muted-foreground">
                Preferred Plan
              </label>
              <select
                id="plan"
                name="plan"
                required
                defaultValue=""
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
              >
                <option value="" disabled>
                  Select a plan
                </option>
                {plans.map((plan) => (
                  <option key={plan.name} value={plan.name}>
                    {plan.name} — {plan.bestFor}
                  </option>
                ))}
                <option value="custom">Not sure — recommend for me</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Property location, number of AC units, any specific concerns..."
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={quoteForm.isLoading}
              className="btn-primary w-full justify-center disabled:opacity-70"
            >
              {quoteForm.isLoading
                ? "Sending..."
                : quoteForm.isSuccess
                  ? "Request Sent — we'll be in touch"
                  : "Request Free Quote"}
            </button>
            <FormSubmitFeedback error={quoteForm.error} />
            <FormSuccessMessage show={quoteForm.isSuccess} />
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
      />
    </div>
  );
}
