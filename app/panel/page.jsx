import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import PanelChrome from "@/components/panel/PanelChrome";
import BasicPanel from "@/components/panel/BasicPanel";
import ProPanel from "@/components/panel/ProPanel";
import VipPanel from "@/components/panel/VipPanel";
import LockedPanel from "@/components/panel/LockedPanel";
import { daysUntil, rsvpKey, accessInfo } from "@/lib/format";

export const metadata = { title: "Mi panel · Onvite" };

export default async function PanelPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const event = await prisma.event.findUnique({
    where: { ownerId: session.user.id },
    include: { guests: { orderBy: { createdAt: "asc" } } },
  });

  const { expired } = accessInfo(event?.createdAt, event?.accessDurationDays);
  const active = !!event && event.active && !expired; // expired access auto-locks the panel
  const plan = active ? event.plan.toLowerCase() : null;

  let body;
  if (!active) {
    body = <LockedPanel />;
  } else {
    const guests = event.guests.map((g) => ({
      id: g.id,
      name: g.name,
      companions: g.companions,
      channel: g.channel, // raw enum, translated client-side
      status: rsvpKey(g.status), // canonical key
      canUpload: g.canUpload,
    }));
    const stats = {
      confirmados: guests.filter((g) => g.status === "confirmado").length,
      pendientes: guests.filter((g) => g.status === "pendiente").length,
      rechazados: guests.filter((g) => g.status === "rechazado").length,
    };
    const attending = event.guests
      .filter((g) => g.status === "CONFIRMADO")
      .reduce((sum, g) => sum + 1 + g.companions, 0);

    const view = {
      couple: event.coupleName,
      title: event.title,
      dateISO: event.dateTime.toISOString(),
      venue: event.venue,
      address: event.address,
      dressCode: event.dressCode,
      designName: event.designName,
      music: event.music,
      totalGuests: event.totalGuests,
      albumPhotosPerGuest: event.albumPhotosPerGuest,
      albumDays: event.albumDays,
      slug: event.slug,
      daysLeft: daysUntil(event.dateTime),
      stats,
      attending,
      guests,
    };

    body = plan === "vip" ? <VipPanel view={view} /> : plan === "pro" ? <ProPanel view={view} /> : <BasicPanel view={view} />;
  }

  return <PanelChrome plan={plan}>{body}</PanelChrome>;
}
