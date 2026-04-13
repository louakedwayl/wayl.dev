import { useState, useEffect } from "react";
import { useTheme } from "../context/theme";
import { useT } from "../hooks/useT";
import LangDropdown from "./LangDropdown";

export default function Navbar({ page, onNavigate, mode, onToggleTheme, lang, onChangeLang }) {
  const t = useTheme();
  const tx = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const h = () => { setIsMobile(window.innerWidth < 768); setMenuOpen(false); }; window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  const navKeys = ["home", "portfolio", "contact"];
  const pageMap = { home: "HOME", portfolio: "PORTFOLIO", contact: "CONTACT" };
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", justifyContent: "flex-end", alignItems: "center", padding: isMobile ? "0 16px" : "0 clamp(32px,5vw,80px)", height: isMobile ? 56 : 80, background: isMobile ? t.navBg : (scrolled || menuOpen ? t.navBg : "transparent"), backdropFilter: isMobile ? "blur(14px)" : (scrolled || menuOpen ? "blur(14px)" : "none"), transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", borderBottom: isMobile || scrolled || menuOpen ? `1px solid ${t.border}` : "1px solid transparent" }}>
        {isMobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={onToggleTheme} style={{ background: "none", border: `1px solid ${t.border}`, color: t.text, width: 32, height: 32, borderRadius: "50%", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.toggleIcon}</button>
            <LangDropdown lang={lang} onChangeLang={onChangeLang} />
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: `1px solid ${t.border}`, color: t.text, width: 32, height: 32, borderRadius: 4, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}> {menuOpen ? "✕" : "☰"} </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {navKeys.map(k => (
              <button key={k} onClick={() => onNavigate(pageMap[k])} style={{ background: "none", border: "none", fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: "0.12em", color: page === pageMap[k] ? t.text : t.textFaint, cursor: "pointer", padding: "4px 0", borderBottom: page === pageMap[k] ? `1px solid ${t.accent}` : "1px solid transparent", transition: "all 0.3s ease" }}>{tx.nav[k]}</button>
            ))}
            <div style={{ width: 1, height: 18, background: t.border, margin: "0 2px" }} />
            <button onClick={onToggleTheme} style={{ background: "none", border: `1px solid ${t.border}`, color: t.text, width: 40, height: 40, borderRadius: "50%", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" }} onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHover} onMouseLeave={e => e.currentTarget.style.borderColor = t.border}> {t.toggleIcon} </button>
            <LangDropdown lang={lang} onChangeLang={onChangeLang} />
          </div>
        )}
      </nav>
      {isMobile && menuOpen && (
        <div style={{ position: "fixed", top: 56, left: 0, right: 0, zIndex: 999, background: t.navBg, backdropFilter: "blur(14px)", borderBottom: `1px solid ${t.border}`, padding: "8px 0", animation: "dropIn 0.2s ease" }}>
          {navKeys.map(k => (
            <button key={k} onClick={() => { onNavigate(pageMap[k]); setMenuOpen(false); }} style={{ display: "block", width: "100%", background: "none", border: "none", fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", color: page === pageMap[k] ? t.text : t.textFaint, cursor: "pointer", padding: "12px 16px", textAlign: "left", transition: "all 0.3s ease" }}>{tx.nav[k]}</button>
          ))}
        </div>
      )}
    </>
  );
}
