"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

/** Returns the caller's active event, or throws. Every mutation guards with this. */
async function requireOwnerEvent() {
  const session = await auth();
  if (!session?.user) throw new Error("No autorizado");
  const event = await prisma.event.findUnique({ where: { ownerId: session.user.id } });
  if (!event) throw new Error("Sin evento");
  return event;
}

/* ---- Álbum: permisos por invitado (Guest.canUpload) --------------------- */
export async function setGuestUpload(guestId, canUpload) {
  const event = await requireOwnerEvent();
  const guest = await prisma.guest.findUnique({ where: { id: guestId }, select: { eventId: true } });
  if (!guest || guest.eventId !== event.id) throw new Error("No autorizado");
  await prisma.guest.update({ where: { id: guestId }, data: { canUpload: Boolean(canUpload) } });
  revalidatePath("/panel/album");
  revalidatePath("/panel");
}

/* ---- Mesa de regalos ---------------------------------------------------- */
export async function addGift(name) {
  const event = await requireOwnerEvent();
  const clean = z.string().trim().min(1).max(120).parse(name);
  await prisma.gift.create({ data: { eventId: event.id, name: clean } });
  revalidatePath("/panel/regalos");
}

export async function removeGift(giftId) {
  const event = await requireOwnerEvent();
  const gift = await prisma.gift.findUnique({ where: { id: giftId }, select: { eventId: true } });
  if (!gift || gift.eventId !== event.id) throw new Error("No autorizado");
  await prisma.gift.delete({ where: { id: giftId } });
  revalidatePath("/panel/regalos");
}

/* ---- Música ------------------------------------------------------------- */
export async function setMusic(song) {
  const event = await requireOwnerEvent();
  const clean = z.string().trim().min(1).max(200).parse(song);
  await prisma.event.update({ where: { id: event.id }, data: { music: clean } });
  revalidatePath("/panel/musica");
  revalidatePath("/panel");
}

export async function setMusicAutoplay(enabled) {
  const event = await requireOwnerEvent();
  await prisma.event.update({ where: { id: event.id }, data: { musicAutoplay: Boolean(enabled) } });
  revalidatePath("/panel/musica");
}
