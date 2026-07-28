"use client";

import { useState, useTransition } from "react";
import { AdminTitle } from "@/components/admin/AdminShell";
import { markConsultaAttended } from "@/app/admin/actions";
import { CHANNEL_LABEL, CHANNEL_BADGE } from "@/lib/admin-display";

const CONNECT = ["WhatsApp", "Instagram", "Telegram", "Correo", "Facebook Messenger"];
const FILTERS = ["Todos", "WHATSAPP", "CORREO", "TELEGRAM", "INSTAGRAM"];

export default function ConsultasBoard({ items }) {
  const [filter, setFilter] = useState("Todos");
  const [pending, start] = useTransition();

  const pendingCount = items.filter((i) => !i.done).length;
  const visible = filter === "Todos" ? items : items.filter((i) => i.channel === filter);

  return (
    <>
      <AdminTitle
        title="Consultas"
        subtitle="WhatsApp, Correo, Telegram e Instagram en un solo lugar"
        action={
          <span style={{ background: "#fee2e2", color: "#dc2626", borderRadius: 999, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>
            {pendingCount} sin atender
          </span>
        }
      />

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h2 className="serif admin-card__title" style={{ marginBottom: 8 }}>Conectar tus canales</h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>Conecta tus cuentas para que los mensajes lleguen aquí automáticamente.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CONNECT.map((c) => (
            <span key={c} className="connect-pill">+ Conectar {c}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {FILTERS.map((f) => (
          <button key={f} className={`filter-pill ${filter === f ? "filter-pill--active" : ""}`} onClick={() => setFilter(f)}>
            {f === "Todos" ? "Todos" : CHANNEL_LABEL[f]}
          </button>
        ))}
      </div>

      <div className="admin-2col">
        {visible.map((m) => (
          <div key={m.id} className="admin-card" style={{ padding: 20, opacity: m.done ? 0.6 : 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ background: CHANNEL_BADGE[m.channel]?.bg, color: CHANNEL_BADGE[m.channel]?.fg, borderRadius: 999, padding: "2px 8px", fontSize: 12, fontWeight: 600 }}>
                {CHANNEL_LABEL[m.channel]}
              </span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{m.time}</span>
            </div>
            <p style={{ marginTop: 8, fontWeight: 600, color: "#1c1917" }}>{m.from}</p>
            <p style={{ fontSize: 14, color: "#6b7280" }}>{m.text}</p>
            {m.done ? (
              <p style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color: "#16a34a" }}>✓ Atendido</p>
            ) : (
              <button
                disabled={pending}
                onClick={() => start(() => markConsultaAttended(m.id))}
                style={{ marginTop: 12, background: "var(--brand600)", color: "#fff", border: "none", borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                Marcar atendido
              </button>
            )}
          </div>
        ))}
        {visible.length === 0 && <p style={{ color: "#9ca3af", fontSize: 14 }}>Sin consultas en este canal.</p>}
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "#9ca3af" }}>
        Consultas reales de tu base de datos. En Fase 2 llegan automáticamente desde las APIs de WhatsApp Business, Telegram, Instagram y el correo.
      </p>
    </>
  );
}
