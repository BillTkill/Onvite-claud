import { redirect } from "next/navigation";
import PanelChrome from "@/components/panel/PanelChrome";
import AlbumPanel from "@/components/panel/AlbumPanel";
import { getOwnerEventView } from "@/lib/panel-data";

export const metadata = { title: "Álbum de fotos · Onvite" };

export default async function AlbumPage() {
  const { session, view } = await getOwnerEventView();
  if (!session?.user) redirect("/login");
  if (!view) redirect("/panel"); // locked panel
  if (view.plan !== "pro" && view.plan !== "vip") redirect("/panel"); // Básico has no album

  return (
    <PanelChrome plan={view.plan}>
      <AlbumPanel view={view} />
    </PanelChrome>
  );
}
