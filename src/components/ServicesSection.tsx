import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Droplets,
  Zap,
  Wrench,
  ShowerHead,
  Lightbulb,
  Plug,
  PipetteIcon,
  CircuitBoard,
  Fan,
  Gauge,
  Cable,
  Waves,
  Shield,
  Bell,
  DoorOpen,
  Camera,
  Fence,
  Key,
  Fingerprint,
  type LucideIcon,
} from "lucide-react";
import servicesBackground from "@/assets/services-background.jpg";

const plumbingServices = [
  {
    icon: Droplets,
    title: "Leak Detection & Repair",
    description:
      "Advanced leak detection technology to find and fix hidden leaks fast.",
  },
  {
    icon: ShowerHead,
    title: "Bathroom & Kitchen Plumbing",
    description:
      "Complete installations and renovations for taps, sinks, and showers.",
  },
  {
    icon: PipetteIcon,
    title: "Drain Cleaning",
    description: "Professional drain unblocking and cleaning services.",
  },
  {
    icon: Waves,
    title: "Geyser Installation",
    description: "Hot water system installation, repair, and maintenance.",
  },
  {
    icon: Gauge,
    title: "Pipe Repairs & Replacement",
    description: "Quality pipe repairs and full re-piping solutions.",
  },
  {
    icon: Wrench,
    title: "Emergency Plumbing",
    description: "24/7 emergency response for urgent plumbing issues.",
  },
];

const electricalServices = [
  {
    icon: Lightbulb,
    title: "Lighting Installation",
    description: "Indoor and outdoor lighting design and installation.",
  },
  {
    icon: Plug,
    title: "Power Points & Sockets",
    description: "New installations, repairs, and upgrades for all outlets.",
  },
  {
    icon: CircuitBoard,
    title: "DB Board Installation",
    description:
      "Distribution board upgrades and circuit breaker installation.",
  },
  {
    icon: Cable,
    title: "Electrical Wiring",
    description: "Complete rewiring and new construction wiring services.",
  },
  {
    icon: Fan,
    title: "Ceiling Fan Installation",
    description: "Professional ceiling fan and extractor fan fitting.",
  },
  {
    icon: Zap,
    title: "Emergency Electrical",
    description: "Fast response for electrical emergencies and power outages.",
  },
];

const electronicsServices = [
  {
    icon: Shield,
    title: "Electric Fence Installation & Repairs",
    description:
      "Professional electric fence installation, maintenance, and repair for maximum security.",
  },
  {
    icon: Bell,
    title: "Alarm Systems Installation & Repairs",
    description:
      "Complete alarm system setup, servicing, and troubleshooting for homes and businesses.",
  },
  {
    icon: DoorOpen,
    title: "Gate Motor & Electric Gates",
    description:
      "Sliding and swing electric gate motor installation, repairs, and remote programming.",
  },
  {
    icon: Camera,
    title: "CCTV Cameras & Surveillance",
    description:
      "HD security camera setup, DVR/NVR configuration, and remote video monitoring.",
  },
  {
    icon: Fence,
    title: "Automated Barriers & Boom Gates",
    description:
      "Vehicle barrier and boom gate installation and servicing for private and commercial properties.",
  },
  {
    icon: Key,
    title: "Electronic Keys & Smart Locks",
    description:
      "Keyless entry fobs, smart lock installations, and digital key programming.",
  },
  {
    icon: Fingerprint,
    title: "Access Control Systems",
    description:
      "Biometric readers, keypad entry, card scanners, and integrated security management.",
  },
];

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  type,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  type: "plumbing" | "electrical";
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-2xl p-7 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-border/50 hover:border-green/40 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 ${
          type === "plumbing" ? "bg-gradient-green" : "bg-electric"
        }`}
      />

      {/* Accent Line */}
      <div
        className={`absolute top-0 left-0 w-full h-1 ${type === "plumbing" ? "bg-gradient-green" : "bg-electric"}`}
      />

      {/* Corner ornament */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${
          type === "plumbing" ? "bg-green" : "bg-electric"
        }`}
      />

      {/* Icon */}
      <div
        className={`relative w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
          type === "plumbing"
            ? "bg-gradient-to-br from-green/20 to-green/5 group-hover:from-green group-hover:to-green-light group-hover:text-secondary-foreground text-green shadow-green/20"
            : "bg-gradient-to-br from-electric/20 to-electric/5 group-hover:bg-electric group-hover:text-secondary-foreground text-electric"
        }`}
      >
        <Icon className="w-8 h-8" />
      </div>

      {/* Content */}
      <h3 className="relative font-display text-xl text-foreground mb-2 group-hover:text-green transition-colors duration-300">
        {title}
      </h3>
      <p className="relative text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const ServicesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${servicesBackground})` }}
      />
      <div className="absolute inset-0 bg-background/90 backdrop-blur-[2px]" />
      <div className="relative z-10 container mx-auto px-4">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="inline-block text-green font-display uppercase tracking-widest text-sm mb-4">
            What We Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            OUR EXPERT <span className="text-gradient-green">SERVICES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From minor repairs to major installations, our skilled technicians
            deliver excellence in every project.
          </p>
        </div>

        {/* Plumbing Services */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-green/20 flex items-center justify-center">
              <Droplets className="w-6 h-6 text-green" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground">
              PLUMBING SERVICES
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plumbingServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                type="plumbing"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Electrical Services */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-electric" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground">
              ELECTRICAL SERVICES
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {electricalServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                type="electrical"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Electronics Services */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-electric" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground">
              ELECTRONICS & SECURITY
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {electronicsServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                type="electrical"
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
