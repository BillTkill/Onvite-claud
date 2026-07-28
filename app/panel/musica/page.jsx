import { redirect } from "next/navigation";
import PanelChrome from "@/components/panel/PanelChrome";
import MusicPanel from "@/components/panel/MusicPanel";
import { getOwnerEventView } from "@/lib/panel-data";

export const metadata = { title: "Música de fondo · Onvite" };

export default async function MusicaPage() {
  const { session, view } = await getOwnerEventView();
  if (!session?.user) redirect("/login");
  if (!view) redirect("/panel");
  if (view.plan !== "vip") redirect("/panel"); // Música is a VIP-only extra

  return (
    <PanelChrome plan={view.plan}>
      <MusicPanel view={view} />
    </PanelChrome>
  );
}
