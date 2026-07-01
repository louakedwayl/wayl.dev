import { useEffect, useRef } from "react";
import { useT } from "../hooks/useT";
import SiteNav from "./SiteNav";
import "./HomeHero.css";

/* Local hero artwork (downloaded from the design's CDN into /public). */
const BG_BASE = "/hero-base.webp";   // shown by default
const BG_REVEAL = "/hero-reveal.webp"; // shown through the spotlight

const SPOTLIGHT_R = 260; // radius (px) of the soft reveal circle
const EASE = 0.18;       // how quickly the spotlight catches up to the target (0–1)

/* Soft radial mask that exposes the reveal image only inside a circle centred
   on (x, y), fading out at the edges. */
const maskFor = (x, y, r = SPOTLIGHT_R) =>
  `radial-gradient(circle ${r}px at ${x}px ${y}px,` +
  " rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%," +
  " rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)";

const HIDDEN_MASK = maskFor(-999, -999); // off-screen → reveal starts hidden

export default function HomePage({ page, onNavigate, lang, onChangeLang }) {
  const tx = useT();

  // The spotlight is animated by writing these layers' styles directly every
  // frame (no React re-render per frame).
  const revealRef = useRef(null);
  const bloomRef = useRef(null);

  useEffect(() => {
    const reveal = revealRef.current;
    const bloom = bloomRef.current;
    if (!reveal) return;

    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    // ---- Mobile / touch: no reveal animation — show the fully-mossed image
    //      straight away. No input. ----
    if (coarse) {
      reveal.style.maskImage = "none";
      reveal.style.webkitMaskImage = "none";
      return;
    }

    // ---- Desktop: cursor-driven spotlight ----
    const mouse = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };
    let primed = false;
    const onMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!primed) {
        // Snap straight to the pointer the first time it appears.
        primed = true;
        smooth.x = e.clientX;
        smooth.y = e.clientY;
      }
    };
    window.addEventListener("mousemove", onMouse);

    let raf;
    let lastX = NaN;
    let lastY = NaN;
    const loop = () => {
      smooth.x += (mouse.x - smooth.x) * EASE;
      smooth.y += (mouse.y - smooth.y) * EASE;

      // Only touch the DOM when the spotlight actually moved (idle = no repaint).
      const nx = Math.round(smooth.x);
      const ny = Math.round(smooth.y);
      if (nx !== lastX || ny !== lastY) {
        lastX = nx;
        lastY = ny;
        const m = maskFor(smooth.x, smooth.y);
        reveal.style.webkitMaskImage = m;
        reveal.style.maskImage = m;
        if (bloom) {
          bloom.style.transform = `translate(${smooth.x - 310}px, ${smooth.y - 310}px)`;
          bloom.style.opacity = primed && smooth.x > -100 ? "1" : "0";
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Mobile: home is a single screen — lock document scroll so the page can't be
  // nudged (the 100vh app wrapper is taller than the 100dvh hero). Restored on
  // unmount so Portfolio / Contact keep scrolling. Desktop is left alone so
  // zoomed content can still be scrolled into view.
  useEffect(() => {
    if (!window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const docEl = document.documentElement;
    const prev = {
      html: docEl.style.overflow,
      body: document.body.style.overflow,
      overscroll: document.body.style.overscrollBehavior,
    };
    docEl.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      docEl.style.overflow = prev.html;
      document.body.style.overflow = prev.body;
      document.body.style.overscrollBehavior = prev.overscroll;
    };
  }, []);

  return (
    <section className="hero">
      {/* 1. Base image (slow Ken Burns zoom-out) */}
      <div className="hero-bg-base hero-zoom" style={{ backgroundImage: `url("${BG_BASE}")` }} />

      {/* 2. Spotlight reveal of the second image (mask animated via ref) */}
      <div
        ref={revealRef}
        className="hero-reveal-layer"
        style={{ backgroundImage: `url("${BG_REVEAL}")`, maskImage: HIDDEN_MASK, WebkitMaskImage: HIDDEN_MASK }}
      />

      {/* 2b. Warm light bloom trailing the spotlight (transform animated via ref) */}
      <div ref={bloomRef} className="hero-bloom" style={{ opacity: 0 }} />

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
