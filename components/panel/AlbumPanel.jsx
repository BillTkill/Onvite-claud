"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { UploadPermissions, StatCard } from "./parts";
import { useI18n } from "@/components/I18nProvider";

/** Decorative QR placeholder (real QR generation is a production task). */
function QrPlaceholder({ size = 132 }) {
  const cells = 11;
  const cell = size / cells;
  // Deterministic pattern so SSR and client render identically.
  const on = (r, c) => (r * 7 + c * 3 + ((r * c) % 5)) % 2 === 0;
  const rects = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      if (on(r, c)) rects.push(<rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#1c1917" />);
    }
  }
  const finder = (x, y) => (
    <>
      <rect x={x} y={y} width={cell * 3} height={cell * 3} fill="none" stroke="#1c1917" strokeWidth={cell * 0.6} />
      <rect x={x + cell} y={y + cell} width={cell} height={cell} fill="#1c1917" />
    </>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="QR" style={{ borderRadius: 10, background: "#fff" }}>
      {rects}
      {finder(0, 0)}
      {finder(size - cell * 3, 0)}
      {finder(0, size - cell * 3)}
    </svg>
  );
}

export default function AlbumPanel({ view }) {
  const { t } = useI18n();
  const [moderate, setModerate] = useState(true);
  const days = view.albumDays ?? (view.plan === "vip" ? 90 : 60);
  const perGuest = view.albumPhotosPerGuest ?? (view.plan === "vip" ? 30 : 15);

  // Placeholder counters (real uploads are a production task, like the mockup).
  const uploaders = view.guests.filter((g) => g.canUpload).length;
  const photos = uploaders * 6;
  // Album link derived from the real couple name (no hardcoded example).
  const slug = (view.couple || "album")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const albumLink = `onvite.com/a/${slug || "album"}`;

  return (
    <>
      <Link href="/panel" style={{ fontSize: 13, color: "var(--brand700)", fontWeight: 600 }}>← {t("panel.album.back")}</Link>

      <div style={{ marginTop: 12 }}>
        <p style={{ fontSize: 14, color: "var(--brand600)" }}>{t("panel.album.eyebrow")}</p>
        <h1 className="serif" style={{ fontSize: "clamp(24px,4vw,30px)", fontWeight: 700, color: "#1c1917" }}>{t("panel.album.title")}</h1>
        <p style={{ color: "#4b5563", marginTop: 4, fontSize: 15 }}>{t("panel.album.subtitle")}</p>
      </div>

      {/* QR + link */}
      <div className="p-split" style={{ marginTop: 20 }}>
        <div className="pcard" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <QrPlaceholder />
          <p style={{ fontSize: 12, color: "#6b7280", textAlign: "center" }}>{t("panel.album.qrCaption")}</p>
          <span className="share-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="printer" size={15} /> {t("panel.album.printQr")}
          </span>
        </div>

        <div className="pcard" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", color: "#9ca3af" }}>{t("panel.album.linkLabel")}</p>
            <div
              style={{
                marginTop: 6, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                border: "1px solid var(--brand100)", borderRadius: 12, padding: "10px 14px", background: "var(--brand50)",
              }}
            >
              <span style={{ fontWeight: 600, color: "#1c1917", fontSize: 14 }}>{albumLink}</span>
              <span className="share-btn" style={{ padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Icon name="link" size={14} /> {t("panel.album.copy")}
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            <StatCard label={t("panel.album.kpiPhotos")} value={String(photos)} color="var(--brand600)" compact />
            <StatCard label={t("panel.album.kpiUploaders")} value={String(uploaders)} color="#16a34a" compact />
            <StatCard label={t("panel.album.kpiDays")} value={String(days)} color="#1c1917" compact />
          </div>

          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              border: "1px solid var(--brand100)", borderRadius: 14, padding: "12px 16px",
              background: "linear-gradient(120deg,rgba(240,230,212,.4),#fff)",
            }}
          >
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#1c1917" }}>{t("panel.album.moderateTitle")}</p>
              <p style={{ fontSize: 12, color: "#6b7280" }}>{t("panel.album.moderateBody")}</p>
            </div>
            <button
              className="toggle-switch"
              data-on={moderate}
              aria-pressed={moderate}
              aria-label={t("panel.album.moderateTitle")}
              onClick={() => setModerate((v) => !v)}
            >
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery placeholder (book style) */}
      <div className="pcard" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("panel.album.galleryTitle")}</h2>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{t("panel.album.gallerySub", { days })}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 10, marginTop: 14 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1 / 1", borderRadius: 12, border: "1px solid var(--brand100)",
                background: `linear-gradient(150deg,#f5ecda,#e7d6b8)`, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-deep)",
              }}
            >
              <Icon name="image" size={22} />
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af", textAlign: "center" }}>{t("panel.album.galleryNote", { perGuest })}</p>
      </div>

      {/* Per-guest permissions — reuses the existing component */}
      <div style={{ marginTop: 16 }}>
        <UploadPermissions guests={view.guests} />
      </div>

      <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 20, fontSize: 12 }}>{t("panel.album.footnote")}</p>
    </>
  );
}
