import ConsultasBoard from "@/components/admin/ConsultasBoard";
import { getConsultas } from "@/lib/admin-queries";

export const metadata = { title: "Consultas · Onvite Admin" };

export default async function AdminConsultasPage() {
  const items = await getConsultas();
  return <ConsultasBoard items={items} />;
}
