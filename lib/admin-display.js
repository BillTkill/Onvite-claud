/**
 * Client-safe display maps for admin enums (labels + badge palettes).
 * No Prisma import here so client components can use it too.
 */

export const PLAN_ENUM = {
  BASICO: { label: "Básico", palette: { bg: "#dbeafe", fg: "#1d4ed8" } },
  PRO: { label: "Pro (Premium)", palette: { bg: "var(--brand100)", fg: "var(--brand700)" } },
  VIP: { label: "Premium VIP", palette: { bg: "linear-gradient(120deg,#8a6a34,#b4894a)", fg: "#fff" } },
};

export const REGISTRADO = { label: "registrado", palette: { bg: "#f3f4f6", fg: "#4b5563" } };

/** Free-form reservation plan strings → palette (fallback gray). */
export function planStringBadge(s = "") {
  const t = s.toLowerCase();
  if (t.includes("vip")) return PLAN_ENUM.VIP.palette;
  if (t.includes("premium") || t.includes("pro") || t.includes("plus") || t.includes("luxury")) return PLAN_ENUM.PRO.palette;
  if (t.includes("est") || t.includes("basico") || t.includes("standard")) return PLAN_ENUM.BASICO.palette;
  return REGISTRADO.palette;
}

export const CONTACT_LABEL = { SIN_CONTACTAR: "Sin contactar", CONTACTADO: "Contactado", CERRADO: "Cerrado" };
export const CONTACT_OPTIONS = ["SIN_CONTACTAR", "CONTACTADO", "CERRADO"];

export const PAYMENT_LABEL = { PENDIENTE: "Pendiente", PAGADO: "Pagado" };
export const PAYMENT_OPTIONS = ["PENDIENTE", "PAGADO"];
export const PAYMENT_BADGE = {
  PAGADO: { bg: "#dcfce7", fg: "#15803d" },
  PENDIENTE: { bg: "#fef9c3", fg: "#a16207" },
};

export const ACCESS_LABEL = { POR_HABILITAR: "Por habilitar", ACTIVO: "Activo", EXPIRED: "Sin acceso", NO_ACCOUNT: "Falta cuenta" };
export const ACCESS_BADGE = {
  POR_HABILITAR: { bg: "#fef9c3", fg: "#a16207" },
  ACTIVO: { bg: "#dcfce7", fg: "#15803d" },
  EXPIRED: { bg: "#fee2e2", fg: "#b91c1c" },
  NO_ACCOUNT: { bg: "#f3f4f6", fg: "#4b5563" },
};

export const CHANNEL_LABEL = {
  WHATSAPP: "WhatsApp",
  INSTAGRAM: "Instagram",
  TELEGRAM: "Telegram",
  CORREO: "Correo",
  FACEBOOK: "Facebook",
};
export const CHANNEL_BADGE = {
  WHATSAPP: { bg: "#dcfce7", fg: "#15803d" },
  INSTAGRAM: { bg: "var(--brand100)", fg: "var(--brand700)" },
  CORREO: { bg: "#dbeafe", fg: "#1d4ed8" },
  TELEGRAM: { bg: "#e0f2fe", fg: "#0369a1" },
  FACEBOOK: { bg: "#dbeafe", fg: "#1d4ed8" },
};

/** Panel label shown in the Accesos grant form. */
export const PANEL_FOR_ENUM = { BASICO: "Panel Básico", PRO: "Panel Pro (Premium)", VIP: "Panel Premium VIP" };

/** Map a free-form reservation plan string to the Event `Plan` enum. */
export function planStringToEnum(s = "") {
  const t = s.toLowerCase();
  if (t.includes("vip")) return "VIP";
  if (t.includes("premium") || t.includes("pro") || t.includes("plus") || t.includes("luxury")) return "PRO";
  return "BASICO";
}
