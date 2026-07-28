"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useI18n } from "@/components/I18nProvider";
import LangSelect from "@/components/LangSelect";

function PlanBadge({ plan, t }) {
  if (plan === "basico")
    return <span className="plan-badge" style={{ background: "#dbeafe", color: "#1d4ed8" }}>{t("panel.planBasico")}</span>;
  if (plan === "pro")
    return <span style={{ color: "#6b7280", fontSize: 13 }}>{t("panel.planPro")}</span>;
  if (plan === "vip")
    return (
      <span className="plan-badge" style={{ background: "linear-gradient(120deg,#8a6a34,#b4894a)", color: "#fff" }}>
        ✦ {t("panel.planVip")}
      </span>
    );
  return <span className="plan-badge" style={{ background: "var(--gold-soft)", color: "var(--gold-deep)" }}>{t("panel.noPlan")}</span>;
}

export default function PanelChrome({ plan, children }) {
  const { t } = useI18n();
  return (
    <div className="panel-bg">
      <div className="panel-topbar">
        <div className="panel-topbar__inner">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/" style={{ fontSize: 13, color: "#9ca3af" }}>← {t("panel.backToSite")}</Link>
            <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--brand700)" }}>Onvite</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <PlanBadge plan={plan} t={t} />
            <LangSelect />
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{ border: "1px solid #e5e7eb", background: "#fff", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: "#4b5563", cursor: "pointer" }}
            >
              {t("panel.logout")}
            </button>
          </div>
        </div>
      </div>
      <div className="panel-main">{children}</div>
    </div>
  );
}
