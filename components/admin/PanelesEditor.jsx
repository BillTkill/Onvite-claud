"use client";

import { useState, useEffect, useTransition } from "react";
import { createEventForUser, updateEvent } from "@/app/admin/actions";
import { TEMPLATES } from "@/lib/templates";
import { useI18n } from "@/components/I18nProvider";

const PLAN_OPTIONS = ["BASICO", "PRO", "VIP"];
const EMPTY = { coupleName: "", title: "", date: "", time: "19:00", venue: "", address: "", dressCode: "", plan: "BASICO", templateSlug: TEMPLATES[0].slug, music: "", totalGuests: 0 };

export default function PanelesEditor({ items }) {
  const { t } = useI18n();
  const withEvent = items.filter((i) => i.event);
  const [selectedUserId, setSelectedUserId] = useState(withEvent[0]?.userId || items[0]?.userId);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState(null);
  const [pending, start] = useTransition();

  const current = items.find((i) => i.userId === selectedUserId) || items[0];

  // Load the selected user's event into the form (or a blank form if none).
  useEffect(() => {
    setMsg(null);
    if (current?.event) {
      const e = current.event;
      setForm({
        coupleName: e.coupleName, title: e.title, date: e.date, time: e.time, venue: e.venue,
        address: e.address, dressCode: e.dressCode, plan: e.plan,
        templateSlug: e.templateSlug || TEMPLATES[0].slug, music: e.music, totalGuests: e.totalGuests,
      });
    } else {
      setForm({ ...EMPTY, coupleName: current?.name || "", title: current ? `Evento de ${current.name}` : "" });
    }
  }, [selectedUserId]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function createPanel() {
    if (!current) return;
    setMsg(null);
    start(async () => {
      const res = await createEventForUser(current.userId, form.plan);
      setMsg(res);
    });
  }

  function save() {
    if (!current?.event) return;
    setMsg(null);
    start(async () => {
      const res = await updateEvent(current.event.id, form);
      setMsg(res);
    });
  }

  return (
    <div className="admin-accesos" style={{ marginTop: 8 }}>
      {/* Left: user list */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden", alignSelf: "start" }}>
        <h2 className="serif admin-card__title" style={{ padding: "16px 20px 8px" }}>{t("admin.paneles.listTitle")}</h2>
        <div>
          {items.map((i) => {
            const active = i.userId === selectedUserId;
            return (
              <button
                key={i.userId}
                onClick={() => setSelectedUserId(i.userId)}
                style={{
                  width: "100%", textAlign: "left", border: "none", cursor: "pointer",
                  background: active ? "var(--brand50)" : "transparent",
                  borderLeft: active ? "3px solid var(--brand600)" : "3px solid transparent",
                  padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
                }}
              >
                <span>
                  <span style={{ display: "block", fontWeight: 600, color: "#1c1917", fontSize: 14 }}>{i.name}</span>
                  <span style={{ display: "block", fontSize: 12, color: "#9ca3af" }}>{i.email}</span>
                </span>
                <span
                  style={{
                    flex: "none", fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "3px 9px",
                    background: i.event ? "#dcfce7" : "#f3f4f6", color: i.event ? "#15803d" : "#6b7280",
                  }}
                >
                  {i.event ? t(`admin.plan.${i.event.plan}`) : t("admin.paneles.noPanel")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: editor */}
      <div className="admin-card">
        {!current?.event ? (
          <div>
            <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("admin.paneles.createTitle", { name: current?.name || "" })}</h2>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{t("admin.paneles.createBody")}</p>
            <div style={{ margintop: 12, marginTop: 16 }}>
              <label className="label">{t("admin.paneles.plan")}</label>
              <select className="select" value={form.plan} onChange={set("plan")}>
                {PLAN_OPTIONS.map((p) => <option key={p} value={p}>{t(`admin.panelFor.${p}`)}</option>)}
              </select>
            </div>
            <button onClick={createPanel} disabled={pending} className="btn btn-dark" style={{ marginTop: 16, padding: "11px 22px" }}>
              {pending ? t("admin.paneles.creating") : t("admin.paneles.create")}
            </button>
            {msg && !msg.ok && <p style={{ marginTop: 10, fontSize: 12, color: "var(--danger)" }}>{msg.error}</p>}
          </div>
        ) : (
          <div>
            <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("admin.paneles.editTitle", { name: current.name })}</h2>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{t("admin.paneles.editBody")}</p>

            <div className="grid grid-2" style={{ gap: 14, marginTop: 16 }}>
              <div>
                <label className="label">{t("admin.paneles.coupleName")}</label>
                <input className="input" value={form.coupleName} onChange={set("coupleName")} />
              </div>
              <div>
                <label className="label">{t("admin.paneles.eventTitle")}</label>
                <input className="input" value={form.title} onChange={set("title")} />
              </div>
              <div>
                <label className="label">{t("admin.paneles.date")}</label>
                <input type="date" className="input" value={form.date} onChange={set("date")} />
              </div>
              <div>
                <label className="label">{t("admin.paneles.time")}</label>
                <input type="time" className="input" value={form.time} onChange={set("time")} />
              </div>
              <div>
                <label className="label">{t("admin.paneles.venue")}</label>
                <input className="input" value={form.venue} onChange={set("venue")} />
              </div>
              <div>
                <label className="label">{t("admin.paneles.address")}</label>
                <input className="input" value={form.address} onChange={set("address")} placeholder={t("admin.paneles.addressPh")} />
              </div>
              <div>
                <label className="label">{t("admin.paneles.dressCode")}</label>
                <input className="input" value={form.dressCode} onChange={set("dressCode")} />
              </div>
              <div>
                <label className="label">{t("admin.paneles.totalGuests")}</label>
                <input type="number" min="0" className="input" value={form.totalGuests} onChange={set("totalGuests")} />
              </div>
              <div>
                <label className="label">{t("admin.paneles.plan")}</label>
                <select className="select" value={form.plan} onChange={set("plan")}>
                  {PLAN_OPTIONS.map((p) => <option key={p} value={p}>{t(`admin.panelFor.${p}`)}</option>)}
                </select>
              </div>
              <div>
                <label className="label">{t("admin.paneles.template")}</label>
                <select className="select" value={form.templateSlug} onChange={set("templateSlug")}>
                  {TEMPLATES.map((tpl) => <option key={tpl.slug} value={tpl.slug}>{tpl.name}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="label">{t("admin.paneles.music")}</label>
                <input className="input" value={form.music} onChange={set("music")} placeholder={t("admin.paneles.musicPh")} />
              </div>
            </div>

            {form.address && (
              <div style={{ marginTop: 16 }}>
                <label className="label">{t("admin.paneles.mapPreview")}</label>
                <iframe
                  title="map"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: 12, marginTop: 6 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(form.address)}&output=embed`}
                />
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <button onClick={save} disabled={pending} className="btn btn-dark" style={{ padding: "11px 22px" }}>
                {pending ? t("admin.paneles.saving") : t("admin.paneles.save")}
              </button>
              {msg && (
                <span style={{ fontSize: 13, color: msg.ok ? "#16a34a" : "var(--danger)" }}>
                  {msg.ok ? t("admin.paneles.saved") : msg.error}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
