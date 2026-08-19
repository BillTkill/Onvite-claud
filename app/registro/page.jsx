"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Icon from "@/components/Icon";
import Ornament from "@/components/Ornament";
import Seal from "@/components/Seal";
import { useI18n } from "@/components/I18nProvider";

export default function RegistroPage() {
  const { t } = useI18n();
  const router = useRouter();

  const challenge = useMemo(() => {
    const a = 3 + Math.floor(Math.random() * 7);
    const b = 2 + Math.floor(Math.random() * 7);
    return { a, b, answer: a + b };
  }, []);

  const [form, setForm] = useState({ name: "", username: "", email: "", password: "", bot: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
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
    setPending(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      }),
    });
    if (!res.ok) {
      setError(res.status === 409 ? t("register.errExists") : t("register.errShortPass"));
      setPending(false);
      return;
    }
    // New account has no plan → locked panel.
    await signIn("credentials", { email: form.email.trim(), password: form.password, redirect: false });
    router.push("/panel");
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
            <h1 className="login-title">{t("register.title")}</h1>
            <Ornament />
            <p className="login-subtitle">{t("register.subtitle")}</p>

            <form onSubmit={onSubmit} className="login-form">
              <div className="login-field">
                <Icon name="user" size={19} strokeWidth={1.6} className="login-field__icon" />
                <input
                  className="login-field__input" placeholder={t("register.name")}
                  value={form.name} onChange={set("name")} required
                />
              </div>

              <div className="login-field">
                <Icon name="at" size={19} strokeWidth={1.6} className="login-field__icon" />
                <input
                  className="login-field__input" placeholder={t("register.username")}
                  value={form.username} onChange={set("username")} required
                />
              </div>

              <div className="login-field">
                <Icon name="mail" size={19} strokeWidth={1.6} className="login-field__icon" />
                <input
                  className="login-field__input" type="email" placeholder={t("register.email")}
                  autoComplete="email" value={form.email} onChange={set("email")} required
                />
              </div>

              <div className="login-field">
                <Icon name="lock" size={19} strokeWidth={1.6} className="login-field__icon" />
                <input
                  className="login-field__input" type={showPass ? "text" : "password"}
                  placeholder={t("register.password")} autoComplete="new-password"
                  value={form.password} onChange={set("password")} required
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

              {/* Verificación anti-bot: suma simple, sin servicios externos. */}
              <div className="login-antibot">
                <p className="login-antibot__label">{t("register.antibotLabel")}</p>
                <div className="login-antibot__row">
                  <span>{t("register.antibotQuestion", { a: challenge.a, b: challenge.b })}</span>
                  <input
                    className="login-antibot__input"
                    inputMode="numeric"
                    value={form.bot}
                    onChange={set("bot")}
                    aria-label={t("register.antibotLabel")}
                    required
                  />
                </div>
              </div>

              {error && <p className="login-error">{error}</p>}

              <button type="submit" disabled={pending} className="login-submit">
                <Icon name="rings" size={20} strokeWidth={1.5} />
                {t("register.submit")}
              </button>
            </form>

            <p className="login-alt">
              {t("register.haveAccount")} <Link href="/login">{t("register.loginHere")}</Link>
            </p>

            <p className="login-back">
              <Link href="/">{t("register.backHome")}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
