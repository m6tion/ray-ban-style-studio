import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onStartCustomizing: () => void;
  onTryOn: () => void;
}

export default function HeroSection({ onStartCustomizing, onTryOn }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Premium eyewear" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20">
        <div className="max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label mb-4 sm:mb-6"
          >
            Premium Custom Eyewear
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-[1] text-foreground mb-4 sm:mb-6"
          >
            Design Your
            <br />
            <span className="font-semibold italic gold-text">Signature</span> Pair
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-muted-foreground text-sm sm:text-base font-body font-light leading-relaxed mb-8 max-w-sm"
          >
            Customize every detail. Try them on with your camera. Made to order, crafted for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartCustomizing}
              className="px-7 py-3 bg-primary text-primary-foreground font-body text-xs font-semibold tracking-[0.2em] uppercase rounded-sm"
            >
              Customize Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onTryOn}
              className="px-7 py-3 border border-foreground/20 text-foreground font-body text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-foreground/5 transition-colors"
            >
              Virtual Try-On
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
