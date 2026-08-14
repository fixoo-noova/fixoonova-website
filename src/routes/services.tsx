import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wind,
  Paintbrush,
  Wrench,
  Home,
  Sparkles,
  Sofa,
  Bed,
  Bug,
  Cctv,
  DoorOpen,
  Droplets,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FORM_SOURCES } from "@/lib/emailjs";
import {
  FormSubmitFeedback,
  FormSuccessMessage,
  useContactFormSubmit,
} from "@/hooks/useContactFormSubmit";
import ac from "@/assets/service-ac.jpg";
import reno from "@/assets/service-renovation.jpg";
import clean from "@/assets/service-cleaning.jpg";
import electrical from "@/assets/service-electrical.jpg";
import plumbing from "@/assets/service-plumbing.jpg";
import kitchen from "@/assets/project-kitchen.jpg";

const featuredServices = [
  {
    img: ac,
    t: "AC & HVAC",
    alt: "AC technician servicing an air conditioning unit for building maintenance in Dubai",
  },
  {
    img: reno,
    t: "Renovation",
    alt: "Villa renovation and interior upgrade completed by Fixoo Nova in Dubai",
  },
  {
    img: clean,
    t: "Deep Cleaning",
    alt: "Professional deep cleaning of a Dubai apartment by Fixoo Nova",
  },
  {
    img: electrical,
    t: "Electrical & ELV",
    alt: "Electrician working on an electrical panel for a Dubai property",
  },
  {
    img: plumbing,
    t: "Plumbing",
    alt: "Plumber repairing pipes and drainage as part of Dubai building maintenance",
  },
  {
    img: kitchen,
    t: "Kitchen & Joinery",
    alt: "Custom kitchen joinery and fittings installed by Fixoo Nova in Dubai",
  },
];

const groups = [
  {
    title: "Maintenance",
    items: [
      {
        icon: Wind,
        t: "AC Duct Cleaning",
        d: "Regular sanitization for clean, healthy indoor air.",
      },
      { icon: Wind, t: "AC Service", d: "Keep your home cool and fresh year-round." },
      {
        icon: Paintbrush,
        t: "Painting",
        d: "Interior & exterior painting that transforms spaces.",
      },
      {
        icon: ShieldCheck,
        t: "Annual Maintenance Contracts",
        d: "Preventive, routine, corrective and civil maintenance.",
      },
      { icon: Wrench, t: "Handyman", d: "From a light bulb to custom fixes — done right." },
    ],
  },
  {
    title: "Renovation",
    items: [
      {
        icon: Home,
        t: "Villa & Office Renovation",
        d: "Full transformations with premium materials and fixtures.",
      },
      {
        icon: Home,
        t: "Bathroom Renovation",
        d: "360° renovation and upgrade with luxurious finishes.",
      },
    ],
  },
  {
    title: "Cleaning",
    items: [
      {
        icon: Sparkles,
        t: "Deep Cleaning",
        d: "Apartments, villas and offices — eco-friendly agents.",
      },
      { icon: Sofa, t: "Sofa Cleaning", d: "Pollution-free sofas, extended life." },
      { icon: Bed, t: "Mattress & Carpet", d: "Removes dust mites, allergens and stains." },
      { icon: Sparkles, t: "Curtain Cleaning", d: "Onsite curtain cleaning — sanitized in place." },
    ],
  },
  {
    title: "ELV Systems",
    items: [
      { icon: Cctv, t: "Intercom & CCTV", d: "Audio-video intercom and surveillance integration." },
      { icon: ShieldCheck, t: "Access Control", d: "Smart, sensor-based door access solutions." },
      { icon: DoorOpen, t: "Gate Barriers & Sliding Doors", d: "Durable, smart entry systems." },
    ],
  },
  {
    title: "Specialized",
    items: [
      { icon: Bug, t: "Pest Control & AMC", d: "Licensed, safe and effective pest management." },
      {
        icon: Droplets,
        t: "Water Tank Cleaning",
        d: "Drain, disinfect, scrub — minimal interruption.",
      },
      {
        icon: Droplets,
        t: "Sump Pit & Grease Trap",
        d: "Commercial cleaning to municipal standards.",
      },
    ],
  },
];

const serviceOptions = groups.flatMap((group) =>
  group.items.map((item) => ({
    label: `${group.title} - ${item.t}`,
    value: item.t,
  })),
);

const popupServiceOptions = [
  ...new Map(
    [...serviceOptions.map((option) => [option.value, option]), ...featuredServices.map((service) => [service.t, { label: service.t, value: service.t }])],
  ).values(),
  { label: "Other", value: "Other" },
];

export default function ServicesPage() {
  const inquiryForm = useContactFormSubmit(FORM_SOURCES.servicesInquiry);
  const popupForm = useContactFormSubmit(FORM_SOURCES.servicesPopup);
  const [showServicePopup, setShowServicePopup] = useState(false);
  const [selectedPopupService, setSelectedPopupService] = useState("");

  const openServicePopup = (service: string) => {
    setSelectedPopupService(service);
    popupForm.reset();
    setShowServicePopup(true);
  };

  return (
    <>
      <Dialog open={showServicePopup} onOpenChange={setShowServicePopup}>
        <DialogContent className="max-w-xl rounded-2xl border border-primary/25 bg-card p-0">
          <div className="p-6 sm:p-8">
            <DialogHeader>
              <span className="eyebrow">SERVICE REQUEST</span>
              <DialogTitle className="font-display text-3xl mt-2">Book this service</DialogTitle>
              <DialogDescription className="mt-2">
                Submit your details and our team will contact you with the best plan.
              </DialogDescription>
            </DialogHeader>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => popupForm.handleSubmit(e)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="popup-name" required />
                <Field label="Phone" name="popup-phone" type="tel" required />
              </div>

              <Field label="Email" name="popup-email" type="email" required />

              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Service</label>
                <select
                  name="popup-service"
                  required
                  value={selectedPopupService}
                  onChange={(e) => setSelectedPopupService(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {popupServiceOptions.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  name="popup-message"
                  rows={4}
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

      <section className="px-6 lg:px-10 pt-24 pb-12 max-w-7xl mx-auto">
        <span className="eyebrow">WHAT WE OFFER</span>
        <h1 className="font-display text-5xl sm:text-6xl mt-4 mb-6 max-w-4xl leading-tight">
          Building Maintenance Services in{" "}
          <span className="text-gradient-gold">Dubai</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          From routine upkeep to complete transformations — Fixoo Nova handles every detail with
          master-level care.
        </p>
      </section>

      <section className="px-6 lg:px-10 pb-12 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl mb-8">
          Featured building maintenance services
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredServices.map((s) => (
            <button
              type="button"
              key={s.t}
              onClick={() => openServicePopup(s.t)}
              className="relative rounded-2xl overflow-hidden border border-border shadow-elegant group"
            >
              <img
                src={s.img}
                alt={s.alt}
                loading="lazy"
                width={1280}
                height={960}
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-display text-xl">{s.t}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24 max-w-7xl mx-auto space-y-16">
        {groups.map((g) => (
          <div key={g.title}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-3xl">{g.title}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {g.items.map((i) => (
                <button
                  type="button"
                  key={i.t}
                  onClick={() => openServicePopup(i.t)}
                  className="p-7 premium-card premium-card-hover group"
                >
                  <div className="icon-gold mb-4">
                    <i.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{i.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{i.d}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="px-6 lg:px-10 pb-24 max-w-7xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="rounded-3xl border border-primary/20 bg-card p-10 lg:col-span-2 shadow-elegant">
            <span className="eyebrow">SERVICE INQUIRY</span>
            <h2 className="font-display text-3xl sm:text-4xl mt-3 mb-4">
              Request a building maintenance quote
            </h2>
            <p className="text-muted-foreground mb-8">
              Share your requirements and choose a service. Our team will contact you with a
              tailored plan and quote.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Fast response within working hours.</p>
              <p>Site visit scheduling available across Dubai.</p>
              <p>Transparent quote before work begins.</p>
            </div>
            <Link to="/contact" className="btn-outline mt-8">
              Talk to a specialist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <form
            onSubmit={(e) => inquiryForm.handleSubmit(e)}
            className="rounded-3xl border border-primary/20 bg-card p-8 lg:col-span-3 shadow-elegant"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Email" name="email" type="email" required />
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">
                  Service
                </label>
                <select
                  name="service"
                  required
                  defaultValue=""
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((service) => (
                    <option key={service.label} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={inquiryForm.isLoading}
              className="btn-primary mt-6 w-full justify-center sm:w-auto disabled:opacity-70"
            >
              {inquiryForm.isLoading
                ? "Sending..."
                : inquiryForm.isSuccess
                  ? "Thanks, request received"
                  : "Submit Request"}
            </button>
            <FormSubmitFeedback error={inquiryForm.error} />
            <FormSuccessMessage show={inquiryForm.isSuccess} />
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
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
      />
    </div>
  );
}
