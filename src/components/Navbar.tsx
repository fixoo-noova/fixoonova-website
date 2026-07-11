import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/fixoo-nova-logo.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/maintenance-plan", label: "Maintenance Plan" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-white/10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[4.5rem] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Fixoo Nova" className="h-12 w-auto brightness-110" width={52} height={52} />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-xl text-gradient-gold font-semibold tracking-[0.06em]">
              FIXOO NOVA
            </span>
            <span className="text-[9px] tracking-[0.35em] text-white/60 font-medium">
              BUILDING MAINTENANCE
            </span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              end={l.href === "/"}
              className={({ isActive }) =>
                `text-[13px] font-medium tracking-wide transition-colors relative py-1 ${
                  isActive
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-gold"
                    : "text-white/70 hover:text-primary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a href="tel:+971504156485" className="btn-primary text-[13px] py-2.5 px-5">
            <Phone className="h-3.5 w-3.5" /> Call Us
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white/80 p-2 rounded-lg hover:bg-white/10 transition"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="px-6 py-5 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                end={l.href === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium py-3 px-2 rounded-lg transition ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-white/70 hover:text-primary hover:bg-white/5"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="tel:+971504156485"
              className="btn-primary justify-center mt-3 text-sm"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4" /> Call Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
