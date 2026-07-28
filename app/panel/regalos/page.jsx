import { redirect } from "next/navigation";
import PanelChrome from "@/components/panel/PanelChrome";
import GiftsPanel from "@/components/panel/GiftsPanel";
import { getOwnerEventView } from "@/lib/panel-data";

export const metadata = { title: "Mesa de regalos · Onvite" };

export default async function RegalosPage() {
  const { session, view } = await getOwnerEventView();
  if (!session?.user) redirect("/login");
  if (!view) redirect("/panel");
  if (view.plan !== "pro" && view.plan !== "vip") redirect("/panel");

  return (
    <PanelChrome plan={view.plan}>
      <GiftsPanel view={view} />
    </PanelChrome>
  );
}
