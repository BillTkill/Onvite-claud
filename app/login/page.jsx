"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useI18n } from "@/components/I18nProvider";

const DEMO = [
  { email: "admin@onvite.com", password: "Admin123!" },
  { email: "maria@mail.com", password: "Cliente123!" },
];

export default function LoginPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setPending(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) {
      setError(t("login.errorCreds"));
      setPending(false);
      return;
    }
    const session = await getSession();
    router.push(session?.user?.role === "ADMIN" ? "/admin" : "/panel");
    router.refresh();
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <p className="serif" style={{ textAlign: "center", fontSize: 26, fontWeight: 700, color: "var(--brand700)" }}>{t("login.title")}</p>
        <p style={{ textAlign: "center", color: "#6b7280", marginTop: 4, fontSize: 14 }}>{t("login.subtitle")}</p>

        <button
          type="button"
          onClick={() => setInfo(t("login.googleDemo"))}
          style={{
            marginTop: 24, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            border: "1px solid #d1d5db", borderRadius: 999, padding: "11px 16px", fontSize: 14, fontWeight: 600,
            color: "#374151", background: "#fff", cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 700 }}>G</span> {t("login.google")}
        </button>

        <div className="divider"><span /> {t("login.orEmail")} <span /></div>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            className="auth-field" type="email" placeholder={t("login.email")} autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)} required
          />
          <input
            className="auth-field" type="password" placeholder={t("login.password")} autoComplete="current-password"
            value={password} onChange={(e) => setPassword(e.target.value)} required
          />
          {error && <p className="field-error" style={{ marginTop: 0 }}>{error}</p>}
          {info && <p style={{ color: "var(--ink-soft)", fontSize: 12 }}>{info}</p>}
          <button type="submit" disabled={pending} className="btn btn-gold btn-block" style={{ padding: "11px 16px", fontSize: 14, fontWeight: 600 }}>
            {t("login.submit")}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#6b7280", marginTop: 20, fontSize: 12 }}>
          {t("login.noAccount")} <Link href="/registro" style={{ fontWeight: 600, color: "var(--brand700)" }}>{t("login.createHere")}</Link>
        </p>

        <div style={{ textAlign: "center", color: "#9ca3af", marginTop: 16, fontSize: 11, lineHeight: 1.6 }}>
          {t("login.demo")}:{" "}
          {DEMO.map((d, i) => (
            <span key={d.email}>
              {i > 0 && " — "}
              <button
                type="button"
                onClick={() => { setEmail(d.email); setPassword(d.password); setError(""); }}
                style={{ background: "none", border: "none", padding: 0, color: "var(--gold-deep)", cursor: "pointer", fontSize: 11 }}
                title={t("login.fillHint")}
              >
                {d.email} / {d.password}
              </button>
            </span>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: 12 }}>
          <Link href="/" style={{ color: "#9ca3af" }}>{t("login.backHome")}</Link>
        </p>
      </div>
    </div>
  );
}
