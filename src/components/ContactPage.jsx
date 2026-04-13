import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/theme";
import { useT } from "../hooks/useT";

export default function ContactPage() {
  const t = useTheme();
  const tx = useT();
  const [vis, setVis] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [foc, setFoc] = useState(null);
  const ref = useRef(null);
  useEffect(() => { const o = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.05 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  const inp = (f) => ({ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${foc === f ? t.borderHover : t.border}`, color: t.text, fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 14, padding: "16px 0", outline: "none", transition: "border-color 0.3s ease", boxSizing: "border-box" });
  const lab = { fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 10, letterSpacing: "0.2em", color: t.textFaint, display: "block", marginBottom: 4, marginTop: 32 };
  return (
    <section ref={ref} style={{ minHeight: "100vh", padding: "120px clamp(24px,5vw,80px) 80px", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 80, alignContent: "center" }}>
      <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 10, letterSpacing: "0.3em", color: t.textFaint, marginBottom: 16 }}>{tx.contact.label}</div>
        <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 400, color: t.text, margin: "0 0 8px 0", letterSpacing: "-0.02em", lineHeight: 1.05 }}>{tx.contact.title}<br/>{tx.contact.title2}</h2>
        <div style={{ width: vis ? 40 : 0, height: 1, background: t.accent, marginTop: 20, transition: "width 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
        <div>
          <label style={lab}>{tx.contact.name} *</label>
          <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} onFocus={() => setFoc("name")} onBlur={() => setFoc(null)} style={inp("name")} />
          <label style={lab}>{tx.contact.email} *</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} onFocus={() => setFoc("email")} onBlur={() => setFoc(null)} style={inp("email")} />
          <label style={lab}>{tx.contact.message} *</label>
          <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} onFocus={() => setFoc("message")} onBlur={() => setFoc(null)} rows={4} style={{...inp("message"), resize: "vertical", minHeight: 100}} />
          <button onClick={async () => { if (!form.name || !form.email || !form.message) return; try { const res = await fetch("https://wayl.dev/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); if (res.ok) { setForm({ name: "", email: "", message: "" }); setStatus("success"); } else { setStatus("error"); } } catch (e) { console.error(e); setStatus("error"); } setTimeout(() => setStatus(null), 6000); }} style={{ marginTop: 40, fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 11, letterSpacing: "0.15em", fontWeight: 500, color: t.btnText, background: t.btnBg, border: "none", padding: "16px 40px", cursor: "pointer", transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: 10 }} onMouseEnter={e => e.target.style.background = t.btnHover} onMouseLeave={e => e.target.style.background = t.btnBg}>{tx.contact.send} <span style={{ fontSize: 16, marginTop: -1 }}>→</span></button>
          {status && (
        <div style={{ marginTop: 16, fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 13, letterSpacing: "0.05em", color: status === "success" ? t.text : "#f44336", transition: "opacity 0.3s ease" }}>
          {status === "success" ? tx.contact.success : tx.contact.error}
        </div>
      )}
        </div>
      </div>
      <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s", paddingTop: 120 }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 10, letterSpacing: "0.2em", color: t.textFaint, marginBottom: 16 }}>{tx.contact.infoLabel}</div>
          <div style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 14, color: t.textMuted, lineHeight: 2.2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ color: t.textFaint }}>✉</span> contact@wayl.dev</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ color: t.textFaint }}>◎</span> Paris, France</div>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 10, letterSpacing: "0.2em", color: t.textFaint, marginBottom: 16 }}>{tx.contact.socialLabel}</div>
          <div style={{ display: "flex", gap: 12 }}>
            {[{name:"GitHub",url:"https://github.com/louakedwayl"},{name:"LinkedIn",url:"https://linkedin.com/in/louakedwayl"},{name:"Root-Me",url:"https://www.root-me.org/louakedwayl"}].map(p => <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 12, color: t.textFaint, border: `1px solid ${t.border}`, padding: "10px 20px", textDecoration: "none", transition: "all 0.3s ease" }} onMouseEnter={e => { e.target.style.borderColor = t.borderHover; e.target.style.color = t.text; }} onMouseLeave={e => { e.target.style.borderColor = t.border; e.target.style.color = t.textFaint; }}>{p.name}</a>)}
          </div>
        </div>
        <div style={{ marginTop: 64, padding: "24px 0", borderTop: `1px solid ${t.border}` }}>
          <p style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: t.textFaint, fontStyle: "italic", margin: 0, lineHeight: 1.6 }}>{tx.contact.quote}<br/>{tx.contact.quote2}</p>
        </div>
      </div>
    </section>
  );
}
