import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { FORM_SOURCES } from "@/lib/emailjs";
import {
  FormSubmitFeedback,
  FormSuccessMessage,
  useContactFormSubmit,
} from "@/hooks/useContactFormSubmit";

export default function ContactPage() {
  const contactForm = useContactFormSubmit(FORM_SOURCES.contactPage);

  return (
    <>
      <section className="px-6 lg:px-10 pt-24 pb-12 max-w-7xl mx-auto">
        <span className="eyebrow">GET IN TOUCH</span>
        <h1 className="font-display text-5xl sm:text-6xl mt-4 mb-6 max-w-4xl leading-tight">
          Let's make your property <span className="text-gradient-gold">shine</span>.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Hassle-free booking. Premium service. Tell us what you need and our team will be in touch.
        </p>
      </section>

      <section className="px-6 lg:px-10 pb-8 max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-border shadow-elegant relative">
          <img
            src={"https://res.cloudinary.com/dg7r4k0up/image/upload/q_auto/f_auto/v1780903670/hero-banner-1_xdunup.jpg"}
            alt="Dubai luxury property"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent flex items-center">
            <div className="px-8 sm:px-14 max-w-xl">
              <h2 className="font-display text-3xl sm:text-4xl mb-3">
                Same-day visits across the UAE.
              </h2>
              <p className="text-muted-foreground">
                Reach us by phone, email or WhatsApp — we usually respond within an hour.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24 max-w-7xl mx-auto grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[
            { icon: Phone, t: "Phone", v: "+971 50 800 1238", h: "tel:+971508001238" },
            { icon: Mail, t: "Email", v: "info@fixoonova.ae", h: "mailto:info@fixoonova.ae" },
            {
              icon: MessageSquare,
              t: "WhatsApp",
              v: "+971 50 800 1238",
              h: "https://wa.me/971508001238",
            },
            { icon: MapPin, t: "Address", v: "Dubai, United Arab Emirates" },
            { icon: Clock, t: "Hours", v: "24 / 7 — Always on call" },
          ].map((c) => (
            <a
              key={c.t}
              href={c.h ?? "#"}
              className="block p-6 premium-card premium-card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="icon-gold shrink-0">
                  <c.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase">
                    {c.t}
                  </div>
                  <div className="font-medium mt-1">{c.v}</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <form
          onSubmit={(e) => contactForm.handleSubmit(e)}
          className="lg:col-span-3 p-8 premium-card space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" name="name" required />
            <Field label="Phone" name="phone" type="tel" required />
          </div>
          <Field label="Email" name="email" type="email" required />
          <Field label="Service Required" name="service" />
          <div>
            <label className="text-xs tracking-widest text-muted-foreground uppercase">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-2 w-full bg-background border border-input rounded-lg px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={contactForm.isLoading}
            className="btn-primary w-full justify-center disabled:opacity-70"
          >
            {contactForm.isLoading
              ? "Sending..."
              : contactForm.isSuccess
                ? "Thank you — we'll be in touch"
                : "Send Message"}
          </button>
          <FormSubmitFeedback error={contactForm.error} />
          <FormSuccessMessage show={contactForm.isSuccess} />
        </form>
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
      <label className="text-xs tracking-widest text-muted-foreground uppercase">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full bg-background border border-input rounded-lg px-4 py-3 text-sm focus:border-primary focus:outline-none transition"
      />
    </div>
  );
}
