"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import Icon from "@/components/Icon";
import Ornament from "@/components/Ornament";
import Seal from "@/components/Seal";
import { useI18n } from "@/components/I18nProvider";

const DEMO = [
  { email: "admin@onvite.com", password: "Admin123!" },
  { email: "maria@mail.com", password: "Cliente123!" },
];

// Mismo número que usa el botón flotante del sitio (components/WhatsAppFloat).
const SUPPORT_WHATSAPP = "https://wa.me/59100000000";

export default function LoginPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [showPass, setShowPass] = useState(false);

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
    <div className="auth-screen login-screen">
      <div className="login-layout">
        <div className="login-visual">
          <img
            className="login-visual__photo"
            src="/backgrounds/login-sobre.webp"
            alt=""
            aria-hidden="true"
          />
          <div className="login-visual__brand">
            <Seal size={34} />
            <div>
              <p className="login-visual__name">Onvite</p>
              <p className="login-visual__tagline">{t("login.visualTagline")}</p>
            </div>
          </div>
        </div>

        <div className="login-form-col">
          <div className="login-card">
        <h1 className="login-title">{t("login.title")}</h1>
        <Ornament />
        <p className="login-subtitle">{t("login.subtitle")}</p>

        <form onSubmit={onSubmit} className="login-form">
          <div className="login-field">
            <Icon name="mail" size={19} strokeWidth={1.6} className="login-field__icon" />
            <input
              className="login-field__input" type="email" placeholder={t("login.email")} autoComplete="email"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
          </div>

          <div className="login-field">
            <Icon name="lock" size={19} strokeWidth={1.6} className="login-field__icon" />
            <input
              className="login-field__input" type={showPass ? "text" : "password"} placeholder={t("login.password")}
              autoComplete="current-password"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />
            <button
              type="button"
              className="login-field__eye"
              onClick={() => setShowPass((v) => !v)}
              aria-label={showPass ? t("login.hidePassword") : t("login.showPassword")}
            >
              <Icon name={showPass ? "eyeOff" : "eye"} size={19} strokeWidth={1.6} />
            </button>
          </div>
          {/* Recuperación asistida: no hay flujo self-service todavía, así que
              el enlace lleva al WhatsApp de soporte. */}
          <div className="login-forgot">
            <a href={SUPPORT_WHATSAPP} target="_blank" rel="noopener noreferrer">
              {t("login.forgot")}
            </a>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={pending} className="login-submit">
            <Icon name="rings" size={20} strokeWidth={1.5} />
            {t("login.submit")}
          </button>
        </form>

        <p className="login-alt">
          {t("login.noAccount")} <Link href="/registro">{t("login.createHere")}</Link>
        </p>

        <div className="login-demo">
          {t("login.demo")}:{" "}
          {DEMO.map((d, i) => (
            <span key={d.email}>
              {i > 0 && " — "}
              <button
                type="button"
                className="login-demo__fill"
                onClick={() => { setEmail(d.email); setPassword(d.password); setError(""); }}
                title={t("login.fillHint")}
              >
                {d.email} / {d.password}
              </button>
            </span>
          ))}
        </div>

        <p className="login-back">
          <Link href="/">{t("login.backHome")}</Link>
        </p>
          </div>
        </div>
      </div>
    </div>
  );
}
