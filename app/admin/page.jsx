import { AdminTitle, Kpi } from "@/components/admin/AdminShell";
import { MonthlyChart, CumulativeChart } from "@/components/admin/Charts";
import { RESUMEN_KPIS, RESUMEN_KPIS_2 } from "@/lib/admin";

export const metadata = { title: "Resumen · Onvite Admin" };

export default function AdminResumenPage() {
  return (
    <>
      <AdminTitle title="Resumen general" subtitle="Cómo va el negocio de un vistazo" />

      <div className="admin-kpis">
        {RESUMEN_KPIS.map((k) => <Kpi key={k.label} {...k} />)}
      </div>

      <div className="admin-2col" style={{ marginTop: 24 }}>
        <MonthlyChart />
        <CumulativeChart />
      </div>

      <div className="admin-kpis" style={{ marginTop: 24 }}>
        {RESUMEN_KPIS_2.map((k) => <Kpi key={k.label} {...k} />)}
      </div>
    </>
  );
}
