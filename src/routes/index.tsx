import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Wrench,
  Phone,
  Star,
  CheckCircle2,
  Quote,
  Wind,
  Droplets,
  Zap,
  Calendar,
} from "lucide-react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FORM_SOURCES } from "@/lib/emailjs";
import {
  FormSubmitFeedback,
  FormSuccessMessage,
  useContactFormSubmit,
} from "@/hooks/useContactFormSubmit";
import heroBuilding from "@/assets/hero-building.jpg";
import ac from "@/assets/service-ac.jpg"; 
import reno from "@/assets/service-renovation.jpg";
import clean from "@/assets/service-cleaning.jpg";
import electrician from "@/assets/electrician.webp";
import plumbingImg from "@/assets/plumber.webp";
import acMech from "@/assets/ac mech.webp";
import productThree from "@/assets/product-3.webp";
import projectPlumbing from "@/assets/plumbing.webp";
import team from "@/assets/team.jpg";
import kitchen from "@/assets/project-kitchen.jpg";
import servicesVideo from "../../public/ac-repair.mp4";
import { SITE_URL } from "@/lib/seo";
import {
  injectJsonLd,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/structuredData";

const features = [
  {
    icon: Clock,
    title: "On-Time Service",
    desc: "We respect your schedule. Every job, every visit.",
  },
  {
    icon: Shield,
    title: "Trusted Experts",
    desc: "Licensed, insured and meticulously trained team.",
  },
  { icon: Sparkles, title: "Premium Finish", desc: "Master-craft quality across every detail." },
  { icon: Wrench, title: "End-to-End Care", desc: "From a leaking tap to full villa renovation." },
];

const projectGallery = {
  main: {
    src: productThree,
    alt: "Technician cleaning a wall-mounted AC unit",
  },
  electrical: {
    src: electrician,
    alt: "Electrician working on an electrical control panel",
  },
  plumbing: {
    src: projectPlumbing,
    alt: "Plumber performing professional plumbing maintenance",
  },
};

const servicesVideoSrc = servicesVideo;
const services = [
  {
    img: ac,
    title: "AC Services",
    desc: "Professional AC services in Dubai including AC cleaning, duct sanitization, gas top-up, repair and full HVAC maintenance for villas, apartments and commercial buildings — with dedicated support across Dubai South.",
  },
  {
    img: electrician,
    title: "Electrical Services",
    desc: "Certified electrical services in Dubai covering wiring, panels, lighting, ELV systems, intercom, CCTV and access control for residential and commercial properties.",
  },
  {
    img: plumbingImg,
    title: "Plumbing Services",
    desc: "Professional plumbing services including leak repairs, drainage maintenance, drain cleaning, pipe replacement and emergency plumbing for villas, apartments and commercial buildings across Dubai.",
  },
  {
    img: reno,
    title: "Renovation Services",
    desc: "Complete renovation services in Dubai for villas, apartments, offices and bathrooms — premium finishes and end-to-end project management from survey to handover.",
  },
  {
    img: clean,
    title: "Deep Cleaning Services",
    desc: "Thorough deep cleaning in Dubai for homes and offices — sofa, mattress, carpet, curtain and full property sanitization using eco-friendly agents.",
  },
  {
    img: kitchen,
    title: "Handyman Services & Kitchen Upgrades",
    desc: "Reliable handyman services in Dubai plus bespoke kitchen joinery, marble surfaces and modern fittings installed end-to-end by skilled technicians.",
  },
];

const areasWeServe = [
  "Dubai South",
  "Discovery Gardens",
  "Villanova",
  "Damac Hills 2",
  "Dubai Investment Park (DIP)",
  "JVC",
  "JVT",
  "Dubai Marina",
  "Downtown Dubai",
  "Business Bay",
  "Al Barsha",
  "Palm Jumeirah",
];

const homeFaqs = [
  {
    q: "Do you provide building maintenance in Dubai South?",
    a: "Yes. Fixoo Nova is a building maintenance company in Dubai with dedicated teams serving Dubai South and nearby communities including DIP, Villanova, Discovery Gardens and Damac Hills 2.",
  },
  {
    q: "Do you offer 24/7 emergency maintenance?",
    a: "Yes. We provide 24/7 property maintenance support for urgent AC, plumbing, electrical and handyman issues across Dubai.",
  },
  {
    q: "Can I book an Annual Maintenance Contract?",
    a: "Absolutely. Our Annual Maintenance Contract (AMC) in Dubai covers scheduled AC servicing, plumbing checks, electrical inspections and general property upkeep under one plan.",
  },
  {
    q: "Do you provide handyman services?",
    a: "Yes. We offer handyman services in Dubai for small repairs, fixture fixes, fittings and day-to-day property maintenance for homes and offices.",
  },
  {
    q: "Do you serve commercial buildings?",
    a: "Yes. We deliver building maintenance for commercial and industrial properties across Dubai, including offices, retail spaces and multi-unit buildings.",
  },
  {
    q: "Which Dubai communities do you cover?",
    a: "We frequently serve Dubai South, DIP, Villanova, Discovery Gardens, Damac Hills 2, Expo City, JVC, JVT, Business Bay, Dubai Marina, Palm Jumeirah, Downtown and Al Barsha. We also serve other Emirates upon request.",
  },
  {
    q: "Do you offer AC cleaning and AC services in Dubai?",
    a: "Yes. Our AC services in Dubai include AC cleaning, duct cleaning, repair, gas top-up and preventive HVAC maintenance for residential and commercial units.",
  },
  {
    q: "Can I get plumbing and drain cleaning in Dubai?",
    a: "Yes. We provide plumbing services and drain cleaning across Dubai — leak repairs, drainage maintenance, pipe work and emergency call-outs for villas and apartments.",
  },
  {
    q: "Do you provide electrical services in Dubai?",
    a: "Yes. Our electrical services cover wiring, panels, lighting, ELV, CCTV and access control for homes and commercial properties in Dubai and Dubai South.",
  },
  {
    q: "How quickly can a technician visit my property?",
    a: "Most bookings are confirmed within the hour during working hours. For Dubai South and nearby areas we prioritize fast response times, with 24/7 emergency support available.",
  },
  {
    q: "Do you offer renovation and deep cleaning in Dubai?",
    a: "Yes. Alongside core building maintenance, we provide renovation and deep cleaning services for villas, apartments and offices across Dubai.",
  },
  {
    q: "Is Fixoo Nova licensed and insured?",
    a: "Yes. We are a licensed and insured building maintenance company in Dubai, with vetted technicians and transparent quotes on every job.",
  },
];

const process = [
  { n: "01", t: "Book", d: "Tell us what you need by phone, WhatsApp or our online form." },
  { n: "02", t: "Survey", d: "Our specialist visits, inspects and prepares a transparent quote." },
  {
    n: "03",
    t: "Execute",
    d: "Certified technicians arrive on time and deliver clean, careful work.",
  },
  { n: "04", t: "Aftercare", d: "Workmanship warranty and proactive follow-up on every job." },
];

const testimonials = [
  {
    name: "Aisha R.",
    role: "Villa Owner, Jumeirah",
    quote:
      "From the first call to the final polish, the team was meticulous. The villa feels brand new.",
  },
  {
    name: "Daniel K.",
    role: "Office Manager, DIFC",
    quote:
      "Reliable, on time and incredibly professional. Our office maintenance has never been smoother.",
  },
  {
    name: "Priya S.",
    role: "Apartment Resident, Marina",
    quote:
      "The deep cleaning service was outstanding. Worth every dirham — I've already booked again.",
  },
  {
    name: "Omar H.",
    role: "Property Manager, Abu Dhabi",
    quote:
      "Their preventive maintenance plan reduced our emergency callouts in the first month itself.",
  },
  {
    name: "Nadia M.",
    role: "Homeowner, Arabian Ranches",
    quote:
      "The team handled AC servicing and deep cleaning in one visit, with spotless execution.",
  },
  {
    name: "Rahul P.",
    role: "Tenant, Downtown Dubai",
    quote:
      "Booking was effortless and the technicians were punctual, polite and very detail oriented.",
  },
  {
    name: "Leila S.",
    role: "Office Admin, Business Bay",
    quote:
      "From electrical fixes to routine checks, everything was documented and delivered professionally.",
  },
  {
    name: "Yousef A.",
    role: "Villa Owner, Palm Jumeirah",
    quote:
      "They treated our home with real care. The finishing quality felt premium at every step.",
  },
];

const HOME_POPUP_KEY = "fixoo_nova_home_popup_seen_v1";

const bookingServices = [
  "Annual Maintenance Plan",
  "AC & HVAC",
  "Plumbing",
  "Electrical & ELV",
  "General Maintenance",
  "Other",
];

const popupServices = [
  "Annual Maintenance Plan",
  ...new Set(services.map((service) => service.title)),
  "General Maintenance",
  "Other",
];

const heroSlides = [
  {
    src: "https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_1200,h_900/v1781679814/ac_dqt6h1.jpg",
    srcSet:
      "https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_640,h_480/v1781679814/ac_dqt6h1.jpg 640w, https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_800,h_600/v1781679814/ac_dqt6h1.jpg 800w, https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_1200,h_900/v1781679814/ac_dqt6h1.jpg 1200w",
    alt: "Technician servicing a ceiling-mounted air conditioning unit",
  },
  {
    src: "https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_1200,h_900/v1781679814/electrician_bwsryp.jpg",
    srcSet:
      "https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_640,h_480/v1781679814/electrician_bwsryp.jpg 640w, https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_800,h_600/v1781679814/electrician_bwsryp.jpg 800w, https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_1200,h_900/v1781679814/electrician_bwsryp.jpg 1200w",
    alt: "Electrician working on an industrial electrical control panel",
  },
  {
    src: "https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_1200,h_900/v1781679814/plumbing_ale4fg.jpg",
    srcSet:
      "https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_640,h_480/v1781679814/plumbing_ale4fg.jpg 640w, https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_800,h_600/v1781679814/plumbing_ale4fg.jpg 800w, https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto,f_auto,c_fill,w_1200,h_900/v1781679814/plumbing_ale4fg.jpg 1200w",
    alt: "Plumber performing professional plumbing maintenance",
  },
];

export default function IndexPage() {
  const [showPopup, setShowPopup] = useState(false);
  const popupForm = useContactFormSubmit(FORM_SOURCES.homePopup);
  const videoBookingForm = useContactFormSubmit(FORM_SOURCES.homeVideoBooking);
  const homeContactForm = useContactFormSubmit(FORM_SOURCES.homeContact);
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  useEffect(() => {
    try {
      const hasSeenPopup = window.localStorage.getItem(HOME_POPUP_KEY);
      if (hasSeenPopup) return;

      const timer = window.setTimeout(() => {
        setShowPopup(true);
        window.localStorage.setItem(HOME_POPUP_KEY, "true");
      }, 4500);

      return () => window.clearTimeout(timer);
    } catch {
      const timer = window.setTimeout(() => setShowPopup(true), 4500);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!heroApi) {
      return;
    }

    const updateActiveSlide = () => {
      setActiveHeroIndex(heroApi.selectedScrollSnap());
    };

    updateActiveSlide();
    heroApi.on("select", updateActiveSlide);
    heroApi.on("reInit", updateActiveSlide);

    const autoRotate = window.setInterval(() => {
      heroApi.scrollNext();
    }, 5000);

    return () => {
      window.clearInterval(autoRotate);
      heroApi.off("select", updateActiveSlide);
      heroApi.off("reInit", updateActiveSlide);
    };
  }, [heroApi]);

  useEffect(() => {
    return injectJsonLd("fixoo-nova-home-schema", {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        {
          ...localBusinessSchema,
          image: heroSlides[0]?.src ?? localBusinessSchema.image,
        },
        {
          "@type": "Service",
          "@id": `${SITE_URL}/#service`,
          name: "Building Maintenance Services",
          serviceType: "Building Maintenance",
          provider: {
            "@id": `${SITE_URL}/#localbusiness`,
          },
          areaServed: ["Dubai", "Dubai South"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Building Maintenance Services in Dubai",
            itemListElement: services.map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.title,
                description: service.desc,
              },
            })),
          },
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/#faq`,
          mainEntity: homeFaqs.map((faq) => ({
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

  useEffect(() => {
    const revealGroups = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-group]"));

    if (!revealGroups.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const group = entry.target as HTMLElement;
            const revealItems = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-card]"));

            revealItems.forEach((item, index) => {
              item.style.transitionDelay = `${index * 240}ms`;
              item.classList.add("is-visible");
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -25% 0px",
        threshold: 0.15,
      },
    );

    revealGroups.forEach((group) => {
      observer.observe(group);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="max-w-xl rounded-2xl border border-primary/25 bg-card p-0">
          <div className="p-6 sm:p-8">
            <DialogHeader>
              <span className="eyebrow">WELCOME TO FIXOO NOVA</span>
              <DialogTitle className="font-display text-3xl mt-2">Book your first service visit</DialogTitle>
              <DialogDescription className="mt-2">
                Tell us what you need and our team will contact you with the best plan.
              </DialogDescription>
            </DialogHeader>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => popupForm.handleSubmit(e)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <PopupField label="Name" name="popup-name" required />
                <PopupField label="Phone" name="popup-phone" type="tel" required />
              </div>

              <div>
                <label htmlFor="popup-service" className="text-xs uppercase tracking-widest text-muted-foreground">Service</label>
                <select
                  id="popup-service"
                  name="popup-service"
                  required
                  defaultValue=""
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {popupServices.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="popup-message" className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  id="popup-message"
                  name="popup-message"
                  rows={3}
                  required
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={popupForm.isLoading}
                className="btn-primary w-full justify-center disabled:opacity-70"
              >
                {popupForm.isLoading
                  ? "Sending..."
                  : popupForm.isSuccess
                    ? "Request Received"
                    : "Submit Request"}
              </button>
              <FormSubmitFeedback error={popupForm.error} />
              <FormSuccessMessage show={popupForm.isSuccess} />
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden bg-[#090f16]">
        <div className="relative h-full w-full">
          <div className="pointer-events-none absolute -top-28 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.42)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
          <div className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.16_72/0.36)_0%,transparent_74%)] blur-3xl mix-blend-screen" />
          <div className="pointer-events-none absolute right-[17%] top-[17%] h-80 w-80 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.38)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
          <div className="pointer-events-none absolute left-[37%] top-[46%] h-56 w-56 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.16_72/0.36)_0%,transparent_74%)] blur-3xl mix-blend-screen" />
          <div className="pointer-events-none absolute left-[8%] bottom-[10%] h-52 w-52 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.16_72/0.34)_0%,transparent_75%)] blur-3xl mix-blend-screen" />
          <div className="pointer-events-none absolute right-[10%] bottom-[8%] h-60 w-60 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.34)_0%,transparent_74%)] blur-3xl mix-blend-screen" />

          <div className="relative mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-6 py-24 sm:px-8 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-5 lg:self-center">
              <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                Trusted Building Maintenance Company in Dubai
              </span>

              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[3.25rem]">
                Building Maintenance{" "}
                <span className="text-gradient-gold">Company in Dubai</span>
              </h1>

              <h2 className="mt-4 max-w-lg text-base font-medium leading-snug text-white/90 sm:text-lg">
                24/7 Property Maintenance Services Across Dubai with Dedicated Support in Dubai
                South.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                Fixoo Nova is a trusted building maintenance company in Dubai providing 24/7
                property maintenance services for residential, commercial and industrial properties.
                We specialize in AC services, electrical, plumbing, handyman services, renovation
                and annual maintenance contracts, with dedicated teams serving Dubai South and
                surrounding communities.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["AC Repair", "Pipe Leaks", "Electrical Faults", "24/7 Emergency"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/services" className="btn-primary">
                  Explore Services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/12"
                >
                  Book a Visit
                </Link>
              </div>

              <div className="mt-8 grid max-w-md grid-cols-3 gap-3 rounded-2xl border border-white/15 bg-black/25 p-4 text-white backdrop-blur">
                {[
                  { label: "Years Experience", value: "28+" },
                  { label: "Emergency Line", value: "24/7" },
                  { label: "Happy Clients", value: "1K+" },
                ].map((item) => (
                  <div key={item.label} className="min-w-0">
                    <p className="text-lg font-bold leading-none text-white">{item.value}</p>
                    <p className="mt-1 truncate text-[10px] uppercase tracking-[0.12em] text-white/60">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 lg:self-center">
              <Carousel
                className="w-full"
                opts={{ align: "start", loop: true, duration: 45 }}
                setApi={setHeroApi}
              >
                <CarouselContent className="-ml-0">
                  {heroSlides.map((slide, index) => (
                    <CarouselItem key={slide.src} className="pl-0">
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
                        <img
                          src={slide.src}
                          srcSet={slide.srcSet}
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          alt={slide.alt}
                          className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[56vh]"
                          width={1200}
                          height={900}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding={index === 0 ? "sync" : "async"}
                          fetchPriority={index === 0 ? "high" : "low"}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="mt-6 flex items-center justify-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    aria-label={`Go to hero slide ${index + 1}`}
                    onClick={() => heroApi?.scrollTo(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeHeroIndex === index
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/about"
            className="glow-border-banner relative z-10 mx-6 mb-6 flex min-h-12 items-center justify-center rounded-lg border border-primary/35 bg-black/30 px-5 py-3 text-center backdrop-blur-sm transition hover:border-primary/60 hover:bg-primary/10 sm:mx-8 md:absolute md:bottom-5 md:left-1/2 md:mx-0 md:w-[calc(100%-5rem)] md:max-w-7xl md:-translate-x-1/2 lg:px-10"
          >
            <span className="relative z-[1] text-sm font-semibold tracking-wide text-gradient-gold sm:text-base">
              28+ Years of Property Maintenance Expertise
            </span>
          </Link>
        </div>
      </section>
      {/* VIDEO + BOOKING */}
      <section className="relative w-full overflow-hidden bg-secondary/40 lg:h-[calc(100svh-4.5rem)] lg:max-h-[720px]">
        <div className="grid h-full lg:grid-cols-2">
          <div className="relative h-[30vh] max-h-[260px] overflow-hidden bg-[#090f16] sm:h-[34vh] sm:max-h-[300px] lg:h-full lg:max-h-none">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Fixoo Nova maintenance services showcase"
            >
              <source src={servicesVideoSrc} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090f16]/70 via-[#090f16]/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#090f16]/30" />
            <div className="absolute bottom-4 left-4 hidden max-w-[220px] rounded-lg border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-md lg:block">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">Watch us work</p>
              <p className="mt-0.5 text-xs leading-snug text-white/75">
                AC, plumbing and electrical experts across Dubai.
              </p>
            </div>
          </div>

          <div className="flex items-center overflow-y-auto px-5 py-6 sm:px-8 lg:px-10 lg:py-5">
            <div className="premium-card w-full border-primary/15 p-5 shadow-elegant sm:p-6">
              <span className="eyebrow">Quick Booking</span>
              <h2 className="font-display mt-1.5 text-2xl sm:text-3xl">
                Book a service <span className="text-gradient-gold">visit</span>
              </h2>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">
                Our team will confirm your appointment — usually within the hour.
              </p>

              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => videoBookingForm.handleSubmit(e)}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <PopupField label="Name" name="video-name" required compact />
                  <PopupField label="Phone" name="video-phone" type="tel" required compact />
                </div>

                <PopupField label="Email" name="video-email" type="email" required compact />

                <div>
                  <label htmlFor="video-service" className="text-xs uppercase tracking-widest text-muted-foreground">Service</label>
                  <select
                    id="video-service"
                    name="video-service"
                    required
                    defaultValue=""
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none transition"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {bookingServices.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="video-message" className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea
                    id="video-message"
                    name="video-message"
                    rows={2}
                    placeholder="Describe your issue or preferred visit time..."
                    required
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={videoBookingForm.isLoading}
                  className="btn-primary w-full justify-center py-2.5 text-sm disabled:opacity-70"
                >
                  {videoBookingForm.isLoading
                    ? "Sending..."
                    : videoBookingForm.isSuccess
                      ? "Booking Request Sent"
                      : "Book Now"}
                </button>

                {videoBookingForm.isSuccess ? (
                  <p className="text-center text-xs text-muted-foreground">
                    Thank you — we will contact you shortly to confirm your visit.
                  </p>
                ) : videoBookingForm.isError ? (
                  <FormSubmitFeedback error={videoBookingForm.error} />
                ) : (
                  <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    Prefer to call?{" "}
                    <a href="tel:+971508001238" className="font-medium text-primary hover:underline">
                      +971 50 800 1238
                    </a>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section data-reveal-group className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              data-reveal-card
              className="group p-8 premium-card premium-card-hover reveal-card"
            >
              <div className="icon-gold mb-5">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section data-reveal-group className="relative w-full overflow-hidden py-24 px-6 lg:px-10 bg-[#0a1018]">
        <div className="pointer-events-none absolute -left-16 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.34)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute right-[10%] top-[18%] h-60 w-60 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.16_72/0.28)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute left-[35%] bottom-[14%] h-44 w-44 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.24)_0%,transparent_76%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute right-[16%] bottom-8 h-56 w-56 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.16_72/0.32)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
        <div className="mx-auto max-w-7xl rounded-[2rem] border-white/10 px-6 py-10 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:px-10 lg:px-12 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <span className="eyebrow text-white/65">What We Do</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 text-white">
              Building Maintenance Services in{" "}
              <span className="text-gradient-gold">Dubai</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-medium text-white/85 hover:gap-3 hover:text-white transition-all"
          >
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </div>


        <div className="mx-auto max-w-7xl rounded-[2rem] border-white/10 px-6 pb-10 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:px-10 lg:px-12 lg:pb-14">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              to="/services"
              key={s.title}
              data-reveal-card
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-white/20 reveal-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl mb-2 text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* YEARLY MAINTENANCE OFFER */}
      <section data-reveal-group className="relative w-full overflow-hidden py-24 px-6 lg:px-10">
        <div className="pointer-events-none absolute -right-10 top-8 h-80 w-80 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.2)_0%,transparent_72%)] blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-card shadow-elegant">
            <div className="grid lg:grid-cols-2">
              <div data-reveal-card className="reveal-card p-10 sm:p-12 lg:p-14">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-wide text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> Yearly Maintenance Offer
                </span>
                <h2 className="font-display mt-6 text-4xl sm:text-5xl leading-tight">
                  One contract for{" "}
                  <span className="text-gradient-gold">AC, plumbing & electrical</span>.
                </h2>
                <p className="mt-5 max-w-lg text-muted-foreground leading-relaxed">
                  Skip the emergency call-outs. Our annual maintenance plan covers scheduled
                  servicing, preventive inspections and priority support for your entire property —
                  all year round.
                </p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: Wind, label: "AC & HVAC servicing" },
                    { icon: Droplets, label: "Plumbing checks & repairs" },
                    { icon: Zap, label: "Electrical & ELV inspections" },
                    { icon: Wrench, label: "General property upkeep" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-3 text-sm">
                      <div className="icon-gold shrink-0 !mb-0 scale-90">
                        <item.icon className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link to="/maintenance-plan" className="btn-primary">
                    View Plans & Pricing <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href="tel:+971508001238" className="btn-outline">
                    <Phone className="h-4 w-4" /> Get a Quote
                  </a>
                </div>
              </div>
              <div
                data-reveal-card
                className="reveal-card relative flex flex-col justify-center border-t border-border lg:border-l lg:border-t-0 bg-secondary/40 p-10 sm:p-12 lg:p-14"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
                <div className="relative space-y-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="mt-1 h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-display text-xl">Scheduled visits</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        4 to 12 visits per year depending on your plan — we handle the calendar.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="mt-1 h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-display text-xl">Priority support</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Faster response times and dedicated technicians who know your property.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-display text-xl">Transparent reporting</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Detailed reports after every visit — apartments, villas and offices.
                      </p>
                    </div>
                  </div>
                  <p className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Free site survey</span> — we
                    assess your property and recommend the right plan with no obligation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER STRIP */}
      <section className="relative w-full overflow-hidden">
        <img
          src={heroBuilding}
          alt="Luxury Dubai villa at golden hour"
          loading="lazy"
          width={1920}
          height={1080}
          className="h-[420px] w-full object-cover sm:h-[520px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <span className="eyebrow">
                Trusted Building Maintenance Company in Dubai
              </span>
              <h2 className="font-display text-4xl sm:text-5xl mt-3 mb-4 leading-tight">
                Serving Dubai with Dedicated Support in{" "}
                <span className="text-gradient-gold">Dubai South</span>.
              </h2>
              <p className="text-muted-foreground mb-4">
                We provide building maintenance across Dubai communities including Dubai South, DIP,
                Villanova, Discovery Gardens, Damac Hills 2, Expo City, JVC, JVT, Business Bay,
                Dubai Marina, Palm Jumeirah and Downtown Dubai.
              </p>
              <p className="text-muted-foreground mb-6">
                We also serve other Emirates upon request.
              </p>
              <Link
                to="/services"
                className="btn-primary"
              >
                Browse Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section data-reveal-group className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow">HOW WE WORK</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3">
            A <span className="text-gradient-gold">simple</span>, transparent process.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((p) => (
            <div
              key={p.n}
              data-reveal-card
              className="reveal-card relative p-8 premium-card premium-card-hover"
            >
              <div className="font-display text-5xl text-gradient-gold mb-4">{p.n}</div>
              <h3 className="font-semibold text-lg mb-2">{p.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <section data-reveal-group className="relative w-full overflow-hidden bg-[#0a1018] py-20 px-6 lg:px-10">
        <div className="pointer-events-none absolute -right-10 top-4 h-80 w-80 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.3)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute left-[8%] top-[28%] h-48 w-48 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.16_72/0.26)_0%,transparent_74%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute left-[12%] bottom-0 h-60 w-60 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.16_72/0.3)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute right-[34%] bottom-[6%] h-44 w-44 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.22)_0%,transparent_76%)] blur-3xl mix-blend-screen" />
        <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <span className="eyebrow text-white/65">RECENT WORK</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 text-white">
              Projects we are <span className="text-gradient-gold">proud of</span>.
            </h2>
          </div>
          <p className="max-w-md text-white/70">
            Specialist AC repairs, electrical installations and plumbing fixes — the core work our
            team delivers every day across Dubai.
          </p>
        </div>
        <div className="grid md:grid-cols-12 gap-4">
          <div
            data-reveal-card
            className="reveal-card md:col-span-7 overflow-hidden rounded-2xl border border-white/10 shadow-elegant"
          >
            <img
              src={projectGallery.main.src}
              alt={projectGallery.main.alt}
              loading="lazy"
              width={1280}
              height={960}
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
          <div className="md:col-span-5 grid gap-4">
            <div
              data-reveal-card
              className="reveal-card overflow-hidden rounded-2xl border border-white/10 shadow-elegant"
            >
              <img
                src={projectGallery.electrical.src}
                alt={projectGallery.electrical.alt}
                loading="lazy"
                width={1280}
                height={960}
                className="w-full h-full object-cover aspect-[16/10]"
              />
            </div>
            <div
              data-reveal-card
              className="reveal-card overflow-hidden rounded-2xl border border-white/10 shadow-elegant"
            >
              <img
                src={projectGallery.plumbing.src}
                alt={projectGallery.plumbing.alt}
                loading="lazy"
                width={1280}
                height={960}
                className="w-full h-full object-cover aspect-[16/10]"
              />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* WHY US split */}
      <section data-reveal-group className="py-24 px-6 lg:px-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div
          data-reveal-card
          className="reveal-card rounded-3xl overflow-hidden border border-border shadow-elegant"
        >
          <img
            src={team}
            alt="Fixoo Nova service team"
            loading="lazy"
            width={1600}
            height={1067}
            className="w-full h-full object-cover"
          />
        </div>
        <div data-reveal-card className="reveal-card">
          <span className="eyebrow">WHY FIXOO NOVA</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 mb-6">
            A team that takes <span className="text-gradient-gold">ownership</span>.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            With more than 28 years in property maintenance, every Fixoo Nova technician is vetted,
            trained and uniformed. We use premium tools, document our work and stand behind every
            job with a written warranty.
          </p>
          <ul className="space-y-3">
            {[
              "28+ years of industry experience across Dubai",
              "Licensed and insured building maintenance company in Dubai",
              "Transparent quotes — no hidden surprises",
              "Eco-friendly chemicals and cleaning agents",
              "24/7 emergency response available",
              "Workmanship warranty on every project",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" /> <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section data-reveal-group className="relative w-full overflow-hidden bg-[#0a1018] py-24 px-6 lg:px-10">
        <div className="pointer-events-none absolute -right-12 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.3)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute left-[10%] top-[22%] h-52 w-52 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.16_72/0.24)_0%,transparent_74%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute left-[8%] bottom-2 h-52 w-52 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.16_72/0.28)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute right-[28%] bottom-[10%] h-44 w-44 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.2)_0%,transparent_76%)] blur-3xl mix-blend-screen" />
        <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <span className="eyebrow text-white/65">CLIENT VOICES</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 text-white">
            Trusted by <span className="text-gradient-gold">homeowners</span> & businesses.
          </h2>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem
                key={t.name}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div
                  data-reveal-card
                  className="reveal-card relative h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:border-white/20"
                >
                  <Quote className="mb-4 h-8 w-8 text-primary/50" />
                  <p className="mb-6 text-sm leading-relaxed text-white/75">"{t.quote}"</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/55">{t.role}</div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 sm:-left-6 border-white/20 bg-black/45 text-white hover:bg-black/65" />
          <CarouselNext className="-right-4 sm:-right-6 border-white/20 bg-black/45 text-white hover:bg-black/65" />
        </Carousel>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto rounded-3xl border border-primary/20 bg-card p-12 lg:p-16 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-transparent" />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl mb-5">
              Every job. <span className="text-gradient-gold">Same enthusiasm.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              From a single repair to a complete renovation — book a hassle-free appointment with
              our building maintenance team in Dubai today.
            </p>
            <a href="tel:+971508001238" className="btn-primary">
              <Phone className="h-4 w-4" /> Call +971 50 800 1238
            </a>
          </div>
        </div>
      </section>

      {/* AREAS WE SERVE */}
      <section data-reveal-group className="py-24 px-6 lg:px-10 max-w-7xl mx-auto" id="areas-we-serve">
        <div className="text-center mb-12">
          <span className="eyebrow">LOCAL COVERAGE</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3">
            Areas We <span className="text-gradient-gold">Serve</span>
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div data-reveal-card className="reveal-card space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Fixoo Nova proudly provides building maintenance services across Dubai. As a trusted
              building maintenance company in Dubai, we focus on fast response, clear communication
              and reliable workmanship for homes, villas, apartments and commercial properties —
              with dedicated support for Dubai South and surrounding communities.
            </p>
            <p>
              Property owners in Dubai South, Dubai Investment Park (DIP), Villanova, Discovery
              Gardens and Damac Hills 2 choose us for routine property maintenance and urgent
              call-outs alike. Whether you need AC cleaning after a dusty summer, plumbing and drain
              cleaning after a leak, electrical safety checks, or a full annual maintenance
              contract, our teams arrive prepared with the right tools and transparent pricing.
            </p>
            <p>
              We also serve established communities such as JVC, JVT, Dubai Marina, Downtown Dubai,
              Business Bay, Al Barsha and Palm Jumeirah. Local knowledge matters: technicians who
              regularly work in these areas understand building types, access rules and typical
              maintenance patterns — which means quicker diagnostics and fewer return visits.
            </p>
            <p>
              With more than 28 years of industry experience, Fixoo Nova combines AC services,
              electrical, plumbing, handyman, renovation and deep cleaning under one partner. That
              single point of contact helps landlords, facility managers and homeowners keep
              properties safe, cool and well maintained year-round. We also serve other Emirates
              upon request.
            </p>
          </div>

          <div data-reveal-card className="reveal-card premium-card p-8">
            <h3 className="font-display text-2xl mb-5">
              Frequently served <span className="text-gradient-gold">communities</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {areasWeServe.map((area) => (
                <li key={area} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-reveal-group className="relative w-full overflow-hidden bg-[#0a1018] py-24 px-6 lg:px-10" id="faq">
        <div className="pointer-events-none absolute -left-16 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.14_76/0.28)_0%,transparent_72%)] blur-3xl mix-blend-screen" />
        <div className="pointer-events-none absolute right-[12%] bottom-[10%] h-56 w-56 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.16_72/0.24)_0%,transparent_74%)] blur-3xl mix-blend-screen" />
        <div className="relative mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="eyebrow text-white/65">FAQ</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 text-white">
              Building maintenance questions,{" "}
              <span className="text-gradient-gold">answered</span>.
            </h2>
            <p className="mt-4 text-white/70">
              Common questions about property maintenance, AC services and Annual Maintenance
              Contracts in Dubai and Dubai South.
            </p>
          </div>
          <div className="space-y-3">
            {homeFaqs.map((faq) => (
              <details
                key={faq.q}
                data-reveal-card
                className="reveal-card group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
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

      {/* HOME CONTACT */}
      <section data-reveal-group className="py-24 px-6 lg:px-10 max-w-7xl mx-auto" id="home-contact">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div
            data-reveal-card
            className="reveal-card lg:sticky lg:top-[4.5rem] lg:self-start"
          >
            <span className="eyebrow">CONTACT US</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3">
              Tell us what you need. We will get back <span className="text-gradient-gold">today</span>.
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Share your property details and service request. Our team will review your message
              and contact you with the next steps and a clear estimate.
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p>Phone: +971 50 800 1238</p>
              <p>Email: info@fixoonova.ae</p>
              <p>Coverage: Dubai South, DIP, Villanova, Discovery Gardens, Damac Hills 2, JVC, Dubai Marina, Business Bay and more.</p>
            </div>
          </div>

          <div data-reveal-card className="reveal-card premium-card p-6 sm:p-8 lg:min-h-[32rem]">
            <form
              className="space-y-4"
              onSubmit={(e) => homeContactForm.handleSubmit(e)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <PopupField label="Name" name="home-name" required />
                <PopupField label="Phone" name="home-phone" type="tel" required />
              </div>

              <PopupField label="Email" name="home-email" type="email" required />

              <div>
                <label htmlFor="home-service" className="text-xs uppercase tracking-widest text-muted-foreground">Service</label>
                <select
                  id="home-service"
                  name="home-service"
                  required
                  defaultValue=""
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {popupServices.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="home-message" className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  id="home-message"
                  name="home-message"
                  rows={7}
                  required
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={homeContactForm.isLoading}
                className="btn-primary w-full justify-center disabled:opacity-70"
              >
                {homeContactForm.isLoading
                  ? "Sending..."
                  : homeContactForm.isSuccess
                    ? "Request Sent"
                    : "Send Request"}
              </button>
              <FormSubmitFeedback error={homeContactForm.error} />
              <FormSuccessMessage show={homeContactForm.isSuccess} />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function PopupField({
  label,
  name,
  type = "text",
  required,
  compact,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  compact?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={`w-full rounded-lg border border-input bg-background text-sm focus:border-primary focus:outline-none transition ${
          compact ? "mt-1.5 px-3 py-2.5" : "mt-2 px-4 py-3"
        }`}
      />
    </div>
  );
}
