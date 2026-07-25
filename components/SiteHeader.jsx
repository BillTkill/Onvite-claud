"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Seal from "./Seal";
import Icon from "./Icon";
import { useAuth } from "./AuthProvider";
import { useI18n } from "./I18nProvider";
import { LOCALES } from "@/lib/i18n/config";

const NAV = [
  { href: "/templates", key: "templates" },
  { href: "/#como-funciona", key: "howItWorks" },
  { href: "/#precios", key: "pricing" },
  { href: "/#preguntas", key: "faq" },
  { href: "/#contacto", key: "contact" },
];

function useClickOutside(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", (e) => e.key === "Escape" && onClose());
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);
  return ref;
}

function LangSelect() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
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

function AccountMenu({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  const { logout } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const firstName = user.name.split(" ")[0];

  return (
    <div className="account" ref={ref}>
      <button className="account__chip" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="avatar">{user.initials}</span>
        {firstName} <Icon name="chevronDown" size={14} />
      </button>
      {open && (
        <div className="menu account__menu">
          <div className="account__head">
            <span className="avatar avatar--lg">{user.initials}</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{user.name}</p>
              <p style={{ fontSize: 12, color: "var(--ink-soft)" }}>{user.email}</p>
            </div>
          </div>
          <div style={{ padding: 6 }}>
            <button className="menu__item"><Icon name="user" size={16} /> {t("account.myInfo")}</button>
            <button className="menu__item"><Icon name="settings" size={16} /> {t("account.settings")}</button>
            <Link href="/panel" className="menu__item menu__item--gold" onClick={() => setOpen(false)}>
              <Icon name="layout" size={16} /> {t("account.myPanel")}
            </Link>
            {user.role === "admin" && (
              <Link href="/admin" className="menu__item" onClick={() => setOpen(false)}>
                <Icon name="key" size={16} /> {t("account.adminPanel")}
              </Link>
            )}
          </div>
          <div style={{ borderTop: "1px solid var(--border)", padding: 6 }}>
            <button
              className="menu__item menu__item--danger"
              onClick={() => {
                logout();
                setOpen(false);
                router.push("/");
              }}
            >
              <Icon name="logout" size={16} /> {t("account.logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteHeader() {
  const { user, ready } = useAuth();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" onClick={() => setMobileOpen(false)}>
          <Seal size={36} />
          <span className="serif brand__name">Onvite</span>
        </Link>

        <nav className="site-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="site-nav__link">
              {t(`nav.${n.key}`)}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <LangSelect />
          {ready && user ? (
            <AccountMenu user={user} />
          ) : (
            <div className="auth-links">
              <Link href="/login" className="site-nav__link">{t("nav.login")}</Link>
              <Link href="/registro" className="btn btn-dark btn--sm">{t("nav.signup")}</Link>
            </div>
          )}
          <button
            className="nav-toggle"
            aria-label={t("nav.menu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? "x" : "menu"} size={20} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="mobile-nav__link" onClick={() => setMobileOpen(false)}>
              {t(`nav.${n.key}`)}
            </Link>
          ))}
          <div className="mobile-nav__divider" />
          {ready && user ? (
            <Link href="/panel" className="btn btn-dark btn-block" onClick={() => setMobileOpen(false)}>
              {t("account.myPanel")}
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline btn-block" onClick={() => setMobileOpen(false)}>
                {t("nav.login")}
              </Link>
              <Link href="/registro" className="btn btn-dark btn-block" onClick={() => setMobileOpen(false)}>
                {t("nav.signup")}
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
