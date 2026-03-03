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
  meta: {
    outer: "M58,68 Q58,42 100,40 L210,40 Q242,42 242,68 L242,115 Q242,148 210,150 L100,150 Q58,148 58,115 Z M298,68 Q298,42 340,40 L450,40 Q482,42 482,68 L482,115 Q482,148 450,150 L340,150 Q298,148 298,115 Z",
    lens: "M66,70 Q66,48 104,46 L206,46 Q234,48 234,70 L234,113 Q234,142 206,144 L104,144 Q66,142 66,113 Z M306,70 Q306,48 344,46 L446,46 Q474,48 474,70 L474,113 Q474,142 446,144 L344,144 Q306,142 306,113 Z",
    bridge: "M242,62 Q270,48 298,62",
  },
};

const lensColors: Record<string, string> = {
  dark: "rgba(20,30,20,0.85)",
  blue: "rgba(30,60,140,0.7)",
  green: "rgba(30,100,60,0.65)",
  amber: "rgba(160,100,30,0.6)",
  rose: "rgba(160,50,80,0.55)",
  mirror: "url(#mirrorGrad)",
};

export default function SunglassesPreview({ frameShape, frameColor, lensColor, templeStyle }: SunglassesPreviewProps) {
  const paths = framePaths[frameShape] || framePaths.wayfarer;
  const lens = lensColors[lensColor] || lensColors.dark;
  const tw = templeStyle === "thick" ? 7 : templeStyle === "thin" ? 2.5 : 4.5;

  // Smart glasses indicator dots for Meta
  const isMeta = frameShape === "meta";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={frameShape + lensColor + frameColor}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-center"
      >
        <svg viewBox="0 0 540 200" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mirrorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(200,60%,65%)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(260,40%,60%)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(330,50%,60%)" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="shine" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="rgba(0,0,0,0.35)" />
            </filter>
          </defs>

          {/* Temples */}
          <line x1="42" y1="60" x2="0" y2="50" stroke={frameColor} strokeWidth={tw} strokeLinecap="round" />
          <line x1="498" y1="60" x2="540" y2="50" stroke={frameColor} strokeWidth={tw} strokeLinecap="round" />

          {/* Lens fill */}
          <path d={paths.lens} fill={lens} />
          <path d={paths.lens} fill="url(#shine)" />

          {/* Frame */}
          <path d={paths.outer} fill="none" stroke={frameColor} strokeWidth="3.5" filter="url(#glow)" />

          {/* Bridge */}
          <path d={paths.bridge} fill="none" stroke={frameColor} strokeWidth="3" strokeLinecap="round" />

          {/* Meta smart indicators */}
          {isMeta && (
            <>
              <circle cx="74" cy="46" r="3" fill="hsl(200,80%,60%)" opacity="0.8">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="466" cy="46" r="3" fill="hsl(200,80%,60%)" opacity="0.8">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
              </circle>
            </>
          )}
        </svg>
      </motion.div>
    </AnimatePresence>
  );
}
