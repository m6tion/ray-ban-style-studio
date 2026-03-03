import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SunglassesPreview from "./SunglassesPreview";

const frameShapes = [
  { id: "wayfarer", label: "Wayfarer", icon: "◼" },
  { id: "aviator", label: "Aviator", icon: "▽" },
  { id: "round", label: "Round", icon: "◯" },
  { id: "clubmaster", label: "Clubmaster", icon: "◻" },
];

const frameColors = [
  { id: "#1a1a1a", label: "Matte Black" },
  { id: "#8B6914", label: "Gold" },
  { id: "#6B3A2A", label: "Tortoise" },
  { id: "#C0C0C0", label: "Silver" },
  { id: "#2C1810", label: "Dark Brown" },
  { id: "#B22222", label: "Red" },
  { id: "#1B3F8B", label: "Navy" },
  { id: "#F5F5DC", label: "Ivory" },
];

const lensOptions = [
  { id: "dark", label: "Classic Dark", preview: "bg-[hsl(0,0%,10%)]" },
  { id: "blue", label: "Ocean Blue", preview: "bg-[hsl(220,60%,35%)]" },
  { id: "green", label: "Forest Green", preview: "bg-[hsl(150,50%,25%)]" },
  { id: "amber", label: "Warm Amber", preview: "bg-[hsl(38,70%,40%)]" },
  { id: "rose", label: "Rose", preview: "bg-[hsl(340,55%,45%)]" },
  { id: "mirror", label: "Mirror", preview: "bg-gradient-to-br from-[hsl(200,80%,60%)] via-[hsl(280,60%,50%)] to-[hsl(340,70%,55%)]" },
];

const templeStyles = [
  { id: "standard", label: "Standard" },
  { id: "thick", label: "Bold" },
  { id: "thin", label: "Slim" },
];

const tabs = ["Frame", "Color", "Lens", "Temple"] as const;

export default function SunglassesCustomizer() {
  const [frameShape, setFrameShape] = useState("wayfarer");
  const [frameColor, setFrameColor] = useState("#1a1a1a");
  const [lensColor, setLensColor] = useState("dark");
  const [templeStyle, setTempleStyle] = useState("standard");
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Frame");

  const selectedFrame = frameShapes.find(f => f.id === frameShape);
  const selectedLens = lensOptions.find(l => l.id === lensColor);
  const selectedColor = frameColors.find(c => c.id === frameColor);

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Customize</p>
          <h2 className="font-display text-5xl md:text-7xl gold-text">BUILD YOUR PAIR</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <div className="animate-float">
              <SunglassesPreview
                frameShape={frameShape}
                frameColor={frameColor}
                lensColor={lensColor}
                templeStyle={templeStyle}
              />
            </div>

            {/* Summary chips */}
            <div className="flex flex-wrap gap-2 mt-8 justify-center">
              {[selectedFrame?.label, selectedColor?.label, selectedLens?.label, templeStyle].map((item, i) => (
                <motion.span
                  key={i}
                  layout
                  className="px-3 py-1 text-xs font-body tracking-wider uppercase border border-border/50 rounded-full text-muted-foreground"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Options */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8"
          >
            {/* Tabs */}
            <div className="flex gap-1 mb-8 bg-secondary/30 p-1 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-sm font-body font-medium tracking-wider uppercase rounded-lg transition-all duration-300
                    ${activeTab === tab ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {activeTab === "Frame" && (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm font-body mb-4">Choose your frame shape</p>
                    <div className="grid grid-cols-2 gap-3">
                      {frameShapes.map((shape) => (
                        <motion.button
                          key={shape.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setFrameShape(shape.id)}
                          className={`option-button text-left ${frameShape === shape.id ? "option-button-active" : ""}`}
                        >
                          <span className="text-2xl block mb-1">{shape.icon}</span>
                          <span className="font-display text-lg tracking-wider">{shape.label.toUpperCase()}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Color" && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm font-body mb-4">Select frame color</p>
                    <div className="grid grid-cols-4 gap-4">
                      {frameColors.map((color) => (
                        <motion.button
                          key={color.id}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFrameColor(color.id)}
                          className={`color-swatch ${frameColor === color.id ? "color-swatch-active" : ""}`}
                          style={{ backgroundColor: color.id }}
                          title={color.label}
                        />
                      ))}
                    </div>
                    <p className="text-center text-foreground font-display text-xl mt-4 tracking-wider">
                      {frameColors.find(c => c.id === frameColor)?.label.toUpperCase()}
                    </p>
                  </div>
                )}

                {activeTab === "Lens" && (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm font-body mb-4">Pick your lens tint</p>
                    <div className="grid grid-cols-2 gap-3">
                      {lensOptions.map((lens) => (
                        <motion.button
                          key={lens.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setLensColor(lens.id)}
                          className={`option-button flex items-center gap-3 ${lensColor === lens.id ? "option-button-active" : ""}`}
                        >
                          <div className={`w-8 h-8 rounded-full ${lens.preview}`} />
                          <span className="font-display text-base tracking-wider">{lens.label.toUpperCase()}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Temple" && (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm font-body mb-4">Choose temple thickness</p>
                    <div className="grid grid-cols-3 gap-3">
                      {templeStyles.map((style) => (
                        <motion.button
                          key={style.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setTempleStyle(style.id)}
                          className={`option-button text-center ${templeStyle === style.id ? "option-button-active" : ""}`}
                        >
                          <div className="flex justify-center mb-2">
                            <div
                              className="bg-foreground rounded-full"
                              style={{
                                width: "40px",
                                height: style.id === "thick" ? "6px" : style.id === "thin" ? "2px" : "4px",
                              }}
                            />
                          </div>
                          <span className="font-display text-base tracking-wider">{style.label.toUpperCase()}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Price & CTA */}
            <motion.div
              layout
              className="mt-8 pt-6 border-t border-border/30"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground font-body text-sm">Your custom pair</span>
                <span className="font-display text-3xl gold-text">$189</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(38 90% 55% / 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-primary text-primary-foreground font-display text-xl tracking-wider rounded-xl transition-all duration-300"
              >
                ADD TO BAG
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
