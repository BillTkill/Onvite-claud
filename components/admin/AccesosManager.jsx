"use client";

import { useState, useEffect, useTransition } from "react";
import { AdminTitle, Badge } from "@/components/admin/AdminShell";
import Icon from "@/components/Icon";
import { grantAccess } from "@/app/admin/actions";
import {
  planStringBadge, planStringToEnum,
  ACCESS_BADGE,
} from "@/lib/admin-display";
import { TEMPLATES } from "@/lib/templates";
import { useI18n } from "@/components/I18nProvider";

const PLAN_OPTIONS = ["BASICO", "PRO", "VIP"];

export default function AccesosManager({ rows }) {
  const { t } = useI18n();
  const firstPending = rows.find((r) => r.accessState === "POR_HABILITAR") || rows[0];
  const [selected, setSelected] = useState(firstPending?.userId);
  const [duration, setDuration] = useState("90");
  const [plan, setPlan] = useState("BASICO");
  const [templateSlug, setTemplateSlug] = useState(TEMPLATES[0].slug);
  const [msg, setMsg] = useState(null);
  const [pending, start] = useTransition();

  const current = rows.find((r) => r.userId === selected) || firstPending;

  // When the selected user changes, seed the plan/template with what their
  // booking suggested — the admin can still change them before enabling.
  useEffect(() => {
    if (!current) return;
    setPlan(planStringToEnum(current.plan || ""));
    setTemplateSlug(current.templateSlug || TEMPLATES[0].slug);
  }, [current?.userId]); // eslint-disable-line react-hooks/exhaustive-deps

  function enable() {
    if (!current) return;
    setMsg(null);
    start(async () => {
      const res = await grantAccess(current.userId, { durationDays: Number(duration), plan, templateSlug });
      setMsg(res);
    });
  }

  return (
    <>
      <AdminTitle
        title={t("admin.accesos.title")}
        subtitle={t("admin.accesos.subtitle")}
      />

      <div className="admin-accesos">
        <div className="admin-card">
          <h2 className="serif admin-card__title">{t("admin.accesos.requestsTitle")}</h2>
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>{t("admin.accesos.thUser")}</th><th>{t("admin.accesos.thPlanChosen")}</th><th>{t("admin.accesos.thStatus")}</th><th>{t("admin.accesos.thAction")}</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.userId}>
                    <td style={{ padding: "10px 0", fontWeight: 600, color: "#1c1917" }}>
                      {r.name}<br /><span style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}>{r.email}</span>
                    </td>
                    <td><Badge label={r.plan} palette={planStringBadge(r.plan)} size="md" /></td>
                    <td>
                      <Badge label={t(`admin.status.access.${r.accessState}`)} palette={ACCESS_BADGE[r.accessState]} size="md" />
                      {r.daysLeft != null && (
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{t("admin.accesos.daysLeft", { n: r.daysLeft })}</div>
                      )}
                    </td>
                    <td>
                      {r.accessState === "POR_HABILITAR" ? (
                        <button
                          onClick={() => { setSelected(r.userId); setMsg(null); }}
                          style={{ background: r.userId === selected ? "var(--brand700)" : "var(--brand600)", color: "#fff", border: "none", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                        >
                          {t("admin.accesos.giveAccess")}
                        </button>
                      ) : (
                        <button
                          onClick={() => { setSelected(r.userId); setMsg(null); }}
                          className="cell-select"
                          style={{ cursor: "pointer", background: r.userId === selected ? "var(--brand50)" : "transparent", border: "1px solid var(--brand200)" }}
                        >
                          {t("admin.edit")}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
            {t("admin.accesos.requestsNote")}
          </p>
        </div>

        <div className="admin-card" style={{ border: "1px solid var(--gold)", background: "linear-gradient(160deg,rgba(240,230,212,.4),#fff)" }}>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("admin.accesos.giveAccessTo", { name: current?.name || "—" })}</h2>
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{t("admin.accesos.giveAccessBody")}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{t("admin.accesos.emailVerified")}</p>
              <div className="access-field" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--gold-deep)" }}><Icon name="check" size={16} strokeWidth={2.5} /></span>{current?.email || "—"}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{t("admin.accesos.panelToEnable")}</p>
              <select
                className="access-field"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                style={{ border: "1px solid var(--gold)", fontWeight: 600, width: "100%", cursor: "pointer" }}
                aria-label={t("admin.accesos.panelToEnable")}
              >
                {PLAN_OPTIONS.map((p) => (
                  <option key={p} value={p}>{t(`admin.panelFor.${p}`)}</option>
                ))}
              </select>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>{t("admin.accesos.duration")}</p>
              <div style={{ display: "flex", gap: 8 }}>
                {["60", "90"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    style={{
                      flex: 1, textAlign: "center", borderRadius: 10, padding: 8, fontSize: 13, cursor: "pointer",
                      border: duration === d ? "2px solid var(--gold)" : "1px solid #e5e7eb",
                      background: duration === d ? "rgba(240,230,212,.4)" : "#fff",
                      fontWeight: duration === d ? 700 : 400,
                      color: duration === d ? "var(--brand700)" : "#4b5563",
                    }}
                  >
                    {t("admin.accesos.days", { n: d })}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{t("admin.accesos.linkedTemplate")}</p>
              <select
                className="access-field"
                value={templateSlug}
                onChange={(e) => setTemplateSlug(e.target.value)}
                style={{ width: "100%", cursor: "pointer" }}
                aria-label={t("admin.accesos.linkedTemplate")}
              >
                {TEMPLATES.map((tpl) => (
                  <option key={tpl.slug} value={tpl.slug}>{tpl.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={enable}
              disabled={pending}
              style={{
                background: pending ? "#9ca3af" : "var(--brand600)",
                color: "#fff", border: "none", borderRadius: 999, padding: 12, fontSize: 14, fontWeight: 600,
                cursor: pending ? "default" : "pointer",
              }}
            >
              {pending ? t("admin.accesos.enabling") : current?.accessState === "ACTIVO" ? t("admin.accesos.update") : t("admin.accesos.enable")}
            </button>

            {msg && (
              <p style={{ fontSize: 12, textAlign: "center", color: msg.ok ? "#16a34a" : "var(--danger)" }}>
                {msg.ok ? t("admin.accesos.okMsg", { name: msg.name, email: msg.email }) : msg.error}
              </p>
            )}
            {!msg && (
              <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center" }}>
                {t("admin.accesos.idleNote")}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
