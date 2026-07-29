import { AdminTitle, Kpi } from "@/components/admin/AdminShell";
import { MonthlyChart, CumulativeChart } from "@/components/admin/Charts";
import { getResumen } from "@/lib/admin-queries";
import { getServerT } from "@/lib/i18n/server";

export const metadata = { title: "Resumen · Onvite Admin" };

export default async function AdminResumenPage() {
  const { t } = await getServerT();
  const r = await getResumen();

  // Illustrative annual headline KPIs (sample; numbers stay, labels translate).
  const sampleKpis = [
    { label: t("admin.resumen.yearSales"), value: "Bs49.500", note: t("admin.resumen.yearSalesNote"), color: "var(--brand700)" },
    { label: t("admin.resumen.invitationsSold"), value: "132", note: t("admin.resumen.invitationsSoldNote"), color: "#1c1917" },
    { label: t("admin.resumen.avgTicket"), value: "Bs245", note: t("admin.resumen.avgTicketNote"), color: "#1c1917" },
    { label: t("admin.resumen.yearProjection"), value: "Bs96.000", note: t("admin.resumen.yearProjectionNote"), color: "#16a34a" },
  ];

  const realKpis = [
    { label: t("admin.resumen.activeClients"), value: String(r.clientesActivos), color: "#1c1917" },
    { label: t("admin.resumen.newThisMonth"), value: String(r.nuevosMes), color: "#16a34a" },
    { label: t("admin.resumen.salesThisMonth"), value: r.ventasMes, color: "#1c1917" },
    { label: t("admin.resumen.totalClients"), value: String(r.totalClientes), color: "var(--brand700)" },
  ];

  return (
    <>
      <AdminTitle title={t("admin.resumen.title")} subtitle={t("admin.resumen.subtitle")} />

      <div className="admin-kpis">
        {sampleKpis.map((k) => <Kpi key={k.label} {...k} />)}
      </div>

      <div className="admin-2col" style={{ marginTop: 24 }}>
        <MonthlyChart />
        <CumulativeChart />
      </div>

      <div className="admin-kpis" style={{ marginTop: 24 }}>
        {realKpis.map((k) => <Kpi key={k.label} {...k} />)}
      </div>
      <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
        {t("admin.resumen.note")}
      </p>
    </>
  );
}
