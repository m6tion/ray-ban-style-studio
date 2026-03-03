import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CameraOff, FlipHorizontal, ZoomIn, ZoomOut, Move } from "lucide-react";
import SunglassesPreview from "./SunglassesPreview";

interface VirtualTryOnProps {
  frameShape: string;
  frameColor: string;
  lensColor: string;
  templeStyle: string;
}

export default function VirtualTryOn({ frameShape, frameColor, lensColor, templeStyle }: VirtualTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [mirrored, setMirrored] = useState(true);
  const [glassesPos, setGlassesPos] = useState({ x: 0, y: 0 });
  const [glassesScale, setGlassesScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setCameraActive(true);
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    setCameraActive(false);
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - glassesPos.x, y: e.clientY - glassesPos.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setGlassesPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="section-label mb-3">Virtual Try-On</p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-foreground">
            See Them On <span className="italic font-semibold gold-text">You</span>
          </h2>
          <p className="text-muted-foreground text-sm font-body mt-3 max-w-md mx-auto">
            Use your camera to preview how your custom sunglasses look. Drag to position, zoom to resize.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          {/* Camera viewport */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] sm:aspect-video bg-secondary/30 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {cameraActive ? (
                <motion.div
                  key="camera"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: mirrored ? "scaleX(-1)" : "none" }}
                  />

                  {/* Glasses overlay */}
                  <div
                    className="absolute top-1/2 left-1/2 cursor-grab active:cursor-grabbing touch-none"
                    style={{
                      transform: `translate(calc(-50% + ${glassesPos.x}px), calc(-50% + ${glassesPos.y}px)) scale(${glassesScale})`,
                      width: "min(70%, 350px)",
                      pointerEvents: "auto",
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  >
                    <SunglassesPreview
                      frameShape={frameShape}
                      frameColor={frameColor}
                      lensColor={lensColor}
                      templeStyle={templeStyle}
                    />
                  </div>

                  {/* Drag hint */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded-full">
                    <Move size={12} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-body tracking-wider">DRAG TO POSITION</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-border flex items-center justify-center">
                    <Camera size={24} className="text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-display text-lg mb-1">Enable Camera</p>
                    <p className="text-muted-foreground text-xs font-body max-w-xs">
                      Allow camera access to try on your custom sunglasses in real-time
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startCamera}
                    className="px-6 py-2.5 bg-primary text-primary-foreground font-body text-xs font-semibold tracking-[0.2em] uppercase rounded-sm"
                  >
                    Start Camera
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          {cameraActive && (
            <div className="flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 border-t border-border/40">
              <button
                onClick={() => setGlassesScale((s) => Math.max(0.3, s - 0.1))}
                className="p-2 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
                title="Zoom out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={() => setGlassesScale((s) => Math.min(2.5, s + 0.1))}
                className="p-2 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
                title="Zoom in"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => setMirrored((m) => !m)}
                className="p-2 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
                title="Mirror"
              >
                <FlipHorizontal size={16} />
              </button>
              <button
                onClick={() => {
                  setGlassesPos({ x: 0, y: 0 });
                  setGlassesScale(1);
                }}
                className="px-3 py-2 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary transition-colors text-xs font-body tracking-wider"
              >
                RESET
              </button>
              <div className="w-px h-6 bg-border/40 mx-1" />
              <button
                onClick={stopCamera}
                className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                title="Stop camera"
              >
                <CameraOff size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
