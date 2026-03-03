import { motion, AnimatePresence } from "framer-motion";

interface SunglassesPreviewProps {
  frameShape: string;
  frameColor: string;
  lensColor: string;
  templeStyle: string;
}

const framePaths: Record<string, { outer: string; lens: string; bridge: string }> = {
  wayfarer: {
    outer: "M60,80 Q60,50 90,45 L210,45 Q240,50 240,80 L235,120 Q230,140 200,145 L100,145 Q70,140 65,120 Z M300,80 Q300,50 330,45 L450,45 Q480,50 480,80 L475,120 Q470,140 440,145 L340,145 Q310,140 305,120 Z",
    lens: "M68,78 Q68,55 95,50 L205,50 Q232,55 232,78 L228,118 Q224,135 198,140 L102,140 Q76,135 72,118 Z M308,78 Q308,55 335,50 L445,50 Q472,55 472,78 L468,118 Q464,135 438,140 L342,140 Q316,135 312,118 Z",
    bridge: "M240,70 Q270,55 300,70",
  },
  aviator: {
    outer: "M55,75 Q55,40 110,38 L200,42 Q245,48 245,85 L240,125 Q235,155 180,158 L120,158 Q65,155 60,125 Z M295,75 Q295,40 350,38 L440,42 Q485,48 485,85 L480,125 Q475,155 420,158 L360,158 Q305,155 300,125 Z",
    lens: "M63,75 Q63,46 113,44 L198,47 Q237,52 237,84 L233,122 Q228,148 178,152 L122,152 Q72,148 67,122 Z M303,75 Q303,46 353,44 L438,47 Q477,52 477,84 L473,122 Q468,148 418,152 L362,152 Q312,148 307,122 Z",
    bridge: "M245,60 Q270,45 295,60",
  },
  round: {
    outer: "M150,45 A65,65 0 1,1 150,175 A65,65 0 1,1 150,45 M390,45 A65,65 0 1,1 390,175 A65,65 0 1,1 390,45",
    lens: "M150,52 A58,58 0 1,1 150,168 A58,58 0 1,1 150,52 M390,52 A58,58 0 1,1 390,168 A58,58 0 1,1 390,52",
    bridge: "M215,90 Q270,70 325,90",
  },
  clubmaster: {
    outer: "M60,70 Q60,45 100,42 L200,42 Q240,45 240,70 L240,100 Q240,140 200,142 L100,142 Q60,140 60,100 Z M300,70 Q300,45 340,42 L440,42 Q480,45 480,70 L480,100 Q480,140 440,142 L340,142 Q300,140 300,100 Z",
    lens: "M68,72 Q68,52 104,50 L196,50 Q232,52 232,72 L232,98 Q232,132 196,135 L104,135 Q68,132 68,98 Z M308,72 Q308,52 344,50 L436,50 Q472,52 472,72 L472,98 Q472,132 436,135 L344,135 Q308,132 308,98 Z",
    bridge: "M240,65 Q270,50 300,65",
  },
};

const lensColors: Record<string, string> = {
  dark: "rgba(20,20,20,0.85)",
  blue: "rgba(30,60,140,0.7)",
  green: "rgba(30,100,60,0.65)",
  amber: "rgba(180,120,30,0.6)",
  rose: "rgba(180,50,80,0.55)",
  mirror: "url(#mirrorGradient)",
};

const templeEndX: Record<string, number> = {
  wayfarer: 42,
  aviator: 35,
  round: 85,
  clubmaster: 42,
};

export default function SunglassesPreview({ frameShape, frameColor, lensColor, templeStyle }: SunglassesPreviewProps) {
  const paths = framePaths[frameShape] || framePaths.wayfarer;
  const lens = lensColors[lensColor] || lensColors.dark;
  const endX = templeEndX[frameShape] || 42;

  const templeWidth = templeStyle === "thick" ? 8 : templeStyle === "thin" ? 3 : 5;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={frameShape + lensColor}
        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-center"
        style={{ perspective: "800px" }}
      >
        <svg viewBox="0 0 540 220" className="w-full max-w-lg drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mirrorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(200,80%,60%)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(280,60%,50%)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(340,70%,55%)" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="lensShine" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.25" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.5)" />
            </filter>
          </defs>

          {/* Temples */}
          <motion.line
            x1={endX} y1="65" x2="0" y2="55"
            stroke={frameColor} strokeWidth={templeWidth} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.line
            x1={540 - endX} y1="65" x2="540" y2="55"
            stroke={frameColor} strokeWidth={templeWidth} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Lens fill */}
          <motion.path
            d={paths.lens}
            fill={lens}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
          />

          {/* Lens shine */}
          <path d={paths.lens} fill="url(#lensShine)" />

          {/* Frame */}
          <motion.path
            d={paths.outer}
            fill="none"
            stroke={frameColor}
            strokeWidth="4"
            filter="url(#shadow)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Bridge */}
          <motion.path
            d={paths.bridge}
            fill="none"
            stroke={frameColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }}
          />
        </svg>
      </motion.div>
    </AnimatePresence>
  );
}
