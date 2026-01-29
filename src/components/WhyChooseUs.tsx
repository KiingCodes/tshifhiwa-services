import { Shield, Clock, Award, Users, ThumbsUp, Wallet } from "lucide-react";
import whyChooseBackground from "@/assets/why-choose-background.jpg";

const features = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed professionals with comprehensive insurance coverage for your peace of mind.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock emergency services. We're here when you need us most.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "We stand behind our work with industry-leading warranties on all services.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Our skilled technicians bring 15+ years of combined expertise to every job.",
  },
  {
    icon: ThumbsUp,
    title: "Customer First",
    description: "Your satisfaction is our priority. We don't leave until the job is done right.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "No hidden fees or surprises. Upfront quotes before any work begins.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${whyChooseBackground})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-primary/90" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-green font-display uppercase tracking-widest text-sm mb-4">Why Us</span>
          <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4">
            WHY CHOOSE <span className="text-gradient-green">TSHIFHIWA</span>
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            We combine technical expertise with genuine care for our customers to deliver exceptional service every time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group flex gap-5 p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-lg bg-green/20 flex items-center justify-center group-hover:bg-green transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-green group-hover:text-secondary-foreground transition-colors duration-300" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl text-primary-foreground mb-2">{feature.title}</h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
