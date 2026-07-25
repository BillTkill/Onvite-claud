"use client";

import { useMemo, useState } from "react";
import { AdminTitle } from "@/components/admin/AdminShell";
import { CONSULTAS, CONSULTA_CHANNELS, CONSULTA_FILTERS, CHANNEL_BADGE } from "@/lib/admin";

export default function AdminConsultasPage() {
  const [items, setItems] = useState(CONSULTAS);
  const [filter, setFilter] = useState("Todos");

  const pending = items.filter((i) => !i.done).length;
  const visible = useMemo(
    () => (filter === "Todos" ? items : items.filter((i) => i.channel === filter)),
    [items, filter]
  );

  const markDone = (idx) =>
    setItems((prev) => prev.map((it, i) => (it === visible[idx] ? { ...it, done: true } : it)));

  return (
    <>
      <AdminTitle
        title="Consultas"
        subtitle="WhatsApp, Correo, Telegram e Instagram en un solo lugar"
        action={
          <span style={{ background: "#fee2e2", color: "#dc2626", borderRadius: 999, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>
            {pending} sin atender
          </span>
        }
      />

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h2 className="serif admin-card__title" style={{ marginBottom: 8 }}>Conectar tus canales</h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>Conecta tus cuentas para que los mensajes lleguen aquí automáticamente.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CONSULTA_CHANNELS.map((c) => (
            <span key={c} className="connect-pill">+ Conectar {c}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {CONSULTA_FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-pill ${filter === f ? "filter-pill--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="admin-2col">
        {visible.map((m, idx) => (
          <div key={`${m.from}-${m.time}`} className="admin-card" style={{ padding: 20, opacity: m.done ? 0.6 : 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ background: CHANNEL_BADGE[m.channel]?.bg, color: CHANNEL_BADGE[m.channel]?.fg, borderRadius: 999, padding: "2px 8px", fontSize: 12, fontWeight: 600 }}>
                {m.channel}
              </span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{m.time}</span>
            </div>
            <p style={{ marginTop: 8, fontWeight: 600, color: "#1c1917" }}>{m.from}</p>
            <p style={{ fontSize: 14, color: "#6b7280" }}>{m.text}</p>
            {m.done ? (
              <p style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color: "#16a34a" }}>✓ Atendido</p>
            ) : (
              <button
                onClick={() => markDone(idx)}
                style={{ marginTop: 12, background: "var(--brand600)", color: "#fff", border: "none", borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                Marcar atendido
              </button>
            )}
          </div>
        ))}
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "#9ca3af" }}>
        Nota: en Fase 2 estas consultas llegan automáticamente desde las APIs de WhatsApp Business, Telegram, Instagram y el correo. Por ahora son ejemplos.
      </p>
    </>
  );
}
