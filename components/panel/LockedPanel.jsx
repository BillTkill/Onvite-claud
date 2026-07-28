"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useI18n } from "@/components/I18nProvider";

export default function LockedPanel() {
  const { t } = useI18n();
  const chips = [
    { name: t("panel.locked.normal"), price: "$18", highlight: false },
    { name: t("panel.locked.pro"), price: "$35", highlight: true },
    { name: t("panel.locked.vip"), price: "$55", highlight: false },
  ];

  return (
    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", minHeight: 520 }}>
      {/* blurred placeholder panel behind */}
      <div style={{ filter: "blur(3px)", opacity: 0.5, padding: 28, pointerEvents: "none" }} aria-hidden="true">
        <p style={{ fontSize: 14, color: "var(--brand600)" }}>{t("panel.locked.eventPanel")}</p>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "#1c1917" }}>{t("panel.locked.yourEvent")}</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 24 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ height: 90, background: "#fff", border: "1px solid var(--brand100)", borderRadius: 16 }} />
          ))}
        </div>
        <div style={{ height: 180, background: "#fff", border: "1px solid var(--brand100)", borderRadius: 16, marginTop: 16 }} />
      </div>

      {/* overlay modal */}
      <div
        style={{
          position: "absolute", inset: 0, background: "rgba(28,25,23,.35)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }}
      >
        <div
          style={{
            width: "100%", maxWidth: 460, background: "#fff", borderRadius: 24,
            boxShadow: "0 24px 64px rgba(28,25,23,.28)", padding: 36, textAlign: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex", width: 56, height: 56, alignItems: "center", justifyContent: "center",
              borderRadius: "50%", background: "var(--gold-soft)", color: "var(--gold-deep)",
            }}
          >
            <Icon name="lock" size={26} />
          </span>
          <h2 className="serif" style={{ marginTop: 20, fontSize: 24, fontWeight: 700, color: "var(--ink)" }}>{t("panel.locked.title")}</h2>
          <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 14, lineHeight: 1.6 }}>{t("panel.locked.body")}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            {chips.map((c) => (
              <div
                key={c.name}
                style={{
                  flex: 1,
                  border: c.highlight ? "1px solid var(--gold)" : "1px solid var(--border)",
                  background: c.highlight ? "rgba(240,230,212,.4)" : "transparent",
                  borderRadius: 12, padding: "12px 8px",
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{c.name}</p>
                <p style={{ fontSize: 12, color: "var(--gold-deep)", fontWeight: 600 }}>{c.price}</p>
              </div>
            ))}
          </div>
          <Link href="/#precios" className="btn btn-dark btn-block" style={{ marginTop: 20, padding: 13, fontWeight: 600 }}>
            {t("panel.locked.viewPlans")}
          </Link>
          <a
            href="https://wa.me/59100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-block"
            style={{ marginTop: 10, padding: 13, fontWeight: 600 }}
          >
            {t("panel.locked.contactWhatsapp")}
          </a>
          <p style={{ color: "var(--ink-soft)", marginTop: 14, fontSize: 12 }}>{t("panel.locked.note")}</p>
        </div>
      </div>
    </div>
  );
}
