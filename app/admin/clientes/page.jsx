import { AdminTitle, Kpi } from "@/components/admin/AdminShell";
import ClientesTable from "@/components/admin/ClientesTable";
import { getClientes } from "@/lib/admin-queries";

export const metadata = { title: "Clientes · Onvite Admin" };

export default async function AdminClientesPage() {
  const rows = await getClientes();
  const total = rows.length;
  const sinContactar = rows.filter((r) => r.contact === "SIN_CONTACTAR").length;
  const contactados = rows.filter((r) => r.contact === "CONTACTADO").length;
  const pagados = rows.filter((r) => r.status === "PAGADO").length;
  const ingresos = rows.filter((r) => r.status === "PAGADO").reduce((s, r) => s + r.amountValue, 0);

  const kpis = [
    { label: "Total contactos", value: String(total), color: "var(--brand700)" },
    { label: "Sin contactar", value: String(sinContactar), color: "#4b5563" },
    { label: "Contactados", value: String(contactados), color: "#2563eb" },
    { label: "Pagados", value: String(pagados), color: "#16a34a" },
    { label: "Ingresos", value: `Bs${ingresos}`, color: "var(--brand700)" },
  ];

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
        {kpis.map((k) => <Kpi key={k.label} {...k} />)}
      </div>
      <ClientesTable rows={rows} />
    </>
  );
}
