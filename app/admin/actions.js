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

export async function changeUserPlan(userId, plan) {
  await requireAdmin();
  const value = PlanEnum.parse(plan);
  // Only meaningful for users that already have an event; unlock/creation happens in Accesos.
  await prisma.event.updateMany({ where: { ownerId: userId }, data: { plan: value } });
  refreshAdmin();
  revalidatePath("/panel");
}

/**
 * The flagship workflow: enable a user's panel from a reservation.
 * Finds the account by email, creates/activates their Event with the chosen
 * plan, and marks the reservation as ACTIVO. Returns a small result object.
 */
export async function grantAccess(reservationId, durationDays = 90) {
  await requireAdmin();
  const duration = durationDays === 60 ? 60 : 90;

  const reservation = await prisma.reservation.findUnique({ where: { id: reservationId } });
  if (!reservation) return { ok: false, error: "Reserva no encontrada." };

  const user = await prisma.user.findUnique({ where: { email: reservation.email.toLowerCase() } });
  if (!user) {
    return { ok: false, error: "No hay una cuenta con ese correo. El cliente debe registrarse primero." };
  }

  const plan = planStringToEnum(reservation.plan || "");
  const album = plan === "VIP" ? { albumPhotosPerGuest: 30, albumDays: 90 } : { albumPhotosPerGuest: 15, albumDays: 60 };

  await prisma.event.upsert({
    where: { ownerId: user.id },
    update: { active: true, plan, accessDurationDays: duration, ...album, templateSlug: reservation.templateSlug ?? undefined },
    create: {
      ownerId: user.id,
      coupleName: reservation.names,
      title: `Evento de ${reservation.names}`,
      dateTime: reservation.eventDate ?? new Date(Date.now() + 60 * 86400000),
      venue: reservation.city || "Por definir",
      plan,
      templateSlug: reservation.templateSlug,
      active: true,
      accessDurationDays: duration,
      totalGuests: 0,
      ...album,
    },
  });

  await prisma.reservation.update({ where: { id: reservationId }, data: { accessState: "ACTIVO" } });

  refreshAdmin();
  revalidatePath("/panel");
  return { ok: true };
}
