import { AdminTitle, Kpi, Badge } from "@/components/admin/AdminShell";
import { RevenueBars } from "@/components/admin/Charts";
import { PAY_METHODS } from "@/lib/admin";
import { PAYMENT_BADGE } from "@/lib/admin-display";
import { getVentas } from "@/lib/admin-queries";
import { getServerT } from "@/lib/i18n/server";

export const metadata = { title: "Ventas · Onvite Admin" };

export default async function AdminVentasPage() {
  const { t } = await getServerT();
  const v = await getVentas();

  // Illustrative annual headline KPIs (sample values, translated labels).
  const kpis = [
    { label: t("admin.ventas.yearSales"), value: "Bs49.500", color: "var(--brand700)" },
    { label: t("admin.ventas.closedSales"), value: "118", color: "#1c1917" },
    { label: t("admin.ventas.avgTicket"), value: "Bs245", color: "#1c1917" },
    { label: t("admin.ventas.growth"), value: "+28.4%", note: t("admin.ventas.growthNote"), color: "#16a34a" },
  ];

  return (
    <>
      <AdminTitle title={t("admin.ventas.title")} subtitle={t("admin.ventas.subtitle")} />

      <div className="admin-kpis">
        {kpis.map((k) => <Kpi key={k.label} {...k} />)}
      </div>

      <div style={{ marginTop: 24 }}>
        <RevenueBars />
      </div>

      <div className="admin-2col" style={{ marginTop: 24 }}>
        <div className="admin-card">
          <h2 className="serif admin-card__title">{t("admin.ventas.incomeByMethod")}</h2>
          {v.payIncome.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
              {v.payIncome.map((p) => (
                <div key={p.method} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ flex: 1, color: "#374151" }}>{p.method}</span>
                  <span style={{ fontWeight: 600, color: "#1c1917" }}>{p.amount}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#9ca3af", fontSize: 14 }}>{t("admin.ventas.noPayments")}</p>
          )}
        </div>
        <div className="admin-card">
          <h2 className="serif admin-card__title">{t("admin.ventas.acceptedMethods")}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PAY_METHODS.map((m) => (
              <div key={m.name} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "8px 12px" }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#1c1917" }}>{m.name}</p>
                <p style={{ fontSize: 12, color: "#6b7280" }}>{m.currency} · {t(`admin.region.${m.region}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <h2 className="serif admin-card__title">{t("admin.ventas.lastSales")}</h2>
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>{t("admin.ventas.thClient")}</th><th>{t("admin.ventas.thPlan")}</th><th>{t("admin.ventas.thAmount")}</th><th>{t("admin.ventas.thPay")}</th><th>{t("admin.ventas.thStatus")}</th></tr>
            </thead>
            <tbody>
              {v.lastSales.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600, color: "#1c1917" }}>{s.client}</td>
                  <td style={{ color: "#6b7280" }}>{s.plan}</td>
                  <td style={{ color: "#6b7280" }}>{s.amount}</td>
                  <td style={{ color: "#6b7280" }}>{s.pay}</td>
                  <td><Badge label={t(`admin.status.payment.${s.status}`)} palette={PAYMENT_BADGE[s.status]} /></td>
                </tr>
              ))}
              {v.lastSales.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: "center", color: "#9ca3af", padding: "20px 0" }}>{t("admin.ventas.noSales")}</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
          {t("admin.ventas.note")}
        </p>
      </div>
    </>
  );
}
