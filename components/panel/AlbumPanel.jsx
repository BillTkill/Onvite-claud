"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { UploadPermissions, StatCard } from "./parts";
import { useI18n } from "@/components/I18nProvider";
import { slugify } from "@/lib/format";
import { setAlbumModerate, approvePhoto, deletePhoto } from "@/app/panel/actions";

export default function AlbumPanel({ view }) {
  const { t } = useI18n();
  const [moderate, setModerate] = useState(!!view.albumModerate);
  const [origin, setOrigin] = useState("https://onvite.com");
  const [copied, setCopied] = useState(false);
  const [, start] = useTransition();
  useEffect(() => { setOrigin(window.location.origin); }, []);

  const days = view.albumDays ?? (view.plan === "vip" ? 90 : 60);
  const perGuest = view.albumPhotosPerGuest ?? (view.plan === "vip" ? 30 : 15);

  const photos = view.photos || [];
  const uploaders = new Set(photos.map((p) => p.uploaderName || p.id)).size;
  const slug = view.slug || slugify(view.couple);
  // The guest upload link (what the QR encodes) — opens the upload page for this event.
  const uploadUrl = view.albumUrl || `${origin}/album/subir?e=${slug}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=8&data=${encodeURIComponent(uploadUrl)}`;

  function toggleModerate() {
    const next = !moderate;
    setModerate(next);
    start(async () => { try { await setAlbumModerate(next); } catch { setModerate(!next); } });
  }
  function copyLink() {
    try { navigator.clipboard.writeText(uploadUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  }

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrSrc} alt="QR" width={150} height={150} style={{ borderRadius: 10, border: "1px solid var(--brand100)" }} />
          <p style={{ fontSize: 12, color: "#6b7280", textAlign: "center" }}>{t("panel.album.qrCaption")}</p>
          <span className="share-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="printer" size={15} /> {t("panel.album.printQr")}
          </span>
        </div>

        <div className="pcard" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", color: "#9ca3af" }}>{t("panel.album.linkLabel")}</p>
            <div style={{ marginTop: 6, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, border: "1px solid var(--brand100)", borderRadius: 12, padding: "10px 14px", background: "var(--brand50)" }}>
              <span style={{ fontWeight: 600, color: "#1c1917", fontSize: 13, wordBreak: "break-all" }}>{uploadUrl}</span>
              <button type="button" onClick={copyLink} className="share-btn" style={{ padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: "transparent", flex: "none" }}>
                <Icon name="link" size={14} /> {copied ? t("panel.share.copied") : t("panel.album.copy")}
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            <StatCard label={t("panel.album.kpiPhotos")} value={String(photos.length)} color="var(--brand600)" compact />
            <StatCard label={t("panel.album.kpiUploaders")} value={String(uploaders)} color="#16a34a" compact />
            <StatCard label={t("panel.album.kpiDays")} value={String(days)} color="#1c1917" compact />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, border: "1px solid var(--brand100)", borderRadius: 14, padding: "12px 16px", background: "linear-gradient(120deg,rgba(240,230,212,.4),#fff)" }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#1c1917" }}>{t("panel.album.moderateTitle")}</p>
              <p style={{ fontSize: 12, color: "#6b7280" }}>{t("panel.album.moderateBody")}</p>
            </div>
            <button className="toggle-switch" data-on={moderate} aria-pressed={moderate} aria-label={t("panel.album.moderateTitle")} onClick={toggleModerate}>
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* Real photo gallery */}
      <div className="pcard" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("panel.album.galleryTitle")}</h2>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{t("panel.album.gallerySub", { days })}</span>
        </div>

        {photos.length === 0 ? (
          <p style={{ marginTop: 16, padding: "24px 0", textAlign: "center", color: "#9ca3af", fontSize: 13 }}>{t("panel.album.empty")}</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 10, marginTop: 14 }}>
            {photos.map((p) => (
              <div key={p.id} style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid var(--brand100)", aspectRatio: "1 / 1", background: "#f5ecda" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.uploaderName || "foto"} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: p.approved ? 1 : 0.6 }} />
                {!p.approved && (
                  <span style={{ position: "absolute", top: 6, left: 6, background: "#fef9c3", color: "#a16207", borderRadius: 999, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>{t("panel.album.pending")}</span>
                )}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", gap: 4, padding: 6, background: "linear-gradient(0deg,rgba(0,0,0,.55),transparent)" }}>
                  {!p.approved && (
                    <button type="button" onClick={() => start(() => approvePhoto(p.id))} style={{ flex: 1, border: "none", borderRadius: 8, background: "#16a34a", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", padding: "4px 0" }}>{t("panel.album.approve")}</button>
                  )}
                  <button type="button" onClick={() => start(() => deletePhoto(p.id))} title={t("panel.album.delete")} aria-label={t("panel.album.delete")} style={{ flex: p.approved ? 1 : "none", border: "none", borderRadius: 8, background: "rgba(255,255,255,.9)", color: "#b91c1c", fontSize: 11, fontWeight: 700, cursor: "pointer", padding: "4px 8px" }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
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
