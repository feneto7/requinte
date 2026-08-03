import { useState } from "react";
import type { ComponentType } from "react";
import { ArrowUpRight, Brush, Feather, PenTool, Sparkles, Wand2 } from "lucide-react";
import {
  Container,
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "@/components/primitives";
import { media } from "@/lib/media";
import { cn } from "@/utils/cn";
import { AnimatePresence } from "framer-motion";
import { ServiceCarousel } from "./ServiceCarousel";

type Service = {
  title: string;
  desc: string;
  price: string;
  Icon: ComponentType<{ className?: string }>;
  image?: string;
  tint?: boolean;
  gallery: string[];
};

const services: Service[] = [
  {
    title: "Micropigmentação",
    desc: "Pigmentação semipermanente para sobrancelhas, lábios e olhos com efeito natural.",
    price: "450",
    Icon: Wand2,
    image: media.microblading,
    gallery: ["/services/micropigmentacao/pig1.jpg", "/services/micropigmentacao/pig2.jpg"],
  },
  {
    title: "Sobrancelhas",
    desc: "Design personalizado que valoriza o seu olhar e harmoniza o formato do rosto.",
    price: "60",
    Icon: Brush,
    image: media.browDesign,
    gallery: ["/services/sobrancelhas/sobrancelhas1.jpg", "/services/sobrancelhas/sobrancelhas2.jpg", "/services/sobrancelhas/sobrancelhaMan1.jpg"],
  },
  {
    title: "Cílios",
    desc: "Alongamento e volume para um olhar marcante e expressivo todos os dias.",
    price: "120",
    Icon: Sparkles,
    image: media.facial,
    gallery: ["/services/cilios/cilios1.jpg", "/services/cilios/cilios2.jpg"],
  },
  {
    title: "Produção de Noivas",
    desc: "Assessoria completa e maquiagem perfeita para o seu grande dia.",
    price: "850",
    Icon: Sparkles,
    image: media.pearlPortrait,
    gallery: ["/services/noivas/noiva1.jpg"],
  },
  {
    title: "Maquiagem",
    desc: "Realce sua beleza para eventos especiais com técnicas e produtos de alta qualidade.",
    price: "150",
    Icon: Brush,
    image: media.flawlessPortrait,
    gallery: ["/services/maquiagem/make1.jpg", "/services/maquiagem/make2.jpg", "/services/maquiagem/make3.jpg"],
  },
  {
    title: "Tattoo",
    desc: "Tatuagens autorais com traço refinado, higiene certificada e alta precisão.",
    price: "250",
    Icon: PenTool,
    image: media.tattoo,
    gallery: ["/services/tattoo/tattoo.jpg"],
  },
];

function ImageCard({ s, featured, onClick }: { s: Service; featured?: boolean; onClick?: () => void }) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-line shadow-lux",
        featured ? "min-h-[420px]" : "min-h-[300px]"
      )}
    >
      <img
        src={s.image}
        alt={s.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,5,9,0.92)_6%,rgba(10,5,9,0.35)_45%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />

      <div className="relative flex h-full flex-col justify-end p-6">
        <div className="mb-auto flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl glass-strong text-gold-soft">
            <s.Icon className="h-5 w-5" />
          </span>
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/85 backdrop-blur-md">
            a partir de <span className="font-semibold text-white">R$ {s.price}</span>
          </span>
        </div>
        <div>
          <h3 className="font-display text-2xl text-white sm:text-[1.7rem]">{s.title}</h3>
          <p className={cn("mt-2 max-w-md text-sm leading-relaxed text-white/75", featured ? "" : "line-clamp-2")}>
            {s.desc}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-soft">
            Saiba mais
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

function TintCard({ s, onClick }: { s: Service; onClick?: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group relative flex h-full min-h-[300px] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-line p-6 shadow-lux"
      style={{
        background:
          "linear-gradient(155deg, color-mix(in oklab, var(--plum) 34%, var(--surface)), var(--surface) 70%)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-10 text-[10rem] leading-none text-gold/10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"
      >
        <s.Icon className="h-40 w-40" />
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, color-mix(in oklab, var(--rose) 24%, transparent), transparent 55%)",
        }}
      />
      <span className="relative grid h-11 w-11 place-items-center rounded-xl glass-strong text-gold-soft">
        <s.Icon className="h-5 w-5" />
      </span>
      <div className="relative">
        <h3 className="font-display text-2xl sm:text-[1.7rem]">{s.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft">
            a partir de <span className="font-semibold text-ink">R$ {s.price}</span>
          </span>
          <ArrowUpRight size={18} className="text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <section id="servicos" className="relative scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="O que fazemos"
          title={
            <>
              Serviços pensados para o seu{" "}
              <span className="italic text-gradient-gold">brilho</span>
            </>
          }
          desc="Cada procedimento é executado com técnica refinada, produtos premium e um cuidado atento a cada detalhe — para resultados que duram."
        />

        <Stagger className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          <StaggerItem className="md:col-span-2 lg:col-span-2">
            <ImageCard s={services[0]} featured onClick={() => setSelectedService(services[0])} />
          </StaggerItem>
          <StaggerItem>
            <TintCard s={services[1]} onClick={() => setSelectedService(services[1])} />
          </StaggerItem>

          <StaggerItem>
            <ImageCard s={services[2]} onClick={() => setSelectedService(services[2])} />
          </StaggerItem>
          <StaggerItem className="md:col-span-2 lg:col-span-2">
            <ImageCard s={services[3]} featured onClick={() => setSelectedService(services[3])} />
          </StaggerItem>

          <StaggerItem className="md:col-span-2 lg:col-span-2">
            <ImageCard s={services[4]} featured onClick={() => setSelectedService(services[4])} />
          </StaggerItem>
          <StaggerItem>
            <ImageCard s={services[5]} onClick={() => setSelectedService(services[5])} />
          </StaggerItem>
        </Stagger>

        <Reveal className="mt-10 flex justify-center" delay={0.1}>
          <a
            href="#agendar"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-ink-soft transition-colors hover:border-gold/40 hover:text-ink"
          >
            Ver tabela completa de serviços
            <ArrowUpRight size={16} className="text-gold" />
          </a>
        </Reveal>
      </Container>
      </section>

      <AnimatePresence>
        {selectedService && (
          <ServiceCarousel
            images={selectedService.gallery}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
