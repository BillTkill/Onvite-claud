"use client";

import { useMemo, useState } from "react";
import { AdminTitle, Kpi } from "@/components/admin/AdminShell";
import { CLIENTES, CLIENTES_KPIS } from "@/lib/admin";

const CONTACTOS = ["Todo contacto", "Sin contactar", "Contactado", "Cerrado"];
const PAGOS = ["Todo pago", "Pagado", "Pendiente"];

export default function AdminClientesPage() {
  const [q, setQ] = useState("");
  const [contacto, setContacto] = useState("Todo contacto");
  const [pago, setPago] = useState("Todo pago");

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return CLIENTES.filter((c) => {
      const okQ = !term || `${c.name} ${c.city} ${c.event}`.toLowerCase().includes(term);
      const okC = contacto === "Todo contacto" || c.contact === contacto;
      const okP = pago === "Todo pago" || c.status === pago;
      return okQ && okC && okP;
    });
  }, [q, contacto, pago]);

  return (
    <>
      <AdminTitle
        title="Clientes (CRM)"
        subtitle="Reservas y contactos: estados, pagos y seguimiento"
        action={
          <button style={{ background: "var(--brand600)", color: "#fff", border: "none", borderRadius: 999, padding: "8px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            + Agregar contacto
          </button>
        }
      />

      <div className="admin-kpis admin-kpis--5">
        {CLIENTES_KPIS.map((k) => <Kpi key={k.label} {...k} />)}
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
          <input
            className="input"
            style={{ flex: 1, minWidth: 200, marginTop: 0 }}
            placeholder="Buscar por nombre, correo o teléfono..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="select" style={{ width: "auto", marginTop: 0 }} value={contacto} onChange={(e) => setContacto(e.target.value)}>
            {CONTACTOS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className="select" style={{ width: "auto", marginTop: 0 }} value={pago} onChange={(e) => setPago(e.target.value)}>
            {PAGOS.map((p) => <option key={p}>{p}</option>)}
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
              {rows.map((c) => (
                <tr key={c.name} style={{ verticalAlign: "top" }}>
                  <td style={{ fontWeight: 600, color: "#1c1917" }}>{c.name}</td>
                  <td style={{ color: "#6b7280" }}>{c.event}<br /><span style={{ fontSize: 12, color: "#9ca3af" }}>{c.city}</span></td>
                  <td style={{ color: "#6b7280" }}>{c.date}</td>
                  <td style={{ color: "#6b7280" }}>{c.plan}</td>
                  <td style={{ color: "#6b7280" }}>{c.pay}{c.amount && <><br /><span style={{ fontSize: 12, color: "#9ca3af" }}>{c.amount}</span></>}</td>
                  <td><span className="cell-select">{c.contact} ▾</span></td>
                  <td><span className="cell-select">{c.status} ▾</span></td>
                  <td><span className="cell-select">Editar</span></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: "center", color: "#9ca3af", padding: "20px 0" }}>Sin resultados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
          Los cambios de estado se guardan al instante. Estos datos son reales, salen de tu base de datos.
        </p>
      </div>
    </>
  );
}
