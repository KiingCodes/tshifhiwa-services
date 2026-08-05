import { Phone, Mail, MapPin, Clock } from "lucide-react";
import jeweliqLogo from "@/assets/jeweliq-logo.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { ref, isVisible } = useScrollAnimation(0.1);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary pt-16 pb-8">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="mb-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-extrabold tracking-tight text-primary-foreground">
              TSHIFHIWA
            </h3>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
              Plumbing • Electrical • Electronics
            </p>
            <p className="mt-4 max-w-xs leading-relaxed text-primary-foreground/60">
              Your trusted partner for plumbing, electrical and security
              services. Licensed, insured and committed to excellence.
            </p>
            <a
              href="https://wa.me/27832120479"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors duration-300 hover:bg-amber"
              aria-label="WhatsApp"
            >
              <svg
                className="h-5 w-5 text-primary-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Our Services", id: "services" },
                { label: "Project Gallery", id: "gallery" },
                { label: "Book a Service", id: "booking" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-primary-foreground/60 transition-colors hover:text-amber"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground">
              Contact Info
            </h4>
            <ul className="space-y-3 text-primary-foreground/60">
              <li>
                <a
                  href="tel:+27832120479"
                  className="flex items-start gap-3 transition-colors hover:text-amber"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  +27 83 212 0479
                </a>
              </li>
              <li>
                <a
                  href="mailto:bookings@tshifhiwa-services.co.za"
                  className="flex items-start gap-3 break-all transition-colors hover:text-amber"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  bookings@tshifhiwa-services.co.za
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                Johannesburg & surrounding areas
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground">
              Service Hours
            </h4>
            <ul className="space-y-3 text-primary-foreground/60">
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <span>
                  Mon – Fri
                  <span className="block text-primary-foreground/80">
                    07:00 – 18:00
                  </span>
                </span>
              </li>
              <li className="pl-7">
                Saturday
                <span className="block text-primary-foreground/80">
                  08:00 – 14:00
                </span>
              </li>
              <li className="pl-7">
                Emergency call-outs
                <span className="block font-semibold text-amber">
                  24 / 7 available
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-primary-foreground/40">
              © {currentYear} Tshifhiwa Plumbing & Electrical Services. All
              rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-primary-foreground/40">
                Site managed by
              </span>
              <img src={jeweliqLogo} alt="JewelIQ" className="h-10 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
