"use client";

import Link from "next/link";
import Icon from "./Icon";
import TemplateCard from "./TemplateCard";
import { useI18n } from "./I18nProvider";

export default function TemplateDetailView({ template, related }) {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <Link
          href="/templates"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--ink-soft)", fontSize: 14, fontWeight: 500 }}
        >
          <Icon name="arrowLeft" size={16} /> {t("detail.back")}
        </Link>

        <div className="tpl-detail">
          <div className="tpl-detail__poster-wrap">
            <div className="tpl-detail__poster" style={{ background: template.grad, color: template.ink }}>
              <div style={{ position: "absolute", inset: 14, border: `1px solid ${template.ink}`, opacity: 0.4, borderRadius: 8 }} />
              <div
                style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center", padding: 20,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".35em", textTransform: "uppercase", opacity: 0.75 }}>Onvite</span>
                <span className="serif" style={{ fontSize: 28, fontWeight: 500 }}>{template.name}</span>
                <span style={{ height: 1, width: 48, background: template.ink, opacity: 0.5 }} />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {template.best && (
              <span className="badge" style={{ width: "fit-content", marginBottom: 16 }}>{t("templates.bestBadge")}</span>
            )}
            <h1 className="serif" style={{ fontSize: "clamp(34px,5vw,46px)", fontWeight: 600 }}>{template.name}</h1>
            <p className="lead" style={{ marginTop: 16 }}>{t(`templateDesc.${template.slug}`)}</p>

            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ color: "var(--ink-soft)", fontSize: 12, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase" }}>{t("detail.format")}</p>
                <p style={{ marginTop: 4, fontSize: 14 }}>{t(`templates.formats.${template.format}`)}</p>
              </div>
              <div>
                <p style={{ color: "var(--ink-soft)", fontSize: 12, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase" }}>{t("detail.style")}</p>
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {template.styles.map((s) => (
                    <span key={s} className="pill">{t(`templates.styles.${s}`)}</span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ color: "var(--ink-soft)", fontSize: 12, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase" }}>{t("detail.palette")}</p>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  {template.palette.map((c) => (
                    <span
                      key={c}
                      title={c}
                      style={{ width: 32, height: 32, borderRadius: 999, border: "1px solid var(--border)", background: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 36 }}>
              <Link href={`/book?template=${template.slug}`} className="btn btn-dark">
                {t("detail.reserve")} <Icon name="arrowRight" size={17} />
              </Link>
              <p style={{ color: "var(--gold-deep)", marginTop: 12, fontSize: 14, fontWeight: 500 }}>{t("detail.freePreview")}</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 72 }}>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 600 }}>{t("detail.alsoLike")}</h2>
          <div className="grid grid-4" style={{ marginTop: 28, gap: 20 }}>
            {related.map((tpl) => (
              <TemplateCard key={tpl.slug} template={tpl} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
