"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import BasicPanel from "@/components/panel/BasicPanel";
import ProPanel from "@/components/panel/ProPanel";
import VipPanel from "@/components/panel/VipPanel";
import LockedPanel from "@/components/panel/LockedPanel";

const DEMO_STATES = [
  { value: null, label: "Bloqueado" },
  { value: "basico", label: "Básico" },
  { value: "pro", label: "Pro" },
  { value: "vip", label: "VIP" },
];

function PlanBadge({ plan }) {
  if (plan === "basico")
    return <span className="plan-badge" style={{ background: "#dbeafe", color: "#1d4ed8" }}>Plan Básico</span>;
  if (plan === "pro")
    return <span style={{ color: "#6b7280", fontSize: 13 }}>Plan Pro (Premium)</span>;
  if (plan === "vip")
    return (
      <span className="plan-badge" style={{ background: "linear-gradient(120deg,#8a6a34,#b4894a)", color: "#fff" }}>
        ✦ Plan Premium VIP
      </span>
    );
  return <span className="plan-badge" style={{ background: "var(--gold-soft)", color: "var(--gold-deep)" }}>Sin plan activo</span>;
}

export default function PanelPage() {
  const { user, ready, logout, setPlan } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="panel-bg" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--brand600)", fontSize: 15 }}>Cargando panel…</p>
      </div>
    );
  }

  const plan = user.plan;

  return (
    <div className="panel-bg">
      <div className="panel-topbar">
        <div className="panel-topbar__inner">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/" style={{ fontSize: 13, color: "#9ca3af" }}>← Volver al sitio</Link>
            <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--brand700)" }}>Onvite</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <PlanBadge plan={plan} />
            <button
              onClick={logout}
              style={{ border: "1px solid #e5e7eb", background: "#fff", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: "#4b5563", cursor: "pointer" }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Demo control: preview each panel state without switching accounts. */}
        <div className="panel-topbar__inner" style={{ paddingTop: 0, paddingBottom: 12 }}>
          <span style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".08em" }}>Vista demo</span>
          <div className="pill-toggle" role="group" aria-label="Vista demo del panel">
            {DEMO_STATES.map((s) => (
              <button key={s.label} data-active={plan === s.value} onClick={() => setPlan(s.value)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel-main">
        {plan === "basico" && <BasicPanel onUpgrade={() => setPlan("pro")} />}
        {plan === "pro" && <ProPanel />}
        {plan === "vip" && <VipPanel />}
        {!plan && <LockedPanel />}
      </div>
    </div>
  );
}
