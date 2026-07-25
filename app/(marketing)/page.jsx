"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import TemplateCard from "@/components/TemplateCard";
import Faq from "@/components/Faq";
import { useI18n } from "@/components/I18nProvider";
import { TEMPLATES } from "@/lib/templates";

const FEATURE_ICONS = ["calendarCheck", "palette", "share"];
const PLAN_META = [
  { price: "100 $", cta: "btn-outline" },
  { price: "165 $", cta: "btn-dark", highlight: true },
  { price: "200 $", cta: "btn-gold", vip: true },
];

export default function HomePage() {
  const { t } = useI18n();
  const bestTemplates = TEMPLATES.filter((tpl) => tpl.best).slice(0, 4);
  const features = t("home.features.items");
  const steps = t("home.how.steps");
  const checks = t("home.promo.checks");
  const plans = t("home.pricing.plans");

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="container hero__inner">
          <span className="pill" style={{ letterSpacing: ".04em", textTransform: "uppercase", color: "var(--gold-deep)" }}>
            <Icon name="sparkle" size={14} />
            {t("home.hero.badge")}
          </span>
          <h1 className="h-hero" style={{ marginTop: 32 }}>
            {t("home.hero.titleA")}{" "}
            <em style={{ color: "var(--gold-deep)", fontWeight: 500, fontStyle: "italic" }}>
              {t("home.hero.titleEm")}
            </em>
          </h1>
          <p className="lead" style={{ margin: "24px auto 0", maxWidth: 600 }}>{t("home.hero.subtitle")}</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 40 }}>
            <Link href="/templates" className="btn btn-dark">
              {t("home.hero.ctaTemplates")} <Icon name="arrowRight" size={17} />
            </Link>
            <a href="#como-funciona" className="btn btn-outline">{t("home.hero.ctaHow")}</a>
          </div>
          <p style={{ color: "var(--ink-soft)", opacity: 0.85, marginTop: 32, fontSize: 14 }}>{t("home.hero.note")}</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div className="center stack-center">
            <p className="eyebrow">{t("home.features.eyebrow")}</p>
            <h2 className="h-section">{t("home.features.title")}</h2>
            <p className="lead" style={{ marginTop: 16 }}>{t("home.features.subtitle")}</p>
          </div>
          <div className="grid grid-3" style={{ marginTop: 48 }}>
            {(Array.isArray(features) ? features : []).map((f, i) => (
              <div className="card" key={i}>
                <span className="icon-chip"><Icon name={FEATURE_ICONS[i]} size={20} /></span>
                <h3 style={{ marginTop: 20, fontSize: 20, fontWeight: 600 }}>{f.title}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 10, fontSize: 14, lineHeight: 1.6 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES PREVIEW */}
      <section className="section">
        <div className="container">
          <div className="center stack-center">
            <h2 className="h-section">{t("home.templatesPreview.title")}</h2>
            <p className="lead" style={{ marginTop: 16 }}>{t("home.templatesPreview.subtitle")}</p>
          </div>
          <div className="grid grid-4" style={{ marginTop: 48 }}>
            {bestTemplates.map((tpl) => (
              <TemplateCard key={tpl.slug} template={tpl} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
            <Link href="/templates" className="btn btn-outline">
              {t("home.templatesPreview.viewAll")} <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="section section-tint">
        <div className="container">
          <div className="center stack-center">
            <p className="eyebrow">{t("home.how.eyebrow")}</p>
            <h2 className="h-section">{t("home.how.title")}</h2>
            <p className="lead" style={{ marginTop: 16 }}>{t("home.how.subtitle")}</p>
          </div>
          <div className="grid grid-4" style={{ marginTop: 48 }}>
            {(Array.isArray(steps) ? steps : []).map((s, i) => (
              <div className="card" key={i} style={{ background: "var(--bg)", borderRadius: 20 }}>
                <span
                  style={{
                    display: "flex", width: 36, height: 36, alignItems: "center", justifyContent: "center",
                    borderRadius: 999, background: "var(--ink)", color: "#fdfbf7",
                    fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 15,
                  }}
                >
                  {i + 1}
                </span>
                <h3 style={{ marginTop: 18, fontSize: 18, fontWeight: 600 }}>{s.title}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO ÁLBUM */}
      <section className="section">
        <div className="container">
          <div
            style={{
              maxWidth: 920, margin: "0 auto", border: "1px solid var(--border)", background: "var(--surface)",
              borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 24px rgba(28,25,23,.08)",
            }}
          >
            <div style={{ padding: "52px 32px", textAlign: "center" }}>
              <span
                style={{
                  display: "inline-flex", width: 56, height: 56, alignItems: "center", justifyContent: "center",
                  borderRadius: 16, background: "var(--gold-soft)", color: "var(--gold-deep)",
                }}
              >
                <Icon name="camera" size={26} />
              </span>
              <p className="eyebrow" style={{ marginTop: 20, marginBottom: 0 }}>{t("home.promo.eyebrow")}</p>
              <h2 className="h-section" style={{ marginTop: 10 }}>{t("home.promo.title")}</h2>
              <p className="lead" style={{ margin: "16px auto 0", maxWidth: 560 }}>{t("home.promo.subtitle")}</p>
              <div className="grid grid-2" style={{ maxWidth: 640, margin: "32px auto 0", gap: 16 }}>
                {(Array.isArray(checks) ? checks : []).map((c) => (
                  <div
                    key={c}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, border: "1px solid var(--border)",
                      borderRadius: 14, padding: "18px 20px", textAlign: "left",
                    }}
                  >
                    <span style={{ flex: "none", color: "var(--gold-deep)" }}><Icon name="check" size={16} strokeWidth={2.5} /></span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "linear-gradient(120deg,#8a6a34,#b4894a)", color: "#fff", padding: "32px", textAlign: "center" }}>
              <p style={{ fontSize: 14, letterSpacing: ".06em", textTransform: "uppercase", opacity: 0.85 }}>{t("home.promo.includedWith")}</p>
              <p className="serif" style={{ fontSize: 30, fontWeight: 600, marginTop: 4 }}>{t("home.promo.planName")}</p>
              <div style={{ height: 1, width: 120, background: "rgba(255,255,255,.35)", margin: "14px auto" }} />
              <p style={{ fontSize: 15, opacity: 0.9 }}>
                {t("home.promo.addForA")} <strong style={{ fontWeight: 700 }}>15 $</strong> {t("home.promo.addForB")}
              </p>
              <Link href="/book" className="btn" style={{ marginTop: 20, background: "var(--gold-soft)", color: "var(--ink)" }}>
                {t("home.promo.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="precios" className="section section-tint">
        <div className="container">
          <div className="center stack-center">
            <p className="eyebrow">{t("home.pricing.eyebrow")}</p>
            <h2 className="h-section">{t("home.pricing.title")}</h2>
            <p className="lead" style={{ marginTop: 16 }}>{t("home.pricing.subtitle")}</p>
          </div>
          <div className="grid grid-3" style={{ marginTop: 52, alignItems: "stretch" }}>
            {(Array.isArray(plans) ? plans : []).map((p, i) => {
              const meta = PLAN_META[i];
              return (
                <div
                  key={p.name}
                  style={{
                    position: "relative",
                    background: meta.vip ? "linear-gradient(160deg,rgba(240,230,212,.55),var(--bg))" : "var(--bg)",
                    border: meta.highlight ? "1px solid rgba(180,137,74,.5)" : meta.vip ? "1px solid var(--gold)" : "1px solid var(--border)",
                    borderRadius: 24,
                    padding: 30,
                    boxShadow: meta.highlight ? "0 16px 48px rgba(28,25,23,.1)" : "0 2px 8px rgba(28,25,23,.06)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {p.ribbon && (
                    <span
                      style={{
                        position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                        background: meta.vip ? "linear-gradient(120deg,#8a6a34,#b4894a)" : "var(--gold-deep)",
                        color: "#fff", borderRadius: 999, padding: "5px 16px", fontSize: 12,
                        fontWeight: meta.vip ? 700 : 600, whiteSpace: "nowrap",
                      }}
                    >
                      {p.ribbon}
                    </span>
                  )}
                  <h3 className="serif" style={{ fontSize: 23, fontWeight: 600 }}>{p.name}</h3>
                  <p style={{ color: "var(--ink-soft)", marginTop: 4, fontSize: 14 }}>{p.tagline}</p>
                  <p style={{ marginTop: 22, display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span className="serif" style={{ fontSize: 44, fontWeight: 600 }}>{meta.price}</span>
                    <span style={{ color: "var(--ink-soft)", fontSize: 13 }}>{t("home.pricing.perOnce")}</span>
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "flex", flexDirection: "column", gap: 11 }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ display: "flex", gap: 12, fontSize: 14 }}>
                        <span style={{ flex: "none", marginTop: 2, color: "var(--gold-deep)" }}>
                          <Icon name="check" size={16} strokeWidth={2.5} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/book" className={`btn ${meta.cta}`} style={{ marginTop: "auto", marginBlockStart: 26 }}>
                    {t("home.pricing.cta")}
                  </Link>
                </div>
              );
            })}
          </div>
          <p style={{ textAlign: "center", color: "var(--gold-deep)", marginTop: 32, fontSize: 14, fontWeight: 500 }}>
            {t("home.pricing.note")}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas" className="section">
        <div className="container container-narrow">
          <div className="center">
            <p className="eyebrow">{t("home.faq.eyebrow")}</p>
            <h2 className="h-section">{t("home.faq.title")}</h2>
            <p className="lead" style={{ marginTop: 16 }}>{t("home.faq.subtitle")}</p>
          </div>
          <Faq />
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contacto" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              maxWidth: 1100, margin: "0 auto", position: "relative", overflow: "hidden",
              background: "var(--ink)", borderRadius: 24, padding: "72px 32px", textAlign: "center",
            }}
          >
            <div
              style={{
                position: "absolute", top: -96, left: "50%", transform: "translateX(-50%)",
                width: 288, height: 288, borderRadius: "50%", background: "rgba(180,137,74,.25)", filter: "blur(70px)",
              }}
            />
            <div style={{ position: "relative" }}>
              <p style={{ color: "var(--gold)", fontSize: 12, fontWeight: 600, letterSpacing: ".24em", textTransform: "uppercase" }}>
                {t("home.contact.eyebrow")}
              </p>
              <h2 style={{ color: "#fff", marginTop: 12, fontSize: "clamp(28px,4vw,38px)", fontWeight: 600 }}>
                {t("home.contact.title")}
              </h2>
              <p style={{ color: "rgba(255,255,255,.75)", margin: "16px auto 0", maxWidth: 560, fontSize: 16, lineHeight: 1.6 }}>
                {t("home.contact.subtitle")}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 36 }}>
                <a href="mailto:hola@onvite.com" className="btn" style={{ background: "var(--gold-soft)", color: "var(--ink)" }}>
                  <Icon name="mail" size={17} /> {t("home.contact.email")}
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ border: "1px solid rgba(255,255,255,.25)", color: "#fff" }}
                >
                  <Icon name="instagram" size={16} /> {t("home.contact.instagram")}
                </a>
                <a href="https://wa.me/59100000000" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  {t("home.contact.whatsapp")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
