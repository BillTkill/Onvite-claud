"use client";

import { useState, useTransition } from "react";
import { addContact } from "@/app/admin/actions";
import { useI18n } from "@/components/I18nProvider";

const PLANS = ["Estándar", "Premium", "Premium VIP"];
const EMPTY = { names: "", email: "", phone: "", eventType: "", city: "", date: "", plan: "Estándar" };

export default function AddContact() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [err, setErr] = useState("");
  const [pending, start] = useTransition();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit() {
    setErr("");
    if (!form.names.trim() || !form.email.trim() || !form.eventType.trim()) {
      setErr(t("admin.clientes.addRequired"));
      return;
    }
    start(async () => {
      try {
        await addContact(form); // revalidates → new row appears
        setForm(EMPTY);
        setOpen(false);
      } catch {
        setErr(t("admin.clientes.addError"));
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{ background: "var(--brand600)", color: "#fff", border: "none", borderRadius: 999, padding: "8px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
      >
        {t("admin.clientes.addContact")}
      </button>

      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(28,25,23,.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 50 }} onClick={() => setOpen(false)}>
          <div className="admin-card" style={{ width: "100%", maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <h2 className="serif admin-card__title">{t("admin.clientes.addTitle")}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              <div>
                <label className="label">{t("admin.clientes.thName")}</label>
                <input className="input" value={form.names} onChange={set("names")} />
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <label className="label">{t("admin.usuarios.thEmail")}</label>
                  <input type="email" className="input" value={form.email} onChange={set("email")} />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <label className="label">{t("admin.clientes.addPhone")}</label>
                  <input className="input" value={form.phone} onChange={set("phone")} placeholder="+591 700 00000" />
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <label className="label">{t("admin.clientes.thEvent")}</label>
                  <input className="input" value={form.eventType} onChange={set("eventType")} placeholder="Boda, XV Años…" />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <label className="label">{t("admin.clientes.addCity")}</label>
                  <input className="input" value={form.city} onChange={set("city")} />
                </div>
              </div>
              <div>
                <label className="label">{t("admin.clientes.addDate")}</label>
                <input type="date" className="input" value={form.date} onChange={set("date")} />
              </div>
              <div>
                <label className="label">{t("admin.clientes.thPlan")}</label>
                <select className="select" value={form.plan} onChange={set("plan")}>
                  {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              {err && <p style={{ fontSize: 13, color: "var(--danger)" }}>{err}</p>}
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
                <button type="button" onClick={() => setOpen(false)} className="share-btn" style={{ cursor: "pointer", background: "transparent" }}>{t("admin.clientes.cancel")}</button>
                <button type="button" onClick={submit} disabled={pending} className="share-btn share-btn--wa" style={{ border: "none", cursor: "pointer" }}>
                  {pending ? t("admin.clientes.saving") : t("admin.clientes.save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
