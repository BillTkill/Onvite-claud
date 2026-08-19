"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import { useI18n } from "@/components/I18nProvider";

const FbIcon = () => (
  <span className="fb-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12" /></svg>
  </span>
);

export default function Testimonials() {
  const { t } = useI18n();
  const items = t("home.testimonials.items");
  const list = Array.isArray(items) ? items : [];

  return (
    <>
      <div className="testimonios-eyebrow-wrap">
        <SectionEyebrow>{t("home.testimonials.eyebrow")}</SectionEyebrow>
      </div>
      <div className="testimonios-wrap">
        <motion.section
          className="testimonios-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
        <div className="testi-inner">
          <h2 className="serif">{t("home.testimonials.title")}</h2>
          <p className="testi-sub">{t("home.testimonials.subtitle").toUpperCase()}</p>

          <div className="testi-rating">
            <span className="score">4.9</span>
            <span className="stars-block">
              <span className="stars">★★★★★</span>
              <div className="count">{t("home.testimonials.ratingCount")}</div>
            </span>
          </div>

          <div className="testi-grid">
            {list.map((item, i) => (
              <motion.div
                className="testi-card"
                key={item.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
              >
                <div className="stars">★★★★★</div>
                <FbIcon />
                <p>&ldquo;{item.text}&rdquo;</p>
                <div className="author">{item.author.toUpperCase()}</div>
                <div className="loc">{item.loc}</div>
              </motion.div>
            ))}
          </div>
        </div>
        </motion.section>
      </div>
    </>
  );
}
