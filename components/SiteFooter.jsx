"use client";

import Link from "next/link";
import Icon from "./Icon";
import { useI18n } from "./I18nProvider";

export default function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="center">
          <p className="serif" style={{ fontSize: 20, fontWeight: 600 }}>Onvite</p>
          <p style={{ color: "var(--ink-soft)", marginTop: 4, fontSize: 14 }}>{t("footer.tagline")}</p>
        </div>
        <div className="site-footer__contacts">
          <a className="footer-pill" href="mailto:hola@onvite.com">
            <Icon name="mail" size={15} /> hola@onvite.com
          </a>
          <a className="footer-pill" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Icon name="instagram" size={15} /> Instagram
          </a>
          <a className="footer-pill" href="https://wa.me/59100000000" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
        <Link href="/terminos" className="site-footer__terms">
          {t("footer.terms")}
        </Link>
        <p style={{ color: "var(--ink-soft)", fontSize: 12 }}>{t("footer.rights")}</p>
      </div>
    </footer>
  );
}
