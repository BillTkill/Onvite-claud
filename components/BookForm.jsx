"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Icon from "./Icon";
import { useI18n } from "./I18nProvider";
import { TEMPLATES, getTemplate } from "@/lib/templates";

const BOOK_PLAN_META = [
  { id: "standard", price: "$100", planName: "Estándar" },
  { id: "premium", price: "$165", planName: "Premium" },
  { id: "vip", price: "$200", planName: "Premium VIP" },
];

export default function BookForm() {
  const { t } = useI18n();
  const params = useSearchParams();
  const router = useRouter();
  const preselected = getTemplate(params.get("template") || "");
  const planParam = params.get("plan");
  const initialPlan = ["standard", "premium", "vip"].includes(planParam) ? planParam : "standard";

  const [plan, setPlan] = useState(initialPlan);
  const [template, setTemplate] = useState(preselected?.slug || TEMPLATES[0].slug);
  const [values, setValues] = useState({
    names: "", email: "", phone: "", eventType: "", date: "", place: "", notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const planTexts = t("book.plans");
  const eventTypes = t("book.eventTypes");

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const planName = (BOOK_PLAN_META.find((m) => m.id === plan) || BOOK_PLAN_META[0]).planName;
    try {
      await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planName,
          templateSlug: template,
          names: values.names,
          email: values.email,
          phone: values.phone,
          eventType: values.eventType,
          date: values.date,
          place: values.place,
          notes: values.notes,
        }),
      });
    } catch {
      /* demo: proceed even if the request fails */
    }
    router.push("/book/success");
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="center" style={{ marginBottom: 40 }}>
          <p className="eyebrow">{t("book.eyebrow")}</p>
          <h1 className="h-page">{t("book.title")}</h1>
          <p className="lead" style={{ marginTop: 16 }}>{t("book.subtitle")}</p>
        </div>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* Plan */}
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t("book.planLabel")}</p>
            <div className="grid grid-3" style={{ gap: 12 }}>
              {BOOK_PLAN_META.map((meta, i) => {
                const active = plan === meta.id;
                const info = Array.isArray(planTexts) ? planTexts[i] : { name: meta.id, note: "" };
                return (
                  <button
                    type="button"
                    key={meta.id}
                    onClick={() => setPlan(meta.id)}
                    style={{
                      textAlign: "left",
                      border: active ? "1px solid var(--gold)" : "1px solid var(--border)",
                      background: active ? "rgba(240,230,212,.4)" : "var(--surface)",
                      borderRadius: 16,
                      padding: 16,
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                      <span className="serif" style={{ fontSize: 18, fontWeight: 600 }}>{info.name}</span>
                      <span style={{ color: "var(--gold-deep)", fontSize: 14, fontWeight: 600 }}>{meta.price}</span>
                    </div>
                    <p style={{ color: "var(--ink-soft)", marginTop: 4, fontSize: 12 }}>{info.note}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Template */}
          <div>
            <label className="label" htmlFor="tpl">{t("book.templateLabel")}</label>
            <select id="tpl" className="select" value={template} onChange={(e) => setTemplate(e.target.value)}>
              {TEMPLATES.map((tpl) => (
                <option key={tpl.slug} value={tpl.slug}>{tpl.name}</option>
              ))}
            </select>
          </div>

          {/* Two-column fields */}
          <div className="grid grid-2" style={{ gap: 20 }}>
            <div>
              <label className="label" htmlFor="names">{t("book.names")}</label>
              <input id="names" className="input" placeholder={t("book.namesPh")} value={values.names} onChange={set("names")} required />
            </div>
            <div>
              <label className="label" htmlFor="email">{t("book.email")}</label>
              <input id="email" type="email" className="input" placeholder={t("book.emailPh")} value={values.email} onChange={set("email")} required />
            </div>
            <div>
              <label className="label" htmlFor="phone">{t("book.phone")}</label>
              <div style={{ display: "flex", gap: 8, alignItems: "stretch", marginTop: 8 }}>
                <span
                  style={{
                    display: "flex", alignItems: "center", gap: 6, border: "1px solid #d1d5db",
                    borderRadius: 12, padding: "0 12px", fontSize: 14, whiteSpace: "nowrap", background: "var(--surface)",
                  }}
                >
                  🇧🇴 +591
                </span>
                <input id="phone" className="input" style={{ marginTop: 0 }} placeholder={t("book.phonePh")} value={values.phone} onChange={set("phone")} />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="eventType">{t("book.eventType")}</label>
              <select id="eventType" className="select" value={values.eventType} onChange={set("eventType")} required>
                <option value="" disabled>{t("book.eventTypePh")}</option>
                {(Array.isArray(eventTypes) ? eventTypes : []).map((et) => (
                  <option key={et} value={et}>{et}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="date">{t("book.date")}</label>
              <input id="date" type="date" className="input" value={values.date} onChange={set("date")} />
            </div>
            <div>
              <label className="label" htmlFor="place">{t("book.place")}</label>
              <input id="place" className="input" placeholder={t("book.placePh")} value={values.place} onChange={set("place")} />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="notes">{t("book.notes")}</label>
            <textarea id="notes" className="textarea" placeholder={t("book.notesPh")} value={values.notes} onChange={set("notes")} />
          </div>

          <div>
            <button type="submit" className="btn btn-dark" disabled={submitting} style={{ padding: "13px 40px" }}>
              {submitting ? t("book.sending") : t("book.continue")} <Icon name="arrowRight" size={16} />
            </button>
            <p style={{ color: "var(--gold-deep)", marginTop: 12, fontSize: 14, fontWeight: 500 }}>{t("book.payNote")}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
