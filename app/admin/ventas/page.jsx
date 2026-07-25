import { AdminTitle, Kpi, Badge } from "@/components/admin/AdminShell";
import { RevenueBars } from "@/components/admin/Charts";
import { VENTAS_KPIS, PAY_INCOME, PAY_METHODS, LAST_SALES, PAY_BADGE } from "@/lib/admin";

export const metadata = { title: "Ventas · Onvite Admin" };

export default function AdminVentasPage() {
  return (
    <>
      <AdminTitle title="Ventas" subtitle="Ingresos, métodos de pago y detalle" />

      <div className="admin-kpis">
        {VENTAS_KPIS.map((k) => <Kpi key={k.label} {...k} />)}
      </div>

      <div style={{ marginTop: 24 }}>
        <RevenueBars />
      </div>

      <div className="admin-2col" style={{ marginTop: 24 }}>
        <div className="admin-card">
          <h2 className="serif admin-card__title">Ingresos por método de pago</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
            {PAY_INCOME.map((p) => (
              <div key={p.method} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ flex: 1, color: "#374151" }}>{p.method}</span>
                <span style={{ fontWeight: 600, color: "#1c1917" }}>{p.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="admin-card">
          <h2 className="serif admin-card__title">Métodos de pago aceptados</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PAY_METHODS.map((m) => (
              <div key={m.name} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "8px 12px" }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#1c1917" }}>{m.name}</p>
                <p style={{ fontSize: 12, color: "#6b7280" }}>{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <h2 className="serif admin-card__title">Últimas ventas</h2>
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th><th>Plan</th><th>Monto</th><th>Pago</th><th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {LAST_SALES.map((s) => (
                <tr key={s.client}>
                  <td style={{ fontWeight: 600, color: "#1c1917" }}>{s.client}</td>
                  <td style={{ color: "#6b7280" }}>{s.plan}</td>
                  <td style={{ color: "#6b7280" }}>{s.amount}</td>
                  <td style={{ color: "#6b7280" }}>{s.pay}</td>
                  <td><Badge label={s.status} palette={PAY_BADGE[s.status]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
