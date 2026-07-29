import "server-only";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { rsvpKey, accessInfo } from "@/lib/format";

/**
 * Shared loader for the couple's sub-panels (/panel/album, /panel/regalos,
 * /panel/musica). Mirrors the shape used by /panel/page.jsx so the extra
 * screens read from the same real event data.
 *
 * Returns { session, view } where view is null when the panel is locked
 * (no active event). Callers decide the redirect (login vs /panel).
 */
export async function getOwnerEventView() {
  const session = await auth();
  if (!session?.user) return { session: null, view: null };

  const event = await prisma.event.findUnique({
    where: { ownerId: session.user.id },
    include: { guests: { orderBy: { createdAt: "asc" } } },
  });

  const { expired } = accessInfo(event?.createdAt, event?.accessDurationDays);
  if (!event || !event.active || expired) return { session, view: null };

  const guests = event.guests.map((g) => ({
    id: g.id,
    name: g.name,
    companions: g.companions,
    channel: g.channel,
    status: rsvpKey(g.status),
    canUpload: g.canUpload,
  }));

  const view = {
    eventId: event.id,
    couple: event.coupleName,
    title: event.title,
    plan: event.plan.toLowerCase(), // "basico" | "pro" | "vip"
    albumPhotosPerGuest: event.albumPhotosPerGuest,
    albumDays: event.albumDays,
    music: event.music,
    musicAutoplay: event.musicAutoplay,
    templateSlug: event.templateSlug,
    guests,
  };

  return { session, view };
}
