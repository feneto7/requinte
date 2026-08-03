import type { CSSProperties } from "react";
import { Quote } from "lucide-react";
import {
  Container,
  Reveal,
  SectionHeading,
  StarRating,
} from "@/components/primitives";
import { media } from "@/lib/media";
import { cn } from "@/utils/cn";

type T = { name: string; role: string; avatar: string; quote: string };

const testimonials: T[] = [
  {
    name: "Marina Albuquerque",
    role: "Design de sobrancelhas",
    avatar: media.avatar1,
    quote:
      "Saí de lá me sentindo outra pessoa. A sobrancelha ficou perfeita, respeitando exatamente o que eu queria.",
  },
  {
    name: "Carolina Reis",
    role: "Micropigmentação",
    avatar: media.avatar2,
    quote:
      "A micropigmentação superou minhas expectativas. Acordo pronta todos os dias, sem precisar maquiar.",
  },
  {
    name: "Juliana Mendes",
    role: "Limpeza de pele",
    avatar: media.avatar3,
    quote:
      "Atendimento impecável e ambiente relaxante. Minha pele nunca esteve tão bonita e iluminada.",
  },
  {
    name: "Patrícia Souza",
    role: "Tatuagem",
    avatar: media.avatar4,
    quote:
      "Profissionalismo do começo ao fim. A tatuagem ficou delicada e exatamente como eu sonhei.",
  },
  {
    name: "Fernanda Lima",
    role: "Depilação",
    avatar: media.avatar5,
    quote:
      "Sem dor e sem desconforto. A depilação é rápida e o resultado dura muito mais do que eu imaginava.",
  },
  {
    name: "Renata Castro",
    role: "Cliente desde 2019",
    avatar: media.avatar6,
    quote:
      "Virei cliente fiel. É cuidado, carinho e técnica em um só lugar. Recomendo de olhos fechados.",
  },
];

function TestimonialCard({ t }: { t: T }) {
  return (
    <figure className="mr-5 flex w-[300px] shrink-0 flex-col gap-4 rounded-3xl border border-line glass p-6 shadow-lux transition-colors duration-300 hover:border-gold/30 sm:w-[380px]">
      <div className="flex items-center justify-between">
        <StarRating value={5} size={15} />
        <Quote size={26} className="text-gold/30" />
      </div>
      <blockquote className="text-pretty text-[0.95rem] leading-relaxed text-ink">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-4">
        <img
          src={t.avatar}
          alt={t.name}
          loading="lazy"
          decoding="async"
          width="44"
          height="44"
          className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/30"
        />
        <div className="leading-tight">
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-ink-faint">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  reverse,
  duration,
}: {
  items: T[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className="mask-fade-x marquee-pause relative overflow-hidden py-2">
      <div
        className={cn("marquee-track", reverse && "reverse")}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section aria-label="Depoimentos" className="relative scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="start"
            eyebrow="Quem confia, recomenda"
            title={
              <>
                Histórias de quem se{" "}
                <span className="italic text-gradient-gold">sente bem</span>
              </>
            }
          />
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 rounded-2xl border border-line glass px-5 py-4">
              <span className="font-display text-4xl text-gradient-gold">4,9</span>
              <div>
                <StarRating value={5} size={14} />
                <p className="mt-1 text-xs text-ink-faint">+2.300 avaliações</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="mt-12 flex flex-col gap-5">
        <Row items={testimonials.slice(0, 3)} duration="44s" />
        <Row items={testimonials.slice(3, 6)} reverse duration="52s" />
      </div>
    </section>
  );
}
