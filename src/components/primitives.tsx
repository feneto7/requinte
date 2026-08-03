import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/utils/cn";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Layout                                                             */
/* ------------------------------------------------------------------ */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                      */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger                                                            */
/* ------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic wrapper                                                   */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 13, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 13, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Button                                                             */
/* ------------------------------------------------------------------ */
type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  icon?: ComponentType<{ className?: string }>;
  iconLeft?: ComponentType<{ className?: string }>;
  magnetic?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  icon: Icon = ArrowRight,
  iconLeft: IconLeft,
  magnetic = true,
  ariaLabel,
  type = "button",
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-tight transition-[transform,box-shadow,background-color] duration-300 will-change-transform focus-visible:outline-2";
  const variants = {
    primary:
      "bg-[linear-gradient(120deg,var(--gold-soft),var(--gold)_55%,var(--gold-deep))] text-[#1c1108] shadow-[0_14px_40px_-14px_var(--glow)] hover:shadow-[0_22px_60px_-14px_var(--glow)] hover:-translate-y-0.5 px-6 py-3.5 sm:px-7",
    secondary:
      "glass text-ink px-6 py-3.5 hover:bg-surface-2 hover:-translate-y-0.5",
    ghost: "text-gold px-2 py-1 hover:text-gold-soft",
  };

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="absolute inset-0 shimmer" />
        </span>
      )}
      {IconLeft && <IconLeft className="relative h-4 w-4" />}
      <span className="relative">{children}</span>
      {variant !== "ghost" && (
        <Icon className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  const cls = cn(base, variants[variant], className);
  const content = href ? (
    <a href={href} aria-label={ariaLabel} className={cls}>
      {inner}
    </a>
  ) : (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={cls}>
      {inner}
    </button>
  );

  return magnetic ? <Magnetic strength={0.3}>{content}</Magnetic> : content;
}

/* ------------------------------------------------------------------ */
/* Eyebrow + Section heading                                          */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink-soft glass",
        className
      )}
    >
      <span className="relative h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-gold" />
        <span className="absolute inset-0 rounded-full bg-gold anim-glow" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  desc?: ReactNode;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="text-balance text-4xl leading-[1.04] sm:text-5xl lg:text-[3.6rem]">
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.12}>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated counter                                                   */
/* ------------------------------------------------------------------ */
export function AnimatedCounter({
  to,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Tilt card                                                          */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className,
  intensity = 9,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * intensity);
    rx.set(-py * intensity);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100, ...style }}
      className={cn("preserve-3d", className)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Star rating                                                        */
/* ------------------------------------------------------------------ */
export function StarRating({
  value = 5,
  size = 16,
  className,
}: {
  value?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-0.5 text-gold", className)} aria-label={`${value} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={i < Math.round(value) ? "fill-current" : "fill-none opacity-30"}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Aurora decorative background                                       */
/* ------------------------------------------------------------------ */
export function Aurora({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={style}
    >
      <div
        className="aurora-blob anim-aurora-a"
        style={{ width: 520, height: 520, left: "-8%", top: "-12%", background: "var(--aurora-1)" }}
      />
      <div
        className="aurora-blob anim-aurora-b"
        style={{ width: 470, height: 470, right: "-6%", top: "18%", background: "var(--aurora-2)" }}
      />
      <div
        className="aurora-blob anim-aurora-c"
        style={{ width: 430, height: 430, left: "28%", bottom: "-20%", background: "var(--aurora-3)" }}
      />
    </div>
  );
}
