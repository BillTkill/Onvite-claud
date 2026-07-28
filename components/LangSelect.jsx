"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { useI18n } from "./I18nProvider";
import { LOCALES } from "@/lib/i18n/config";

/** Language dropdown shared by the marketing header and the panel chrome. */
export default function LangSelect() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function esc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  return (
    <div className="lang" ref={ref}>
      <button
        className="lang__btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={t("lang.label")}
      >
        {locale.toUpperCase()} <Icon name="chevronDown" size={14} />
      </button>
      {open && (
        <ul className="menu" role="listbox" style={{ minWidth: 150 }}>
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                className="menu__item"
                role="option"
                aria-selected={l.code === locale}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
              >
                <span style={{ fontWeight: 600, width: 26 }}>{l.code.toUpperCase()}</span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
