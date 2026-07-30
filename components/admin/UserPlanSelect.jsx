"use client";

import { useTransition } from "react";
import { assignUserPlan, enablePanel } from "@/app/admin/actions";
import { useI18n } from "@/components/I18nProvider";

export default function UserPlanSelect({ userId, plan, hasEvent }) {
  const [pending, start] = useTransition();
  const { t } = useI18n();

  // Not enabled yet → a button that creates their (inactive) panel so they show
  // up in Paneles/Accesos. Once enabled → a plan selector.
  if (!hasEvent) {
    return (
      <button
        type="button"
        onClick={() => start(() => enablePanel(userId))}
        disabled={pending}
        style={{ background: "var(--brand600)", color: "#fff", border: "none", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: pending ? "default" : "pointer" }}
      >
        {pending ? t("admin.usuarios.enabling") : t("admin.usuarios.enable")}
      </button>
    );
  }

  return (
    <select
      className="cell-select"
      disabled={pending}
      value={plan || "BASICO"}
      onChange={(e) => { if (e.target.value) start(() => assignUserPlan(userId, e.target.value)); }}
      style={{ cursor: "pointer" }}
      aria-label={t("admin.usuarios.thChange")}
    >
      <option value="BASICO">{t("admin.plan.BASICO")}</option>
      <option value="PRO">{t("admin.plan.PRO")}</option>
      <option value="VIP">{t("admin.plan.VIP")}</option>
    </select>
  );
}
