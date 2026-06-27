import { useEffect, useState } from "react";
import { LANGS } from "../context/lang";
import { useT } from "../hooks/useT";
import "./SiteNav.css";

const NAV = [
  { key: "home", page: "HOME" },
  { key: "portfolio", page: "PORTFOLIO" },
  { key: "contact", page: "CONTACT" },
];

/* Shared glass navigation overlay for every full-bleed "Lithos" section.
   Center pill (desktop ≥768px) · language switcher + hamburger (right) ·
   mobile dropdown. Transparent over whatever dark stage renders behind it. */
export default function SiteNav({ page, onNavigate, lang, onChangeLang }) {
  const tx = useT();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setLangOpen(false); setMenuOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (p) => { setMenuOpen(false); setLangOpen(false); onNavigate(p); };
  const pickLang = (code) => { setLangOpen(false); onChangeLang(code); };
  const cur = LANGS[lang] || LANGS.en;

  return (
    <>
      <nav className="site-nav">
        {/* Center pill — desktop */}
        <div className="site-nav-pill">
          {NAV.map((it) => (
            <button
              key={it.key}
              className={"site-nav-link" + (page === it.page ? " site-nav-link--active" : "")}
              onClick={() => go(it.page)}
            >
              {tx.nav[it.key]}
            </button>
          ))}
        </div>

        {/* Right — language + mobile burger */}
        <div className="site-nav-right">
          <div className="site-nav-lang">
            <button
              className="site-nav-lang-btn"
              onClick={() => { setLangOpen((o) => !o); setMenuOpen(false); }}
              aria-haspopup="true"
              aria-expanded={langOpen}
            >
              <span className="site-nav-flag">{cur.flag}</span>
              <span>{cur.label}</span>
              <svg className={"site-nav-chevron" + (langOpen ? " site-nav-chevron--open" : "")}
                   width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {langOpen && (
              <div className="site-nav-menu" role="menu">
                {Object.values(LANGS).map((l) => (
                  <button
                    key={l.code}
                    className={"site-nav-item" + (l.code === lang ? " site-nav-item--active" : "")}
                    onClick={() => pickLang(l.code)}
                    role="menuitem"
                  >
                    <span className="site-nav-flag">{l.flag}</span>
                    <span>{l.label}</span>
                    {l.code === lang && (
                      <svg className="site-nav-check" width="14" height="14" viewBox="0 0 24 24"
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
            className="site-nav-burger"
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
        <div className="site-nav-mobile">
          {NAV.map((it) => (
            <button
              key={it.key}
              className={"site-nav-mobile-item" + (page === it.page ? " site-nav-mobile-item--active" : "")}
              onClick={() => go(it.page)}
            >
              {tx.nav[it.key]}
            </button>
          ))}
        </div>
      )}

      {/* Click-catcher to dismiss open menus */}
      {(langOpen || menuOpen) && (
        <div className="site-nav-backdrop" onClick={() => { setLangOpen(false); setMenuOpen(false); }} />
      )}
    </>
  );
}
