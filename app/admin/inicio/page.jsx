import { AdminTitle } from "@/components/admin/AdminShell";
import HomeMediaEditor from "@/components/admin/HomeMediaEditor";
import { getHomeMediaAdmin, getGalleryFeaturesAdmin } from "@/lib/admin-queries";
import { getServerT } from "@/lib/i18n/server";

export const metadata = { title: "Inicio · Onvite Admin" };

export default async function AdminInicioPage() {
  const { t } = await getServerT();
  const [media, features] = await Promise.all([getHomeMediaAdmin(), getGalleryFeaturesAdmin()]);

  return (
    <>
      <AdminTitle title={t("admin.inicio.title")} subtitle={t("admin.inicio.subtitle")} />
      <HomeMediaEditor media={media} features={features} />
    </>
  );
}
