"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import { useI18n } from "@/components/I18nProvider";

/* One hairline glyph per step, drawn inline rather than pulled from
   components/Icon.jsx: these are set at a lighter stroke weight than the
   shared icon set so they read as quiet marks on the timeline, not buttons. */
const STEP_ICONS = [
  // 1 · Wand with sparkles — "pick a theme"
  <svg key="theme" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 19.5 15 9" />
    <path d="m14 7.5 2.5 2.5" />
    <path d="M18 3v3M16.5 4.5h3" />
    <path d="M20 12v2M19 13h2" />
    <path d="M8.5 4v2M7.5 5h2" />
  </svg>,
  // 2 · Speech bubble — "contact us"
  <svg key="contact" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.5 12.2c0 3.9-3.8 7-8.5 7-.9 0-1.8-.1-2.6-.3L4 20.5l1.4-3.6A6.6 6.6 0 0 1 3.5 12.2c0-3.9 3.8-7 8.5-7s8.5 3.1 8.5 7z" />
    <path d="M8.8 12h.01M12 12h.01M15.2 12h.01" />
  </svg>,
  // 3 · Palette — "we design it for you"
  <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-1 .8-1.7 1.8-1.7H16a5 5 0 0 0 5-5c0-4-4-7.3-9-7.3z" />
    <circle cx="7.8" cy="11.5" r="1.05" />
    <circle cx="11" cy="7.9" r="1.05" />
    <circle cx="15.4" cy="9.2" r="1.05" />
  </svg>,
  // 4 · Paper plane — "share it in one tap"
  <svg key="share" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 3 10.5 13.5" />
    <path d="M21 3l-6.8 18-3.7-7.5L3 9.8z" />
  </svg>,
];

export default function HowItWorks() {
  const { t } = useI18n();
  const steps = t("home.how.steps");
  const list = Array.isArray(steps) ? steps : [];

  return (
    <section className="pasos">
      <div className="pasos-inner">
        <SectionEyebrow>{t("home.how.eyebrow")}</SectionEyebrow>

        <motion.h2
          className="serif pasos-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {t("home.how.titleBefore")}
          <em>{t("home.how.titleEm")}</em>
          {t("home.how.titleAfter")}
        </motion.h2>

        <motion.p
          className="pasos-sub"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          {t("home.how.subtitleA")}
          <br />
          {t("home.how.subtitleB")}
          <strong>{t("home.how.subtitleEm")}</strong>
          {t("home.how.subtitleC")}
        </motion.p>

        <div className="pasos-rule" aria-hidden="true">
          <span className="line" />
          <span className="heart">♥</span>
          <span className="line" />
        </div>

        {/* A single vertical timeline, identical on desktop and phones — the
            layout only changes scale, so every step stays visible on mobile
            instead of collapsing into cards. */}
        <ol className="pasos-timeline">
          {list.map((step, i) => (
            <motion.li
              className="paso-step"
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            >
              <span className="paso-bullet" aria-hidden="true">
                {STEP_ICONS[i]}
              </span>
              <div className="paso-body">
                <h3 className="serif">{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
