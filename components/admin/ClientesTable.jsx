"use client";

import { useMemo, useState, useTransition } from "react";
import { setContactStatus, setPaymentStatus } from "@/app/admin/actions";
import { CONTACT_LABEL, CONTACT_OPTIONS, PAYMENT_LABEL, PAYMENT_OPTIONS } from "@/lib/admin-display";

export default function ClientesTable({ rows }) {
  const [q, setQ] = useState("");
  const [contacto, setContacto] = useState("Todo contacto");
  const [pago, setPago] = useState("Todo pago");
  const [pending, start] = useTransition();

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
      const okQ = !term || `${r.name} ${r.city} ${r.event}`.toLowerCase().includes(term);
      const okC = contacto === "Todo contacto" || r.contact === contacto;
      const okP = pago === "Todo pago" || r.status === pago;
      return okQ && okC && okP;
    });
  }, [rows, q, contacto, pago]);

  return (
    <div className="admin-card" style={{ marginTop: 24 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <input
          className="input"
          style={{ flex: 1, minWidth: 200, marginTop: 0 }}
          placeholder="Buscar por nombre, ciudad o evento..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className="select" style={{ width: "auto", marginTop: 0 }} value={contacto} onChange={(e) => setContacto(e.target.value)}>
          <option value="Todo contacto">Todo contacto</option>
          {CONTACT_OPTIONS.map((o) => <option key={o} value={o}>{CONTACT_LABEL[o]}</option>)}
        </select>
        <select className="select" style={{ width: "auto", marginTop: 0 }} value={pago} onChange={(e) => setPago(e.target.value)}>
          <option value="Todo pago">Todo pago</option>
          {PAYMENT_OPTIONS.map((o) => <option key={o} value={o}>{PAYMENT_LABEL[o]}</option>)}
        </select>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th><th>Evento</th><th>Fecha</th><th>Plan</th><th>Pago</th><th>Contacto</th><th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} style={{ verticalAlign: "top" }}>
                <td style={{ fontWeight: 600, color: "#1c1917" }}>{r.name}</td>
                <td style={{ color: "#6b7280" }}>{r.event}<br /><span style={{ fontSize: 12, color: "#9ca3af" }}>{r.city}</span></td>
                <td style={{ color: "#6b7280" }}>{r.date}</td>
                <td style={{ color: "#6b7280" }}>{r.plan}</td>
                <td style={{ color: "#6b7280" }}>{r.pay}{r.amount && <><br /><span style={{ fontSize: 12, color: "#9ca3af" }}>{r.amount}</span></>}</td>
                <td>
                  <select className="cell-select" disabled={pending} value={r.contact} onChange={(e) => start(() => setContactStatus(r.id, e.target.value))} aria-label="Estado de contacto">
                    {CONTACT_OPTIONS.map((o) => <option key={o} value={o}>{CONTACT_LABEL[o]}</option>)}
                  </select>
                </td>
                <td>
                  <select className="cell-select" disabled={pending} value={r.status} onChange={(e) => start(() => setPaymentStatus(r.id, e.target.value))} aria-label="Estado de pago">
                    {PAYMENT_OPTIONS.map((o) => <option key={o} value={o}>{PAYMENT_LABEL[o]}</option>)}
                  </select>
                </td>
                <td><span className="cell-select">Editar</span></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: "center", color: "#9ca3af", padding: "20px 0" }}>Sin resultados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
        Los cambios de estado se guardan al instante en la base de datos.
      </p>
    </div>
  );
}
