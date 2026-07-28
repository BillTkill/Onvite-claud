import { AdminTitle, Kpi } from "@/components/admin/AdminShell";
import { MonthlyChart, CumulativeChart } from "@/components/admin/Charts";
import { RESUMEN_KPIS } from "@/lib/admin";
import { getResumen } from "@/lib/admin-queries";

export const metadata = { title: "Resumen · Onvite Admin" };

export default async function AdminResumenPage() {
  const r = await getResumen();
  const realKpis = [
    { label: "Clientes activos", value: String(r.clientesActivos), color: "#1c1917" },
    { label: "Nuevos este mes", value: String(r.nuevosMes), color: "#16a34a" },
    { label: "Ventas mes actual", value: r.ventasMes, color: "#1c1917" },
    { label: "Total clientes", value: String(r.totalClientes), color: "var(--brand700)" },
  ];

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
        {realKpis.map((k) => <Kpi key={k.label} {...k} />)}
      </div>
      <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
        La fila inferior refleja datos reales de tu base; los totales anuales y los gráficos son ilustrativos.
      </p>
    </>
  );
}
