import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomCursor, Preloader, ScrollProgress } from "@/components/Atmosphere";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LandingPage } from "@/pages/LandingPage";
import { CoursePage } from "@/pages/CoursePage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ScrollToTop component to ensure the page starts at the top when navigating routes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1c1108]"
      >
        Pular para o conteúdo
      </a>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <div className="noise-overlay" aria-hidden />

      <Navbar />

      <main id="conteudo" className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/curso" element={<CoursePage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

