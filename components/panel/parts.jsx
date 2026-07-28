"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useI18n } from "@/components/I18nProvider";

const STATUS_STYLE = {
  confirmado: { bg: "#dcfce7", fg: "#15803d" },
  pendiente: { bg: "#fef9c3", fg: "#a16207" },
  rechazado: { bg: "#fee2e2", fg: "#dc2626" },
};

export function PanelHero({ title, dateLabel, venue }) {
  const { t } = useI18n();
  return (
    <div>
      <p style={{ fontSize: 14, color: "var(--brand600)" }}>{t("panel.eventPanel")}</p>
      <h1 className="serif" style={{ fontSize: "clamp(24px,4vw,30px)", fontWeight: 700, color: "#1c1917" }}>{title}</h1>
      <p style={{ color: "#4b5563", marginTop: 4, fontSize: 15 }}>{dateLabel} · {venue}</p>
    </div>
  );
}

export function DesignCard({ couple, label, designName, gradient, lines }) {
  const { t } = useI18n();
  return (
    <div className="pcard" style={{ padding: 16 }}>
      <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--brand600)", marginBottom: 8 }}>
        {label}{designName ? `: ${designName}` : ""}
      </p>
      <div style={{ borderRadius: 12, padding: 24, textAlign: "center", background: gradient }}>
        <p className="serif" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".2em", color: "#292524" }}>{t("panel.weGetMarried")}</p>
        <p className="serif" style={{ marginTop: 8, fontSize: 24, color: "#1c1917" }}>{couple}</p>
        <div style={{ margin: "12px auto", height: 1, width: 64, background: "rgba(41,37,36,.3)" }} />
        {(lines || []).map((l) => (
          <p key={l} style={{ fontSize: 12, color: "#292524" }}>{l}</p>
        ))}
      </div>
      <p style={{ textAlign: "center", marginTop: 12, fontSize: 14, fontWeight: 600, color: "var(--brand700)" }}>
        {t("panel.viewShare")}
      </p>
    </div>
  );
}

export function EventDetails({ rows }) {
  const { t } = useI18n();
  return (
    <div className="pcard">
      <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("panel.eventDetails")}</h2>
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 14 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", color: "#9ca3af" }}>{r.label}</p>
            <p style={{ fontWeight: 600, color: "#1c1917" }}>{r.value}</p>
          </div>
        ))}
      </div>
      <span
        style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, border: "1px solid var(--brand300)",
          borderRadius: 999, padding: "8px 16px", fontSize: 14, fontWeight: 600, color: "var(--brand700)",
        }}
      >
        <Icon name="mapPin" size={15} /> {t("panel.viewOnMap")}
      </span>
    </div>
  );
}

export function StatCard({ label, value, color, compact }) {
  return (
    <div className="pcard" style={{ padding: compact ? 16 : 20 }}>
      <p style={{ fontSize: compact ? 13 : 14, color: "#6b7280" }}>{label}</p>
      <p className="serif" style={{ marginTop: compact ? 2 : 4, fontSize: compact ? 24 : 28, fontWeight: 700, color }}>{value}</p>
    </div>
  );
}

export function StatRow({ stats, daysLeft, compact }) {
  const { t } = useI18n();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: compact ? 12 : 16 }}>
      <StatCard label={t("panel.stats.confirmados")} value={String(stats.confirmados)} color="#16a34a" compact={compact} />
      <StatCard label={t("panel.stats.pendientes")} value={String(stats.pendientes)} color="#ca8a04" compact={compact} />
      <StatCard label={t("panel.stats.noAsisten")} value={String(stats.rechazados)} color="#ef4444" compact={compact} />
      <StatCard label={compact ? t("panel.stats.dias") : t("panel.stats.diasRestantes")} value={String(daysLeft)} color="var(--brand600)" compact={compact} />
    </div>
  );
}

export function AttendanceBar({ attending, total }) {
  const { t } = useI18n();
  const percent = total > 0 ? Math.round((attending / total) * 100) : 0;
  return (
    <div className="pcard">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 14, color: "#6b7280" }}>{t("panel.attendance.title")}</p>
          <p className="serif" style={{ fontSize: 28, fontWeight: 700, color: "#1c1917" }}>
            {attending} <span style={{ fontSize: 16, fontWeight: 400, color: "#9ca3af" }}>{t("panel.attendance.of")} {total}</span>
          </p>
        </div>
        <span style={{ fontSize: 22, fontWeight: 700, color: "var(--brand600)" }}>{percent}%</span>
      </div>
      <div style={{ marginTop: 12, height: 12, width: "100%", borderRadius: 999, background: "var(--brand100)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${percent}%`, borderRadius: 999, background: "var(--brand500)" }} />
      </div>
    </div>
  );
}

export function ShareCard({ inline }) {
  const { t } = useI18n();
  const buttons = (
    <>
      <span className="share-btn share-btn--wa">{t("panel.share.whatsapp")}</span>
      <span className="share-btn">{t("panel.share.copy")}</span>
      <span className="share-btn">{t("panel.share.qr")}</span>
    </>
  );
  if (inline) {
    return (
      <div className="pcard">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("panel.share.title")}</h2>
            <p style={{ color: "#6b7280", marginTop: 2, fontSize: 14 }}>{t("panel.share.subtitle")}</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{buttons}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="pcard" style={{ padding: 24 }}>
      <h2 className="serif" style={{ fontSize: 16, fontWeight: 700, color: "#1c1917" }}>{t("panel.share.title")}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>{buttons}</div>
    </div>
  );
}

export function UploadPermissions({ guests }) {
  const { t } = useI18n();
  const eligible = guests.filter((g) => g.status !== "rechazado");
  const [mode, setMode] = useState("activados"); // "todos" | "activados"
  const [perms, setPerms] = useState(() => Object.fromEntries(eligible.map((g) => [g.name, g.canUpload])));
  const count = Object.values(perms).filter(Boolean).length;

  return (
    <div className="pcard" style={{ borderRadius: 20, padding: 24, boxShadow: "0 6px 20px rgba(28,25,23,.06)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("panel.upload.title")}</h2>
          <p style={{ color: "#6b7280", marginTop: 2, fontSize: 13 }}>{t("panel.upload.subtitle")}</p>
        </div>
        <span style={{ flex: "none", background: "var(--gold-soft)", color: "var(--gold-deep)", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600 }}>
          {t("panel.upload.withPermission", { n: count })}
        </span>
      </div>

      <div
        style={{
          marginTop: 16, border: "1px solid var(--brand100)", borderRadius: 14,
          background: "linear-gradient(120deg,rgba(240,230,212,.4),#fff)", padding: "14px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
        }}
      >
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: "#1c1917" }}>{t("panel.upload.whoCanUpload")}</p>
          <p style={{ fontSize: 12, color: "#6b7280" }}>{t("panel.upload.changeAnytime")}</p>
        </div>
        <div className="pill-toggle">
          <button data-active={mode === "todos"} onClick={() => setMode("todos")}>{t("panel.upload.all")}</button>
          <button data-active={mode === "activados"} onClick={() => setMode("activados")}>{t("panel.upload.onlyActive")}</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }} className="perm-grid">
        {eligible.map((g) => {
          const on = mode === "todos" ? true : perms[g.name];
          const disabled = mode === "todos";
          return (
            <div
              key={g.name}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                border: "1px solid var(--brand100)", borderRadius: 12, padding: "11px 14px",
              }}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: 13, color: "#1c1917" }}>{g.name}</p>
                <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "capitalize" }}>{t(`panel.status.${g.status}`)}</p>
              </div>
              <button
                className="toggle-switch"
                data-on={on}
                aria-pressed={on}
                aria-label={t("panel.upload.allow", { name: g.name })}
                disabled={disabled}
                style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
                onClick={() => setPerms((p) => ({ ...p, [g.name]: !p[g.name] }))}
              >
                <span />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function GuestList({ guests, withFilter = true }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState("todos");
  const rows = filter === "todos" ? guests : guests.filter((g) => g.status === filter);
  const filters = ["todos", "confirmado", "pendiente", "rechazado"];

  return (
    <div className="pcard" style={{ padding: 0 }}>
      <div
        style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
          gap: 12, borderBottom: "1px solid var(--brand100)", padding: "16px 20px",
        }}
      >
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("panel.guests.title")}</h2>
        {withFilter && (
          <div style={{ display: "flex", gap: 4, border: "1px solid var(--brand200)", borderRadius: 999, padding: 4, fontSize: 12, flexWrap: "wrap" }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  border: "none", cursor: "pointer", borderRadius: 999, padding: "4px 12px", fontWeight: 600,
                  background: filter === f ? "var(--brand600)" : "transparent",
                  color: filter === f ? "#fff" : "var(--brand700)",
                }}
              >
                {f === "todos" ? t("panel.guests.filterTodos") : t(`panel.status.${f}`)}
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        {rows.map((g, i) => {
          const st = STATUS_STYLE[g.status] || STATUS_STYLE.pendiente;
          return (
            <div
              key={g.name}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                padding: "16px 20px", borderBottom: i < rows.length - 1 ? "1px solid #faf6ee" : "none",
              }}
            >
              <div>
                <p style={{ fontWeight: 600, color: "#1c1917" }}>{g.name}</p>
                <p style={{ fontSize: 12, color: "#6b7280" }}>
                  {g.companions > 0 ? t("panel.guests.companions", { n: g.companions }) : t("panel.guests.noCompanions")} · {t(`panel.channel.${g.channel}`)}
                </p>
              </div>
              <span style={{ background: st.bg, color: st.fg, borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>
                {t(`panel.status.${g.status}`)}
              </span>
            </div>
          );
        })}
        {rows.length === 0 && (
          <p style={{ padding: "24px 20px", textAlign: "center", color: "#9ca3af", fontSize: 13 }}>{t("panel.guests.empty")}</p>
        )}
      </div>
    </div>
  );
}

export function ExtraCard({ icon, title, body, meta, cta, ctaWhatsapp, href }) {
  const ctaClass = ctaWhatsapp ? "share-btn share-btn--wa" : "share-btn";
  const ctaStyle = { marginTop: 14, textAlign: "center", display: "block" };
  return (
    <div className="pcard" style={{ borderRadius: 20, padding: 22, boxShadow: "0 6px 20px rgba(28,25,23,.06)", display: "flex", flexDirection: "column" }}>
      <span
        style={{
          width: 46, height: 46, borderRadius: 14, background: "linear-gradient(140deg,#f5ecda,#e7d6b8)",
          color: "var(--gold-deep)", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <Icon name={icon} size={22} />
      </span>
      <p style={{ fontWeight: 700, fontSize: 15, color: "#1c1917", marginTop: 14 }}>{title}</p>
      <p style={{ color: "#6b7280", marginTop: 6, fontSize: 12, lineHeight: 1.5, flex: 1 }}>{body}</p>
      <p style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: "var(--brand700)" }}>{meta}</p>
      {href ? (
        <Link href={href} className={ctaClass} style={ctaStyle}>{cta}</Link>
      ) : (
        <span className={ctaClass} style={ctaStyle}>{cta}</span>
      )}
    </div>
  );
}
