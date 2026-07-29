"use client";

import Link from "next/link";
import { PanelHero, DesignCard, EventDetails, ShareCard } from "./parts";
import { useI18n } from "@/components/I18nProvider";
import { formatDate, formatTime } from "@/lib/format";

const GOLD = "linear-gradient(160deg,rgba(252,211,77,.33),#fcd34d)";

export default function BasicPanel({ view }) {
  const { t, locale } = useI18n();
  const d = new Date(view.dateISO);
  const dateLabel = formatDate(d, locale);
  const time = formatTime(d, locale);

  return (
    <>
      <PanelHero title={view.title} dateLabel={dateLabel} venue={view.venue} />

      <div className="p-split" style={{ marginTop: 24 }}>
        <DesignCard couple={view.couple} label={t("panel.yourDesign")} designName={view.designName} gradient={GOLD} lines={[`${dateLabel} · ${time}`]} />
        <EventDetails
          mapQuery={view.address || view.venue}
          rows={[
            { label: t("panel.fields.date"), value: dateLabel },
            { label: t("panel.fields.time"), value: time },
            { label: t("panel.fields.place"), value: view.venue },
            { label: t("panel.planContracted"), value: t("panel.planShort.basico") },
          ]}
        />
      </div>

      <div className="p-half" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="pcard" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#6b7280" }}>{t("panel.basic.countdown")}</p>
            <p className="serif" style={{ marginTop: 2, fontSize: 36, fontWeight: 700, color: "var(--brand600)" }}>{view.daysLeft}</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>{t("panel.basic.daysToBigDay")}</p>
          </div>
          <div className="pcard" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#6b7280" }}>{t("panel.basic.confirmedAttendance")}</p>
            <p className="serif" style={{ marginTop: 2, fontSize: 36, fontWeight: 700, color: "#16a34a" }}>{view.stats.confirmados}</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>{t("panel.basic.totalOnly")}</p>
          </div>
        </div>
        <ShareCard couple={view.couple} />
      </div>

      <div
        style={{
          marginTop: 16, border: "1px solid var(--gold)",
          background: "linear-gradient(120deg,rgba(240,230,212,.6),rgba(255,255,255,.4))",
          borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16, flexWrap: "wrap",
        }}
      >
        <div>
          <p className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)" }} dangerouslySetInnerHTML={{ __html: t("panel.basic.upgradeTitle") }} />
          <p style={{ color: "var(--ink-soft)", marginTop: 4, fontSize: 14 }}>{t("panel.basic.upgradeBody")}</p>
        </div>
        <Link href="/#precios" className="btn btn-dark" style={{ flex: "none", padding: "11px 22px", fontSize: 14, fontWeight: 600 }}>
          {t("panel.basic.upgradeCta")}
        </Link>
      </div>

      <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 20, fontSize: 12 }}>{t("panel.basic.note")}</p>
    </>
  );
}
