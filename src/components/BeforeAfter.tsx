import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  ChevronsLeftRight,
  Heart,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  Container,
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "@/components/primitives";
import { media } from "@/lib/media";

const benefits: {
  Icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}[] = [
  {
    Icon: ShieldCheck,
    title: "Higiene certificada",
    desc: "Materiais esterilizados e descartáveis em cada procedimento.",
  },
  {
    Icon: Award,
    title: "Especialistas reconhecidas",
    desc: "Profissionais com mais de 8 anos e certificações do mercado.",
  },
  {
    Icon: Leaf,
    title: "Produtos premium",
    desc: "Marcas importadas e hipoalergênicas selecionadas para a sua pele.",
  },
  {
    Icon: Heart,
    title: "Atendimento dedicado",
    desc: "Avaliação personalizada e acompanhamento antes e depois.",
  },
];

function BeforeAfterSlider() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState(52);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="group relative aspect-[4/5] select-none overflow-hidden rounded-[2rem] border border-line shadow-lux sm:aspect-[4/3]"
        style={{ cursor: "ew-resize", touchAction: "none" }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* After (base) */}
        <img
          src={media.flawlessPortrait}
          alt="Resultado após o tratamento: pele radiante"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-white backdrop-blur">
          Depois
        </span>

        {/* Before (clipped overlay) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={media.flawlessPortrait}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            style={{
              filter: "grayscale(0.5) brightness(0.88) saturate(0.55) contrast(0.96)",
            }}
          />
          <div className="absolute inset-0 bg-canvas/15" />
          <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-white backdrop-blur">
            Antes
          </span>
        </div>

        {/* Handle */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/80 shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
          <motion.div
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/90 text-[#1c1108] shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <ChevronsLeftRight size={18} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* accessible control */}
      <label className="sr-only" htmlFor="ba-range">
        Comparar antes e depois
      </label>
      <input
        id="ba-range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="sr-only"
      />
      <p className="mt-3 text-center text-xs text-ink-faint">
        Arraste para comparar o antes e o depois
      </p>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section id="resultados" className="relative scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Por que o Requinte"
          title={
            <>
              Resultados que falam{" "}
              <span className="italic text-gradient-gold">por si</span>
            </>
          }
          desc="Veja a diferença e entenda por que milhares de clientes confiam o seu cuidado a nós."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <BeforeAfterSlider />
          </Reveal>

          <div>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <StaggerItem key={b.title}>
                  <div className="group h-full rounded-2xl border border-line glass p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
                    <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--gold-soft),var(--gold-deep))] text-[#1c1108] transition-transform duration-300 group-hover:scale-110">
                      <b.Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-xl">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{b.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.15}>
              <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-gold/25 bg-[linear-gradient(120deg,color-mix(in_oklab,var(--gold)_10%,transparent),transparent)] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-lg">Satisfação garantida</p>
                  <p className="text-sm text-ink-soft">
                    Não amou o resultado? O retoque é por nossa conta.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[linear-gradient(135deg,var(--gold-soft),var(--gold-deep))] px-4 py-2 text-sm font-semibold text-[#1c1108]">
                  98% de aprovação
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
