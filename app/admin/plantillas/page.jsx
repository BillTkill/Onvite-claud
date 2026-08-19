import { AdminTitle } from "@/components/admin/AdminShell";
import TemplatePagesEditor from "@/components/admin/TemplatePagesEditor";
import { getTemplatePagesAdmin } from "@/lib/template-queries";
import { getServerT } from "@/lib/i18n/server";

export const metadata = { title: "Plantillas · Onvite Admin" };

export default async function AdminPlantillasPage() {
  const { t } = await getServerT();
  const pages = await getTemplatePagesAdmin();

  return (
    <>
      <AdminTitle title={t("admin.plantillas.title")} subtitle={t("admin.plantillas.subtitle")} />
      <TemplatePagesEditor pages={pages} />
    </>
  );
}
