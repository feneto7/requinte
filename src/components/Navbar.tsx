import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Container, EASE } from "@/components/primitives";
import { cn } from "@/utils/cn";

const links = [
  { label: "Serviços", href: "/#servicos" },
  { label: "Experiência", href: "/#experiencia" },
  { label: "Resultados", href: "/#resultados" },
  { label: "Preços", href: "/#precos" },
  { label: "Dúvidas", href: "/#duvidas" },
];

import logoImg from "../../logos/logo.png";

export function Logo({ className, imgClassName, src = logoImg, hideText }: { className?: string, imgClassName?: string, src?: string, hideText?: boolean }) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="Requinte — início"
    >
      <img src={src} alt="Requinte" className={cn("h-10 w-auto object-contain", imgClassName)} />
      {!hideText && <span className="font-display text-xl tracking-tight">Requinte</span>}
    </Link>
  );
}

function useTheme() {
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("requinte-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };
  return { dark, toggle };
}

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-line glass text-ink-soft transition-colors hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {dark ? <Moon size={17} /> : <Sun size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-all duration-500",
            scrolled ? "py-2.5" : "py-4"
          )}
        >
          <Container>
            <div
              className={cn(
                "flex items-center justify-between gap-4 rounded-full px-3 pl-5 transition-all duration-500",
                scrolled
                  ? "glass-strong shadow-lux h-14"
                  : "h-16 border border-transparent"
              )}
            >
              <Logo />

              <nav className="hidden items-center gap-1 lg:flex">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="relative rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                ))}
                <Link
                  to="/curso"
                  className="relative rounded-full px-4 py-2 text-sm text-gold transition-colors hover:text-gold-soft font-semibold"
                >
                  Cursos
                </Link>
              </nav>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <div className="hidden sm:block">
                  <Button href="#agendar" magnetic className="px-5 py-2.5 text-[0.8rem]">
                    Agendar
                  </Button>
                </div>
                <button
                  onClick={() => setOpen(true)}
                  aria-label="Abrir menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line glass text-ink lg:hidden"
                >
                  <Menu size={18} />
                </button>
              </div>
            </div>
          </Container>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-canvas/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-line glass text-ink"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                  className="border-b border-line py-4 font-display text-4xl tracking-tight"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + links.length * 0.06, duration: 0.5, ease: EASE }}
              >
                <Link
                  to="/curso"
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 font-display text-4xl tracking-tight text-gold"
                >
                  Cursos
                </Link>
              </motion.div>
            </nav>
            <div className="px-6 pb-10">
              <Button href="#agendar" magnetic={false} className="w-full justify-center px-8 py-4">
                Agendar horário
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
