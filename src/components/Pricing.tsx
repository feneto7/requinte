import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import {
  Button,
  Container,
  Reveal,
  SectionHeading,
} from "@/components/primitives";
import { cn } from "@/utils/cn";

type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  features: string[];
  popular?: boolean;
  cta: string;
};

const plans: Plan[] = [
  {
    name: "Essencial",
    tagline: "Para quem ama estar sempre em dia",
    monthly: 149,
    yearly: 119,
    features: [
      "Design de sobrancelhas mensal",
      "10% em todos os serviços",
      "Agendamento prioritário",
      "Avaliação de pele gratuita",
    ],
    cta: "Começar agora",
  },
  {
    name: "Signature",
    tagline: "O cuidado completo, todo mês",
    monthly: 249,
    yearly: 199,
    popular: true,
    features: [
      "Tudo do plano Essencial",
      "Limpeza de pele profunda mensal",
      "20% off em micropigmentação",
      "Brinde exclusivo por trimestre",
    ],
    cta: "Assinar Signature",
  },
  {
    name: "Experiência",
    tagline: "O máximo do estúdio Requinte",
    monthly: 449,
    yearly: 359,
    features: [
      "Tudo do plano Signature",
      "Depilação ilimitada",
      "25% off em tatuagens",
      "Consultora de beleza dedicada",
    ],
    cta: "Quero a Experiência",
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="precos" className="relative scroll-mt-24 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 30%, color-mix(in oklab, var(--plum) 12%, transparent), transparent)",
        }}
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Planos & valores"
          title={
            <>
              Escolha o seu ritual de{" "}
              <span className="italic text-gradient-gold">cuidado</span>
            </>
          }
          desc="Planos mensais com economia real. Sem fidelidade — comece, pause ou cancele quando quiser."
        />

        {/* Toggle */}
        <Reveal className="mt-9 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1 rounded-full border border-line glass p-1">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                "rounded-full px-5 py-2 text-sm transition-all duration-300",
                !yearly
                  ? "bg-[linear-gradient(120deg,var(--gold-soft),var(--gold-deep))] font-semibold text-[#1c1108] shadow-[0_8px_20px_-10px_var(--glow)]"
                  : "text-ink-soft hover:text-ink"
              )}
            >
              Mensal
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-all duration-300",
                yearly
                  ? "bg-[linear-gradient(120deg,var(--gold-soft),var(--gold-deep))] font-semibold text-[#1c1108] shadow-[0_8px_20px_-10px_var(--glow)]"
                  : "text-ink-soft hover:text-ink"
              )}
            >
              Anual
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[0.65rem] font-semibold",
                  yearly ? "bg-[#1c1108] text-gold-soft" : "bg-gold/15 text-gold"
                )}
              >
                -2 meses
              </span>
            </button>
          </div>
          <AnimatePresence>
            {yearly && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-gold"
              >
                Você economiza cerca de 20% pagando anualmente ✦
              </motion.p>
            )}
          </AnimatePresence>
        </Reveal>

        {/* Cards */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div
                className={cn(
                  "group relative h-full",
                  plan.popular && "lg:-mt-4 lg:mb-4"
                )}
              >
                <div
                  className={cn(
                    "relative h-full rounded-[2rem] p-px transition-transform duration-500",
                    plan.popular
                      ? "bg-[linear-gradient(160deg,var(--gold-soft),transparent_35%,transparent_65%,var(--rose))]"
                      : "bg-line hover:bg-line-strong"
                  )}
                >
                  <div
                    className={cn(
                      "relative flex h-full flex-col rounded-[calc(2rem-1px)] p-8",
                      plan.popular ? "bg-canvas-2 shadow-lux" : "bg-canvas-2/60"
                    )}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[linear-gradient(120deg,var(--gold-soft),var(--gold-deep))] px-4 py-1.5 text-xs font-semibold text-[#1c1108] shadow-[0_8px_20px_-8px_var(--glow)]">
                        <Sparkles size={13} /> Mais popular
                      </span>
                    )}

                    <h3 className="font-display text-2xl">{plan.name}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{plan.tagline}</p>

                    <div className="mt-6 flex items-end gap-1">
                      <span className="text-lg text-ink-soft">R$</span>
                      <span className="font-display text-5xl tracking-tight">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={`${plan.name}-${yearly}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="inline-block"
                          >
                            {yearly ? plan.yearly : plan.monthly}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      <span className="mb-1.5 text-sm text-ink-faint">/mês</span>
                    </div>
                    <p className="mt-1 h-4 text-xs text-ink-faint">
                      {yearly ? "cobrado anualmente" : "cobrado mensalmente"}
                    </p>

                    <div className="my-6 h-px w-full bg-line" />

                    <ul className="flex flex-1 flex-col gap-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <span
                            className={cn(
                              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                              plan.popular
                                ? "bg-[linear-gradient(135deg,var(--gold-soft),var(--gold-deep))] text-[#1c1108]"
                                : "bg-gold/15 text-gold"
                            )}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span className="text-ink-soft">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Button
                        href="#agendar"
                        variant={plan.popular ? "primary" : "secondary"}
                        magnetic={false}
                        className="w-full justify-center"
                      >
                        {plan.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center text-xs text-ink-faint">
          Todos os planos incluem produtos premium, ambiente privativo e suporte
          por WhatsApp. Sem taxa de adesão.
        </Reveal>
      </Container>
    </section>
  );
}
