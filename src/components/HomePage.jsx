import { useEffect, useRef, useState } from "react";
import { LANGS } from "../context/lang";
import { useT } from "../hooks/useT";
import "./HomeHero.css";

/* Local hero artwork (downloaded from the design's CDN into /public). */
const BG_BASE = "/hero-base.webp";   // shown by default
const BG_REVEAL = "/hero-reveal.webp"; // shown through the cursor spotlight

const SPOTLIGHT_R = 260; // radius (px) of the soft reveal circle
const EASE = 0.18;       // how quickly the spotlight catches up to the cursor (0–1)

/* The cursor spotlight. The reveal image fills the stage (aligned with the
   base image) and a soft radial-gradient mask exposes it only inside a circle
   centred on the cursor, fading out at the edges. GPU-friendly — no per-frame
   canvas re-encoding. */
function RevealLayer({ image, x, y }) {
  const mask =
    `radial-gradient(circle ${SPOTLIGHT_R}px at ${x}px ${y}px,` +
    " rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%," +
    " rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)";
  return (
    <div
      className="hero-reveal-layer"
      style={{ backgroundImage: `url("${image}")`, maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}

export default function HomePage({ page, onNavigate, lang, onChangeLang }) {
  const tx = useT();

  // --- Cursor spotlight tracking (eased trail) ---------------------------
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const primed = useRef(false);
  const rafRef = useRef();
  const [cursor, setCursor] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!primed.current) {
        // Snap straight to the pointer the first time it appears.
        primed.current = true;
        smooth.current.x = e.clientX;
        smooth.current.y = e.clientY;
      }
    };
    window.addEventListener("mousemove", handleMove);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * EASE;
      smooth.current.y += (mouse.current.y - smooth.current.y) * EASE;
      setCursor({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // --- Navigation + language menu state ----------------------------------
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setLangOpen(false); setMenuOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const NAV = [
    { key: "home", page: "HOME" },
    { key: "portfolio", page: "PORTFOLIO" },
    { key: "contact", page: "CONTACT" },
  ];
  const go = (p) => { setMenuOpen(false); onNavigate(p); };
  const pickLang = (code) => { setLangOpen(false); onChangeLang(code); };
  const cur = LANGS[lang] || LANGS.en;

  return (
    <section className="hero">
      {/* 1. Base image (slow Ken Burns zoom-out) */}
      <div className="hero-bg-base hero-zoom" style={{ backgroundImage: `url("${BG_BASE}")` }} />

      {/* 2. Cursor spotlight reveal of the second image */}
      <RevealLayer image={BG_REVEAL} x={cursor.x} y={cursor.y} />

      {/* 2b. Warm light bloom trailing the spotlight */}
      <div
        className="hero-bloom"
        style={{
          transform: `translate(${cursor.x - 310}px, ${cursor.y - 310}px)`,
          opacity: cursor.x < 0 ? 0 : 1,
        }}
      />

      {/* Navigation overlay */}
      <nav className="hero-nav">
        <div className="hero-logo">
          <svg width="24" height="24" viewBox="0 0 256 256" fill="#fff" aria-hidden="true">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="hero-wordmark">Wayl</span>
        </div>

        {/* Center pill — desktop */}
        <div className="hero-pill">
          {NAV.map((it) => (
            <button
              key={it.key}
              className={"hero-pill-btn" + (page === it.page ? " hero-pill-btn--active" : "")}
              onClick={() => go(it.page)}
            >
              {tx.nav[it.key]}
            </button>
          ))}
        </div>

        {/* Right — language + mobile burger */}
        <div className="hero-nav-right">
          <div className="hero-lang">
            <button
              className="hero-lang-btn"
              onClick={() => { setLangOpen((o) => !o); setMenuOpen(false); }}
              aria-haspopup="true"
              aria-expanded={langOpen}
            >
              <span className="hero-lang-flag">{cur.flag}</span>
              <span>{cur.label}</span>
              <svg className={"hero-lang-chevron" + (langOpen ? " hero-lang-chevron--open" : "")}
                   width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {langOpen && (
              <div className="hero-lang-menu" role="menu">
                {Object.values(LANGS).map((l) => (
                  <button
                    key={l.code}
                    className={"hero-lang-item" + (l.code === lang ? " hero-lang-item--active" : "")}
                    onClick={() => pickLang(l.code)}
                    role="menuitem"
                  >
                    <span className="hero-lang-flag">{l.flag}</span>
                    <span>{l.label}</span>
                    {l.code === lang && (
                      <svg className="hero-lang-check" width="14" height="14" viewBox="0 0 24 24"
                           fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="hero-burger"
            onClick={() => { setMenuOpen((o) => !o); setLangOpen(false); }}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="hero-mobile-menu">
          {NAV.map((it) => (
            <button
              key={it.key}
              className={"hero-mobile-item" + (page === it.page ? " hero-mobile-item--active" : "")}
              onClick={() => go(it.page)}
            >
              {tx.nav[it.key]}
            </button>
          ))}
        </div>
      )}

      {/* Click-catcher to dismiss open menus */}
      {(langOpen || menuOpen) && (
        <div className="hero-backdrop" onClick={() => { setLangOpen(false); setMenuOpen(false); }} />
      )}

      {/* 3. Heading — name */}
      <div className="hero-heading-wrap">
        <h1 className="hero-title">
          <span className="hero-title-line hero-line-1 hero-anim hero-reveal" style={{ animationDelay: "0.25s" }}>
            Wayl
          </span>
          <span className="hero-title-line hero-line-2 hero-anim hero-reveal" style={{ animationDelay: "0.42s" }}>
            Louaked
          </span>
        </h1>
      </div>

      {/* 4. Bottom-left — description (desktop) */}
      <div className="hero-bl hero-anim hero-fade" style={{ animationDelay: "0.7s" }}>
        <p className="hero-bl-text">{tx.hero.desc}</p>
      </div>

      {/* 5. Bottom-right — role + CTAs */}
      <div className="hero-br hero-anim hero-fade" style={{ animationDelay: "0.85s" }}>
        <p className="hero-br-text">{tx.hero.subtitle}</p>
        <div className="hero-cta-row">
          <button className="hero-cta hero-cta-primary" onClick={() => go("PORTFOLIO")}>
            {tx.hero.viewWork}
          </button>
          <button className="hero-cta hero-cta-secondary" onClick={() => go("CONTACT")}>
            {tx.hero.contact}
          </button>
        </div>
      </div>
    </section>
  );
}
