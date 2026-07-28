"use client";

import { PanelHero, DesignCard, StatCard, AttendanceBar, UploadPermissions, GuestList, ExtraCard } from "./parts";
import { useI18n } from "@/components/I18nProvider";
import { formatDate, formatTime } from "@/lib/format";

const GOLD = "linear-gradient(160deg,rgba(252,211,77,.33),#fcd34d)";

export default function VipPanel({ view }) {
  const { t, locale } = useI18n();
  const d = new Date(view.dateISO);
  const dateLabel = formatDate(d, locale);
  const time = formatTime(d, locale);

  return (
    <>
      <PanelHero title={view.title} dateLabel={dateLabel} venue={view.venue} />

      <div className="p-split" style={{ marginTop: 24 }}>
        <DesignCard couple={view.couple} label={t("panel.customDesign")} designName="" gradient={GOLD} lines={[`${dateLabel} · ${time}`]} />
        <div style={{ display: "grid", gridTemplateRows: "auto auto", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="vip-stats">
            <StatCard label={t("panel.stats.confirmados")} value={String(view.stats.confirmados)} color="#16a34a" compact />
            <StatCard label={t("panel.stats.pendientes")} value={String(view.stats.pendientes)} color="#ca8a04" compact />
            <StatCard label={t("panel.stats.noAsisten")} value={String(view.stats.rechazados)} color="#ef4444" compact />
            <StatCard label={t("panel.stats.dias")} value={String(view.daysLeft)} color="var(--brand600)" compact />
          </div>
          <AttendanceBar attending={view.attending} total={view.totalGuests} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 28 }}>
        <span style={{ background: "linear-gradient(120deg,#8a6a34,#b4894a)", color: "#fff", borderRadius: 7, padding: "3px 9px", fontSize: 11, fontWeight: 700 }}>VIP</span>
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>{t("panel.vip.extras")}</h2>
      </div>
      <div className="grid grid-4" style={{ marginTop: 14, gap: 16 }}>
        <ExtraCard icon="grid" title={t("panel.vip.albumTitle")} body={t("panel.vip.albumBody")} meta={t("panel.pro.albumMeta", { photos: view.albumPhotosPerGuest ?? 30, days: view.albumDays ?? 90 })} cta={t("panel.vip.albumCta")} />
        <ExtraCard icon="gift" title={t("panel.vip.giftsTitle")} body={t("panel.vip.giftsBody")} meta={t("panel.vip.giftsMeta")} cta={t("panel.vip.giftsCta")} />
        <ExtraCard icon="music" title={t("panel.vip.musicTitle")} body={t("panel.vip.musicBody")} meta={`♪ ${view.music || "—"}`} cta={t("panel.vip.musicCta")} />
        <ExtraCard icon="shield" title={t("panel.vip.supportTitle")} body={t("panel.vip.supportBody")} meta={t("panel.vip.supportMeta")} cta={t("panel.vip.supportCta")} ctaWhatsapp />
      </div>

      <div style={{ marginTop: 16 }}><UploadPermissions guests={view.guests} /></div>
      <div style={{ marginTop: 16 }}><GuestList guests={view.guests} withFilter={false} /></div>

      <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 20, fontSize: 12 }}>{t("panel.vip.note")}</p>
    </>
  );
}
