"use client";

import Link from "next/link";
import Seal from "@/components/Seal";
import { useI18n } from "@/components/I18nProvider";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "var(--bg)" }}>
      <div style={{ textAlign: "center", maxWidth: 440 }}>
        <Seal size={64} style={{ margin: "0 auto" }} />
        <h1 className="serif" style={{ marginTop: 24, fontSize: 32, fontWeight: 600 }}>{t("notFound.title")}</h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 15, lineHeight: 1.6 }}>{t("notFound.body")}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-dark">{t("notFound.home")}</Link>
          <Link href="/templates" className="btn btn-outline">{t("notFound.templates")}</Link>
        </div>
      </div>
    </div>
  );
}
