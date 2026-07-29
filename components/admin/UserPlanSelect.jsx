"use client";

import { useTransition } from "react";
import { assignUserPlan } from "@/app/admin/actions";
import { useI18n } from "@/components/I18nProvider";

export default function UserPlanSelect({ userId, plan, hasEvent }) {
  const [pending, start] = useTransition();
  const { t } = useI18n();

  // Works for every user: picking a plan creates/activates the event if needed.
  return (
    <select
      className="cell-select"
      disabled={pending}
      value={plan || ""}
      onChange={(e) => { if (e.target.value) start(() => assignUserPlan(userId, e.target.value)); }}
      style={{ cursor: "pointer" }}
      aria-label={t("admin.usuarios.thChange")}
    >
      {!hasEvent && <option value="">{t("admin.usuarios.assign")}</option>}
      <option value="BASICO">{t("admin.plan.BASICO")}</option>
      <option value="PRO">{t("admin.plan.PRO")}</option>
      <option value="VIP">{t("admin.plan.VIP")}</option>
    </select>
  );
}
