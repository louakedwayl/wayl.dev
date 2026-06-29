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
const maskFor = (x, y) =>
  `radial-gradient(circle ${SPOTLIGHT_R}px at ${x}px ${y}px,` +
  " rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%," +
  " rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)";

const HIDDEN_MASK = maskFor(-999, -999); // off-screen → reveal starts hidden

export default function HomePage({ page, onNavigate, lang, onChangeLang }) {
  const tx = useT();

  // The spotlight is animated by writing these layers' styles directly every
  // frame (no React re-render per frame — smoother, and kinder to mobile GPUs).
  const revealRef = useRef(null);
  const bloomRef = useRef(null);

  useEffect(() => {
    const reveal = revealRef.current;
    const bloom = bloomRef.current;

    // Touch / coarse-pointer devices have no hover: the spotlight follows the
    // finger while dragging and gently drifts on its own otherwise, so the
    // reveal stays alive without a cursor.
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const autoDrift = coarse && !reduce;

    const vp = { w: window.innerWidth, h: window.innerHeight };
    const onResize = () => { vp.w = window.innerWidth; vp.h = window.innerHeight; };
    window.addEventListener("resize", onResize);

    // Home is a single screen: lock document scroll so a finger-drag drives the
    // spotlight instead of nudging the page. The 100vh app wrapper is taller
    // than the 100dvh hero on mobile, which otherwise leaves a scrollable strip.
    const docEl = document.documentElement;
    const prevStyle = {
      html: docEl.style.overflow,
      body: document.body.style.overflow,
      overscroll: document.body.style.overscrollBehavior,
    };
    docEl.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    const mouse = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };
    let primed = false;
    let touching = false;

    const setTarget = (x, y) => {
      mouse.x = x;
      mouse.y = y;
      if (!primed) {
        // Snap straight to the pointer the first time it appears.
        primed = true;
        smooth.x = x;
        smooth.y = y;
      }
    };

    const onMouse = (e) => setTarget(e.clientX, e.clientY);
    const onTouchStart = (e) => {
      const t = e.touches[0];
      if (!t) return;
      touching = true;
      setTarget(t.clientX, t.clientY);
    };
    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      touching = true;
      // Non-passive so we can cancel the browser's scroll / rubber-band and
      // keep the finger driving the spotlight for the whole drag.
      if (e.cancelable) e.preventDefault();
      setTarget(t.clientX, t.clientY);
    };
    const onTouchEnd = () => { touching = false; };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    // On touch screens, show the reveal immediately (centred) so the effect is
    // visible on load instead of waiting for a gesture.
    if (autoDrift) {
      primed = true;
      smooth.x = mouse.x = vp.w / 2;
      smooth.y = mouse.y = vp.h * 0.46;
    }

    let raf;
    let lastX = NaN;
    let lastY = NaN;
    const loop = (t) => {
      // Ambient drift target when nobody is actively touching — a slow,
      // non-repeating wander across the focal area of the artwork.
      if (autoDrift && !touching) {
        mouse.x = vp.w * (0.5 + 0.27 * Math.sin(t * 0.00037));
        mouse.y = vp.h * (0.46 + 0.2 * Math.sin(t * 0.00059 + 1.3));
      }
      smooth.x += (mouse.x - smooth.x) * EASE;
      smooth.y += (mouse.y - smooth.y) * EASE;

      // Only touch the DOM when the spotlight actually moved (idle = no repaint).
      const nx = Math.round(smooth.x);
      const ny = Math.round(smooth.y);
      if (nx !== lastX || ny !== lastY) {
        lastX = nx;
        lastY = ny;
        if (reveal) {
          const m = maskFor(smooth.x, smooth.y);
          reveal.style.webkitMaskImage = m;
          reveal.style.maskImage = m;
        }
        if (bloom) {
          bloom.style.transform = `translate(${smooth.x - 310}px, ${smooth.y - 310}px)`;
          bloom.style.opacity = primed && smooth.x > -100 ? "1" : "0";
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      docEl.style.overflow = prevStyle.html;
      document.body.style.overflow = prevStyle.body;
      document.body.style.overscrollBehavior = prevStyle.overscroll;
      if (raf) cancelAnimationFrame(raf);
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
