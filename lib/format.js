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

const RSVP = { CONFIRMADO: "confirmado", PENDIENTE: "pendiente", RECHAZADO: "rechazado" };

/** Canonical lowercase key used for filtering, styling and i18n lookups. */
export function rsvpKey(s) {
  return RSVP[s] || "pendiente";
}
