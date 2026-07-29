import { redirect } from "next/navigation";
import PanelChrome from "@/components/panel/PanelChrome";
import GiftsPanel from "@/components/panel/GiftsPanel";
import { getOwnerEventView } from "@/lib/panel-data";
import { prisma } from "@/lib/db";

export const metadata = { title: "Mesa de regalos · Onvite" };

export default async function RegalosPage() {
  const { session, view } = await getOwnerEventView();
  if (!session?.user) redirect("/login");
  if (!view) redirect("/panel");
  if (view.plan !== "pro" && view.plan !== "vip") redirect("/panel");

  const gifts = await prisma.gift.findMany({
    where: { eventId: view.eventId },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, reservedBy: true },
  });

  return (
    <PanelChrome plan={view.plan}>
      <GiftsPanel view={view} gifts={gifts} />
    </PanelChrome>
  );
}
