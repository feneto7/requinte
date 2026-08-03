import { useState } from "react";
import { Container, SectionHeading } from "@/components/primitives";
import { CheckCircle2, CalendarDays, Clock, Send, CreditCard, Banknote } from "lucide-react";

export function CoursePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Meu nome é ${name}, meu e-mail é ${email} (tel: ${phone}) e eu gostaria de garantir minha vaga no curso profissional de Design de Sobrancelha!`;
    const url = `https://wa.me/5575988196083?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="pt-24 sm:pt-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--rose)_30%,transparent),transparent_70%)] opacity-50" />
        <Container className="relative text-center">
          <SectionHeading 
            eyebrow="Formação Completa" 
            title={
              <>
                Curso Profissional<br />
                <span className="text-gradient-gold">Design de Sobrancelha</span>
              </>
            } 
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-soft">
            Domine as técnicas mais avançadas do mercado e construa uma carreira de sucesso no mundo da estética.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="glass-strong flex items-center gap-3 rounded-2xl px-6 py-4 shadow-lux">
              <span className="text-gold"><CalendarDays size={24} /></span>
              <div className="text-left leading-tight">
                <p className="text-sm text-ink-faint uppercase tracking-wider">Dias</p>
                <p className="font-semibold text-lg">07 e 09 / Março</p>
              </div>
            </div>
            <div className="glass-strong flex items-center gap-3 rounded-2xl px-6 py-4 shadow-lux">
              <span className="text-gold"><Clock size={24} /></span>
              <div className="text-left leading-tight">
                <p className="text-sm text-ink-faint uppercase tracking-wider">Horário</p>
                <p className="font-semibold text-lg">Das 9h às 17h</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Details & Pricing */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-start">
            
            {/* Info Side */}
            <div className="space-y-12">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-gold-soft mb-6">O que está incluso?</h3>
                <ul className="space-y-4">
                  {[
                    "Módulo teórico completo e atualizado",
                    "Material para treino durante o curso",
                    "Prática em modelos reais",
                    "Certificado de conclusão"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg text-ink-soft">
                      <CheckCircle2 className="text-gold shrink-0" size={24} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-3xl p-8 border border-gold/20 relative overflow-hidden shadow-lux">
                <div className="absolute -top-10 -right-10 p-4 opacity-5 text-gold">
                  <Banknote size={150} />
                </div>
                <p className="text-gold font-bold tracking-widest uppercase text-sm mb-2">Valor Promocional</p>
                <div className="space-y-6 relative z-10">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-display text-ink">R$ 320,00</span>
                    </div>
                    <p className="text-ink-soft mt-1 flex items-center gap-2">
                      <Banknote size={16} /> À vista (Pix ou transferência bancária)
                    </p>
                  </div>
                  
                  <div className="h-px w-full bg-line" />
                  
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-display text-ink-soft">Até 7x de R$ 54,00</span>
                    </div>
                    <p className="text-ink-faint mt-1 flex items-center gap-2">
                      <CreditCard size={16} /> Cartão de Crédito
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="glass-strong rounded-3xl p-8 border border-line shadow-lux">
              <h3 className="font-display text-2xl mb-2">Garanta sua vaga</h3>
              <p className="text-ink-soft mb-8">Preencha seus dados abaixo para se inscrever. Você será redirecionado para o nosso WhatsApp para finalizar o pagamento e confirmar sua presença.</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink-soft mb-1">Nome completo</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-canvas border border-line px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink-soft mb-1">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-canvas border border-line px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-ink-soft mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl bg-canvas border border-line px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <button
                  type="submit"
                  className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--gold-soft),var(--gold-deep))] px-8 py-4 font-semibold text-[#1c1108] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send size={20} />
                  Ir para o WhatsApp
                </button>
              </form>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
