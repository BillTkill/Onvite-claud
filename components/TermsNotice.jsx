"use client";

import { useI18n } from "./I18nProvider";

/** Shows a short "available in Spanish" note when the active locale isn't ES. */
export default function TermsNotice() {
  const { locale, t } = useI18n();
  if (locale === "es") return null;
  const notice = t("terms.langNotice");
  if (!notice) return null;
  return (
    <div
      style={{
        marginTop: 20,
        border: "1px solid var(--gold)",
        background: "rgba(240,230,212,.35)",
        color: "var(--ink)",
        borderRadius: 12,
        padding: "12px 16px",
        fontSize: 13,
      }}
    >
      {notice}
    </div>
  );
}
