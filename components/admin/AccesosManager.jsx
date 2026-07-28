"use client";

import { useState, useTransition } from "react";
import { AdminTitle, Badge } from "@/components/admin/AdminShell";
import Icon from "@/components/Icon";
import { grantAccess } from "@/app/admin/actions";
import {
  planStringBadge, planStringToEnum, PANEL_FOR_ENUM,
  ACCESS_LABEL, ACCESS_BADGE,
} from "@/lib/admin-display";

export default function AccesosManager({ rows }) {
  const firstPending = rows.find((r) => r.accessState === "POR_HABILITAR") || rows[0];
  const [selected, setSelected] = useState(firstPending?.id);
  const [duration, setDuration] = useState("90");
  const [msg, setMsg] = useState(null);
  const [pending, start] = useTransition();

  const current = rows.find((r) => r.id === selected) || firstPending;

  function enable() {
    if (!current) return;
    setMsg(null);
    start(async () => {
      const res = await grantAccess(current.id, Number(duration));
      setMsg(res);
    });
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
                  <tr key={r.id}>
                    <td style={{ padding: "10px 0", fontWeight: 600, color: "#1c1917" }}>
                      {r.name}<br /><span style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}>{r.email}</span>
                    </td>
                    <td><Badge label={r.plan} palette={planStringBadge(r.plan)} size="md" /></td>
                    <td><Badge label={ACCESS_LABEL[r.accessState]} palette={ACCESS_BADGE[r.accessState]} size="md" /></td>
                    <td>
                      {r.accessState === "POR_HABILITAR" ? (
                        <button
                          onClick={() => { setSelected(r.id); setMsg(null); }}
                          style={{ background: r.id === selected ? "var(--brand700)" : "var(--brand600)", color: "#fff", border: "none", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
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
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>Dar acceso — {current?.name || "—"}</h2>
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Confirmado el pago por WhatsApp, habilita y vincula su panel.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Correo verificado</p>
              <div className="access-field" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--gold-deep)" }}><Icon name="check" size={16} strokeWidth={2.5} /></span>{current?.email || "—"}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Panel a habilitar</p>
              <div className="access-field" style={{ border: "1px solid var(--gold)", fontWeight: 600 }}>
                {PANEL_FOR_ENUM[planStringToEnum(current?.plan || "")]}
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
              <div className="access-field">{current?.templateSlug || "Beach Romance"}</div>
            </div>

            <button
              onClick={enable}
              disabled={pending || current?.accessState === "ACTIVO"}
              style={{
                background: current?.accessState === "ACTIVO" ? "#9ca3af" : "var(--brand600)",
                color: "#fff", border: "none", borderRadius: 999, padding: 12, fontSize: 14, fontWeight: 600,
                cursor: pending || current?.accessState === "ACTIVO" ? "default" : "pointer",
              }}
            >
              {current?.accessState === "ACTIVO" ? "Panel habilitado ✓" : pending ? "Habilitando…" : "Habilitar panel y enviar correo"}
            </button>

            {msg && (
              <p style={{ fontSize: 12, textAlign: "center", color: msg.ok ? "#16a34a" : "var(--danger)" }}>
                {msg.ok ? "✓ Panel habilitado. El usuario ya puede entrar a «Mi panel»." : msg.error}
              </p>
            )}
            {!msg && (
              <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center" }}>
                Se habilita su panel en la base de datos según el plan.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
