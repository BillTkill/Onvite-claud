export const LOCALES = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
];

export const LOCALE_CODES = LOCALES.map((l) => l.code);
export const DEFAULT_LOCALE = "es";
export const STORAGE_LOCALE = "onvite.locale";
