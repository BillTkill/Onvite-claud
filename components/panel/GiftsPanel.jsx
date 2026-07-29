"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { StatCard } from "./parts";
import { useI18n } from "@/components/I18nProvider";
import { addGift } from "@/app/panel/actions";

export default function GiftsPanel({ view, gifts = [] }) {
  const { t } = useI18n();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [isPending, startTransition] = useTransition();
  const reserved = gifts.filter((g) => g.reservedBy).length;
  const available = gifts.length - reserved;
  // Example payment QR (encodes a placeholder). In production the admin sets
  // the couple's real QR from the panel editor.
  const qrData = `Onvite · Aporte para ${view.couple || "la pareja"}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(qrData)}`;

  function submitGift() {
    const clean = name.trim();
    if (!clean) return;
    startTransition(async () => {
      try {
        await addGift(clean); // revalidates the page → list refreshes
        setName("");
        setAdding(false);
      } catch {
        /* keep the input open on failure */
      }
    });
  }

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
        <button type="button" onClick={() => setShowQr((v) => !v)} className="share-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: "transparent" }}>
          <Icon name="qr" size={15} /> {t("panel.gifts.payQr")}
        </button>
      </div>

      {showQr && (
        <div className="pcard" style={{ marginTop: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrSrc} alt="QR" width={200} height={200} style={{ borderRadius: 12, border: "1px solid var(--brand100)" }} />
          <p style={{ fontSize: 13, color: "#6b7280", textAlign: "center", maxWidth: 320 }}>{t("panel.gifts.qrCaption")}</p>
        </div>
      )}

      {/* Gift list */}
      <div className="pcard" style={{ marginTop: 16, padding: 0 }}>
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
            borderBottom: "1px solid var(--brand100)", padding: "16px 20px", flexWrap: "wrap",
          }}
        >
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("panel.gifts.listTitle")}</h2>
          <button
            type="button"
            onClick={() => setAdding((v) => !v)}
            className="share-btn"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", border: "1px solid var(--brand200)", background: "transparent", cursor: "pointer" }}
          >
            <Icon name="plus" size={15} /> {t("panel.gifts.add")}
          </button>
        </div>

        {adding && (
          <div style={{ display: "flex", gap: 8, padding: "14px 20px", borderBottom: "1px solid var(--brand100)", flexWrap: "wrap" }}>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submitGift(); }}
              placeholder={t("panel.gifts.addPh")}
              className="auth-field"
              style={{ flex: 1, minWidth: 180 }}
            />
            <button
              type="button"
              onClick={submitGift}
              disabled={isPending || !name.trim()}
              className="share-btn share-btn--wa"
              style={{ border: "none", cursor: isPending || !name.trim() ? "not-allowed" : "pointer", opacity: isPending || !name.trim() ? 0.6 : 1 }}
            >
              {isPending ? t("panel.gifts.saving") : t("panel.gifts.save")}
            </button>
          </div>
        )}

        <div>
          {gifts.length === 0 && !adding && (
            <p style={{ padding: "24px 20px", textAlign: "center", color: "#9ca3af", fontSize: 13 }}>{t("panel.gifts.empty")}</p>
          )}
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
