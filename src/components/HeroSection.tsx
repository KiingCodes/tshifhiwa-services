import { Button } from "@/components/ui/button";
import { Wrench, Zap, Phone, ArrowDown } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest/90 via-forest/80 to-green-dark/70" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-green/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 border-4 border-green/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-green/10 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-40 bg-gradient-to-b from-green/40 to-transparent rotate-45" />
        <div className="absolute bottom-1/4 right-10 w-2 h-32 bg-gradient-to-b from-electric/40 to-transparent -rotate-45" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green/20 backdrop-blur-sm border border-green/30 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-green" />
            <span className="text-green text-sm font-medium">Licensed & Certified Professionals</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-tight mb-6">
            TSHIFHIWA
            <span className="block text-gradient-green">PLUMBING &</span>
            <span className="block">ELECTRICAL</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10 font-light">
            Expert solutions for all your plumbing and electrical needs. From emergency repairs to complete installations, we deliver quality craftsmanship you can trust.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Button variant="green" size="xl" onClick={scrollToBooking}>
              <Phone className="w-5 h-5" />
              Book a Service
            </Button>
            <Button variant="outlineGreen" size="xl" onClick={scrollToServices}>
              <Wrench className="w-5 h-5" />
              Our Services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-xl">
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl text-green mb-1">15+</div>
              <div className="text-primary-foreground/60 text-sm uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl text-green mb-1">2K+</div>
              <div className="text-primary-foreground/60 text-sm uppercase tracking-wider">Projects Done</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl text-green mb-1">24/7</div>
              <div className="text-primary-foreground/60 text-sm uppercase tracking-wider">Emergency Service</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-green" />
        </div>
      </div>

      {/* Side Icons */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6">
        <div className="w-16 h-16 rounded-full bg-green/20 backdrop-blur-sm flex items-center justify-center animate-pulse-glow">
          <Wrench className="w-8 h-8 text-green" />
        </div>
        <div className="w-16 h-16 rounded-full bg-electric/20 backdrop-blur-sm flex items-center justify-center animate-pulse-glow" style={{ animationDelay: "1s" }}>
          <Zap className="w-8 h-8 text-electric" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
