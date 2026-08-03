import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import {
  Container,
  Reveal,
  SectionHeading,
} from "@/components/primitives";
import { media } from "@/lib/media";
import { cn } from "@/utils/cn";

const rows = [
  {
    n: "01",
    title: "Um ambiente pensado para acolher",
    img: media.salonInterior,
    alt: "Interior elegante e acolhedor do estúdio Requinte",
    desc: "Cada detalhe do espaço foi desenhado para você relaxar. Luz acolhedora, aromaterapia e um ritual que começa muito antes do primeiro toque.",
    points: ["Salão privativo e silencioso", "Aromaterapia e musicoterapia", "Aquecimento e conforto térmico"],
    badge: "Espaço boutique",
    reverse: false,
  },
  {
    n: "02",
    title: "Mãos de verdadeiras especialistas",
    img: media.microblading,
    alt: "Especialista realizando micropigmentação com precisão",
    desc: "Profissionais certificadas, em constante atualização, que dominam as técnicas mais avançadas do mercado para entregar um resultado impecável.",
    points: ["Certificações reconhecidas", "Materiais premium importados", "Protocolo rigoroso de higiene"],
    badge: "+8 anos de técnica",
    reverse: true,
  },
  {
    n: "03",
    title: "O resultado que você merece",
    img: media.pearlPortrait,
    alt: "Resultado natural e radiante após os cuidados do estúdio",
    desc: "Da sobrancelha à pele, você vê a diferença desde a primeira sessão. Natural, harmoniosa e feita sob medida para o seu rosto.",
    points: ["Resultado natural e duradouro", "Avaliação personalizada", "Acompanhamento pós-procedimento"],
    badge: "Garantia de retoque",
    reverse: false,
  },
];

function ShowcaseRow({
  row,
}: {
  row: (typeof rows)[number];
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [28, -28]);
  const yCard = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 30]);

  return (
    <div
      ref={ref}
      className="grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16"
    >
      {/* Image */}
      <Reveal className={cn(row.reverse ? "lg:order-2" : "")}>
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line shadow-lux">
            <motion.img
              src={row.img}
              alt={row.alt}
              loading="lazy"
              decoding="async"
              style={{ y }}
              className="absolute inset-0 h-full w-full scale-[1.18] object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,5,9,0.45),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
          </div>
          {/* floating badge */}
          <motion.div
            style={{ y: yCard }}
            className={cn(
              "absolute z-10 anim-float",
              row.reverse ? "-left-4 bottom-8" : "-right-4 top-8"
            )}
          >
            <div className="glass-strong rounded-2xl px-4 py-3 text-center shadow-lux">
              <p className="font-display text-lg text-gradient-gold">{row.badge}</p>
            </div>
          </motion.div>
        </div>
      </Reveal>

      {/* Text */}
      <Reveal delay={0.1} className={cn(row.reverse ? "lg:order-1" : "")}>
        <div className="flex flex-col gap-5">
          <span className="font-display text-5xl leading-none text-gradient-gold opacity-80 sm:text-6xl">
            {row.n}
          </span>
          <h3 className="text-balance font-display text-3xl leading-tight sm:text-4xl lg:text-[2.7rem]">
            {row.title}
          </h3>
          <p className="max-w-lg text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            {row.desc}
          </p>
          <ul className="mt-2 flex flex-col gap-3">
            {row.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-ink sm:text-base">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--gold-soft),var(--gold-deep))] text-[#1c1108]">
                  <Check size={13} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

export function Showcase() {
  return (
    <section id="experiencia" className="relative scroll-mt-24 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 h-96 opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 80% 0%, color-mix(in oklab, var(--plum) 16%, transparent), transparent)",
        }}
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="A experiência Requinte"
          title={
            <>
              Mais que um procedimento,{" "}
              <span className="italic text-gradient-gold">um ritual</span>
            </>
          }
          desc="Do momento em que você entra até o resultado final, cada etapa é pensada para fazer você se sentir única."
        />
        <div className="mt-6">
          {rows.map((row) => (
            <ShowcaseRow key={row.n} row={row} />
          ))}
        </div>
      </Container>
    </section>
  );
}
