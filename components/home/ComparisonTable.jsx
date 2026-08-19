"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import { useI18n } from "@/components/I18nProvider";

const PLAN_PRICES = ["100 $", "165 $", "200 $"];

function Cell({ value }) {
  if (value === "✓") return <td className="yes">✓</td>;
  if (value === "—") return <td className="no">—</td>;
  return <td>{value}</td>;
}

export default function ComparisonTable() {
  const { t } = useI18n();
  const plans = t("home.pricing.plans");
  const planNames = Array.isArray(plans) ? plans.map((p) => p.name) : [];
  const rows = t("home.comparison.rows");
  const list = Array.isArray(rows) ? rows : [];

  return (
    <motion.section
      className="comparativa-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionEyebrow>{t("home.comparison.eyebrow")}</SectionEyebrow>
      <h3 className="serif">{t("home.comparison.title")}</h3>
      <p className="comp-sub">{t("home.comparison.subtitle")}</p>

      <div className="comp-table-wrap" style={{ overflowX: "auto" }}>
        <table className="comp-table">
          <thead>
            <tr>
              <th>{t("home.comparison.columnFunction").toUpperCase()}</th>
              {planNames.map((name, i) => (
                <th key={name}>
                  {name}
                  <span className="col-price">{PLAN_PRICES[i]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                {row.values.map((v, i) => (
                  <Cell key={i} value={v} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
