import { useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SunglassesCustomizer from "@/components/SunglassesCustomizer";

const Index = () => {
  const customizerRef = useRef<HTMLDivElement>(null);

  const scrollToCustomizer = () => {
    customizerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection onStartCustomizing={scrollToCustomizer} />
      <div ref={customizerRef}>
        <SunglassesCustomizer />
      </div>
    </div>
  );
};

export default Index;
