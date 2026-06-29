import { useT } from "../hooks/useT";
import { PROJECT_BASE } from "../data/projects";
import SiteNav from "./SiteNav";
import ProjectCard from "./ProjectCard";
import "./PortfolioPage.css";

/* Portfolio — full-bleed "Lithos" gallery, styled to match the home hero.
   A full-bleed section that owns the shared fixed glass nav (SiteNav). */
export default function PortfolioPage({ page, onNavigate, lang, onChangeLang }) {
  const tx = useT();

  return (
    <section className="pf">
      <SiteNav page={page} onNavigate={onNavigate} lang={lang} onChangeLang={onChangeLang} />

      <div className="pf-inner">
        <header className="pf-head">
          <p className="pf-eyebrow pf-anim pf-fade" style={{ animationDelay: "0.1s" }}>
            {tx.portfolio.label}
          </p>
          <h1 className="pf-title pf-anim pf-reveal" style={{ animationDelay: "0.2s" }}>
            {tx.portfolio.title}
          </h1>
          <p className="pf-intro pf-anim pf-fade" style={{ animationDelay: "0.34s" }}>
            {tx.portfolio.intro}
          </p>
          <span className="pf-rule pf-anim pf-grow" style={{ animationDelay: "0.46s" }} />
        </header>

        <div className="pf-grid">
          {PROJECT_BASE.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              projTx={tx.projects[i]}
              cta={tx.portfolio.viewProject}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
