"use client";

import { motion } from "framer-motion";

/**
 * "Encabezado por sección" — the pill badge with a border and a ✦, used as
 * the small label above every section title (Hero's badge is the original;
 * this is the same visual treatment reused everywhere else per the client's
 * instruction to standardize it).
 */
export default function SectionEyebrow({ children, style }) {
  return (
    <motion.div
      className="section-eyebrow"
      style={style}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <span>✦</span> {children}
    </motion.div>
  );
}
