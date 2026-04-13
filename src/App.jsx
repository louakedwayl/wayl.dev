import { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeContext, themes } from "./context/theme";
import { LangContext, LANGS } from "./context/lang";
import { i18n } from "./i18n";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import HomePage from "./components/HomePage";
import PortfolioPage from "./components/PortfolioPage";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";

export default function App() {
  const [page, setPage] = useState("HOME");
  const [mode, setMode] = useState("light");
  const [lang, setLang] = useState("en");
  const t = themes[mode];
  const tx = i18n[lang] || i18n.en;

  const navigate = (p) => {
     setPage(p);
     window.scrollTo({ top: 0, behavior: "instant" });
   };
   const pageKey = page.toLowerCase();
  const seo = tx.seo?.[pageKey] || tx.seo?.home;

  return (
    <HelmetProvider>
      <ThemeContext.Provider value={t}>
        <LangContext.Provider value={lang}>
          <div dir={LANGS[lang].dir} style={{ background: t.bg, minHeight: "100vh", color: t.text, overflowX: "hidden", transition: "background 0.4s ease, color 0.4s ease" }}>

          <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <link rel="canonical" href={`https://wayl.dev${pageKey === "home" ? "" : `/${pageKey}`}`} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://wayl.dev${pageKey === "home" ? "" : `/${pageKey}`}`} />
          <meta property="og:image" content="https://wayl.dev/og-cover.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content={lang} />
          <meta property="og:site_name" content="Wayl Louaked" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seo.title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content="https://wayl.dev/og-cover.png" />
          <meta name="robots" content="index, follow" />
          <html lang={lang} />
        </Helmet>

          <style>{`body{background:${t.bg};transition:background 0.4s ease}::selection{background:${t.selection}}::-webkit-scrollbar-track{background:${t.bg}}::-webkit-scrollbar-thumb{background:${t.scrollThumb}}`}</style>

            <Navbar
               page={page}
               onNavigate={navigate}
               mode={mode}
               onToggleTheme={() => setMode(m => m === "dark" ? "light" : "dark")}
               lang={lang}
               onChangeLang={setLang}
             />

            <PageTransition pageKey={page + lang}>
              {page === "HOME" && <HomePage onNavigate={navigate} />}
              {page === "PORTFOLIO" && <PortfolioPage />}
              {page === "CONTACT" && <ContactPage />}
            </PageTransition>

            <Footer />
          </div>
        </LangContext.Provider>
      </ThemeContext.Provider>
    </HelmetProvider>
  );
}
