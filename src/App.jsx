import { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LangContext, LANGS } from "./context/lang";
import { i18n } from "./i18n";
import HomePage from "./components/HomePage";
import PortfolioPage from "./components/PortfolioPage";
import ContactPage from "./components/ContactPage";

export default function App() {
  const [page, setPage] = useState("HOME");
  const [lang, setLang] = useState("en");
  const tx = i18n[lang] || i18n.en;

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const pageKey = page.toLowerCase();
  const seo = tx.seo?.[pageKey] || tx.seo?.home;

  // Every page is a full-bleed "Lithos" section that owns the shared fixed
  // glass nav (SiteNav), so they all render directly on the dark stage.
  const pageProps = { page, onNavigate: navigate, lang, onChangeLang: setLang };

  return (
    <HelmetProvider>
      <LangContext.Provider value={lang}>
        <div dir={LANGS[lang].dir} style={{ background: "#000", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>

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
            <meta name="theme-color" content="#000000" />
            <html lang={lang} />
          </Helmet>

          <style>{`body{background:#000}::selection{background:rgba(232,112,42,0.32);color:#fff}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:#2a2a2a}`}</style>

          {page === "HOME" && <HomePage {...pageProps} />}
          {page === "PORTFOLIO" && <PortfolioPage {...pageProps} />}
          {page === "CONTACT" && <ContactPage {...pageProps} />}

        </div>
      </LangContext.Provider>
    </HelmetProvider>
  );
}
