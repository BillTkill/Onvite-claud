import "server-only";
import { cookies } from "next/headers";
import { dictionaries } from "@/lib/i18n";
import { DEFAULT_LOCALE, LOCALE_CODES, STORAGE_LOCALE } from "@/lib/i18n/config";

/**
 * Server-side counterpart of the client `useI18n()`. Reads the active locale
 * from the `onvite.locale` cookie (written by the LangSelect on the client) so
 * server components — like the admin pages — can render translated text.
 */
function resolve(dict, key) {
  return key.split(".").reduce((acc, part) => (acc == null ? undefined : acc[part]), dict);
}

function interpolate(str, vars) {
  if (typeof str !== "string" || !vars) return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? String(vars[k]) : m));
}

export async function getServerLocale() {
  const store = await cookies();
  const value = store.get(STORAGE_LOCALE)?.value;
  return value && LOCALE_CODES.includes(value) ? value : DEFAULT_LOCALE;
}

/** Returns `{ t, locale }`; `t(key, vars)` falls back to Spanish then the key. */
export async function getServerT() {
  const locale = await getServerLocale();
  const t = (key, vars) => {
    const active = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
    let value = resolve(active, key);
    if (value === undefined) value = resolve(dictionaries[DEFAULT_LOCALE], key);
    if (value === undefined) return key;
    return typeof value === "string" ? interpolate(value, vars) : value;
  };
  return { t, locale };
}
