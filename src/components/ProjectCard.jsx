/* A single project in the "Lithos" portfolio gallery: glassy card, image with
   a soft hover zoom, clay accent on tags + CTA. The whole card is a link that
   opens the project in a new tab; keyboard-operable via Enter / Space.
   The entrance animation lives on the outer wrapper so its persistent
   transform never blocks the card's hover lift. */
export default function ProjectCard({ project, projTx, cta, index }) {
  const open = () => {
    if (project.url) window.open(project.url, "_blank", "noopener,noreferrer");
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  };

  return (
    <div className="pf-card-anim pf-anim pf-rise" style={{ animationDelay: `${0.55 + index * 0.12}s` }}>
      <article
        className="pf-card"
        onClick={open}
        onKeyDown={onKeyDown}
        role="link"
        tabIndex={0}
        aria-label={projTx.title}
      >
        <div className="pf-card-media">
          <img className="pf-card-img" src={project.image} alt={projTx.title} loading="lazy" />
          <span className="pf-card-go" aria-hidden="true">↗</span>
        </div>

        <div className="pf-card-body">
          <p className="pf-card-sub">{projTx.subtitle}</p>
          <h2 className="pf-card-title">{projTx.title}</h2>
          <p className="pf-card-desc">{projTx.description}</p>

          <div className="pf-card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="pf-tag">{tag}</span>
            ))}
          </div>

          <span className="pf-card-cta">
            {cta}
            <span className="pf-card-cta-arrow" aria-hidden="true">→</span>
          </span>
        </div>
      </article>
    </div>
  );
}
