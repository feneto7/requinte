import { CalendarCheck, Clock, MapPin, Sparkles } from "lucide-react";
import {
  Aurora,
  Button,
  Container,
  Eyebrow,
  Reveal,
  StarRating,
} from "@/components/primitives";

const micro = [
  { Icon: Clock, label: "Resposta em até 10 min" },
  { Icon: MapPin, label: "Fácil acesso · estacionamento" },
  { Icon: StarRating, label: "4,9 de avaliação" },
];

export function FinalCTA() {
  return (
    <section id="agendar" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <Aurora />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-faint opacity-40"
      />

      <Container className="relative">
        <Reveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-line glass-strong px-6 py-16 text-center shadow-lux sm:px-12">
            {/* glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-50 blur-3xl"
              style={{ background: "var(--aurora-1)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full opacity-50 blur-3xl"
              style={{ background: "var(--aurora-2)" }}
            />

            <div className="relative flex flex-col items-center gap-6">
              <Eyebrow>
                <Sparkles size={12} className="text-gold" />
                Apenas 8 vagas nesta semana
              </Eyebrow>

              <h2 className="text-balance font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
                Pronta para se sentir{" "}
                <span className="italic text-gradient-gold">radiante</span>?
              </h2>

              <p className="max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
                Agende agora o seu horário e viva a experiência Requinte: técnica,
                cuidado e sofisticação em cada detalhe. A sua melhor versão está a
                um clique.
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Button
                  href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20agendar%20um%20hor%C3%A1rio%20no%20Requinte."
                  icon={CalendarCheck}
                  className="px-8 py-4 text-[0.95rem]"
                >
                  Agendar pelo WhatsApp
                </Button>
                <Button
                  href="#precos"
                  variant="secondary"
                  magnetic={false}
                  className="px-8 py-4 text-[0.95rem]"
                >
                  Ver planos
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
                {micro.map((m, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 text-sm text-ink-soft"
                  >
                    {i === 2 ? (
                      <m.Icon value={5} size={14} className="text-gold" />
                    ) : (
                      <m.Icon size={15} className="text-gold" />
                    )}
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
