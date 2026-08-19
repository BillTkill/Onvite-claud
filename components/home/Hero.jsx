"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import { useI18n } from "@/components/I18nProvider";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero">
      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon name="sparkle" size={13} /> {t("home.hero.badge")}
      </motion.div>

      {/* Two-line editorial headline: a black line, then an italic gold line
          opening with "&" — the reference's exact construction, both lines in
          the display face and inside one <h1> so it reads as a single title. */}
      <motion.h1
        className="display hero-headline"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
      >
        {t("home.hero.titleLine1")}
        <em className="hero-headline__accent">{t("home.hero.titleLine2")}</em>
      </motion.h1>

      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
      >
        {t("home.hero.tagline")}
      </motion.p>

      <motion.div
        className="hero-ctas"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.34 }}
      >
        <Link href="/#plantillas" className="hero-cta-primary">
          {t("home.hero.ctaTemplates")} <Icon name="arrowRight" size={16} />
        </Link>
        <a href="#como-funciona" className="hero-cta-secondary">
          {t("home.hero.ctaHow")}
        </a>
      </motion.div>

      <motion.p
        className="hero-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 0.6, delay: 0.42 }}
      >
        {t("home.hero.note")}
      </motion.p>
    </section>
  );
}
