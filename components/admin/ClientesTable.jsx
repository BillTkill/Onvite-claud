"use client";

import { useMemo, useState, useTransition } from "react";
import { setContactStatus, setPaymentStatus } from "@/app/admin/actions";
import { CONTACT_OPTIONS, PAYMENT_OPTIONS } from "@/lib/admin-display";
import { useI18n } from "@/components/I18nProvider";

export default function ClientesTable({ rows }) {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const [contacto, setContacto] = useState("Todo contacto");
  const [pago, setPago] = useState("Todo pago");
  const [pending, start] = useTransition();
  const contactLabel = (o) => t(`admin.status.contact.${o}`);
  const paymentLabel = (o) => t(`admin.status.payment.${o}`);
  // Colored status selects for a quicker visual read.
  const CONTACT_STYLE = {
    SIN_CONTACTAR: { background: "#fee2e2", color: "#b91c1c", borderColor: "#fca5a5" },
    CONTACTADO: { background: "#dbeafe", color: "#1d4ed8", borderColor: "#93c5fd" },
    CERRADO: { background: "#dcfce7", color: "#15803d", borderColor: "#86efac" },
  };
  const PAYMENT_STYLE = {
    PENDIENTE: { background: "#fee2e2", color: "#b91c1c", borderColor: "#fca5a5" },
    PAGADO: { background: "#dcfce7", color: "#15803d", borderColor: "#86efac" },
  };
  const selStyle = (p) => ({ ...p, borderWidth: 1, borderStyle: "solid", borderRadius: 999, padding: "4px 10px", fontWeight: 600, cursor: "pointer" });

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
          placeholder={t("admin.clientes.searchPh")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className="select" style={{ width: "auto", marginTop: 0 }} value={contacto} onChange={(e) => setContacto(e.target.value)}>
          <option value="Todo contacto">{t("admin.clientes.allContact")}</option>
          {CONTACT_OPTIONS.map((o) => <option key={o} value={o}>{contactLabel(o)}</option>)}
        </select>
        <select className="select" style={{ width: "auto", marginTop: 0 }} value={pago} onChange={(e) => setPago(e.target.value)}>
          <option value="Todo pago">{t("admin.clientes.allPay")}</option>
          {PAYMENT_OPTIONS.map((o) => <option key={o} value={o}>{paymentLabel(o)}</option>)}
        </select>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("admin.clientes.thName")}</th><th>{t("admin.clientes.thEvent")}</th><th>{t("admin.clientes.thDate")}</th><th>{t("admin.clientes.thPlan")}</th><th>{t("admin.clientes.thPay")}</th><th>{t("admin.clientes.thContact")}</th><th>{t("admin.clientes.thStatus")}</th><th>{t("admin.clientes.thActions")}</th>
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
                  <select className="cell-select" style={selStyle(CONTACT_STYLE[r.contact])} disabled={pending} value={r.contact} onChange={(e) => start(() => setContactStatus(r.id, e.target.value))} aria-label={t("admin.clientes.thContact")}>
                    {CONTACT_OPTIONS.map((o) => <option key={o} value={o}>{contactLabel(o)}</option>)}
                  </select>
                </td>
                <td>
                  <select className="cell-select" style={selStyle(PAYMENT_STYLE[r.status])} disabled={pending} value={r.status} onChange={(e) => start(() => setPaymentStatus(r.id, e.target.value))} aria-label={t("admin.clientes.thStatus")}>
                    {PAYMENT_OPTIONS.map((o) => <option key={o} value={o}>{paymentLabel(o)}</option>)}
                  </select>
                </td>
                <td><span className="cell-select">{t("admin.edit")}</span></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: "center", color: "#9ca3af", padding: "20px 0" }}>{t("admin.clientes.noResults")}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
        {t("admin.clientes.note")}
      </p>
    </div>
  );
}
