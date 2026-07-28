"use client";

import { useTransition } from "react";
import { changeUserPlan } from "@/app/admin/actions";

export default function UserPlanSelect({ userId, plan, hasEvent }) {
  const [pending, start] = useTransition();

  if (!hasEvent) {
    return <span className="cell-select" style={{ opacity: 0.5 }}>sin evento</span>;
  }

  return (
    <select
      className="cell-select"
      disabled={pending}
      defaultValue={plan || "BASICO"}
      onChange={(e) => start(() => changeUserPlan(userId, e.target.value))}
      style={{ cursor: "pointer" }}
      aria-label="Cambiar plan"
    >
      <option value="BASICO">Básico</option>
      <option value="PRO">Pro (Premium)</option>
      <option value="VIP">Premium VIP</option>
    </select>
  );
}
