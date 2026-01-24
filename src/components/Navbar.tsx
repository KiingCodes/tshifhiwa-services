import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wrench, Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-primary/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-copper flex items-center justify-center">
              <Wrench className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg text-primary-foreground leading-tight">TSHIFHIWA</h1>
              <p className="text-copper text-xs font-display tracking-wider">P&E SERVICES</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("services")}
              className="text-primary-foreground/80 hover:text-copper transition-colors font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("booking")}
              className="text-primary-foreground/80 hover:text-copper transition-colors font-medium"
            >
              Book Now
            </button>
            <a 
              href="tel:+27123456789"
              className="flex items-center gap-2 text-copper font-medium"
            >
              <Phone className="w-4 h-4" />
              +27 12 345 6789
            </a>
            <Button variant="copper" size="sm" onClick={() => scrollToSection("booking")}>
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary-foreground p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-primary-foreground/10">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection("services")}
                className="text-primary-foreground/80 hover:text-copper transition-colors font-medium text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("booking")}
                className="text-primary-foreground/80 hover:text-copper transition-colors font-medium text-left"
              >
                Book Now
              </button>
              <a 
                href="tel:+27123456789"
                className="flex items-center gap-2 text-copper font-medium"
              >
                <Phone className="w-4 h-4" />
                +27 12 345 6789
              </a>
              <Button variant="copper" size="lg" onClick={() => scrollToSection("booking")}>
                Get Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
