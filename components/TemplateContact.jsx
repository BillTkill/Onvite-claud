"use client";

import Icon from "./Icon";
import { useI18n } from "./I18nProvider";

/**
 * Closing contact block on a template's detail page. It sits inside `.tplp`
 * and reads the same --p-* tokens as the panel above it, so it inherits
 * whichever theme (dark or light) the admin picked for that template.
 *
 * TODO: these are placeholder handles — swap them for the real accounts
 * before launch. The WhatsApp number matches components/WhatsAppFloat.jsx,
 * so change both together.
 */
const CHANNELS = [
  { key: "whatsapp", label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/59100000000" },
  { key: "instagram", label: "Instagram", icon: "instagram", href: "https://instagram.com" },
  { key: "tiktok", label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@onvite" },
];

export default function TemplateContact() {
  const { t } = useI18n();

  return (
    <section className="tplc">
      <span className="tplc__eyebrow">{t("detail.contactEyebrow")}</span>
      <h2 className="serif tplc__title">{t("detail.contactTitle")}</h2>
      <p className="tplc__sub">{t("detail.contactSubtitle")}</p>

      <div className="tplc__rule" aria-hidden="true">
        <span />
        <em>✦</em>
        <span />
      </div>

      <div className="tplc__links">
        {CHANNELS.map((c) => (
          <a
            key={c.key}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`tplc__link tplc__link--${c.key}`}
          >
            <Icon name={c.icon} size={19} />
            <span>{c.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
