"use client";

import { motion } from "framer-motion";
import Faq from "@/components/Faq";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import { useI18n } from "@/components/I18nProvider";

export default function FaqSection() {
  const { t } = useI18n();
  return (
    <section id="preguntas" className="section container container-narrow">
      <div className="center">
        <SectionEyebrow>{t("home.faq.eyebrow")}</SectionEyebrow>
        <h2 className="h-section">{t("home.faq.title")}</h2>
        <p className="section-sub">{t("home.faq.subtitle")}</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
        <Faq />
      </motion.div>
    </section>
  );
}
