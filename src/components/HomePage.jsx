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

  // --- Spotlight tracking (eased trail) ----------------------------------
  // Desktop follows the mouse. Touch devices have no hover, so the spotlight
  // follows the finger while dragging and gently drifts on its own otherwise
  // — the reveal stays alive without a cursor.
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const primed = useRef(false);
  const touching = useRef(false);
  const rafRef = useRef();
  const lastCommit = useRef({ x: -9999, y: -9999 });
  const [cursor, setCursor] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const autoDrift = coarse && !reduce; // ambient motion only on touch screens

    const vp = { w: window.innerWidth, h: window.innerHeight };
    const onResize = () => { vp.w = window.innerWidth; vp.h = window.innerHeight; };
    window.addEventListener("resize", onResize);

    // Home is a single screen: lock document scroll so a finger-drag drives the
    // spotlight instead of nudging the page. The 100vh app wrapper is taller
    // than the 100dvh hero on mobile, which otherwise leaves a scrollable strip.
    const docEl = document.documentElement;
    const prev = {
      htmlOverflow: docEl.style.overflow,
      bodyOverflow: document.body.style.overflow,
      overscroll: document.body.style.overscrollBehavior,
    };
    docEl.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    const setTarget = (x, y) => {
      mouse.current.x = x;
      mouse.current.y = y;
      if (!primed.current) {
        // Snap straight to the pointer the first time it appears.
        primed.current = true;
        smooth.current.x = x;
        smooth.current.y = y;
      }
    };

    const onMouse = (e) => setTarget(e.clientX, e.clientY);
    const onTouchStart = (e) => {
      const t = e.touches[0];
      if (!t) return;
      touching.current = true;
      setTarget(t.clientX, t.clientY);
    };
    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      touching.current = true;
      // Non-passive so we can cancel the browser's scroll / rubber-band and
      // keep the finger driving the spotlight for the whole drag.
      if (e.cancelable) e.preventDefault();
      setTarget(t.clientX, t.clientY);
    };
    const onTouchEnd = () => { touching.current = false; };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    // On touch screens, show the reveal immediately (centred) so the effect
    // is visible on load instead of waiting for a gesture.
    if (autoDrift) {
      primed.current = true;
      smooth.current.x = mouse.current.x = vp.w / 2;
      smooth.current.y = mouse.current.y = vp.h * 0.46;
    }

    const loop = (t) => {
      // Ambient drift target when nobody is actively touching — a slow,
      // non-repeating wander across the focal area of the artwork.
      if (autoDrift && !touching.current) {
        mouse.current.x = vp.w * (0.5 + 0.27 * Math.sin(t * 0.00037));
        mouse.current.y = vp.h * (0.46 + 0.2 * Math.sin(t * 0.00059 + 1.3));
      }
      smooth.current.x += (mouse.current.x - smooth.current.x) * EASE;
      smooth.current.y += (mouse.current.y - smooth.current.y) * EASE;

      // Skip the React commit when nothing moved (idle desktop = no re-render).
      const nx = Math.round(smooth.current.x);
      const ny = Math.round(smooth.current.y);
      if (nx !== lastCommit.current.x || ny !== lastCommit.current.y) {
        lastCommit.current.x = nx;
        lastCommit.current.y = ny;
        setCursor({ x: smooth.current.x, y: smooth.current.y });
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      docEl.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
      document.body.style.overscrollBehavior = prev.overscroll;
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
