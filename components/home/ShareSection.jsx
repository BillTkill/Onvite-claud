"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Seal from "@/components/Seal";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import { useI18n } from "@/components/I18nProvider";

export default function ShareSection() {
  const { t } = useI18n();
  const [origin, setOrigin] = useState("https://onvite.com");
  const [copied, setCopied] = useState(false);

  useEffect(() => setOrigin(window.location.origin), []);

  const displayUrl = origin.replace(/^https?:\/\//, "");
  // Same free QR service already used by the couple panel's share card
  // (components/panel/parts.jsx) — no new dependency, real scannable code.
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=6&data=${encodeURIComponent(origin)}`;

  function copyLink() {
    navigator.clipboard.writeText(origin).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const shareTargets = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(origin)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(origin)}` },
    { label: "X / Twitter", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(origin)}` },
    { label: "Correo electrónico", href: `mailto:?subject=Onvite&body=${encodeURIComponent(origin)}` },
  ];

  return (
    <motion.section
      className="compartir-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionEyebrow>{t("home.share.eyebrow")}</SectionEyebrow>
      <h2 className="serif">{t("home.share.title")}</h2>
      <p className="compartir-sub">{t("home.share.subtitle").toUpperCase()}</p>

      <div className="compartir-card">
        <div className="qr-box">
          <img src={qrSrc} alt={displayUrl} width={192} height={192} style={{ width: "100%", height: "100%" }} />
          <span className="qr-logo"><Seal size={22} /></span>
        </div>

        <div className="compartir-content">
          <h3>{t("home.share.cardTitle")}</h3>
          <p>{t("home.share.cardBody")}</p>

          <div className="link-row">
            <span className="link-text">{displayUrl}</span>
            <button onClick={copyLink}>{copied ? t("home.share.linkCopied") : t("home.share.linkCopy")}</button>
          </div>

          <div className="share-btns">
            {shareTargets.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="share-chip">
                {s.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
