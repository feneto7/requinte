import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { EASE } from "@/components/primitives";
import logoImg from "../../logos/logo.png";

/* ------------------------------------------------------------------ */
/* Custom trailing cursor (fine pointer only)                         */
/* ------------------------------------------------------------------ */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 320, damping: 26, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 320, damping: 26, mass: 0.45 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor='hover'], input, textarea, label"
      );
      setHovering(!!t);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x, y }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
          animate={{ scale: pressed ? 0.6 : 1 }}
          transition={{ duration: 0.2 }}
          style={{ width: 7, height: 7 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60"
          animate={{
            scale: hovering ? 1.9 : pressed ? 0.7 : 1,
            opacity: hovering ? 0.9 : 0.45,
          }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{ width: 34, height: 34 }}
        />
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll progress bar                                                */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[90] h-[2.5px] w-full origin-left bg-[linear-gradient(90deg,var(--gold-soft),var(--gold),var(--rose))]"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Preloader                                                          */
/* ------------------------------------------------------------------ */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 8500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-canvas"
          exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.img 
              src={logoImg} 
              alt="Logo" 
              className="mb-8 h-24 w-auto object-contain" 
              initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 3.0, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span 
              className="block font-display text-5xl tracking-tight text-gradient-gold sm:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.0, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Requinte
            </motion.span>
            <motion.span 
              className="mt-4 block text-[0.7rem] font-semibold uppercase text-ink-faint"
              initial={{ opacity: 0, letterSpacing: "0em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 3.0, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Estética &amp; Beleza
            </motion.span>

            <motion.div 
              className="relative mt-12 h-[2px] w-56 overflow-hidden rounded-full bg-line/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1.5 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,var(--gold-soft),var(--rose))]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, delay: 3.5, ease: [0.65, 0, 0.35, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
