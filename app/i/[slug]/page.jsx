import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getTemplate } from "@/lib/templates";
import InvitationView from "@/components/InvitationView";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await prisma.event.findFirst({ where: { slug }, select: { coupleName: true } });
  return { title: event ? `${event.coupleName} · Onvite` : "Invitación · Onvite" };
}

export default async function InvitationPage({ params }) {
  const { slug } = await params;
  const event = await prisma.event.findFirst({
    where: { slug, active: true },
    include: { photos: { where: { approved: true }, orderBy: { createdAt: "desc" }, take: 12 } },
  });
  if (!event) notFound();

  const tpl = getTemplate(event.templateSlug || "");
  const view = {
    slug: event.slug,
    couple: event.coupleName,
    title: event.title,
    dateISO: event.dateTime.toISOString(),
    venue: event.venue,
    address: event.address || "",
    dressCode: event.dressCode || "",
    music: event.music || "",
    gradient: tpl?.grad || "linear-gradient(160deg,#f6c79a 0%,#e8927c 52%,#2e5e6e 100%)",
    templateName: tpl?.name || event.designName || "",
    photos: event.photos.map((p) => ({ id: p.id, url: p.url })),
  };

  return <InvitationView view={view} />;
}
