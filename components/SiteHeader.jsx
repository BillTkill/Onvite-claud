"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Seal from "./Seal";
import Icon from "./Icon";
import { useI18n } from "./I18nProvider";
import LangSelect from "./LangSelect";

const NAV = [
  { href: "/templates", key: "templates" },
  { href: "/#como-funciona", key: "howItWorks" },
  { href: "/#precios", key: "pricing" },
  { href: "/#preguntas", key: "faq" },
  { href: "/#contacto", key: "contact" },
];

function initials(name = "") {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "·";
}

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

function AccountMenu({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  const { t } = useI18n();
  const firstName = (user.name || "").split(" ")[0];

  return (
    <div className="account" ref={ref}>
      <button className="account__chip" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="avatar">{initials(user.name)}</span>
        {firstName} <Icon name="chevronDown" size={14} />
      </button>
      {open && (
        <div className="menu account__menu">
          <div className="account__head">
            <span className="avatar avatar--lg">{initials(user.name)}</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{user.name}</p>
              <p style={{ fontSize: 12, color: "var(--ink-soft)" }}>{user.email}</p>
            </div>
          </div>
          <div style={{ padding: 6 }}>
            <Link href="/cuenta" className="menu__item" onClick={() => setOpen(false)}><Icon name="settings" size={16} /> {t("account.settings")}</Link>
            <Link href="/panel" className="menu__item menu__item--gold" onClick={() => setOpen(false)}>
              <Icon name="layout" size={16} /> {t("account.myPanel")}
            </Link>
            {user.role === "ADMIN" && (
              <Link href="/admin" className="menu__item" onClick={() => setOpen(false)}>
                <Icon name="key" size={16} /> {t("account.adminPanel")}
              </Link>
            )}
          </div>
          <div style={{ borderTop: "1px solid var(--border)", padding: 6 }}>
            <button className="menu__item menu__item--danger" onClick={() => signOut({ callbackUrl: "/" })}>
              <Icon name="logout" size={16} /> {t("account.logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteHeader() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const ready = status !== "loading";
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
