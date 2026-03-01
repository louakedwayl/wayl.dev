import { useState, useEffect, useRef, createContext, useContext } from "react";
// ─── THEME ───────────────────────────────────────────────
const ThemeContext = createContext();
const LangContext = createContext();
const themes = {
  dark: {
    bg: "#0a0a0a", surface: "#111", text: "#fff", textMuted: "#888", textFaint: "#555",
    textGhost: "#333", border: "rgba(255,255,255,0.08)", borderHover: "rgba(255,255,255,0.25)",
    accent: "#fff", btnBg: "#fff", btnText: "#0a0a0a", btnHover: "#ddd", cardBg: "#151515",
    gridLine: "rgba(255,255,255,0.02)", navBg: "rgba(10,10,10,0.95)", overlay: "rgba(0,0,0,0.8)",
    imgFilter: "brightness(0.5) grayscale(0.3)", imgFilterHover: "brightness(0.7)",
    selection: "rgba(255,255,255,0.15)", scrollThumb: "#222",
    tagBorder: "rgba(255,255,255,0.08)", tagBorderHover: "rgba(255,255,255,0.2)", toggleIcon: "☾",
    dropBg: "#151515", dropBorder: "rgba(255,255,255,0.1)", dropHover: "#1a1a1a",
  },
  light: {
    bg: "#f5f5f0", surface: "#eaeae5", text: "#111", textMuted: "#555", textFaint: "#888",
    textGhost: "#bbb", border: "rgba(0,0,0,0.08)", borderHover: "rgba(0,0,0,0.25)",
    accent: "#111", btnBg: "#111", btnText: "#f5f5f0", btnHover: "#333", cardBg: "#eaeae5",
    gridLine: "rgba(0,0,0,0.03)", navBg: "rgba(245,245,240,0.95)", overlay: "rgba(0,0,0,0.6)",
    imgFilter: "brightness(0.85) grayscale(0.15)", imgFilterHover: "brightness(1)",
    selection: "rgba(0,0,0,0.1)", scrollThumb: "#ccc",
    tagBorder: "rgba(0,0,0,0.1)", tagBorderHover: "rgba(0,0,0,0.3)", toggleIcon: "☀",
    dropBg: "#fff", dropBorder: "rgba(0,0,0,0.1)", dropHover: "#f0f0eb",
  },
};
function useTheme() { return useContext(ThemeContext); }
function useLang() { return useContext(LangContext); }
// ─── LANGUAGES ───────────────────────────────────────────
const LANGS = {
  en: { code: "en", label: "EN", flag: "🇬🇧", dir: "ltr" },
  ru: { code: "ru", label: "RU", flag: "🇷🇺", dir: "ltr" },
  ar: { code: "ar", label: "AR", flag: "🇸🇦", dir: "rtl" },
  zh: { code: "zh", label: "ZH", flag: "🇨🇳", dir: "ltr" },
  ja: { code: "ja", label: "JA", flag: "🇯🇵", dir: "ltr" },
  es: { code: "es", label: "ES", flag: "🇪🇸", dir: "ltr" },
  it: { code: "it", label: "IT", flag: "🇮🇹", dir: "ltr" },
  nl: { code: "nl", label: "NL", flag: "🇳🇱", dir: "ltr" },
};
const i18n = {
  en: {
    nav: { home: "HOME", portfolio: "PORTFOLIO", contact: "CONTACT" },
    hero: { subtitle: "CYBERSECURITY ENGINEER & FULL-STACK DEVELOPER", desc: "Security-focused developer building resilient systems. Currently specializing in offensive security and DevSecOps at École 42 Paris.", viewWork: "VIEW WORK", contact: "CONTACT" },
    portfolio: { label: "SELECTED WORK", title: "Portfolio" },
    contact: { label: "GET IN TOUCH", title: "Let's Work", title2: "Together", name: "YOUR NAME", email: "YOUR EMAIL", message: "YOUR MESSAGE", send: "SEND MESSAGE", infoLabel: "CONTACT INFO", socialLabel: "SOCIAL", quote: '"Building secure systems,', quote2: 'breaking insecure ones."' },
    projects: [
      { title: "CAMAGRU", subtitle: "Instagram-like Web Application", description: "Full-stack social platform with real-time image manipulation, authentication system, and notification engine." },
    ],
    footer: "© 2026 WAYL. ALL RIGHTS RESERVED.",
  },
  ru: {
    nav: { home: "ГЛАВНАЯ", portfolio: "ПОРТФОЛИО", contact: "КОНТАКТ" },
    hero: { subtitle: "ИНЖЕНЕР КИБЕРБЕЗОПАСНОСТИ И ФУЛСТЕК-РАЗРАБОТЧИК", desc: "Разработчик, ориентированный на безопасность, создающий устойчивые системы. Специализация — наступательная безопасность и DevSecOps в École 42 Paris.", viewWork: "РАБОТЫ", contact: "КОНТАКТ" },
    portfolio: { label: "ИЗБРАННЫЕ РАБОТЫ", title: "Портфолио" },
    contact: { label: "СВЯЗАТЬСЯ", title: "Давайте", title2: "Работать вместе", name: "ВАШЕ ИМЯ", email: "ВАШ EMAIL", message: "ВАШЕ СООБЩЕНИЕ", send: "ОТПРАВИТЬ", infoLabel: "КОНТАКТЫ", socialLabel: "СОЦСЕТИ", quote: '"Строим защищённые системы,', quote2: 'взламываем незащищённые."' },
    projects: [
      { title: "CAMAGRU", subtitle: "Веб-приложение в стиле Instagram", description: "Полноценная социальная платформа с обработкой изображений в реальном времени, системой аутентификации и уведомлениями." },
    ],
    footer: "© 2026 WAYL. ВСЕ ПРАВА ЗАЩИЩЕНЫ.",
  },
  ar: {
    nav: { home: "الرئيسية", portfolio: "الأعمال", contact: "اتصل" },
    hero: { subtitle: "مهندس أمن سيبراني ومطور متكامل", desc: "مطور متخصص في الأمن، يبني أنظمة مرنة. حالياً متخصص في الأمن الهجومي و DevSecOps في École 42 Paris.", viewWork: "عرض الأعمال", contact: "اتصل بي" },
    portfolio: { label: "أعمال مختارة", title: "الأعمال" },
    contact: { label: "تواصل معي", title: "لنعمل", title2: "معاً", name: "اسمك", email: "بريدك الإلكتروني", message: "رسالتك", send: "إرسال", infoLabel: "معلومات الاتصال", socialLabel: "التواصل الاجتماعي", quote: '"نبني أنظمة آمنة،', quote2: 'ونخترق غير الآمنة."' },
    projects: [
      { title: "CAMAGRU", subtitle: "تطبيق ويب شبيه بإنستغرام", description: "منصة اجتماعية متكاملة مع معالجة الصور في الوقت الفعلي ونظام المصادقة والإشعارات." },
    ],
    footer: "© 2026 WAYL. جميع الحقوق محفوظة.",
  },
  zh: {
    nav: { home: "首页", portfolio: "作品集", contact: "联系" },
    hero: { subtitle: "网络安全工程师 & 全栈开发者", desc: "专注安全的开发者，构建弹性系统。目前在巴黎42学校专攻进攻性安全和DevSecOps。", viewWork: "查看作品", contact: "联系我" },
    portfolio: { label: "精选作品", title: "作品集" },
    contact: { label: "联系方式", title: "让我们", title2: "一起合作", name: "您的姓名", email: "您的邮箱", message: "您的留言", send: "发送消息", infoLabel: "联系信息", socialLabel: "社交媒体", quote: '"构建安全的系统，', quote2: '攻破不安全的系统。"' },
    projects: [
      { title: "CAMAGRU", subtitle: "类Instagram网页应用", description: "全栈社交平台，具有实时图像处理、认证系统和通知引擎。" },
    ],
    footer: "© 2026 WAYL. 保留所有权利。",
  },
  ja: {
    nav: { home: "ホーム", portfolio: "ポートフォリオ", contact: "連絡先" },
    hero: { subtitle: "サイバーセキュリティエンジニア & フルスタック開発者", desc: "セキュリティに特化した開発者として、堅牢なシステムを構築。現在École 42 Parisで攻撃的セキュリティとDevSecOpsを専攻中。", viewWork: "作品を見る", contact: "連絡する" },
    portfolio: { label: "厳選された作品", title: "ポートフォリオ" },
    contact: { label: "お問い合わせ", title: "一緒に", title2: "働きましょう", name: "お名前", email: "メールアドレス", message: "メッセージ", send: "送信する", infoLabel: "連絡先情報", socialLabel: "ソーシャル", quote: '"安全なシステムを構築し、', quote2: '安全でないシステムを破壊する。"' },
    projects: [
      { title: "CAMAGRU", subtitle: "Instagram風ウェブアプリ", description: "リアルタイム画像処理、認証システム、通知エンジンを備えたフルスタックソーシャルプラットフォーム。" },
    ],
    footer: "© 2026 WAYL. 全著作権所有。",
  },
  es: {
    nav: { home: "INICIO", portfolio: "PORTAFOLIO", contact: "CONTACTO" },
    hero: { subtitle: "INGENIERO DE CIBERSEGURIDAD Y DESARROLLADOR FULL-STACK", desc: "Desarrollador enfocado en seguridad, construyendo sistemas resilientes. Actualmente especializado en seguridad ofensiva y DevSecOps en École 42 Paris.", viewWork: "VER TRABAJOS", contact: "CONTACTO" },
    portfolio: { label: "TRABAJOS SELECCIONADOS", title: "Portafolio" },
    contact: { label: "CONTACTAR", title: "Trabajemos", title2: "Juntos", name: "TU NOMBRE", email: "TU EMAIL", message: "TU MENSAJE", send: "ENVIAR MENSAJE", infoLabel: "INFO DE CONTACTO", socialLabel: "REDES SOCIALES", quote: '"Construyendo sistemas seguros,', quote2: 'rompiendo los inseguros."' },
    projects: [
      { title: "CAMAGRU", subtitle: "Aplicación web tipo Instagram", description: "Plataforma social full-stack con manipulación de imágenes en tiempo real, sistema de autenticación y motor de notificaciones." },
    ],
    footer: "© 2026 WAYL. TODOS LOS DERECHOS RESERVADOS.",
  },
  it: {
    nav: { home: "HOME", portfolio: "PORTFOLIO", contact: "CONTATTO" },
    hero: { subtitle: "INGEGNERE CYBERSECURITY E SVILUPPATORE FULL-STACK", desc: "Sviluppatore focalizzato sulla sicurezza, costruisce sistemi resilienti. Attualmente specializzato in sicurezza offensiva e DevSecOps presso École 42 Paris.", viewWork: "VEDI LAVORI", contact: "CONTATTO" },
    portfolio: { label: "LAVORI SELEZIONATI", title: "Portfolio" },
    contact: { label: "CONTATTAMI", title: "Lavoriamo", title2: "Insieme", name: "IL TUO NOME", email: "LA TUA EMAIL", message: "IL TUO MESSAGGIO", send: "INVIA MESSAGGIO", infoLabel: "INFO CONTATTO", socialLabel: "SOCIAL", quote: '"Costruiamo sistemi sicuri,', quote2: 'violiamo quelli insicuri."' },
    projects: [
      { title: "CAMAGRU", subtitle: "Applicazione web tipo Instagram", description: "Piattaforma social full-stack con manipolazione immagini in tempo reale, sistema di autenticazione e motore di notifiche." },
    ],
    footer: "© 2026 WAYL. TUTTI I DIRITTI RISERVATI.",
  },
  nl: {
    nav: { home: "HOME", portfolio: "PORTFOLIO", contact: "CONTACT" },
    hero: { subtitle: "CYBERSECURITY ENGINEER & FULL-STACK DEVELOPER", desc: "Beveiligingsgerichte ontwikkelaar die veerkrachtige systemen bouwt. Momenteel gespecialiseerd in offensieve beveiliging en DevSecOps bij École 42 Paris.", viewWork: "BEKIJK WERK", contact: "CONTACT" },
    portfolio: { label: "GESELECTEERD WERK", title: "Portfolio" },
    contact: { label: "NEEM CONTACT OP", title: "Laten we", title2: "Samenwerken", name: "UW NAAM", email: "UW EMAIL", message: "UW BERICHT", send: "VERSTUUR BERICHT", infoLabel: "CONTACTGEGEVENS", socialLabel: "SOCIAAL", quote: '"Veilige systemen bouwen,', quote2: 'onveilige systemen kraken."' },
    projects: [
      { title: "CAMAGRU", subtitle: "Instagram-achtige webapplicatie", description: "Full-stack sociaal platform met realtime beeldbewerking, authenticatiesysteem en notificatie-engine." },
    ],
    footer: "© 2026 WAYL. ALLE RECHTEN VOORBEHOUDEN.",
  },
};
// ─── DATA ────────────────────────────────────────────────
const PROJECT_BASE = [
  { id: 1, tags: ["PHP", "JAVASCRIPT", "DOCKER", "SQL"], image: "/Camagru_layout.png", url: "https://camagru.wayl.dev" },
];
// ─── HOOKS ───────────────────────────────────────────────
function useT() {
  const lang = useLang();
  return i18n[lang] || i18n.en;
}
// ─── PAGE TRANSITION ─────────────────────────────────────
function PageTransition({ children, pageKey }) {
  const [v, setV] = useState(false);
  useEffect(() => { setV(false); const t = requestAnimationFrame(() => requestAnimationFrame(() => setV(true))); return () => cancelAnimationFrame(t); }, [pageKey]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>{children}</div>;
}
// ─── LANG DROPDOWN ───────────────────────────────────────
function LangDropdown({ lang, onChangeLang }) {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "none", border: `1px solid ${t.border}`, color: t.text,
        fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 12, fontWeight: 500,
        letterSpacing: "0.1em", padding: "8px 14px", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6, borderRadius: 3,
        transition: "all 0.3s ease", minWidth: 58, justifyContent: "center",
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHover}
        onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = t.border; }}
      >
        <span style={{ fontSize: 16 }}>{LANGS[lang].flag}</span>
        {LANGS[lang].label}
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 2000,
          background: t.dropBg, border: `1px solid ${t.dropBorder}`,
          borderRadius: 4, overflow: "hidden", minWidth: 140,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          animation: "dropIn 0.2s ease",
        }}>
          {Object.values(LANGS).map(l => (
            <button key={l.code} onClick={() => { onChangeLang(l.code); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                background: lang === l.code ? t.dropHover : "transparent",
                border: "none", padding: "10px 14px", cursor: "pointer",
                fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 12,
                color: lang === l.code ? t.text : t.textMuted,
                transition: "all 0.15s ease", textAlign: "left",
              }}
              onMouseEnter={e => e.target.style.background = t.dropHover}
              onMouseLeave={e => e.target.style.background = lang === l.code ? t.dropHover : "transparent"}
            >
              <span style={{ fontSize: 15 }}>{l.flag}</span> {l.label}
            </button>
          ))}
        </div>
      )}
      <style>{`@keyframes dropIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
// ─── NAVBAR ──────────────────────────────────────────────
function Navbar({ page, onNavigate, mode, onToggleTheme, lang, onChangeLang }) {
  const t = useTheme();
  const tx = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const h = () => { setIsMobile(window.innerWidth < 768); setMenuOpen(false); }; window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  const navKeys = ["home", "portfolio", "contact"];
  const pageMap = { home: "HOME", portfolio: "PORTFOLIO", contact: "CONTACT" };
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", justifyContent: "flex-end", alignItems: "center", padding: isMobile ? "0 16px" : "0 clamp(32px,5vw,80px)", height: isMobile ? 56 : 80, background: isMobile ? t.navBg : (scrolled || menuOpen ? t.navBg : "transparent"), backdropFilter: isMobile ? "blur(14px)" : (scrolled || menuOpen ? "blur(14px)" : "none"), transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", borderBottom: isMobile || scrolled || menuOpen ? `1px solid ${t.border}` : "1px solid transparent" }}>
        {isMobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={onToggleTheme} style={{ background: "none", border: `1px solid ${t.border}`, color: t.text, width: 32, height: 32, borderRadius: "50%", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.toggleIcon}</button>
            <LangDropdown lang={lang} onChangeLang={onChangeLang} />
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: `1px solid ${t.border}`, color: t.text, width: 32, height: 32, borderRadius: 4, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {navKeys.map(k => (
              <button key={k} onClick={() => onNavigate(pageMap[k])} style={{ background: "none", border: "none", fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: "0.12em", color: page === pageMap[k] ? t.text : t.textFaint, cursor: "pointer", padding: "4px 0", borderBottom: page === pageMap[k] ? `1px solid ${t.accent}` : "1px solid transparent", transition: "all 0.3s ease" }}>{tx.nav[k]}</button>
            ))}
            <div style={{ width: 1, height: 18, background: t.border, margin: "0 2px" }} />
            <button onClick={onToggleTheme} style={{ background: "none", border: `1px solid ${t.border}`, color: t.text, width: 40, height: 40, borderRadius: "50%", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHover}
              onMouseLeave={e => e.currentTarget.style.borderColor = t.border}>
              {t.toggleIcon}
            </button>
            <LangDropdown lang={lang} onChangeLang={onChangeLang} />
          </div>
        )}
      </nav>
      {isMobile && menuOpen && (
        <div style={{ position: "fixed", top: 56, left: 0, right: 0, zIndex: 999, background: t.navBg, backdropFilter: "blur(14px)", borderBottom: `1px solid ${t.border}`, padding: "8px 0", animation: "dropIn 0.2s ease" }}>
          {navKeys.map(k => (
            <button key={k} onClick={() => { onNavigate(pageMap[k]); setMenuOpen(false); }} style={{ display: "block", width: "100%", background: "none", border: "none", fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", color: page === pageMap[k] ? t.text : t.textFaint, cursor: "pointer", padding: "12px 16px", textAlign: "left", transition: "all 0.3s ease" }}>{tx.nav[k]}</button>
          ))}
        </div>
      )}
    </>
  );
}
// ─── HOME PAGE ───────────────────────────────────────────
function HomePage({ onNavigate }) {
  const t = useTheme();
  const tx = useT();
  const [ld, setLd] = useState(false);
  useEffect(() => { setTimeout(() => setLd(true), 80); }, []);
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden", padding: "100px 24px 24px" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`, backgroundSize: "80px 80px", opacity: ld ? 1 : 0, transition: "opacity 1.5s ease" }} />
      <div style={{ width: ld ? 60 : 0, height: 1, background: t.accent, marginBottom: 40, transition: "width 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
      <h1 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(52px,11vw,130px)", fontWeight: 400, color: t.text, textAlign: "center", lineHeight: 0.92, letterSpacing: "-0.04em", opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s", margin: 0 }}>WAYL</h1>
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
// ─── PROJECT CARD ────────────────────────────────────────
function ProjectCard({ project, projTx, index }) {
  const t = useTheme();
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const o = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => project.url && window.open(project.url, "_blank")} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`, cursor: "pointer" }}>
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/2", marginBottom: 20, background: t.cardBg }}>
        <img src={project.image} alt={projTx.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: hov ? t.imgFilterHover : t.imgFilter, transform: hov ? "scale(1.05)" : "scale(1)", transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
        <div style={{ position: "absolute", top: 14, left: 18, fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>0{project.id}</div>
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
// ─── PORTFOLIO PAGE ──────────────────────────────────────
function PortfolioPage() {
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
// ─── CONTACT PAGE ────────────────────────────────────────
function ContactPage() {
  const t = useTheme();
  const tx = useT();
  const [vis, setVis] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
          <button style={{ marginTop: 40, fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 11, letterSpacing: "0.15em", fontWeight: 500, color: t.btnText, background: t.btnBg, border: "none", padding: "16px 40px", cursor: "pointer", transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: 10 }} onMouseEnter={e => e.target.style.background = t.btnHover} onMouseLeave={e => e.target.style.background = t.btnBg}>{tx.contact.send} <span style={{ fontSize: 16, marginTop: -1 }}>→</span></button>
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
// ─── FOOTER ──────────────────────────────────────────────
function Footer() {
  const t = useTheme();
  const tx = useT();
  return (
    <footer style={{ padding: "40px clamp(24px,5vw,80px)", borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 11, color: t.textGhost, letterSpacing: "0.05em" }}>{tx.footer}</div>
    </footer>
  );
}
// ─── APP ─────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("HOME");
  const [mode, setMode] = useState("light");
  const [lang, setLang] = useState("en");
  const t = themes[mode];
  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "instant" }); };
  return (
    <ThemeContext.Provider value={t}>
      <LangContext.Provider value={lang}>
        <div dir={LANGS[lang].dir} style={{ background: t.bg, minHeight: "100vh", color: t.text, overflowX: "hidden", transition: "background 0.4s ease, color 0.4s ease" }}>
          <style>{`body{background:${t.bg};transition:background 0.4s ease}::selection{background:${t.selection}}::-webkit-scrollbar-track{background:${t.bg}}::-webkit-scrollbar-thumb{background:${t.scrollThumb}}`}</style>
          <Navbar page={page} onNavigate={navigate} mode={mode} onToggleTheme={() => setMode(m => m === "dark" ? "light" : "dark")} lang={lang} onChangeLang={setLang} />
          <PageTransition pageKey={page + lang}>
            {page === "HOME" && <HomePage onNavigate={navigate} />}
            {page === "PORTFOLIO" && <PortfolioPage />}
            {page === "CONTACT" && <ContactPage />}
          </PageTransition>
          <Footer />
        </div>
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}