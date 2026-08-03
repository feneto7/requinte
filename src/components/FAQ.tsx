import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import {
  Button,
  Container,
  Reveal,
} from "@/components/primitives";
import { cn } from "@/utils/cn";

const faqs = [
  {
    q: "Com quanto tempo de antecedência devo agendar?",
    a: "Recomendamos agendar com pelo menos uma semana de antecedência, especialmente para micropigmentação e tatuagem. Para serviços rápidos, costumamos ter horários na mesma semana.",
  },
  {
    q: "A micropigmentação dói?",
    a: "Aplicamos uma anestesia tópica de qualidade antes do procedimento, tornando a experiência bastante confortável. A maioria das clientes relata apenas um leve desconforto.",
  },
  {
    q: "Vocês usam materiais esterilizados?",
    a: "Sempre. Todos os materiais são descartáveis ou passam por um protocolo rigoroso de esterilização, em conformidade com as normas de biossegurança.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Aceitamos Pix, cartões de crédito (em até 3x sem juros), débito e dinheiro. Clientes de planos Signature e Experiência têm condições especiais.",
  },
  {
    q: "Vocês fazem retoque?",
    a: "Sim. Oferecemos retoque de cortesia dentro do período indicado para cada procedimento, garantindo que o resultado fique exatamente como você sonhou.",
  },
  {
    q: "Onde fica o estúdio e tem estacionamento?",
    a: "Estamos em uma região de fácil acesso, com estacionamento conveniado a poucos metros. Enviamos a localização completa pelo WhatsApp no momento do agendamento.",
  },
];

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span
            className={cn(
              "font-display text-lg transition-colors sm:text-xl",
              open ? "text-ink" : "text-ink-soft"
            )}
          >
            {item.q}
          </span>
          <span
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
              open
                ? "rotate-45 border-gold/40 bg-[linear-gradient(135deg,var(--gold-soft),var(--gold-deep))] text-[#1c1108]"
                : "border-line text-ink-soft"
            )}
          >
            <Plus size={16} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-xl pb-6 pr-10 text-pretty text-sm leading-relaxed text-ink-soft sm:text-base">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="duvidas" className="relative scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink-soft glass">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Dúvidas frequentes
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-balance font-display text-4xl leading-tight sm:text-5xl">
                Tudo o que você precisa{" "}
                <span className="italic text-gradient-gold">saber</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 overflow-hidden rounded-3xl border border-gold/25 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--gold)_12%,transparent),transparent)] p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--gold-soft),var(--gold-deep))] text-[#1c1108]">
                    <MessageCircle size={20} />
                  </span>
                  <div>
                    <p className="font-display text-lg">Ainda com dúvidas?</p>
                    <p className="text-sm text-ink-soft">Respondemos em minutos.</p>
                  </div>
                </div>
                <div className="mt-5">
                  <Button
                    href="#agendar"
                    className="w-full justify-center"
                  >
                    Falar no WhatsApp
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right - accordion */}
          <Reveal delay={0.1}>
            <div>
              {faqs.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
