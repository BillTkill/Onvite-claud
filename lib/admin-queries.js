import "server-only";
import { prisma } from "./db";
import { accessInfo } from "./format";
import { planStringToEnum } from "./admin-display";

function relTime(date) {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "hace un momento";
  const m = Math.floor(s / 60);
  if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  return `hace ${d} día${d === 1 ? "" : "s"}`;
}

const esDate = (d) => (d ? new Intl.DateTimeFormat("es-ES").format(d) : "—");
const startOfMonth = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

const PLAN_LABEL = { BASICO: "Estándar", PRO: "Premium", VIP: "Premium VIP" };

/* ---- Usuarios ----------------------------------------------------------- */
export async function getUsers() {
  const [users, reservations] = await Promise.all([
    prisma.user.findMany({
      where: { role: "CLIENT" },
      orderBy: { createdAt: "desc" }, // newest first
      include: { event: { select: { plan: true, active: true } } },
    }),
    prisma.reservation.findMany({ orderBy: { createdAt: "desc" }, select: { email: true, notes: true, plan: true } }),
  ]);
  // First note / first chosen plan per email (from their booking).
  const noteByEmail = {};
  const planByEmail = {};
  for (const r of reservations) {
    if (r.notes && !noteByEmail[r.email]) noteByEmail[r.email] = r.notes;
    if (r.plan && !planByEmail[r.email]) planByEmail[r.email] = planStringToEnum(r.plan);
  }
  return users.map((u) => {
    const eventPlan = u.event ? u.event.plan : null; // assigned plan (even if not yet granted)
    const chosenPlan = planByEmail[u.email] || null; // from their booking
    return {
      id: u.id,
      name: u.name,
      username: `@${u.username}`,
      email: u.email,
      role: u.role,
      date: esDate(u.createdAt),
      plan: eventPlan || chosenPlan, // "BASICO" | "PRO" | "VIP" | null
      hasEvent: !!u.event,
      note: noteByEmail[u.email] || null,
    };
  });
}

/* ---- Clientes (CRM) ----------------------------------------------------- */
export async function getClientes() {
  const rows = await prisma.reservation.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((r) => ({
    id: r.id,
    name: r.names,
    event: r.eventType,
    city: r.city || "",
    date: esDate(r.eventDate),
    plan: r.plan || "—",
    pay: r.paymentMethod || "—",
    amount: r.amount ? `Bs${r.amount}` : "",
    amountValue: r.amount || 0,
    contact: r.contactStatus, // enum
    status: r.paymentStatus, // enum
  }));
}

/* ---- Consultas ---------------------------------------------------------- */
export async function getConsultas() {
  const rows = await prisma.consulta.findMany({ orderBy: { receivedAt: "desc" } });
  return rows.map((c) => ({
    id: c.id,
    channel: c.channel,
    from: c.fromName,
    text: c.text,
    time: relTime(c.receivedAt),
    done: c.attended,
  }));
}

/* ---- Accesos (only users enabled for a panel, i.e. that have an event) --- */
export async function getAccesos() {
  const users = await prisma.user.findMany({
    where: { role: "CLIENT", event: { isNot: null } }, // enabled from Usuarios
    orderBy: { createdAt: "desc" }, // newest first
    include: { event: true },
  });
  return users.map((u) => {
    const ev = u.event;
    const { daysLeft, expired } = accessInfo(ev.createdAt, ev.accessDurationDays);
    const accessState = ev.active ? (expired ? "EXPIRED" : "ACTIVO") : "POR_HABILITAR";
    return {
      userId: u.id,
      hasAccount: true,
      name: ev.coupleName || u.name,
      email: u.email,
      plan: PLAN_LABEL[ev.plan],
      templateSlug: ev.templateSlug || null,
      accessState,
      durationDays: ev.accessDurationDays || null,
      daysLeft: accessState === "ACTIVO" ? daysLeft : null,
    };
  });
}

/* ---- Ventas ------------------------------------------------------------- */
export async function getVentas() {
  const [paid, recent] = await Promise.all([
    prisma.reservation.findMany({ where: { paymentStatus: "PAGADO" } }),
    prisma.reservation.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
  ]);

  const byMethod = {};
  for (const r of paid) {
    if (r.paymentMethod && r.amount) byMethod[r.paymentMethod] = (byMethod[r.paymentMethod] || 0) + r.amount;
  }
  const revenue = paid.reduce((s, r) => s + (r.amount || 0), 0);

  return {
    closed: paid.length,
    revenue,
    payIncome: Object.entries(byMethod)
      .sort((a, b) => b[1] - a[1])
      .map(([method, amount]) => ({ method, amount: `Bs${amount}` })),
    lastSales: recent.map((r) => ({
      id: r.id,
      client: r.names,
      plan: r.plan || "—",
      amount: r.amount ? `Bs${r.amount}` : "—",
      pay: r.paymentMethod || "—",
      status: r.paymentStatus,
    })),
  };
}

/* ---- Resumen (footer real counts) --------------------------------------- */
export async function getResumen() {
  const som = startOfMonth();
  const [totalUsers, newThisMonth, activeEvents, paidThisMonth] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.user.count({ where: { role: "CLIENT", createdAt: { gte: som } } }),
    prisma.event.count({ where: { active: true } }),
    prisma.reservation.findMany({ where: { paymentStatus: "PAGADO", createdAt: { gte: som } }, select: { amount: true } }),
  ]);
  const monthRevenue = paidThisMonth.reduce((s, r) => s + (r.amount || 0), 0);
  return {
    clientesActivos: activeEvents,
    nuevosMes: newThisMonth,
    ventasMes: `Bs${monthRevenue}`,
    totalClientes: totalUsers,
  };
}
