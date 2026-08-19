"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import { useI18n } from "@/components/I18nProvider";

// price/cta styling isn't translated content, so it stays paired by index
// with home.pricing.plans (Estándar, Premium, Premium VIP — always 3, in order).
const PLAN_META = [
  { price: "100 $", ctaClass: "" },
  { price: "165 $", ctaClass: "solid", destacado: true },
  { price: "200 $", ctaClass: "dark", vip: true },
];

export default function Pricing() {
  const { t } = useI18n();
  const plans = t("home.pricing.plans");
  const list = Array.isArray(plans) ? plans : [];

  return (
    <section id="precios" className="precios-section">
      <SectionEyebrow>{t("home.pricing.eyebrow")}</SectionEyebrow>
      <h2 className="serif">{t("home.pricing.title")}</h2>
      <p className="precios-sub">{t("home.pricing.subtitle")}</p>

      <div className="planes-grid">
        {list.map((plan, i) => {
          const meta = PLAN_META[i] || {};
          return (
            <motion.div
              key={plan.name}
              className={`plan-card ${meta.destacado ? "destacado" : ""}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: meta.destacado ? -8 : 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              {plan.ribbon && (
                <span className={`plan-badge ${meta.vip ? "vip" : ""}`}>{plan.ribbon}</span>
              )}
              <p className="plan-name">{plan.name}</p>
              <p className="plan-tagline">{plan.tagline}</p>
              <p className="plan-price">
                <span className="amount">{meta.price}</span>
                <span className="period">{t("home.pricing.perOnce")}</span>
              </p>
              <ul className="plan-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={14} strokeWidth={3} className="check" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/book" className={`plan-cta ${meta.ctaClass}`}>
                {t("home.pricing.cta")}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
