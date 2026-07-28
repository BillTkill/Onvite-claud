"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { StatCard } from "./parts";
import { useI18n } from "@/components/I18nProvider";

// Sample registry — placeholder data, like the album photos and the admin
// "Redes" screen. Real persistence is a production task.
const INITIAL_GIFTS = [
  { id: "g1", name: "Juego de vajilla", reservedBy: "Ana Flores" },
  { id: "g2", name: "Cafetera espresso", reservedBy: null },
  { id: "g3", name: "Set de copas de cristal", reservedBy: "Familia Rojas" },
  { id: "g4", name: "Mantelería de lino", reservedBy: null },
  { id: "g5", name: "Robot de cocina", reservedBy: null },
];

export default function GiftsPanel({ view }) {
  const { t } = useI18n();
  const [gifts] = useState(INITIAL_GIFTS);
  const reserved = gifts.filter((g) => g.reservedBy).length;
  const available = gifts.length - reserved;

  return (
    <>
      <Link href="/panel" style={{ fontSize: 13, color: "var(--brand700)", fontWeight: 600 }}>← {t("panel.gifts.back")}</Link>

      <div style={{ marginTop: 12 }}>
        <p style={{ fontSize: 14, color: "var(--brand600)" }}>{t("panel.gifts.eyebrow")}</p>
        <h1 className="serif" style={{ fontSize: "clamp(24px,4vw,30px)", fontWeight: 700, color: "#1c1917" }}>{t("panel.gifts.title")}</h1>
        <p style={{ color: "#4b5563", marginTop: 4, fontSize: 15 }}>{t("panel.gifts.subtitle")}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 20 }} className="vip-stats">
        <StatCard label={t("panel.gifts.kpiTotal")} value={String(gifts.length)} color="var(--brand600)" compact />
        <StatCard label={t("panel.gifts.kpiReserved")} value={String(reserved)} color="#16a34a" compact />
        <StatCard label={t("panel.gifts.kpiAvailable")} value={String(available)} color="#1c1917" compact />
      </div>

      {/* Cash contribution with QR */}
      <div
        className="pcard"
        style={{
          marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
          background: "linear-gradient(120deg,rgba(240,230,212,.5),#fff)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              width: 46, height: 46, borderRadius: 14, flex: "none", background: "linear-gradient(140deg,#f5ecda,#e7d6b8)",
              color: "var(--gold-deep)", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon name="qr" size={22} />
          </span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#1c1917" }}>{t("panel.gifts.cashTitle")}</p>
            <p style={{ color: "#6b7280", marginTop: 2, fontSize: 13 }}>{t("panel.gifts.cashBody")}</p>
          </div>
        </div>
        <span className="share-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Icon name="qr" size={15} /> {t("panel.gifts.payQr")}
        </span>
      </div>

      {/* Gift list */}
      <div className="pcard" style={{ marginTop: 16, padding: 0 }}>
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
            borderBottom: "1px solid var(--brand100)", padding: "16px 20px", flexWrap: "wrap",
          }}
        >
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("panel.gifts.listTitle")}</h2>
          <span className="share-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px" }}>
            <Icon name="plus" size={15} /> {t("panel.gifts.add")}
          </span>
        </div>
        <div>
          {gifts.map((g, i) => (
            <div
              key={g.id}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                padding: "16px 20px", borderBottom: i < gifts.length - 1 ? "1px solid #faf6ee" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "var(--gold-deep)" }}><Icon name="gift" size={18} /></span>
                <p style={{ fontWeight: 600, color: "#1c1917" }}>{g.name}</p>
              </div>
              {g.reservedBy ? (
                <span style={{ background: "#dcfce7", color: "#15803d", borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>
                  {t("panel.gifts.reservedBy", { name: g.reservedBy })}
                </span>
              ) : (
                <span style={{ background: "var(--brand50)", color: "var(--brand700)", border: "1px solid var(--brand200)", borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>
                  {t("panel.gifts.available")}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 20, fontSize: 12 }}>{t("panel.gifts.footnote")}</p>
    </>
  );
}
