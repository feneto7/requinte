import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarClock, MousePointerClick, Sparkles } from "lucide-react";
import {
  Aurora,
  Button,
  Container,
  EASE,
  StarRating,
  TiltCard,
} from "@/components/primitives";
import { avatars, media } from "@/lib/media";

const ease = EASE;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBlob = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="topo" ref={ref} className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
      <motion.div style={{ y: yBlob }} className="absolute inset-0">
        <Aurora />
        <div className="absolute inset-0 grid-faint opacity-60" />
      </motion.div>

      {/* top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, var(--aurora-1), transparent 70%)" }}
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ---------------- Text ---------------- */}
          <motion.div style={{ y: yText }} className="flex flex-col items-start gap-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-medium text-ink-soft glass"
            >
              <Sparkles size={14} className="text-gold" />
              Estúdio de estética &amp; beleza — desde 2016
            </motion.div>

            <h1 className="font-display text-[2.7rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem] xl:text-[5rem]">
              {["A arte de realçar"].map((t) => (
                <motion.span
                  key={t}
                  className="block"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease, delay: 0.08 }}
                >
                  {t}
                </motion.span>
              ))}
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease, delay: 0.18 }}
              >
                a sua <span className="italic text-gradient-gold">beleza</span>.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              Sobrancelhas, micropigmentação, depilação, limpeza de pele e
              tatuagem. Um ritual completo de estética, feito sob medida para
              revelar a sua melhor versão.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button href="#agendar" className="px-7 py-4 text-[0.95rem]">
                Agendar horário
              </Button>
              <Button href="#servicos" variant="secondary" magnetic={false} className="px-7 py-4 text-[0.95rem]">
                Ver serviços
              </Button>
            </motion.div>

            {/* trust row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.5 }}
              className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <div className="flex -space-x-3">
                {avatars.slice(0, 4).map((a, i) => (
                  <img
                    key={i}
                    src={a}
                    alt=""
                    loading="lazy"
                    width="40"
                    height="40"
                    className="h-10 w-10 rounded-full border-2 border-canvas object-cover ring-1 ring-gold/30"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <StarRating value={5} size={15} />
                  <span className="text-sm font-semibold">4,9</span>
                </div>
                <span className="text-xs text-ink-faint">
                  +12.000 clientes encantadas
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ---------------- Visual ---------------- */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.25 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="perspective relative">
              {/* rotating ring */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 z-0 opacity-40"
              >
                <div className="anim-spin-slow absolute inset-0 rounded-[2.5rem] border border-dashed border-gold/30" />
              </div>

              <TiltCard className="relative z-10" intensity={7}>
                <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-lux glow-gold">
                  <img
                    src={media.heroPortrait}
                    alt="Cliente do estúdio Requinte com maquiagem elegante e pele radiante"
                    className="aspect-[4/5] w-full object-cover"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,5,9,0.7),transparent_45%)]" />
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />

                  {/* caption inside image */}
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-display text-2xl text-white drop-shadow">Glow Requinte</p>
                      <p className="text-xs text-white/70">Design de sobrancelhas + limpeza de pele</p>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* floating card: next slot */}
              <motion.div
                style={{ y: reduce ? 0 : undefined }}
                className="absolute -left-3 top-10 z-20 anim-float sm:-left-8"
              >
                <div className="glass-strong flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lux">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--gold-soft),var(--gold-deep))] text-[#1c1108]">
                    <CalendarClock size={17} />
                  </span>

                </div>
              </motion.div>

              {/* floating card: rating */}
              <motion.div className="absolute -right-3 bottom-12 z-20 anim-float2 sm:-right-6">
                <div className="glass-strong flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lux">
                  <span className="text-xl font-display text-gradient-gold">4,9</span>
                  <div className="leading-tight">
                    <StarRating value={5} size={12} />
                    <p className="text-[0.7rem] text-ink-faint">+12 mil avaliações</p>
                  </div>
                </div>
              </motion.div>

              {/* floating badge */}
              <motion.div className="absolute -right-2 top-6 z-20 anim-float sm:right-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1c1108] px-3 py-1.5 text-[0.7rem] font-medium text-gold-soft shadow-lux">
                  <MousePointerClick size={13} /> Agendamento online
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: fade }}
          className="mt-14 hidden flex-col items-center gap-2 text-ink-faint sm:flex"
        >
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1.5">
            <span className="h-1.5 w-1 rounded-full bg-gold" style={{ animation: "scroll-dot 1.6s ease-in-out infinite" }} />
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.2em]">Role para descobrir</span>
        </motion.div>
      </Container>
    </section>
  );
}
