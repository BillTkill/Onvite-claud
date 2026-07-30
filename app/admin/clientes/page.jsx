import { AdminTitle, Kpi } from "@/components/admin/AdminShell";
import ClientesTable from "@/components/admin/ClientesTable";
import AddContact from "@/components/admin/AddContact";
import { getClientes } from "@/lib/admin-queries";
import { getServerT } from "@/lib/i18n/server";

export const metadata = { title: "Clientes · Onvite Admin" };

export default async function AdminClientesPage() {
  const { t } = await getServerT();
  const rows = await getClientes();
  const total = rows.length;
  const sinContactar = rows.filter((r) => r.contact === "SIN_CONTACTAR").length;
  const contactados = rows.filter((r) => r.contact === "CONTACTADO").length;
  const pagados = rows.filter((r) => r.status === "PAGADO").length;
  const ingresos = rows.filter((r) => r.status === "PAGADO").reduce((s, r) => s + r.amountValue, 0);

  const kpis = [
    { label: t("admin.clientes.total"), value: String(total), color: "var(--brand700)" },
    { label: t("admin.clientes.sinContactar"), value: String(sinContactar), color: "#4b5563" },
    { label: t("admin.clientes.contactados"), value: String(contactados), color: "#2563eb" },
    { label: t("admin.clientes.pagados"), value: String(pagados), color: "#16a34a" },
    { label: t("admin.clientes.ingresos"), value: `Bs${ingresos}`, color: "var(--brand700)" },
  ];

  return (
    <>
      <AdminTitle
        title={t("admin.clientes.title")}
        subtitle={t("admin.clientes.subtitle")}
        action={<AddContact />}
      />
      <div className="admin-kpis admin-kpis--5">
        {kpis.map((k) => <Kpi key={k.label} {...k} />)}
      </div>
      <ClientesTable rows={rows} />
    </>
  );
}
