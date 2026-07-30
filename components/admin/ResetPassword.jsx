"use client";

import { useState, useTransition } from "react";
import { resetUserPassword } from "@/app/admin/actions";
import Icon from "@/components/Icon";
import { useI18n } from "@/components/I18nProvider";

/** Admin-assisted password reset: shows a one-time temporary password to relay. */
export default function ResetPassword({ userId }) {
  const { t } = useI18n();
  const [pending, start] = useTransition();
  const [temp, setTemp] = useState("");
  const [copied, setCopied] = useState(false);

  function onReset() {
    if (!window.confirm(t("admin.usuarios.resetConfirm"))) return;
    start(async () => {
      try {
        const r = await resetUserPassword(userId);
        if (r.ok) setTemp(r.temp);
      } catch {
        /* ignore */
      }
    });
  }
  function copy() {
    try { navigator.clipboard.writeText(temp); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ }
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={onReset}
        disabled={pending}
        title={t("admin.usuarios.reset")}
        aria-label={t("admin.usuarios.reset")}
        style={{ border: "1px solid var(--brand200)", background: "transparent", color: "var(--brand700)", borderRadius: 8, width: 28, height: 28, cursor: pending ? "default" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
      >
        <Icon name="key" size={14} />
      </button>
      {temp && (
        <div style={{ position: "absolute", right: 0, top: 34, zIndex: 20, background: "#fff", border: "1px solid var(--brand200)", borderRadius: 10, padding: "10px 12px", boxShadow: "0 8px 24px rgba(28,25,23,.14)", minWidth: 210 }}>
          <p style={{ fontSize: 11, color: "#6b7280" }}>{t("admin.usuarios.tempPassword")}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <code style={{ fontSize: 14, fontWeight: 700, color: "#1c1917" }}>{temp}</code>
            <button type="button" onClick={copy} className="share-btn" style={{ padding: "3px 8px", cursor: "pointer", background: "transparent" }}>{copied ? t("panel.share.copied") : t("panel.share.copy")}</button>
          </div>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>{t("admin.usuarios.tempHint")}</p>
        </div>
      )}
    </div>
  );
}
