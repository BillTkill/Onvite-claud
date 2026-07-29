"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import LangSelect from "@/components/LangSelect";
import { useI18n } from "@/components/I18nProvider";
import { formatDate, formatTime, daysUntil } from "@/lib/format";

/** Public wedding invitation page (what guests open from the shared link/QR). */
export default function InvitationView({ view }) {
  const { t, locale } = useI18n();
  const d = new Date(view.dateISO);
  const dateLabel = formatDate(d, locale);
  const time = formatTime(d, locale);
  const days = daysUntil(d);

  const rows = [
    { label: t("panel.fields.date"), value: dateLabel },
    { label: t("panel.fields.time"), value: time },
    { label: t("panel.fields.place"), value: view.venue },
    { label: t("panel.fields.address"), value: view.address || "—" },
    { label: t("panel.fields.dressCode"), value: view.dressCode || "—" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--brand50)", paddingBottom: 32 }}>
      {/* Hero with the couple's chosen template gradient */}
      <div style={{ position: "relative", background: view.gradient, padding: "72px 24px 84px", textAlign: "center", color: "#1c1917", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 14, right: 14 }}><LangSelect /></div>
        <span aria-hidden="true" style={{ position: "absolute", inset: 14, border: "1px solid rgba(255,255,255,.4)", borderRadius: 20, pointerEvents: "none" }} />
        <p className="serif" style={{ textTransform: "uppercase", letterSpacing: ".26em", fontSize: 12 }}>{t("panel.weGetMarried")}</p>
        <h1 className="serif" style={{ fontSize: "clamp(34px,8vw,60px)", fontWeight: 700, marginTop: 14, lineHeight: 1.05 }}>{view.couple}</h1>
        <p style={{ marginTop: 14, fontSize: 16, fontWeight: 500 }}>{dateLabel} · {time}</p>
        {days > 0 && (
          <span style={{ display: "inline-block", marginTop: 16, background: "rgba(255,255,255,.85)", color: "#1c1917", borderRadius: 999, padding: "6px 16px", fontSize: 13, fontWeight: 600 }}>
            {t("panel.basic.daysToBigDay") ? `${days} · ${t("panel.basic.daysToBigDay")}` : `${days}`}
          </span>
        )}
      </div>

      <div className="container" style={{ maxWidth: 640, padding: "0 20px", marginTop: -44, position: "relative" }}>
        {/* Event details */}
        <div className="pcard" style={{ padding: 28 }}>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 700, textAlign: "center", color: "#1c1917" }}>{view.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20, fontSize: 14 }}>
            {rows.map((r) => (
              <div key={r.label}>
                <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", color: "#9ca3af" }}>{r.label}</p>
                <p style={{ fontWeight: 600, color: "#1c1917" }}>{r.value}</p>
              </div>
            ))}
          </div>
          {view.address && (
            <iframe
              title="map"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: 12, marginTop: 18 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(view.address)}&output=embed`}
            />
          )}
        </div>

        {/* Album */}
        <div className="pcard" style={{ marginTop: 16, padding: 28, textAlign: "center" }}>
          <span style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(140deg,#f5ecda,#e7d6b8)", color: "var(--gold-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="camera" size={22} />
          </span>
          <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917", marginTop: 12 }}>{t("invite.gallery")}</h3>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 6 }}>{t("invite.galleryNote")}</p>

          {(view.photos || []).length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(90px,1fr))", gap: 8, marginTop: 16 }}>
              {view.photos.map((p) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={p.id} src={p.url} alt="foto" style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: 10, border: "1px solid var(--brand100)" }} />
              ))}
            </div>
          )}

          <Link href={`/album/subir?e=${view.slug}`} className="btn btn-dark" style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px" }}>
            <Icon name="upload" size={16} /> {t("invite.uploadPhotos")}
          </Link>
        </div>

        {/* RSVP */}
        <div className="pcard" style={{ marginTop: 16, padding: 28, textAlign: "center" }}>
          <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("invite.rsvpTitle")}</h3>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 6 }}>{t("invite.rsvpNote")}</p>
          <span className="btn btn-gold" style={{ marginTop: 16, display: "inline-block", padding: "12px 24px" }}>{t("invite.rsvpConfirm")}</span>
        </div>

        <p style={{ textAlign: "center", color: "#9ca3af", margin: "28px 0 8px", fontSize: 12 }}>{t("invite.madeWith")}</p>
      </div>
    </div>
  );
}
