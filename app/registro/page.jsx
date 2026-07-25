"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useI18n } from "@/components/I18nProvider";

export default function RegistroPage() {
  const { register } = useAuth();
  const { t } = useI18n();
  const router = useRouter();

  const challenge = useMemo(() => {
    const a = 3 + Math.floor(Math.random() * 7);
    const b = 2 + Math.floor(Math.random() * 7);
    return { a, b, answer: a + b };
  }, []);

  const [form, setForm] = useState({ name: "", username: "", email: "", password: "", bot: "" });
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) {
      setError(t("register.errShortPass"));
      return;
    }
    if (Number(form.bot) !== challenge.answer) {
      setError(t("register.errBot"));
      return;
    }
    const res = register({
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    if (res.ok) router.push("/panel");
    else setError(t("register.errExists"));
  }

  return (
    <div className="auth-screen">
      <div className="auth-card" style={{ maxWidth: 420 }}>
        <p className="serif" style={{ textAlign: "center", fontSize: 26, fontWeight: 700, color: "var(--brand700)" }}>{t("register.title")}</p>
        <p style={{ textAlign: "center", color: "#6b7280", marginTop: 4, fontSize: 14 }}>{t("register.subtitle")}</p>

        <button
          type="button"
          onClick={() => setError(t("register.googleDemo"))}
          style={{
            marginTop: 24, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            border: "1px solid #d1d5db", borderRadius: 999, padding: "11px 16px", fontSize: 14, fontWeight: 600,
            color: "#374151", background: "#fff", cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 700 }}>G</span> {t("register.google")}
        </button>

        <div className="divider"><span /> {t("register.orData")} <span /></div>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input className="auth-field" placeholder={t("register.name")} value={form.name} onChange={set("name")} required />
          <input className="auth-field" placeholder={t("register.username")} value={form.username} onChange={set("username")} required />
          <input className="auth-field" type="email" placeholder={t("register.email")} autoComplete="email" value={form.email} onChange={set("email")} required />
          <input className="auth-field" type="password" placeholder={t("register.password")} autoComplete="new-password" value={form.password} onChange={set("password")} required />

          <div style={{ border: "1px solid #e5e7eb", background: "#f9fafb", borderRadius: 12, padding: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#4b5563" }}>{t("register.antibotLabel")}</p>
            <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, color: "var(--ink)" }}>{t("register.antibotQuestion", { a: challenge.a, b: challenge.b })}</span>
              <input
                className="auth-field"
                style={{ width: 80, padding: "6px 12px" }}
                inputMode="numeric"
                value={form.bot}
                onChange={set("bot")}
                aria-label={t("register.antibotLabel")}
                required
              />
            </div>
          </div>

          {error && <p className="field-error" style={{ marginTop: 0 }}>{error}</p>}

          <button type="submit" className="btn btn-gold btn-block" style={{ padding: "11px 16px", fontSize: 14, fontWeight: 600 }}>
            {t("register.submit")}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#6b7280", marginTop: 20, fontSize: 12 }}>
          {t("register.haveAccount")} <Link href="/login" style={{ fontWeight: 600, color: "var(--brand700)" }}>{t("register.loginHere")}</Link>
        </p>
        <p style={{ textAlign: "center", marginTop: 12, fontSize: 12 }}>
          <Link href="/" style={{ color: "#9ca3af" }}>{t("register.backHome")}</Link>
        </p>
      </div>
    </div>
  );
}
