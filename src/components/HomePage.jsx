import { useEffect, useRef, useState } from "react";
import { useT } from "../hooks/useT";
import SiteNav from "./SiteNav";
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

      {/* Shared glass navigation overlay */}
      <SiteNav page={page} onNavigate={onNavigate} lang={lang} onChangeLang={onChangeLang} />

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

      {/* 4. Bottom-right — role + CTAs */}
      <div className="hero-br hero-anim hero-fade" style={{ animationDelay: "0.85s" }}>
        <p className="hero-br-text">{tx.hero.subtitle}</p>
        <div className="hero-cta-row">
          <button className="hero-cta hero-cta-primary" onClick={() => onNavigate("PORTFOLIO")}>
            {tx.hero.viewWork}
          </button>
          <button className="hero-cta hero-cta-secondary" onClick={() => onNavigate("CONTACT")}>
            {tx.hero.contact}
          </button>
        </div>
      </div>
    </section>
  );
}
