import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Heart, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/primitives";
import { Logo } from "@/components/Navbar";
import logo2Img from "../../logos/logo2.png";

type IconProps = { className?: string };

const IgIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
  </svg>
);

const FbIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WaIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
  </svg>
);

const cols = [
  {
    title: "Serviços",
    links: [
      { label: "Micropigmentação", href: "/#servicos" },
      { label: "Sobrancelhas", href: "/#servicos" },
      { label: "Cílios", href: "/#servicos" },
      { label: "Produção de Noivas", href: "/#servicos" },
      { label: "Maquiagem", href: "/#servicos" },
      { label: "Tattoo", href: "/#servicos" },
    ],
  },
  {
    title: "Navegação",
    links: [
      { label: "Cursos", href: "/curso", isRouterLink: true },
      { label: "Experiência", href: "/#experiencia" },
      { label: "Resultados", href: "/#resultados" },
      { label: "Preços", href: "/#precos" },
      { label: "Dúvidas Frequentes", href: "/#duvidas" },
    ],
  },
];

const socials = [
  { Icon: IgIcon, label: "Instagram", href: "https://www.instagram.com/requintebemestar/" },
  { Icon: FbIcon, label: "Facebook", href: "https://www.facebook.com/requinteesteticaebemestar/?locale=pt_BR" },
  { Icon: WaIcon, label: "WhatsApp", href: "https://l.instagram.com/?u=https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D5575988196083%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0DMTAwAHNydGMGYXBwX2lkDzkzNjYxOTc0MzM5MjQ1OQABp5lIpNXCYop1JwWM5-GjjujbU5ntrJgJMrelPtEoYes76p52fzCFaKZneMgX_aem_2u-stmtGns5cFCp5a-N22A&e=AUBduFS-6PAPy5pr0eI2Pp_17gs9Nt8GqIy_KaDNy8keIvlKLZ_x6didoyCj6g5DTo5-JtZUjJ4bJRDk0MKOWgV9-xMd6iwTYqZczH7cNeZaC0gd55m7GkOfsdYli-DGgQfvhBg" },
];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Mail size={15} className="text-gold" /> Receba ofertas e novidades
      </p>
      {sent ? (
        <p className="mt-3 text-sm text-gold">Obrigada! Inscrição confirmada. ✦</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setSent(true);
          }}
          className="mt-3 flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 pl-5 focus-within:border-gold/40"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail"
            aria-label="E-mail para newsletter"
            className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Inscrever-se"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--gold-soft),var(--gold-deep))] text-[#1c1108] transition-transform hover:scale-105"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60rem] -translate-x-1/2 opacity-40 blur-3xl"
        style={{ background: "radial-gradient(50% 100% at 50% 0%, var(--aurora-1), transparent)" }}
      />

      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Logo src={logo2Img} hideText imgClassName="w-full h-auto max-w-[200px] lg:max-w-none" />
            <div className="flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line glass text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:text-gold"
                >
                  <s.Icon className="h-[17px] w-[17px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-lg">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l: any) => (
                  <li key={l.label}>
                    {l.isRouterLink ? (
                      <Link
                        to={l.href}
                        className="text-sm text-ink-soft transition-colors hover:text-gold"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm text-ink-soft transition-colors hover:text-gold"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact + newsletter */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-display text-lg">Contato</h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                  <span>
                    Praça Cônego José Lourenço, Centro<br />
                    São Felipe, BA, Brasil, 44.550-000
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="shrink-0 text-gold" />
                  (75) 98819-6083
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="shrink-0 text-gold" />
                  requintebemestar@gmail.com
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock size={16} className="shrink-0 text-gold" />
                  Seg a Sáb · 9h às 20h
                </li>
              </ul>
            </div>
            <Newsletter />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Requinte Estética &amp; Beleza. Todos os direitos reservados.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-ink">Termos</a>
            <a href="#" className="transition-colors hover:text-ink">Privacidade</a>
            <span className="flex items-center gap-1.5">
              Feito com <Heart size={12} className="fill-rose text-rose" /> em São Felipe - BA
            </span>
          </div>
        </div>
      </Container>

      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden text-center"
      >
        <span className="block font-display text-[20vw] leading-none text-ink/[0.04]">
          Requinte
        </span>
      </div>
    </footer>
  );
}
