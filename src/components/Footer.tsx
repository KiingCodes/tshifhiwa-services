import { Wrench, Zap, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="font-display text-xl text-primary-foreground">TSHIFHIWA</h3>
              <p className="text-green text-sm font-display">PLUMBING & ELECTRICAL</p>
            </div>
            <p className="text-primary-foreground/60 max-w-md leading-relaxed mb-6">
              Your trusted partner for all plumbing and electrical needs. Professional, reliable, and committed to excellence in every project we undertake.
            </p>
            <div className="flex gap-4">

              <a
                href="https://wa.me/27832120479" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-green transition-colors duration-300 group"
              >
                <svg className="w-5 h-5 text-primary-foreground group-hover:text-secondary-foreground transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-primary-foreground mb-4">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection("services")} className="text-primary-foreground/60 hover:text-green transition-colors">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("booking")} className="text-primary-foreground/60 hover:text-green transition-colors">
                  Book a Service
                </button>
              </li>
              <li>
                <a href="tel:+27832120479" className="text-primary-foreground/60 hover:text-green transition-colors">
                  Emergency Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg text-primary-foreground mb-4">OUR SERVICES</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/60">
                <Wrench className="w-4 h-4 text-green" />
                Plumbing Repairs
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/60">
                <Wrench className="w-4 h-4 text-green" />
                Geyser Installation
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/60">
                <Zap className="w-4 h-4 text-electric" />
                Electrical Wiring
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/60">
                <Zap className="w-4 h-4 text-electric" />
                DB Board Installation
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/40 text-sm">
              © {currentYear} Tshifhiwa Plumbing & Electrical. All rights reserved.
            </p>
            <p className="text-primary-foreground/40 text-sm">
              Licensed & Insured | Quality Service Guaranteed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
