import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SunglassesCustomizer from "@/components/SunglassesCustomizer";
import VirtualTryOn from "@/components/VirtualTryOn";

const Index = () => {
  const customizerRef = useRef<HTMLDivElement>(null);
  const tryOnRef = useRef<HTMLDivElement>(null);

  const [frameShape, setFrameShape] = useState("wayfarer");
  const [frameColor, setFrameColor] = useState("#111111");
  const [lensColor, setLensColor] = useState("dark");
  const [templeStyle, setTempleStyle] = useState("standard");

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection
        onStartCustomizing={() => scrollTo(customizerRef)}
        onTryOn={() => scrollTo(tryOnRef)}
      />
      <div ref={customizerRef}>
        <SunglassesCustomizer
          frameShape={frameShape} setFrameShape={setFrameShape}
          frameColor={frameColor} setFrameColor={setFrameColor}
          lensColor={lensColor} setLensColor={setLensColor}
          templeStyle={templeStyle} setTempleStyle={setTempleStyle}
        />
      </div>
      <div ref={tryOnRef}>
        <VirtualTryOn
          frameShape={frameShape}
          frameColor={frameColor}
          lensColor={lensColor}
          templeStyle={templeStyle}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-semibold gold-text">SHADECRAFT</span>
          <p className="text-muted-foreground text-[11px] font-body tracking-wider">
            © 2024 SHADECRAFT. School Project — Not a Real Brand.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
