import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import cctvPole from "@/assets/gallery/cctv-pole.jpg";
import cctvRoof from "@/assets/gallery/cctv-roof.jpg";
import inverterSetup from "@/assets/gallery/inverter-setup.jpg";
import batteryInstall from "@/assets/gallery/battery-install.jpg";
import gateMotor from "@/assets/gallery/gate-motor.jpg";
import geyserInstall from "@/assets/gallery/geyser-install.jpg";
import solarPanels from "@/assets/gallery/solar-panels.jpg";
import geyserOutdoor from "@/assets/gallery/geyser-outdoor.jpg";
import geyserRepair from "@/assets/gallery/geyser-repair.jpg";
import meterTesting from "@/assets/gallery/meter-testing.jpg";

const galleryItems = [
  { src: geyserRepair, title: "Geyser Repair", category: "Plumbing" },
  { src: inverterSetup, title: "Inverter Installation", category: "Electrical" },
  { src: cctvPole, title: "CCTV Installation", category: "Security" },
  { src: batteryInstall, title: "Battery & Inverter Setup", category: "Electrical" },
  { src: gateMotor, title: "Gate Motor Installation", category: "Security" },
  { src: geyserInstall, title: "Geyser Installation", category: "Plumbing" },
  { src: solarPanels, title: "Solar Panel Installation", category: "Electrical" },
  { src: geyserOutdoor, title: "Outdoor Geyser Setup", category: "Plumbing" },
  { src: cctvRoof, title: "Security Camera Setup", category: "Security" },
  { src: meterTesting, title: "Electrical Testing", category: "Electrical" },
];

const GalleryItem = ({ item, index, onClick }: { item: typeof galleryItems[0]; index: number; onClick: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`group relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-300 flex items-end">
        <div className="p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-xs text-green font-display uppercase">{item.category}</span>
          <p className="text-primary-foreground text-sm font-medium">{item.title}</p>
        </div>
      </div>
    </button>
  );
};

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => { if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length); };
  const goNext = () => { if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % galleryItems.length); };

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="text-green font-display text-sm uppercase tracking-widest">Our Work</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mt-2 mb-4">PROJECT GALLERY</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Browse through our completed projects — from geyser installations to security systems.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {galleryItems.map((item, index) => (
            <GalleryItem key={index} item={item} index={index} onClick={() => setLightboxIndex(index)} />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/80 hover:text-white z-10"><X className="w-8 h-8" /></button>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 text-white/80 hover:text-white z-10"><ChevronLeft className="w-10 h-10" /></button>
          <div className="max-w-4xl max-h-[85vh] px-12" onClick={(e) => e.stopPropagation()}>
            <img src={galleryItems[lightboxIndex].src} alt={galleryItems[lightboxIndex].title} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            <div className="text-center mt-4">
              <span className="text-green text-sm font-display uppercase">{galleryItems[lightboxIndex].category}</span>
              <p className="text-white text-lg">{galleryItems[lightboxIndex].title}</p>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 text-white/80 hover:text-white z-10"><ChevronRight className="w-10 h-10" /></button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
