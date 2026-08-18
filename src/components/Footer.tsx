import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/fixoo-nova-logo.png";
import { OFFICE_ADDRESS } from "@/lib/seo";

export function Footer() {
  return (
    <footer className="relative mt-28 border-t border-border/60">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent absolute top-0" />
      <div className="glass-nav text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid gap-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={logo}
                alt="Fixoo Nova"
                className="h-12 w-auto"
                width={48}
                height={48}
                loading="lazy"
              />
              <div>
                <div className="font-display text-2xl text-gradient-gold font-semibold tracking-[0.04em]">
                  FIXOO NOVA
                </div>
                <div className="text-[9px] tracking-[0.35em] text-white/70 font-medium mt-0.5">
                  BUILDING MAINTENANCE
                </div>
              </div>
            </div>
            <p className="text-white/80 text-sm max-w-md leading-relaxed">
              Your complete building maintenance partner in Dubai. We deliver premium AC, plumbing,
              electrical and property maintenance services with dedicated support across Dubai South
              and surrounding communities.
            </p>
          </div>
          <div>
            <h4 className="eyebrow mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-white/80">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/maintenance-plan", label: "Maintenance Plan" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>+971 50 800 1238</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>info@fixoonova.ae</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{OFFICE_ADDRESS.display}</span>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              {[
                { href: "https://www.instagram.com/fixoonova/", label: "Instagram", icon: Instagram },
                {
                  href: "https://www.facebook.com/profile.php?id=61591712577093",
                  label: "Facebook",
                  icon: Facebook,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/85 transition hover:border-primary/50 hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="divider-gold max-w-7xl mx-auto" />
        <div className="py-7 text-center text-xs text-white/70 tracking-wide">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} Fixoo Nova Building Maintenance. All rights reserved.</span>
            <span className="text-white/40">|</span>
            <span>
            Design and Developed by {" "}
            <a
              href="https://www.mentecode.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              www.mentecode.com
            </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
