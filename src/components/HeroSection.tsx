import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onStartCustomizing: () => void;
}

export default function HeroSection({ onStartCustomizing }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Luxury sunglasses" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4"
        >
          Design Your Vision
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-7xl md:text-9xl leading-none mb-6"
        >
          <span className="gold-text">YOUR</span>{" "}
          <span className="text-foreground">SHADES</span>
          <br />
          <span className="text-foreground">YOUR</span>{" "}
          <span className="gold-text">RULES</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 font-body font-light"
        >
          Craft your perfect pair of sunglasses. Choose the frame, lenses, and style that define you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(38 90% 55% / 0.4)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onStartCustomizing}
          className="px-10 py-4 bg-primary text-primary-foreground font-display text-2xl tracking-wider rounded-full transition-all duration-300 animate-glow-pulse"
        >
          START CUSTOMIZING
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
