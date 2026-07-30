"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

const schema = z.object({
  current: z.string().min(1),
  next: z.string().min(8).max(200),
});

/** Logged-in user changes their own password (verifies the current one first). */
export async function changeOwnPassword(raw) {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "auth" };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "short" };

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { ok: false, error: "auth" };

  const ok = await bcrypt.compare(parsed.data.current, user.passwordHash);
  if (!ok) return { ok: false, error: "wrong" };

  const passwordHash = await bcrypt.hash(parsed.data.next, 12);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
  return { ok: true };
}
