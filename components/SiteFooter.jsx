"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "./Icon";
import Seal from "./Seal";
import { useI18n } from "./I18nProvider";

export default function SiteFooter() {
  const { t } = useI18n();
  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="footer-logo"><Seal size={34} /></div>
      <p className="serif fname">Onvite</p>
      <p className="ftag">{t("footer.tagline")}</p>

      <div className="footer-links">
        <a href="mailto:hola@onvite.com"><Icon name="mail" size={14} /> hola@onvite.com</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={14} /> Instagram</a>
        <a href="https://wa.me/59100000000" target="_blank" rel="noopener noreferrer"><Icon name="share" size={14} /> WhatsApp</a>
      </div>

      {/* Full-bleed gold bar closing the page — same band treatment as the
          Testimonials section (see .testimonios-wrap in ui.css). */}
      <div className="footer-legal-wrap">
        <div className="footer-legal-bar">
          <div className="footer-legal">
            <Link href="/terminos">{t("footer.terms")}</Link>
            <Link href="/privacidad">{t("footer.privacy")}</Link>
          </div>
          <p className="footer-copy">{t("footer.rights")}</p>
        </div>
      </div>
    </motion.footer>
  );
}
