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
  Waves
} from "lucide-react";

const plumbingServices = [
  { icon: Droplets, title: "Leak Detection & Repair", description: "Advanced leak detection technology to find and fix hidden leaks fast." },
  { icon: ShowerHead, title: "Bathroom & Kitchen Plumbing", description: "Complete installations and renovations for taps, sinks, and showers." },
  { icon: PipetteIcon, title: "Drain Cleaning", description: "Professional drain unblocking and cleaning services." },
  { icon: Waves, title: "Geyser Installation", description: "Hot water system installation, repair, and maintenance." },
  { icon: Gauge, title: "Pipe Repairs & Replacement", description: "Quality pipe repairs and full re-piping solutions." },
  { icon: Wrench, title: "Emergency Plumbing", description: "24/7 emergency response for urgent plumbing issues." },
];

const electricalServices = [
  { icon: Lightbulb, title: "Lighting Installation", description: "Indoor and outdoor lighting design and installation." },
  { icon: Plug, title: "Power Points & Sockets", description: "New installations, repairs, and upgrades for all outlets." },
  { icon: CircuitBoard, title: "DB Board Installation", description: "Distribution board upgrades and circuit breaker installation." },
  { icon: Cable, title: "Electrical Wiring", description: "Complete rewiring and new construction wiring services." },
  { icon: Fan, title: "Ceiling Fan Installation", description: "Professional ceiling fan and extractor fan fitting." },
  { icon: Zap, title: "Emergency Electrical", description: "Fast response for electrical emergencies and power outages." },
];

const ServiceCard = ({ icon: Icon, title, description, type }: { icon: any; title: string; description: string; type: 'plumbing' | 'electrical' }) => (
  <div className="group relative bg-card rounded-lg p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 overflow-hidden">
    {/* Accent Line */}
    <div className={`absolute top-0 left-0 w-full h-1 ${type === 'plumbing' ? 'bg-gradient-copper' : 'bg-electric'}`} />
    
    {/* Icon */}
    <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
      type === 'plumbing' 
        ? 'bg-copper/10 group-hover:bg-copper group-hover:text-secondary-foreground text-copper' 
        : 'bg-electric/10 group-hover:bg-electric group-hover:text-secondary-foreground text-electric'
    }`}>
      <Icon className="w-7 h-7" />
    </div>
    
    {/* Content */}
    <h3 className="font-display text-xl text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-copper font-display uppercase tracking-widest text-sm mb-4">What We Offer</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            OUR EXPERT <span className="text-gradient-copper">SERVICES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From minor repairs to major installations, our skilled technicians deliver excellence in every project.
          </p>
        </div>

        {/* Plumbing Services */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-copper/20 flex items-center justify-center">
              <Droplets className="w-6 h-6 text-copper" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground">PLUMBING SERVICES</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plumbingServices.map((service, index) => (
              <ServiceCard key={index} {...service} type="plumbing" />
            ))}
          </div>
        </div>

        {/* Electrical Services */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-electric" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground">ELECTRICAL SERVICES</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {electricalServices.map((service, index) => (
              <ServiceCard key={index} {...service} type="electrical" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
