import AccesosManager from "@/components/admin/AccesosManager";
import { getAccesos } from "@/lib/admin-queries";

export const metadata = { title: "Accesos · Onvite Admin" };

export default async function AdminAccesosPage() {
  const rows = await getAccesos();
  return <AccesosManager rows={rows} />;
}
