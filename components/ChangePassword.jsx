"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { changeOwnPassword } from "@/app/cuenta/actions";
import { useI18n } from "@/components/I18nProvider";

export default function ChangePassword() {
  const { t } = useI18n();
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [msg, setMsg] = useState(null); // { ok, text }
  const [pending, start] = useTransition();
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    setMsg(null);
    if (form.next.length < 8) return setMsg({ ok: false, text: t("cuenta.errShort") });
    if (form.next !== form.confirm) return setMsg({ ok: false, text: t("cuenta.errMatch") });
    start(async () => {
      const res = await changeOwnPassword({ current: form.current, next: form.next });
      if (res.ok) {
        setMsg({ ok: true, text: t("cuenta.ok") });
        setForm({ current: "", next: "", confirm: "" });
      } else {
        setMsg({ ok: false, text: res.error === "wrong" ? t("cuenta.errWrong") : t("cuenta.errShort") });
      }
    });
  }

  return (
    <div className="auth-screen" style={{ flexDirection: "column", gap: 16 }}>
      <div style={{ width: "100%", maxWidth: 400, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--brand700)" }}>Onvite</Link>
        <Link href="/panel" style={{ fontSize: 13, color: "#6b7280" }}>{t("cuenta.back")}</Link>
      </div>

      <form onSubmit={submit} className="auth-card" style={{ maxWidth: 400 }}>
        <h1 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1c1917" }}>{t("cuenta.title")}</h1>
        <p style={{ color: "#6b7280", marginTop: 4, fontSize: 14 }}>{t("cuenta.subtitle")}</p>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label className="label">{t("cuenta.current")}</label>
            <input type="password" className="auth-field" value={form.current} onChange={set("current")} autoComplete="current-password" required />
          </div>
          <div>
            <label className="label">{t("cuenta.next")}</label>
            <input type="password" className="auth-field" value={form.next} onChange={set("next")} autoComplete="new-password" required />
          </div>
          <div>
            <label className="label">{t("cuenta.confirm")}</label>
            <input type="password" className="auth-field" value={form.confirm} onChange={set("confirm")} autoComplete="new-password" required />
          </div>

          {msg && (
            <p style={{ fontSize: 13, color: msg.ok ? "#16a34a" : "var(--danger)" }}>{msg.text}</p>
          )}

          <button type="submit" disabled={pending} className="btn btn-dark" style={{ marginTop: 4, padding: "12px 20px" }}>
            {pending ? t("cuenta.saving") : t("cuenta.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
