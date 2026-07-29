"use client";

import { PanelHero, DesignCard, EventDetails, StatRow, AttendanceBar, ShareCard, GuestList, ExtraCard } from "./parts";
import { useI18n } from "@/components/I18nProvider";
import { formatDate, formatTime } from "@/lib/format";

const GOLD = "linear-gradient(160deg,rgba(252,211,77,.33),#fcd34d)";

export default function ProPanel({ view }) {
  const { t, locale } = useI18n();
  const d = new Date(view.dateISO);
  const dateLabel = formatDate(d, locale);
  const time = formatTime(d, locale);

  return (
    <>
      <PanelHero title={view.title} dateLabel={dateLabel} venue={view.venue} />

      <div className="p-split" style={{ marginTop: 24 }}>
        <DesignCard couple={view.couple} label={t("panel.yourDesign")} designName={view.designName} gradient={GOLD} lines={[dateLabel, time]} />
        <EventDetails
          mapQuery={view.address || view.venue}
          rows={[
            { label: t("panel.fields.date"), value: dateLabel },
            { label: t("panel.fields.time"), value: time },
            { label: t("panel.fields.place"), value: view.venue },
            { label: t("panel.fields.address"), value: view.address || "—" },
            { label: t("panel.fields.dressCode"), value: view.dressCode || "—" },
            { label: t("panel.planContracted"), value: t("panel.planShort.pro") },
          ]}
        />
      </div>

      <div style={{ marginTop: 16 }}><StatRow stats={view.stats} daysLeft={view.daysLeft} /></div>
      <div style={{ marginTop: 16 }}><AttendanceBar attending={view.attending} total={view.totalGuests} /></div>
      <div style={{ marginTop: 16 }}><ShareCard inline couple={view.couple} /></div>

      <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917", marginTop: 20 }}>{t("panel.pro.albumGifts")}</h2>
      <div className="p-half" style={{ marginTop: 14 }}>
        <ExtraCard
          icon="grid"
          title={t("panel.pro.albumTitle")}
          body={t("panel.pro.albumBody")}
          meta={t("panel.pro.albumMeta", { photos: view.albumPhotosPerGuest ?? 15, days: view.albumDays ?? 60 })}
          cta={t("panel.pro.albumCta")}
          href="/panel/album"
        />
        <ExtraCard
          icon="gift"
          title={t("panel.pro.giftsTitle")}
          body={t("panel.pro.giftsBody")}
          meta={t("panel.pro.giftsMeta")}
          cta={t("panel.pro.giftsCta")}
          href="/panel/regalos"
        />
      </div>

      <div style={{ marginTop: 16 }}><GuestList guests={view.guests} withFilter /></div>

      <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 20, fontSize: 12 }}>{t("panel.pro.note")}</p>
    </>
  );
}
