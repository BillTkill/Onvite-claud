"use client";

import { useState } from "react";
import { AdminTitle, Badge } from "@/components/admin/AdminShell";
import Icon from "@/components/Icon";
import { ACCESOS, PLAN_BADGE } from "@/lib/admin";

const STATE_BADGE = {
  pending: { bg: "#fef9c3", fg: "#a16207" },
  active: { bg: "#dcfce7", fg: "#15803d" },
};

const PANEL_FOR_PLAN = {
  "Premium VIP": "Panel Premium VIP",
  Premium: "Panel Pro (Premium)",
  "Estándar": "Panel Básico",
};

export default function AdminAccesosPage() {
  const [rows, setRows] = useState(ACCESOS);
  const firstPending = rows.find((r) => r.stateType === "pending") || rows[0];
  const [selected, setSelected] = useState(firstPending.email);
  const [duration, setDuration] = useState("90");

  const current = rows.find((r) => r.email === selected) || firstPending;

  function enable() {
    setRows((prev) =>
      prev.map((r) =>
        r.email === selected ? { ...r, state: `Activo · ${duration} días`, stateType: "active" } : r
      )
    );
  }

  return (
    <>
      <AdminTitle
        title="Accesos y habilitación de paneles"
        subtitle="Cuando un usuario paga (por WhatsApp) le damos acceso a su panel según el plan."
      />

      <div className="admin-accesos">
        <div className="admin-card">
          <h2 className="serif admin-card__title">Solicitudes de acceso</h2>
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Usuario</th><th>Plan elegido</th><th>Estado</th><th>Acción</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.email}>
                    <td style={{ padding: "10px 0", fontWeight: 600, color: "#1c1917" }}>
                      {r.name}<br /><span style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}>{r.email}</span>
                    </td>
                    <td><Badge label={r.plan} palette={PLAN_BADGE[r.plan]} size="md" /></td>
                    <td><Badge label={r.state} palette={STATE_BADGE[r.stateType]} size="md" /></td>
                    <td>
                      {r.stateType === "pending" ? (
                        <button
                          onClick={() => setSelected(r.email)}
                          style={{ background: "var(--brand600)", color: "#fff", border: "none", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                        >
                          Dar acceso
                        </button>
                      ) : (
                        <span className="cell-select">Editar</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
            Al dar acceso, el usuario deja de ver «panel bloqueado» y su panel se carga según el plan.
          </p>
        </div>

        <div className="admin-card" style={{ border: "1px solid var(--gold)", background: "linear-gradient(160deg,rgba(240,230,212,.4),#fff)" }}>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>Dar acceso — {current.name}</h2>
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Confirmado el pago por WhatsApp, habilita y vincula su panel.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Correo verificado</p>
              <div className="access-field" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--gold-deep)" }}><Icon name="check" size={16} strokeWidth={2.5} /></span>{current.email}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Panel a habilitar</p>
              <div className="access-field" style={{ border: "1px solid var(--gold)", fontWeight: 600, display: "flex", justifyContent: "space-between" }}>
                {PANEL_FOR_PLAN[current.plan] || "Panel Básico"} <span style={{ color: "var(--brand700)" }}>▾</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>Duración del acceso</p>
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
                    {d} días
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Plantilla vinculada</p>
              <div className="access-field" style={{ display: "flex", justifyContent: "space-between" }}>
                Beach Romance (A0) <span style={{ color: "var(--brand700)" }}>▾</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Álbum de fotos</p>
              <div className="access-field" style={{ display: "flex", justifyContent: "space-between" }}>
                30 fotos / invitado · 90 días <span style={{ color: "var(--brand700)" }}>▾</span>
              </div>
            </div>
            <button
              onClick={enable}
              disabled={current.stateType === "active"}
              style={{
                background: current.stateType === "active" ? "#9ca3af" : "var(--brand600)",
                color: "#fff", border: "none", borderRadius: 999, padding: 12, fontSize: 14, fontWeight: 600,
                cursor: current.stateType === "active" ? "default" : "pointer",
              }}
            >
              {current.stateType === "active" ? "Panel habilitado ✓" : "Habilitar panel y enviar correo"}
            </button>
            <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center" }}>
              Se le enviará un correo de confirmación y podrá entrar a «Mi panel».
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
