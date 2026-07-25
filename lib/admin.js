/**
 * Admin demo data — mirrors the mockup's "04 · Panel de administración" screens.
 * All figures are illustrative sample data (no backend).
 */

/* ---- Shared badge palettes ---------------------------------------------- */
export const PLAN_BADGE = {
  "Premium Plus": { bg: "#dcfce7", fg: "#15803d" },
  "Premium VIP": { bg: "linear-gradient(120deg,#8a6a34,#b4894a)", fg: "#fff" },
  "Pro (Premium)": { bg: "var(--brand100)", fg: "var(--brand700)" },
  Premium: { bg: "var(--brand100)", fg: "var(--brand700)" },
  Basico: { bg: "#dbeafe", fg: "#1d4ed8" },
  "Estándar": { bg: "#dbeafe", fg: "#1d4ed8" },
  registrado: { bg: "#f3f4f6", fg: "#4b5563" },
};

export const PAY_BADGE = {
  Pagado: { bg: "#dcfce7", fg: "#15803d" },
  Pendiente: { bg: "#fef9c3", fg: "#a16207" },
};

/* ---- Resumen ------------------------------------------------------------ */
export const RESUMEN_KPIS = [
  { label: "Ventas del año", value: "Bs49.500", note: "+28.4% vs. 2025", color: "var(--brand700)" },
  { label: "Invitaciones vendidas", value: "132", note: "118 ventas cerradas", color: "#1c1917" },
  { label: "Ticket promedio", value: "Bs245", note: "Margen 62%", color: "#1c1917" },
  { label: "Proyección anual", value: "Bs96.000", note: "según ritmo actual", color: "#16a34a" },
];

export const RESUMEN_KPIS_2 = [
  { label: "Clientes activos", value: "118", color: "#1c1917" },
  { label: "Nuevos este mes", value: "14", color: "#16a34a" },
  { label: "Ventas mes actual", value: "Bs6.200", color: "#1c1917" },
  { label: "Margen promedio", value: "62%", color: "#1c1917" },
];

/* ---- Ventas ------------------------------------------------------------- */
export const VENTAS_KPIS = [
  { label: "Ventas del año", value: "Bs49.500", color: "var(--brand700)" },
  { label: "Ventas cerradas", value: "118", color: "#1c1917" },
  { label: "Ticket promedio", value: "Bs245", color: "#1c1917" },
  { label: "Crecimiento", value: "+28.4%", note: "vs. 2025", color: "#16a34a" },
];

export const PAY_INCOME = [
  { method: "PayPal", amount: "Bs1.009" },
  { method: "QR Simple", amount: "Bs125" },
  { method: "Airtm", amount: "Bs383" },
  { method: "Transferencia", amount: "Bs243" },
];

export const PAY_METHODS = [
  { name: "PayPal", note: "USD / EUR · Internacional" },
  { name: "Airtm", note: "USD · Internacional" },
  { name: "QR Simple (BCB)", note: "BOB · Local Bolivia" },
  { name: "Tigo Money", note: "BOB · Local Bolivia" },
  { name: "Transferencia bancaria", note: "BOB · Local Bolivia" },
];

export const LAST_SALES = [
  { client: "María & Carlos", plan: "Pro", amount: "Bs243", pay: "PayPal", status: "Pagado" },
  { client: "Familia Gutiérrez", plan: "Básico", amount: "Bs125", pay: "QR Simple", status: "Pagado" },
  { client: "Valentina R.", plan: "Premium Plus", amount: "Bs383", pay: "Airtm", status: "Pagado" },
  { client: "Diego & Laura", plan: "Pro", amount: "Bs243", pay: "PayPal", status: "Pendiente" },
  { client: "Prom. 2026 Col. San José", plan: "Pro", amount: "Bs243", pay: "Transferencia", status: "Pagado" },
];

/* ---- Usuarios ----------------------------------------------------------- */
export const USUARIOS_KPIS = [
  { label: "Total registrados", value: "12", color: "var(--brand700)" },
  { label: "Solo registrados", value: "6", note: "sin comprar", color: "#1c1917" },
  { label: "Básico", value: "2", color: "#2563eb" },
  { label: "Pro (Premium)", value: "3", color: "var(--brand700)" },
  { label: "Premium Plus", value: "1", color: "#16a34a" },
];

export const USERS = [
  { name: "Rosa & Fernando", user: "@rosaf", email: "rosaf@mail.com", date: "23/7/2026", plan: "Premium Plus" },
  { name: "Diego & Laura", user: "@diegolaura", email: "diegolaura@mail.com", date: "23/7/2026", plan: "Pro (Premium)" },
  { name: "Valentina R.", user: "@valen", email: "valen@mail.com", date: "23/7/2026", plan: "Pro (Premium)" },
  { name: "Marco Ortiz", user: "@marcoo", email: "marco2@mail.com", date: "23/7/2026", plan: "Basico" },
  { name: "Carla Nunez", user: "@carlan", email: "carla@mail.com", date: "23/7/2026", plan: "Basico" },
  { name: "Ana Castro", user: "@anac", email: "ana@mail.com", date: "23/7/2026", plan: "registrado" },
  { name: "Maria Fernandez", user: "@maria", email: "maria@mail.com", date: "23/7/2026", plan: "Pro (Premium)" },
];

/* ---- Clientes (CRM) ----------------------------------------------------- */
export const CLIENTES_KPIS = [
  { label: "Total contactos", value: "4", color: "var(--brand700)" },
  { label: "Sin contactar", value: "1", color: "#4b5563" },
  { label: "Contactados", value: "2", color: "#2563eb" },
  { label: "Pagados", value: "1", color: "#16a34a" },
  { label: "Ingresos", value: "Bs243", color: "var(--brand700)" },
];

export const CLIENTES = [
  { name: "María & Carlos", event: "Boda", city: "Santa Cruz", date: "19/9/2026", plan: "Pro (Premium)", pay: "PayPal", amount: "Bs243", contact: "Cerrado", status: "Pagado" },
  { name: "Valentina R.", event: "XV Años", city: "Cochabamba", date: "11/10/2026", plan: "Premium Plus", pay: "Airtm", amount: "Bs383", contact: "Contactado", status: "Pendiente" },
  { name: "Diego & Laura", event: "Compromiso", city: "La Paz", date: "1/11/2026", plan: "Pro (Premium)", pay: "—", amount: "", contact: "Sin contactar", status: "Pendiente" },
  { name: "Familia Choque", event: "Bautizo", city: "El Alto", date: "20/8/2026", plan: "Basico", pay: "Tigo Money", amount: "Bs104", contact: "Contactado", status: "Pendiente" },
];

/* ---- Consultas ---------------------------------------------------------- */
export const CHANNEL_BADGE = {
  WhatsApp: { bg: "#dcfce7", fg: "#15803d" },
  Instagram: { bg: "var(--brand100)", fg: "var(--brand700)" },
  Correo: { bg: "#dbeafe", fg: "#1d4ed8" },
  Telegram: { bg: "#e0f2fe", fg: "#0369a1" },
};

export const CONSULTA_CHANNELS = ["WhatsApp", "Instagram", "Telegram", "Correo", "Facebook Messenger"];
export const CONSULTA_FILTERS = ["Todos", "WhatsApp", "Correo", "Telegram", "Instagram"];

export const CONSULTAS = [
  { channel: "WhatsApp", from: "Rosa Aguilar", text: "¿Tienen diseños para boda en la playa?", time: "hace 12 min", done: false },
  { channel: "Instagram", from: "@lucia.eventos", text: "Me encantó Noche Estelar, ¿precio?", time: "hace 25 min", done: false },
  { channel: "Correo", from: "empresa.eventos@mail.com", text: "Cotización para 3 eventos corporativos", time: "hace 40 min", done: false },
  { channel: "Telegram", from: "@jhon_dev", text: "¿El plan Pro incluye mapa?", time: "hace 2 h", done: false },
  { channel: "WhatsApp", from: "Marcelo Vaca", text: "Quiero el diseño Dorado Clásico", time: "hace 3 h", done: true },
  { channel: "Instagram", from: "@fam_torrez", text: "¿Hacen invitaciones para bautizo?", time: "hace 4 h", done: true },
];

/* ---- Redes -------------------------------------------------------------- */
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

/* ---- Accesos ------------------------------------------------------------ */
export const ACCESOS = [
  { name: "María & Carlos", email: "maria@mail.com", plan: "Premium VIP", state: "Por habilitar", stateType: "pending" },
  { name: "Valentina R.", email: "valen@mail.com", plan: "Premium", state: "Activo · 52 días", stateType: "active" },
  { name: "Diego & Laura", email: "diegolaura@mail.com", plan: "Estándar", state: "Por habilitar", stateType: "pending" },
];
