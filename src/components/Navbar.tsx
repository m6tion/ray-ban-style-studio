import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/60 backdrop-blur-xl border-b border-border/30"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-display text-2xl tracking-[0.15em] gold-text">SHADECRAFT</span>

        <div className="hidden md:flex items-center gap-8">
          {["Home", "Customize", "Collection", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-muted-foreground text-sm font-body tracking-wider uppercase hover:text-primary transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative text-foreground">
          <ShoppingBag size={20} />
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary rounded-full text-[10px] font-body font-bold text-primary-foreground flex items-center justify-center">
            0
          </span>
        </motion.button>
      </div>
    </motion.nav>
  );
}
