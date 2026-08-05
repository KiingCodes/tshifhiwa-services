import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
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
  { src: geyserInstall, title: "Geyser Installation", category: "Plumbing" },
  { src: meterTesting, title: "DB Board Upgrade", category: "Electrical" },
  { src: cctvPole, title: "CCTV & Security Setup", category: "Electronics" },
  { src: inverterSetup, title: "Inverter Installation", category: "Electrical" },
  { src: geyserRepair, title: "Geyser Repair", category: "Plumbing" },
  { src: gateMotor, title: "Gate Motor Automation", category: "Electronics" },
  { src: solarPanels, title: "Solar Panel Installation", category: "Electrical" },
  { src: batteryInstall, title: "Battery Backup System", category: "Electrical" },
  { src: cctvRoof, title: "Security Camera Setup", category: "Electronics" },
  { src: geyserOutdoor, title: "Outdoor Geyser Setup", category: "Plumbing" },
];

const GalleryItem = ({
  item,
  index,
  onClick,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <img
        src={item.src}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-left opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="mb-1 inline-block rounded-full bg-amber px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
          {item.category}
        </span>
        <p className="font-display text-lg font-semibold text-primary-foreground">
          {item.title}
        </p>
      </div>
      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 className="h-4 w-4 text-primary" />
      </span>
    </button>
  );
};

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => {
    if (lightboxIndex !== null)
      setLightboxIndex(
        (lightboxIndex - 1 + galleryItems.length) % galleryItems.length,
      );
  };
  const goNext = () => {
    if (lightboxIndex !== null)
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
  };

  return (
    <section id="gallery" className="bg-muted py-24">
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={`mb-14 text-center transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="inline-block rounded-full border border-amber/30 bg-amber/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber">
            Our Work
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-5xl">
            Project <span className="text-gradient-green">Gallery</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A selection of completed installations — geysers, DB boards, solar
            backup and full security systems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <GalleryItem
              key={index}
              item={item}
              index={index}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 text-background/80 hover:text-background"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous"
            className="absolute left-4 z-10 text-background/80 hover:text-background"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <div
            className="max-h-[85vh] max-w-4xl px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].title}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain"
            />
            <div className="mt-4 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-amber">
                {galleryItems[lightboxIndex].category}
              </span>
              <p className="text-lg text-background">
                {galleryItems[lightboxIndex].title}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next"
            className="absolute right-4 z-10 text-background/80 hover:text-background"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
