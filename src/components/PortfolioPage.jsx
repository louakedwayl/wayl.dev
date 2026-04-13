import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/theme";
import { useT } from "../hooks/useT";
import { PROJECT_BASE } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function PortfolioPage() {
  const t = useTheme();
  const tx = useT();
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const o = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.02 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return (
    <section ref={ref} style={{ minHeight: "100vh", padding: "120px clamp(24px,5vw,80px) 80px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 80, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 10, letterSpacing: "0.3em", color: t.textFaint, marginBottom: 16 }}>{tx.portfolio.label}</div>
        <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(36px,6vw,64px)", fontWeight: 400, color: t.text, margin: 0, letterSpacing: "-0.02em" }}>{tx.portfolio.title}</h2>
        <div style={{ width: vis ? 40 : 0, height: 1, background: t.accent, marginTop: 24, transition: "width 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,350px))", gap: "48px 32px" }}>
        {PROJECT_BASE.map((p, i) => <ProjectCard key={p.id} project={p} projTx={tx.projects[i]} index={i} />)}
      </div>
    </section>
  );
}
