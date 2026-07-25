"use client";

/**
 * Lightweight client-side i18n.
 * - `locale` starts as the default (es) so SSR and first client render match,
 *   then hydrates from localStorage in an effect.
 * - `t(key, vars)` resolves a dot-path from the active dictionary, falling back
 *   to Spanish and finally to the key itself. Returns arrays/objects as-is.
 */
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { dictionaries } from "@/lib/i18n";
import { DEFAULT_LOCALE, LOCALE_CODES, STORAGE_LOCALE } from "@/lib/i18n/config";

const I18nContext = createContext(null);

function resolve(dict, key) {
  return key.split(".").reduce((acc, part) => (acc == null ? undefined : acc[part]), dict);
}

function interpolate(str, vars) {
  if (typeof str !== "string" || !vars) return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? String(vars[k]) : m));
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LOCALE);
      if (saved && LOCALE_CODES.includes(saved) && saved !== DEFAULT_LOCALE) {
        setLocaleState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next) => {
    if (!LOCALE_CODES.includes(next)) return;
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_LOCALE, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key, vars) => {
      const active = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
      let value = resolve(active, key);
      if (value === undefined) value = resolve(dictionaries[DEFAULT_LOCALE], key);
      if (value === undefined) return key;
      return typeof value === "string" ? interpolate(value, vars) : value;
    },
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
