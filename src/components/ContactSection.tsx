import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Phone */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-copper/10 flex items-center justify-center group-hover:bg-copper transition-colors duration-300">
              <Phone className="w-7 h-7 text-copper group-hover:text-secondary-foreground transition-colors duration-300" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">CALL US</h3>
            <a href="tel:+27123456789" className="text-muted-foreground hover:text-copper transition-colors">
              +27 12 345 6789
            </a>
            <p className="text-muted-foreground text-sm mt-1">
              24/7 Emergency Line
            </p>
          </div>

          {/* Email */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-copper/10 flex items-center justify-center group-hover:bg-copper transition-colors duration-300">
              <Mail className="w-7 h-7 text-copper group-hover:text-secondary-foreground transition-colors duration-300" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">EMAIL US</h3>
            <a href="mailto:info@tshifhiwa.co.za" className="text-muted-foreground hover:text-copper transition-colors">
              info@tshifhiwa.co.za
            </a>
            <p className="text-muted-foreground text-sm mt-1">
              We reply within 24 hours
            </p>
          </div>

          {/* Location */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-copper/10 flex items-center justify-center group-hover:bg-copper transition-colors duration-300">
              <MapPin className="w-7 h-7 text-copper group-hover:text-secondary-foreground transition-colors duration-300" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">LOCATION</h3>
            <p className="text-muted-foreground">
              Serving Limpopo & Surrounding Areas
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              South Africa
            </p>
          </div>

          {/* Hours */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-copper/10 flex items-center justify-center group-hover:bg-copper transition-colors duration-300">
              <Clock className="w-7 h-7 text-copper group-hover:text-secondary-foreground transition-colors duration-300" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">WORKING HOURS</h3>
            <p className="text-muted-foreground">
              Mon - Sat: 7:00 - 18:00
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Emergencies: 24/7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
