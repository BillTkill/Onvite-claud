"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { planStringToEnum } from "@/lib/admin-display";

/** Every admin mutation goes through this guard first. */
async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("No autorizado");
}

function refreshAdmin() {
  revalidatePath("/admin", "layout");
}

const ContactEnum = z.enum(["SIN_CONTACTAR", "CONTACTADO", "CERRADO"]);
const PaymentEnum = z.enum(["PENDIENTE", "PAGADO"]);
const PlanEnum = z.enum(["BASICO", "PRO", "VIP"]);

export async function setContactStatus(id, status) {
  await requireAdmin();
  const value = ContactEnum.parse(status);
  await prisma.reservation.update({ where: { id }, data: { contactStatus: value } });
  refreshAdmin();
}

export async function setPaymentStatus(id, status) {
  await requireAdmin();
  const value = PaymentEnum.parse(status);
  await prisma.reservation.update({ where: { id }, data: { paymentStatus: value } });
  refreshAdmin();
}

export async function markConsultaAttended(id) {
  await requireAdmin();
  await prisma.consulta.update({ where: { id }, data: { attended: true } });
  refreshAdmin();
}

const NETWORKS = ["facebook", "instagram", "tiktok", "youtube", "x", "telegram"];

/**
 * Toggle a social network connection. For now this only persists the
 * connected flag (demo). Real OAuth + metrics use each platform's API with the
 * keys documented in .env.example / docs/redes-integraciones.md.
 */
export async function setSocialConnected(network, connected) {
  await requireAdmin();
  if (!NETWORKS.includes(network)) throw new Error("Red no válida");
  await prisma.socialConnection.upsert({
    where: { network },
    update: { connected: Boolean(connected) },
    create: { network, connected: Boolean(connected) },
  });
  revalidatePath("/admin/redes");
}

export async function changeUserPlan(userId, plan) {
  await requireAdmin();
  const value = PlanEnum.parse(plan);
  // Only meaningful for users that already have an event; unlock/creation happens in Accesos.
  await prisma.event.updateMany({ where: { ownerId: userId }, data: { plan: value } });
  refreshAdmin();
  revalidatePath("/panel");
}

/**
 * Assign a plan to ANY user from the Usuarios screen. If the user has no event
 * yet, it creates and activates one with that plan (so every account can get a
 * plan directly, not only through Accesos).
 */
export async function assignUserPlan(userId, plan) {
  await requireAdmin();
  const value = PlanEnum.parse(plan);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("Usuario no encontrado");
  const album = value === "VIP" ? { albumPhotosPerGuest: 30, albumDays: 90 } : { albumPhotosPerGuest: 15, albumDays: 60 };
  await prisma.event.upsert({
    where: { ownerId: userId },
    update: { plan: value, active: true, ...album },
    create: {
      ownerId: userId,
      coupleName: user.name,
      title: `Evento de ${user.name}`,
      dateTime: new Date(Date.now() + 60 * 86400000),
      venue: "Por definir",
      plan: value,
      active: true,
      accessDurationDays: 90,
      totalGuests: 0,
      ...album,
    },
  });
  refreshAdmin();
  revalidatePath("/panel");
}

/**
 * The flagship workflow: enable a user's panel from a reservation.
 * Finds the account by email, creates/activates their Event with the chosen
 * plan, and marks the reservation as ACTIVO. Returns a small result object.
 */
export async function grantAccess(userId, opts = {}) {
  await requireAdmin();
  const o = typeof opts === "number" ? { durationDays: opts } : opts;
  const duration = o.durationDays === 60 ? 60 : 90;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { ok: false, error: "Usuario no encontrado." };

  // The client's latest booking (if any) fills in defaults when creating.
  const reservation = await prisma.reservation.findFirst({
    where: { email: user.email },
    orderBy: { createdAt: "desc" },
  });

  // Admin explicitly chooses the panel (plan) and the linked template; fall back
  // to what the booking suggested if not provided.
  const plan = ["BASICO", "PRO", "VIP"].includes(o.plan) ? o.plan : planStringToEnum(reservation?.plan || "");
  const templateSlug = o.templateSlug || reservation?.templateSlug || null;
  const album = plan === "VIP" ? { albumPhotosPerGuest: 30, albumDays: 90 } : { albumPhotosPerGuest: 15, albumDays: 60 };

  await prisma.event.upsert({
    where: { ownerId: user.id },
    update: { active: true, plan, accessDurationDays: duration, ...album, templateSlug: templateSlug ?? undefined },
    create: {
      ownerId: user.id,
      coupleName: reservation?.names || user.name,
      title: `Evento de ${reservation?.names || user.name}`,
      dateTime: reservation?.eventDate ?? new Date(Date.now() + 60 * 86400000),
      venue: reservation?.city || "Por definir",
      plan,
      templateSlug,
      active: true,
      accessDurationDays: duration,
      totalGuests: 0,
      ...album,
    },
  });

  // Mark all of the client's bookings (linked by email) as enabled.
  await prisma.reservation.updateMany({ where: { email: user.email }, data: { accessState: "ACTIVO" } });

  refreshAdmin();
  revalidatePath("/panel");
  return { ok: true, name: user.name, email: user.email };
}

/* ---- Editor de paneles (admin edita el evento del usuario) --------------- */

function albumForPlan(plan) {
  return plan === "VIP" ? { albumPhotosPerGuest: 30, albumDays: 90 } : { albumPhotosPerGuest: 15, albumDays: 60 };
}

/** Create (and activate) an empty event for a user that doesn't have one yet. */
export async function createEventForUser(userId, plan = "BASICO") {
  await requireAdmin();
  const value = PlanEnum.parse(plan);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { ok: false, error: "Usuario no encontrado." };
  const existing = await prisma.event.findUnique({ where: { ownerId: userId } });
  if (existing) return { ok: false, error: "El usuario ya tiene un panel." };

  await prisma.event.create({
    data: {
      ownerId: userId,
      coupleName: user.name,
      title: `Evento de ${user.name}`,
      dateTime: new Date(Date.now() + 60 * 86400000),
      venue: "Por definir",
      plan: value,
      active: true,
      accessDurationDays: 90,
      totalGuests: 0,
      ...albumForPlan(value),
    },
  });
  refreshAdmin();
  revalidatePath("/panel");
  return { ok: true };
}

const EventEditSchema = z.object({
  coupleName: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(160),
  date: z.string().optional(),        // yyyy-mm-dd
  time: z.string().optional(),        // HH:mm
  venue: z.string().trim().min(1).max(160),
  address: z.string().trim().max(240).optional().or(z.literal("")),
  dressCode: z.string().trim().max(120).optional().or(z.literal("")),
  plan: PlanEnum,
  templateSlug: z.string().trim().max(80).optional().or(z.literal("")),
  music: z.string().trim().max(200).optional().or(z.literal("")),
  totalGuests: z.coerce.number().int().min(0).max(100000).optional(),
});

/** Update all editable fields of a user's event from the admin panel editor. */
export async function updateEvent(eventId, raw) {
  await requireAdmin();
  const data = EventEditSchema.parse(raw);

  const event = await prisma.event.findUnique({ where: { id: eventId }, select: { id: true, dateTime: true } });
  if (!event) return { ok: false, error: "Panel no encontrado." };

  // Combine date + time into a single DateTime, keeping the old one as fallback.
  let dateTime = event.dateTime;
  if (data.date) {
    const iso = `${data.date}T${data.time && /^\d{2}:\d{2}$/.test(data.time) ? data.time : "19:00"}:00`;
    const parsed = new Date(iso);
    if (!isNaN(parsed.getTime())) dateTime = parsed;
  }

  await prisma.event.update({
    where: { id: eventId },
    data: {
      coupleName: data.coupleName,
      title: data.title,
      dateTime,
      venue: data.venue,
      address: data.address || null,
      dressCode: data.dressCode || null,
      plan: data.plan,
      templateSlug: data.templateSlug || null,
      music: data.music || null,
      totalGuests: data.totalGuests ?? undefined,
      ...albumForPlan(data.plan),
    },
  });

  refreshAdmin();
  revalidatePath("/panel");
  return { ok: true };
}
