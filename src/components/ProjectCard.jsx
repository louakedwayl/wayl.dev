import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/theme";

export default function ProjectCard({ project, projTx, index }) {
  const t = useTheme();
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const o = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => project.url && window.open(project.url, "_blank")} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`, cursor: "pointer" }}>
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/2", marginBottom: 20, background: t.cardBg }}>
        <img src={project.image} alt={projTx.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: hov ? t.imgFilterHover : t.imgFilter, transform: hov ? "scale(1.05)" : "scale(1)", transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 20px 20px", background: `linear-gradient(transparent,${t.overlay})`, opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(10px)", transition: "all 0.4s ease" }}>
          <p style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>{projTx.description}</p>
        </div>
      </div>
      <div style={{ padding: "0 4px" }}>
        <div style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 10, letterSpacing: "0.2em", color: t.textFaint, marginBottom: 8 }}>{projTx.subtitle.toUpperCase()}</div>
        <h3 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, color: t.text, margin: "0 0 14px 0", letterSpacing: "-0.01em" }}>{projTx.title}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tags.map(tag => <span key={tag} style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 10, letterSpacing: "0.1em", color: hov ? t.textMuted : t.textFaint, border: `1px solid ${hov ? t.tagBorderHover : t.tagBorder}`, padding: "5px 10px", transition: "all 0.3s ease" }}>{tag}</span>)}
        </div>
      </div>
    </div>
  );
}
