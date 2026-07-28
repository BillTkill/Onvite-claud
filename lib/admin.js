/**
 * Illustrative BI data for the admin dashboards that don't map to the
 * transactional schema (annual totals, charts, social metrics). Operational
 * screens (Usuarios, Clientes, Consultas, Accesos) read from the database via
 * `lib/admin-queries.js`; Ventas/Resumen mix real tables with these samples.
 */

/* ---- Resumen (annual headline KPIs — sample) ---------------------------- */
export const RESUMEN_KPIS = [
  { label: "Ventas del año", value: "Bs49.500", note: "+28.4% vs. 2025", color: "var(--brand700)" },
  { label: "Invitaciones vendidas", value: "132", note: "118 ventas cerradas", color: "#1c1917" },
  { label: "Ticket promedio", value: "Bs245", note: "Margen 62%", color: "#1c1917" },
  { label: "Proyección anual", value: "Bs96.000", note: "según ritmo actual", color: "#16a34a" },
];

/* ---- Ventas (annual headline KPIs + accepted methods — sample) ---------- */
export const VENTAS_KPIS = [
  { label: "Ventas del año", value: "Bs49.500", color: "var(--brand700)" },
  { label: "Ventas cerradas", value: "118", color: "#1c1917" },
  { label: "Ticket promedio", value: "Bs245", color: "#1c1917" },
  { label: "Crecimiento", value: "+28.4%", note: "vs. 2025", color: "#16a34a" },
];

export const PAY_METHODS = [
  { name: "PayPal", note: "USD / EUR · Internacional" },
  { name: "Airtm", note: "USD · Internacional" },
  { name: "QR Simple (BCB)", note: "BOB · Local Bolivia" },
  { name: "Tigo Money", note: "BOB · Local Bolivia" },
  { name: "Transferencia bancaria", note: "BOB · Local Bolivia" },
];

/* ---- Redes sociales (integration dashboard — sample, "Fase 2 APIs") ----- */
export const REDES_CONNECT = ["Facebook", "Instagram", "TikTok", "YouTube", "X (Twitter)", "Telegram"];

export const REDES_KPIS = [
  { label: "Seguidores totales", value: "17.800", color: "var(--brand700)" },
  { label: "Vistas (todas)", value: "249.200", color: "#1c1917" },
  { label: "Interacciones", value: "16.810", color: "#1c1917" },
  { label: "Plataformas", value: "4", color: "#1c1917" },
];

export const REDES_NETWORKS = [
  { name: "Instagram", followers: "4.820", growth: "▲ 6.2%", note: "seguidores · 38.200 vistas", active: true },
  { name: "TikTok", followers: "9.130", growth: "▲ 14.8%", note: "seguidores · 152.000 vistas", active: false },
  { name: "Facebook", followers: "2.610", growth: "▲ 2.1%", note: "seguidores · 11.400 vistas", active: false },
  { name: "YouTube", followers: "1.240", growth: "▲ 9.5%", note: "seguidores · 47.600 vistas", active: false },
];

export const REDES_POSTS = [
  {
    title: "Diseño Noche Estelar para XV años",
    time: "hace 2 días",
    views: "8.600",
    likes: "540",
    comments: "2",
    replies: [
      { user: "@lucia.eventos", text: "¡Hermoso! ¿precio?" },
      { user: "@sofi_23", text: "Lo quiero para mi fiesta" },
    ],
  },
  {
    title: "Boda dorada - reel",
    time: "hace 5 días",
    views: "12.400",
    likes: "910",
    comments: "1",
    replies: [{ user: "@fam_torrez", text: "¿Envían a Cochabamba?" }],
  },
];
