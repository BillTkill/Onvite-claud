/**
 * Demo event data for the couple panel (María & Carlos).
 * Values match the mockup so the panels read identically.
 */

export const EVENT = {
  couple: "María & Carlos",
  title: "Boda de María & Carlos",
  dateLabel: "19 de septiembre de 2026",
  time: "19:30 hrs",
  venue: "Salón Los Jardines",
  address: "Av. Banzer 3er anillo, Santa Cruz",
  dressCode: "Formal / Etiqueta",
  daysLeft: 58,
  totalGuests: 200,
  attending: 14,
  designName: "Dorado Clásico",
  music: "Perfect — Ed Sheeran",
};

/** Guest list used by the Pro & VIP panels. */
export const GUESTS = [
  { name: "Ana Flores", companions: 1, channel: "WhatsApp", status: "confirmado", canUpload: true },
  { name: "Luis Vargas", companions: 0, channel: "WhatsApp", status: "confirmado", canUpload: true },
  { name: "Familia Rojas", companions: 3, channel: "Correo", status: "confirmado", canUpload: true },
  { name: "Familia Suárez", companions: 4, channel: "WhatsApp", status: "confirmado", canUpload: false },
  { name: "Pedro Mamani", companions: 0, channel: "WhatsApp", status: "pendiente", canUpload: false },
  { name: "Sofía Guzmán", companions: 0, channel: "WhatsApp", status: "rechazado", canUpload: false },
  { name: "Jorge Terán", companions: 0, channel: "WhatsApp", status: "confirmado", canUpload: false },
];

export const STATUS_STYLE = {
  confirmado: { bg: "#dcfce7", fg: "#15803d", label: "confirmado" },
  pendiente: { bg: "#fef9c3", fg: "#a16207", label: "pendiente" },
  rechazado: { bg: "#fee2e2", fg: "#dc2626", label: "rechazado" },
};

/** Plan metadata shared by the panel + locked/upgrade screens. */
export const PLANS = {
  basico: { id: "basico", label: "Plan Básico", short: "Básico", price: "$18", badgeBg: "#dbeafe", badgeFg: "#1d4ed8" },
  pro: { id: "pro", label: "Plan Pro (Premium)", short: "Pro", price: "$35", badgeBg: "var(--brand100)", badgeFg: "var(--brand700)" },
  vip: { id: "vip", label: "Plan Premium VIP", short: "VIP", price: "$55", badgeBg: "linear-gradient(120deg,#8a6a34,#b4894a)", badgeFg: "#fff" },
};

export const PLAN_ORDER = ["basico", "pro", "vip"];
