"use client";

import { useMemo, useState } from "react";
import TemplateCard from "@/components/TemplateCard";
import { useI18n } from "@/components/I18nProvider";
import { TEMPLATES, FORMATS, STYLES } from "@/lib/templates";

export default function TemplatesPage() {
  const { t } = useI18n();
  const [format, setFormat] = useState("todas");
  const [style, setStyle] = useState(null); // null = all styles

  const filtered = useMemo(
    () =>
      TEMPLATES.filter((tpl) => {
        const okFormat = format === "todas" || tpl.format === format;
        const okStyle = !style || tpl.styles.includes(style);
        return okFormat && okStyle;
      }),
    [format, style]
  );

  const count = filtered.length;
  const countLabel = t(count === 1 ? "templates.countOne" : "templates.countOther", { n: count });

  return (
    <section className="section">
      <div className="container">
        <div className="center stack-center">
          <p className="eyebrow">{t("templates.eyebrow")}</p>
          <h1 className="h-page">{t("templates.title")}</h1>
          <p className="lead" style={{ marginTop: 16 }}>{t("templates.subtitle")}</p>
        </div>

        {/* Format toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <div style={{ display: "inline-flex", gap: 4, background: "var(--sand)", borderRadius: 999, padding: 4 }}>
            {FORMATS.map((f) => {
              const active = format === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  style={{
                    border: "none",
                    background: active ? "var(--bg)" : "transparent",
                    color: active ? "var(--ink)" : "var(--ink-soft)",
                    boxShadow: active ? "0 1px 2px rgba(28,25,23,.05)" : "none",
                    borderRadius: 999,
                    padding: "7px 18px",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {t(`templates.formats.${f.id}`)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Style chips */}
        <div
          style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8,
            marginTop: 24, maxWidth: 820, marginLeft: "auto", marginRight: "auto",
          }}
        >
          <button onClick={() => setStyle(null)} className={`chip ${!style ? "chip--active" : ""}`}>
            {t("templates.allStyles")}
          </button>
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s === style ? null : s)}
              className={`chip ${s === style ? "chip--active" : ""}`}
            >
              {t(`templates.styles.${s}`)}
            </button>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "var(--ink-soft)", marginTop: 24, fontSize: 14 }}>{countLabel}</p>

        {count > 0 ? (
          <div className="grid grid-4" style={{ marginTop: 32, gap: 20 }}>
            {filtered.map((tpl) => (
              <TemplateCard key={tpl.slug} template={tpl} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--ink-soft)", marginTop: 48, fontSize: 15 }}>
            {t("templates.empty")}
          </p>
        )}
      </div>
    </section>
  );
}
