"use client";

import { motion } from "framer-motion";
import Seal from "@/components/Seal";
import Icon from "@/components/Icon";
import { useI18n } from "@/components/I18nProvider";

export default function ContactSection() {
  const { t } = useI18n();

  return (
    <div className="contact-wrap" id="contacto">
      <motion.section
        className="contact-section"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="contact-left">
          <div className="contact-logo"><Seal size={90} /></div>
          <p>{t("footer.tagline")}</p>
        </div>

        <div className="contact-right">
          <h2 className="serif">{t("home.contact.title")}</h2>
          <p className="contact-sub">{t("home.contact.eyebrow").toUpperCase()}</p>

          <div className="contact-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Icon name="instagram" size={19} strokeWidth={1.8} />
            </a>
            <a href="mailto:hola@onvite.com" aria-label={t("home.contact.email")}>
              <Icon name="mail" size={19} strokeWidth={1.8} />
            </a>
            <a href="https://wa.me/59100000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Icon name="share" size={19} strokeWidth={1.8} />
            </a>
          </div>

          <div className="contact-links">
            <a href="mailto:hola@onvite.com">hola@onvite.com</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">@onvite</a>
          </div>

          <a href="mailto:hola@onvite.com" className="contact-cta">
            {t("home.contact.email").toUpperCase()}
          </a>
        </div>
      </motion.section>
    </div>
  );
}
