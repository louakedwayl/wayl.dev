import { useState, useEffect } from "react";
import { useTheme } from "../context/theme";
import { useT } from "../hooks/useT";

export default function HomePage({ onNavigate }) {
  const t = useTheme();
  const tx = useT();
  const [ld, setLd] = useState(false);
  useEffect(() => { setTimeout(() => setLd(true), 80); }, []);
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden", padding: "100px 24px 24px" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`, backgroundSize: "80px 80px", opacity: ld ? 1 : 0, transition: "opacity 1.5s ease" }} />
      <div style={{ width: ld ? 60 : 0, height: 1, background: t.accent, marginBottom: 40, transition: "width 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
      <h1 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(52px,11vw,130px)", fontWeight: 400, color: t.text, textAlign: "center", lineHeight: 0.92, letterSpacing: "-0.04em", opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s", margin: 0 }}>WAYL<span style={{ display: "block", fontSize: "clamp(16px,3vw,24px)", fontFamily: "'DM Sans',Helvetica,sans-serif", letterSpacing: "0.1em", color: t.textFaint, marginTop: 12, fontWeight: 400 }}>LOUAKED</span></h1>
      <div style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 11, letterSpacing: "0.2em", color: t.textFaint, marginTop: 32, textAlign: "center", opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>{tx.hero.subtitle}</div>
      <div style={{ marginTop: 48, maxWidth: 520, textAlign: "center", opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s" }}>
        <p style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 14, lineHeight: 1.75, color: t.textMuted, margin: 0 }}>{tx.hero.desc}</p>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 48, opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s" }}>
        <button onClick={() => onNavigate("PORTFOLIO")} style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 11, letterSpacing: "0.15em", fontWeight: 500, color: t.btnText, background: t.btnBg, border: "none", padding: "14px 32px", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={e => e.target.style.background = t.btnHover} onMouseLeave={e => e.target.style.background = t.btnBg}>{tx.hero.viewWork}</button>
        <button onClick={() => onNavigate("CONTACT")} style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 11, letterSpacing: "0.15em", fontWeight: 500, color: t.text, background: "transparent", border: `1px solid ${t.border}`, padding: "14px 32px", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={e => e.target.style.borderColor = t.borderHover} onMouseLeave={e => e.target.style.borderColor = t.border}>{tx.hero.contact}</button>
      </div>
    </section>
  );
}
