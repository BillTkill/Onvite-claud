import "server-only";
import { prisma } from "./db";

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

/* ---- Usuarios ----------------------------------------------------------- */
export async function getUsers() {
  const users = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "asc" },
    include: { event: { select: { plan: true, active: true } } },
  });
  return users.map((u) => ({
    id: u.id,
    name: u.name,
    username: `@${u.username}`,
    email: u.email,
    role: u.role,
    date: esDate(u.createdAt),
    plan: u.event && u.event.active ? u.event.plan : null, // "BASICO" | "PRO" | "VIP" | null
    hasEvent: !!u.event,
  }));
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

/* ---- Accesos ------------------------------------------------------------ */
export async function getAccesos() {
  const rows = await prisma.reservation.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    name: r.names,
    email: r.email,
    plan: r.plan || "—",
    templateSlug: r.templateSlug,
    accessState: r.accessState, // enum
  }));
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
