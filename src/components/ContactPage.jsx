import { useEffect, useState } from "react";
import { useT } from "../hooks/useT";
import SiteNav from "./SiteNav";
import "./ContactPage.css";

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/louakedwayl" },
  { name: "LinkedIn", url: "https://linkedin.com/in/louakedwayl" },
  { name: "Root-Me", url: "https://www.root-me.org/louakedwayl" },
];

/* Contact — full-bleed "Lithos" form, styled to match the home hero.
   A full-bleed section that owns the shared fixed glass nav (SiteNav). */
export default function ContactPage({ page, onNavigate, lang, onChangeLang }) {
  const tx = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Auto-clear the result banner after a few seconds.
  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const id = setTimeout(() => setStatus(null), 6000);
    return () => clearTimeout(id);
  }, [status]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: "", email: "", message: "" });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="ct">
      <SiteNav page={page} onNavigate={onNavigate} lang={lang} onChangeLang={onChangeLang} />

      <div className="ct-inner">
        {/* Left — heading + form */}
        <div className="ct-col-form">
          <p className="ct-eyebrow ct-anim ct-fade" style={{ animationDelay: "0.1s" }}>
            {tx.contact.label}
          </p>
          <h1 className="ct-title ct-anim ct-reveal" style={{ animationDelay: "0.2s" }}>
            <span className="ct-title-1">{tx.contact.title}</span>
            <span className="ct-title-2">{tx.contact.title2}</span>
          </h1>
          <span className="ct-rule ct-anim ct-grow" style={{ animationDelay: "0.4s" }} />

          <form className="ct-form ct-anim ct-fade" style={{ animationDelay: "0.5s" }} onSubmit={submit} noValidate>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-name">{tx.contact.name} *</label>
              <input id="ct-name" className="ct-input" type="text" autoComplete="name"
                     value={form.name} onChange={set("name")} required />
            </div>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-email">{tx.contact.email} *</label>
              <input id="ct-email" className="ct-input" type="email" autoComplete="email"
                     value={form.email} onChange={set("email")} required />
            </div>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-message">{tx.contact.message} *</label>
              <textarea id="ct-message" className="ct-input ct-textarea" rows={4}
                        value={form.message} onChange={set("message")} required />
            </div>

            <button className="ct-send" type="submit" disabled={status === "sending"}>
              <span>{tx.contact.send}</span>
              <span className="ct-send-arrow" aria-hidden="true">→</span>
            </button>

            {status === "success" && (
              <p className="ct-status ct-status-ok" role="status">{tx.contact.success}</p>
            )}
            {status === "error" && (
              <p className="ct-status ct-status-err" role="status">{tx.contact.error}</p>
            )}
          </form>
        </div>

        {/* Right — info, socials, quote */}
        <aside className="ct-col-info ct-anim ct-fade" style={{ animationDelay: "0.4s" }}>
          <div className="ct-block">
            <p className="ct-info-label">{tx.contact.infoLabel}</p>
            <a className="ct-info-line" href="mailto:contact@wayl.dev">
              <span className="ct-info-ico" aria-hidden="true">✉</span> contact@wayl.dev
            </a>
            <p className="ct-info-line">
              <span className="ct-info-ico" aria-hidden="true">◎</span> Paris, France
            </p>
          </div>

          <div className="ct-block">
            <p className="ct-info-label">{tx.contact.socialLabel}</p>
            <div className="ct-socials">
              {SOCIALS.map((s) => (
                <a key={s.name} className="ct-social" href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <p className="ct-footer">{tx.footer}</p>
    </section>
  );
}
