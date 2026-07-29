const INTL = { es: "es-ES", en: "en-US", fr: "fr-FR", it: "it-IT" };

export function formatDate(date, locale = "es") {
  return new Intl.DateTimeFormat(INTL[locale] || "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatTime(date, locale = "es") {
  return new Intl.DateTimeFormat(INTL[locale] || "es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function daysUntil(date) {
  return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 86400000));
}

/**
 * Access window for a granted panel. The clock starts when the event was
 * created (≈ the grant moment) and lasts `durationDays` (60 or 90). Returns
 * days left and whether the access has expired — used to auto-lock the panel.
 */
export function accessInfo(createdAt, durationDays) {
  if (!durationDays || !createdAt) return { daysLeft: null, expired: false, durationDays: durationDays || null };
  const elapsed = Math.floor((Date.now() - new Date(createdAt).getTime()) / 86400000);
  return {
    daysLeft: Math.max(0, durationDays - elapsed),
    expired: elapsed >= durationDays,
    durationDays,
  };
}

/** URL-friendly slug from a free-text name (accents stripped). */
export function slugify(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "invitacion";
}

const RSVP = { CONFIRMADO: "confirmado", PENDIENTE: "pendiente", RECHAZADO: "rechazado" };

/** Canonical lowercase key used for filtering, styling and i18n lookups. */
export function rsvpKey(s) {
  return RSVP[s] || "pendiente";
}
