import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/theme";
import { LANGS } from "../context/lang";

export default function LangDropdown({ lang, onChangeLang }) {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ background: "none", border: `1px solid ${t.border}`, color: t.text, fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, borderRadius: 3, transition: "all 0.3s ease", minWidth: 58, justifyContent: "center", }} onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHover} onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = t.border; }} > <span style={{ fontSize: 16 }}>{LANGS[lang].flag}</span> {LANGS[lang].label} </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 2000, background: t.dropBg, border: `1px solid ${t.dropBorder}`, borderRadius: 4, overflow: "hidden", minWidth: 140, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", animation: "dropIn 0.2s ease", }}>
          {Object.values(LANGS).map(l => {
            const active = lang === l.code;
            return (
              <button key={l.code} onClick={() => { onChangeLang(l.code); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: active ? t.dropHover : "transparent", border: "none", borderLeft: `2px solid ${active ? t.accent : "transparent"}`, padding: "10px 14px 10px 12px", cursor: "pointer", fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 12, fontWeight: active ? 600 : 400, color: active ? t.text : t.textMuted, transition: "all 0.15s ease", textAlign: "left", }} onMouseEnter={e => { if (!active) e.currentTarget.style.background = t.dropHover; }} onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }} > <span style={{ fontSize: 15 }}>{l.flag}</span> {l.label} <span style={{ marginLeft: "auto", fontSize: 12, opacity: active ? 1 : 0, transition: "opacity 0.15s ease" }}>✓</span> </button>
            );
          })}
        </div>
      )}
      <style>{`@keyframes dropIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
