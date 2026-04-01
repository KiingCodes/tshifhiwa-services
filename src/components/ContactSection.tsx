import { useRef, useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const contactItems = [
  { icon: Phone, title: "CALL US", content: <a href="tel:+27832120479" className="text-muted-foreground hover:text-green transition-colors">+27 83 212 0479</a>, sub: "24/7 Emergency Line" },
  { icon: Mail, title: "EMAIL US", content: <a href="mailto:nedaneh@outlook.com" className="text-muted-foreground hover:text-green transition-colors">nedaneh@outlook.com</a>, sub: "We reply within 24 hours" },
  { icon: MapPin, title: "LOCATION", content: <p className="text-muted-foreground">Serving Johannesburg & Surrounding Areas</p>, sub: "South Africa" },
  { icon: Clock, title: "WORKING HOURS", content: <p className="text-muted-foreground">Mon - Sat: 7:00 - 18:00</p>, sub: "Emergencies: 24/7" },
];

const ContactCard = ({ item, index }: { item: typeof contactItems[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center group transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green/10 flex items-center justify-center group-hover:bg-green transition-colors duration-300">
        <item.icon className="w-7 h-7 text-green group-hover:text-secondary-foreground transition-colors duration-300" />
      </div>
      <h3 className="font-display text-lg text-foreground mb-2">{item.title}</h3>
      {item.content}
      <p className="text-muted-foreground text-sm mt-1">{item.sub}</p>
    </div>
  );
};

const ContactSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactItems.map((item, index) => (
            <ContactCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
