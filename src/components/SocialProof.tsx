import type { CSSProperties } from "react";
import {
  AnimatedCounter,
  Container,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/primitives";

const press = [
  "NOME INFLUENCER 1",
  "NOME INFLUENCER 2",
  "NOME INFLUENCER 3",
  "NOME INFLUENCER 4",
  "NOME INFLUENCER 5",
  "NOME INFLUENCER 6",
  "NOME INFLUENCER 7",
];

const stats = [
  { to: 10, suffix: "+", label: "Anos de experiência" },
  { to: 5, suffix: "K+", label: "Clientes encantadas" },
  { to: 4.9, decimals: 1, label: "Avaliação média" },
  { to: 98, suffix: "%", label: "Nos recomendam" },
];

export function SocialProof() {
  return (
    <section aria-label="Reconhecimento" className="relative py-14 sm:py-20">
      <Container>
        {/* Press marquee */}
        <Reveal>
          <p className="mb-7 text-center text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink-faint">
            Visto &amp; recomendado por
          </p>
        </Reveal>

        <div className="mask-fade-x marquee-pause relative overflow-hidden">
          <div className="marquee-track" style={{ "--marquee-duration": "40s" } as CSSProperties}>
            {[...press, ...press].map((name, i) => (
              <span
                key={i}
                className="mr-12 shrink-0 font-display text-2xl tracking-tight text-ink-soft/70 transition-colors hover:text-ink sm:text-3xl"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Stagger className="mt-14">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line glass-strong lg:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="group relative flex flex-col items-center gap-2 px-6 py-9 text-center transition-colors">
                  <span className="font-display text-5xl tracking-tight text-gradient-gold sm:text-6xl">
                    <AnimatedCounter
                      to={s.to}
                      decimals={s.decimals ?? 0}
                      suffix={s.suffix ?? ""}
                    />
                  </span>
                  <span className="text-sm text-ink-soft">{s.label}</span>
                  <span className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </section>
  );
}
