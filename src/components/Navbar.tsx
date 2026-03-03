import { motion } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <span className="font-display text-xl sm:text-2xl font-semibold gold-text tracking-wide">
          SHADECRAFT
        </span>

        <div className="hidden md:flex items-center gap-8">
          {["Home", "Customize", "Try On", "Collection"].map((item) => (
            <a key={item} href="#" className="section-label hover:text-foreground transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="relative text-foreground p-1">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-1">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
        >
          {["Home", "Customize", "Try On", "Collection"].map((item) => (
            <a key={item} href="#" className="block px-6 py-3 section-label hover:text-foreground transition-colors border-b border-border/20">
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
