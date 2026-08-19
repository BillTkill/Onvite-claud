"use client";

import { motion } from "framer-motion";
import { SHOWCASE_CARDS, SHOWCASE_ENVELOPES } from "@/lib/home-data";

/**
 * Two infinite marquee rows (invitation cards + envelopes) with a phone
 * mockup overlapping the center. The marquee itself is a plain CSS animation
 * (continuous linear scroll) — Framer Motion is reserved for the one-off
 * entrance reveal, which is the right tool for each job.
 *
 * `media` (from lib/home-queries.js, admin-managed) can override any slot
 * with a real uploaded image — a slot with no upload keeps its built-in
 * CSS-drawn placeholder design, so the section never looks broken before
 * the admin has added anything (see /admin/inicio).
 */
export default function TemplatesShowcase({ media }) {
  const cardMedia = media?.SHOWCASE_CARD || {};
  const envelopeMedia = media?.SHOWCASE_ENVELOPE || {};
  const phoneImage = media?.PHONE_MOCK?.[0]?.imageUrl || null;

  // Each row is rendered twice back-to-back so translateX(-50%) loops seamlessly.
  const cards = [...SHOWCASE_CARDS, ...SHOWCASE_CARDS];
  const envelopes = [...SHOWCASE_ENVELOPES, ...SHOWCASE_ENVELOPES];

  return (
    <motion.section
      className="showcase"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="marquee row-top">
        <div className="marquee-track">
          {cards.map((c, i) => {
            const slot = i % SHOWCASE_CARDS.length;
            const img = cardMedia[slot]?.imageUrl;
            return (
              <div className="invite-card" key={`${c.names}-${i}`}>
                {img ? (
                  <img src={img} alt="" className="invite-card__img" />
                ) : (
                  <>
                    <div className={`grad ${c.grad}`} />
                    <div className="top-bar">{c.topBar}</div>
                    <span className="dot">♫</span>
                    <div className="names">{c.names}</div>
                    <div className="date">{c.date}</div>
                    <div className="confirm">CONFIRM ATTENDANCE</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="marquee row-bottom">
        <div className="marquee-track">
          {envelopes.map((e, i) => {
            const slot = i % SHOWCASE_ENVELOPES.length;
            const img = envelopeMedia[slot]?.imageUrl;
            return (
              <div className={`envelope ${e.style}`} key={`${e.seal}-${i}`}>
                {img ? (
                  <img src={img} alt="" className="envelope__img" />
                ) : (
                  <>
                    <div className="flap" />
                    <div className="seal">{e.seal}</div>
                    {e.label && <div className="label">{e.label}</div>}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="phone" aria-hidden="true">
        {phoneImage ? (
          <img src={phoneImage} alt="" className="phone-screen phone-screen__img" />
        ) : (
          <div className="phone-screen">
            <div className="phone-notch" />
            <span className="label-top">WE'RE GETTING MARRIED</span>
            <span className="sparkle">✦</span>
            <span className="names">Alex &amp; Diane</span>
            <span className="date">23 NOVEMBER 2026</span>
            <span className="confirm">CONFIRM ATTENDANCE</span>
            <span className="btn-dot" />
          </div>
        )}
      </div>
    </motion.section>
  );
}
