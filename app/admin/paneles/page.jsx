import { AdminTitle } from "@/components/admin/AdminShell";
import PanelesEditor from "@/components/admin/PanelesEditor";
import { prisma } from "@/lib/db";
import { getServerT } from "@/lib/i18n/server";

export const metadata = { title: "Paneles · Onvite Admin" };

const pad = (n) => String(n).padStart(2, "0");
const toDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toTimeStr = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export default async function AdminPanelesPage() {
  const { t } = await getServerT();
  const users = await prisma.user.findMany({
    where: { role: "CLIENT", event: { isNot: null } }, // only users enabled from Usuarios
    orderBy: { createdAt: "desc" }, // newest first
    include: { event: true },
  });

  // Gifts for all existing events, grouped by event.
  const eventIds = users.filter((u) => u.event).map((u) => u.event.id);
  const gifts = eventIds.length
    ? await prisma.gift.findMany({ where: { eventId: { in: eventIds } }, orderBy: { createdAt: "asc" }, select: { id: true, name: true, reservedBy: true, eventId: true } })
    : [];
  const giftsByEvent = {};
  for (const g of gifts) (giftsByEvent[g.eventId] ||= []).push({ id: g.id, name: g.name, reservedBy: g.reservedBy });

  // Serialize to a plain, client-safe shape (Dates → strings).
  const items = users.map((u) => ({
    userId: u.id,
    name: u.name,
    email: u.email,
    hasAccount: true,
    event: u.event
      ? {
          id: u.event.id,
          coupleName: u.event.coupleName,
          title: u.event.title,
          date: toDateStr(u.event.dateTime),
          time: toTimeStr(u.event.dateTime),
          venue: u.event.venue,
          address: u.event.address || "",
          dressCode: u.event.dressCode || "",
          plan: u.event.plan,
          templateSlug: u.event.templateSlug || "",
          music: u.event.music || "",
          musicUrl: u.event.musicUrl || "",
          paymentQr: u.event.paymentQr || "",
          albumUrl: u.event.albumUrl || "",
          slug: u.event.slug || "",
          totalGuests: u.event.totalGuests,
          active: u.event.active,
          gifts: giftsByEvent[u.event.id] || [],
        }
      : null,
  }));

  return (
    <>
      <AdminTitle title={t("admin.paneles.title")} subtitle={t("admin.paneles.subtitle")} />
      <PanelesEditor items={items} />
    </>
  );
}
