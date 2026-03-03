import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SunglassesPreview from "./SunglassesPreview";
import glassesWayfarer from "@/assets/glasses-wayfarer.jpg";
import glassesAviator from "@/assets/glasses-aviator.jpg";
import glassesRound from "@/assets/glasses-round.jpg";
import glassesClubmaster from "@/assets/glasses-clubmaster.jpg";
import glassesMeta from "@/assets/glasses-meta.jpg";

const frameShapes = [
  { id: "wayfarer", label: "Wayfarer", model: "SC-2140", img: glassesWayfarer, price: 189 },
  { id: "aviator", label: "Aviator", model: "SC-3025", img: glassesAviator, price: 199 },
  { id: "round", label: "Round", model: "SC-3447", img: glassesRound, price: 179 },
  { id: "clubmaster", label: "Clubmaster", model: "SC-3016", img: glassesClubmaster, price: 209 },
  { id: "meta", label: "Meta Smart", model: "SC-META", img: glassesMeta, price: 299, tag: "SMART" },
];

const frameColors = [
  { id: "#111111", label: "Matte Black" },
  { id: "#C5A55A", label: "Brushed Gold" },
  { id: "#7B5B3A", label: "Havana" },
  { id: "#A0A0A0", label: "Gunmetal" },
  { id: "#3C2415", label: "Dark Havana" },
  { id: "#8B2020", label: "Burgundy" },
  { id: "#2B3D5B", label: "Navy" },
  { id: "#D6CFC0", label: "Ivory" },
];

const lensOptions = [
  { id: "dark", label: "G-15 Classic", color: "#1a2a1a" },
  { id: "blue", label: "Gradient Blue", color: "#2a4a7a" },
  { id: "green", label: "Classic Green", color: "#2a5a3a" },
  { id: "amber", label: "Brown Gradient", color: "#6a4a2a" },
  { id: "rose", label: "Rose", color: "#7a3a4a" },
  { id: "mirror", label: "Silver Mirror", color: "linear-gradient(135deg, #8aa, #aac)" },
];

const templeStyles = [
  { id: "standard", label: "Classic", h: "3px" },
  { id: "thick", label: "Bold", h: "6px" },
  { id: "thin", label: "Slim", h: "1.5px" },
];

const tabs = ["Model", "Frame", "Lens", "Temple"] as const;

interface Props {
  frameShape: string;
  setFrameShape: (v: string) => void;
  frameColor: string;
  setFrameColor: (v: string) => void;
  lensColor: string;
  setLensColor: (v: string) => void;
  templeStyle: string;
  setTempleStyle: (v: string) => void;
}

export default function SunglassesCustomizer({
  frameShape, setFrameShape, frameColor, setFrameColor,
  lensColor, setLensColor, templeStyle, setTempleStyle,
}: Props) {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Model");
  const selected = frameShapes.find(f => f.id === frameShape);
  const selColor = frameColors.find(c => c.id === frameColor);
  const selLens = lensOptions.find(l => l.id === lensColor);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="section-label mb-3">Customization Studio</p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-foreground">
            Build Your <span className="italic font-semibold gold-text">Perfect</span> Pair
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card p-6 sm:p-10 lg:sticky lg:top-20"
          >
            <div className="max-w-md mx-auto">
              <SunglassesPreview
                frameShape={frameShape}
                frameColor={frameColor}
                lensColor={lensColor}
                templeStyle={templeStyle}
              />
            </div>

            <div className="mt-8 pt-6 border-t border-border/40 text-center">
              <p className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                {selected?.label} <span className="text-muted-foreground font-normal text-base">{selected?.model}</span>
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
                {[selColor?.label, selLens?.label, templeStyle + " temple"].map((item, i) => (
                  <span key={i} className="text-[10px] sm:text-[11px] font-body tracking-[0.2em] uppercase text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
              {selected?.tag && (
                <span className="inline-block mt-3 px-2 py-0.5 bg-primary/15 text-primary text-[10px] font-body font-semibold tracking-[0.2em] uppercase rounded-sm">
                  {selected.tag}
                </span>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="section-label">Starting at</p>
                <p className="font-display text-3xl sm:text-4xl font-semibold text-foreground mt-1">
                  ${selected?.price || 189}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 sm:px-7 py-3 bg-primary text-primary-foreground font-body text-xs font-semibold tracking-[0.2em] uppercase rounded-sm"
              >
                Add to Bag
              </motion.button>
            </div>
          </motion.div>

          {/* Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Tabs */}
            <div className="flex border-b border-border/60 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-0 pb-2.5 text-[11px] font-body font-medium tracking-[0.2em] uppercase transition-colors whitespace-nowrap px-2 relative
                    ${activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="space-y-2"
              >
                {activeTab === "Model" && frameShapes.map((shape) => (
                  <motion.button
                    key={shape.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFrameShape(shape.id)}
                    className={`option-btn flex items-center gap-3 ${frameShape === shape.id ? "option-btn-active" : ""}`}
                  >
                    <img src={shape.img} alt={shape.label} className="w-16 sm:w-20 h-12 sm:h-14 object-contain rounded-lg bg-secondary/40 p-1" />
                    <div className="flex-1 min-w-0">
                      <span className="font-display text-base sm:text-lg font-semibold block truncate">{shape.label}</span>
                      <span className="text-muted-foreground text-[10px] font-body tracking-wider">{shape.model}</span>
                    </div>
                    {shape.tag && (
                      <span className="px-1.5 py-0.5 bg-primary/15 text-primary text-[9px] font-body font-bold tracking-wider rounded-sm flex-shrink-0">
                        {shape.tag}
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm font-body flex-shrink-0">${shape.price}</span>
                  </motion.button>
                ))}

                {activeTab === "Frame" && (
                  <div>
                    <p className="text-muted-foreground text-xs font-body mb-4">Select frame color</p>
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {frameColors.map((c) => (
                        <motion.button
                          key={c.id}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFrameColor(c.id)}
                          className={`swatch ${frameColor === c.id ? "swatch-active" : ""}`}
                          style={{ backgroundColor: c.id }}
                          title={c.label}
                        />
                      ))}
                    </div>
                    <p className="text-center font-display text-lg text-foreground">{selColor?.label}</p>
                  </div>
                )}

                {activeTab === "Lens" && lensOptions.map((lens) => (
                  <motion.button
                    key={lens.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLensColor(lens.id)}
                    className={`option-btn flex items-center gap-3 ${lensColor === lens.id ? "option-btn-active" : ""}`}
                  >
                    <div className="w-7 h-7 rounded-full border border-border/40 flex-shrink-0" style={{ background: lens.color }} />
                    <span className="font-body text-sm">{lens.label}</span>
                  </motion.button>
                ))}

                {activeTab === "Temple" && templeStyles.map((s) => (
                  <motion.button
                    key={s.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTempleStyle(s.id)}
                    className={`option-btn flex items-center gap-3 ${templeStyle === s.id ? "option-btn-active" : ""}`}
                  >
                    <div className="w-10 flex items-center justify-center">
                      <div className="bg-foreground rounded-full" style={{ width: "32px", height: s.h }} />
                    </div>
                    <span className="font-body text-sm">{s.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
