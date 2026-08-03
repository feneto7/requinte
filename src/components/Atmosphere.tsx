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
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 200 : 1400);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-canvas"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex flex-col items-center text-center"
            >
              <img src={logoImg} alt="Logo" className="mb-6 h-20 w-auto object-contain" />
              <span className="block font-display text-5xl tracking-tight text-gradient-gold sm:text-6xl">
                Requinte
              </span>
              <span className="mt-2 block text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-ink-faint">
                Estética &amp; Beleza
              </span>
            </motion.div>

            <div className="relative h-px w-44 overflow-hidden bg-line">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,var(--gold-soft),var(--rose))]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduce ? 0.2 : 1.25, ease: EASE }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
