"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useI18n } from "@/components/I18nProvider";

export default function BookSuccessPage() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 560 }}>
        <div
          style={{
            border: "1px solid var(--border)", background: "var(--surface)", borderRadius: 24,
            padding: "64px 40px", textAlign: "center", boxShadow: "0 8px 24px rgba(28,25,23,.08)",
          }}
        >
          <span style={{ color: "var(--success)", display: "inline-block" }}>
            <Icon name="checkCircle" size={48} />
          </span>
          <h1 className="serif" style={{ marginTop: 24, fontSize: 32, fontWeight: 600 }}>{t("bookSuccess.title")}</h1>
          <p style={{ color: "var(--ink-soft)", marginTop: 16, fontSize: 15, lineHeight: 1.6 }}>{t("bookSuccess.body")}</p>
          <Link href="/" className="btn btn-dark" style={{ marginTop: 36 }}>{t("bookSuccess.backHome")}</Link>
        </div>
      </div>
    </section>
  );
}
