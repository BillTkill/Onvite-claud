"use client";

import { useState, useEffect, useTransition } from "react";
import { createEventForUser, updateEvent, adminAddGift, adminRemoveGift } from "@/app/admin/actions";
import { TEMPLATES } from "@/lib/templates";
import { useI18n } from "@/components/I18nProvider";

const PLAN_OPTIONS = ["BASICO", "PRO", "VIP"];
// Music repertoire (song titles only) offered in the dropdown.
const REPERTOIRE = [
  "Perfect — Ed Sheeran",
  "A Thousand Years — Christina Perri",
  "All of Me — John Legend",
  "Can't Help Falling in Love — Elvis Presley",
];
const EMPTY = { coupleName: "", title: "", date: "", time: "19:00", venue: "", address: "", dressCode: "", plan: "BASICO", templateSlug: TEMPLATES[0].slug, music: "", musicUrl: "", paymentQr: "", albumUrl: "", totalGuests: 0 };

// Read an image file and downscale it to a small JPEG data URL (so the QR image
// fits in the DB without needing a file-storage backend).
function imageToDataUrl(file, max = 460) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function PanelesEditor({ items }) {
  const { t } = useI18n();
  const withEvent = items.filter((i) => i.event);
  const [selectedUserId, setSelectedUserId] = useState(withEvent[0]?.userId || items[0]?.userId);
  const [form, setForm] = useState(EMPTY);
  const [giftName, setGiftName] = useState("");
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
        templateSlug: e.templateSlug || TEMPLATES[0].slug, music: e.music, musicUrl: e.musicUrl || "",
        paymentQr: e.paymentQr || "", albumUrl: e.albumUrl || "", totalGuests: e.totalGuests,
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

  function addGiftAdmin() {
    const name = giftName.trim();
    if (!name || !current?.event) return;
    start(async () => {
      try { await adminAddGift(current.event.id, name); setGiftName(""); } catch { /* keep input */ }
    });
  }

  function removeGiftAdmin(id) {
    start(async () => {
      try { await adminRemoveGift(id); } catch { /* ignore */ }
    });
  }

  function onPickQr(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    imageToDataUrl(file).then((url) => setForm((f) => ({ ...f, paymentQr: url }))).catch(() => {});
  }

  function onPickMusic(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const songName = file.name.replace(/\.[^.]+$/, "");
    setForm((f) => ({ ...f, music: songName })); // optimistic label
    start(async () => {
      try {
        const fd = new FormData();
        fd.append("file", file);
        const up = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await up.json();
        if (data.ok && data.url) setForm((f) => ({ ...f, music: songName, musicUrl: data.url }));
      } catch { /* ignore */ }
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
                  {i.event ? t(`admin.plan.${i.event.plan}`) : i.hasAccount ? t("admin.paneles.noPanel") : t("admin.paneles.noAccount")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: editor */}
      <div className="admin-card">
        {current && !current.hasAccount ? (
          <div>
            <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{current.name}</h2>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{current.email}</p>
            <p style={{ marginTop: 16, fontSize: 13, color: "#a16207", background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 14px" }}>
              {t("admin.paneles.noAccountHint")}
            </p>
          </div>
        ) : !current?.event ? (
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
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6, alignItems: "center" }}>
                  <select
                    className="select"
                    style={{ flex: 1, minWidth: 200, marginTop: 0 }}
                    value={form.music || ""}
                    onChange={(e) => setForm((f) => ({ ...f, music: e.target.value, musicUrl: "" }))}
                  >
                    {form.music && !REPERTOIRE.includes(form.music) && <option value={form.music}>{form.music}</option>}
                    {REPERTOIRE.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <label className="share-btn" style={{ cursor: "pointer" }}>
                    {t("admin.paneles.uploadMusic")}
                    <input type="file" accept="audio/mpeg,.mp3" onChange={onPickMusic} style={{ display: "none" }} />
                  </label>
                </div>
                {form.musicUrl && <audio controls src={form.musicUrl} style={{ height: 34, marginTop: 8, maxWidth: "100%" }} />}
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="label">{t("admin.paneles.paymentQr")}</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
                  <label className="share-btn" style={{ cursor: "pointer" }}>
                    {t("admin.paneles.uploadImage")}
                    <input type="file" accept="image/*" onChange={onPickQr} style={{ display: "none" }} />
                  </label>
                  {form.paymentQr && form.paymentQr.startsWith("data:") && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={form.paymentQr} alt="QR" width={54} height={54} style={{ borderRadius: 8, border: "1px solid var(--brand100)" }} />
                  )}
                  {form.paymentQr && (
                    <button type="button" onClick={() => setForm((f) => ({ ...f, paymentQr: "" }))} style={{ border: "none", background: "transparent", color: "#b91c1c", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                      {t("admin.paneles.removeImage")}
                    </button>
                  )}
                </div>
                <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>{t("admin.paneles.paymentQrHelp")}</p>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="label">{t("admin.paneles.albumUrl")}</label>
                <input className="input" value={form.albumUrl} onChange={set("albumUrl")} placeholder={t("admin.paneles.albumUrlPh")} />
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

            {current.event.slug && (
              <div style={{ marginTop: 16 }}>
                <label className="label">{t("admin.paneles.publicLink")}</label>
                <div className="access-field" style={{ display: "flex", alignItems: "center", gap: 8, wordBreak: "break-all" }}>
                  <a href={`/i/${current.event.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand700)", fontWeight: 600 }}>
                    /i/{current.event.slug}
                  </a>
                </div>
              </div>
            )}

            {/* Gift registry managed from the admin */}
            <div style={{ marginTop: 16 }}>
              <label className="label">{t("admin.paneles.giftsTitle")}</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
                {(current.event.gifts || []).map((g) => (
                  <div key={g.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, border: "1px solid var(--brand100)", borderRadius: 10, padding: "8px 12px" }}>
                    <span style={{ fontSize: 14, color: "#1c1917" }}>
                      {g.name}{g.reservedBy ? <span style={{ color: "#15803d", fontSize: 12 }}> · {g.reservedBy}</span> : null}
                    </span>
                    <button onClick={() => removeGiftAdmin(g.id)} disabled={pending} title="✕" style={{ border: "none", background: "transparent", color: "#b91c1c", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>✕</button>
                  </div>
                ))}
                {(current.event.gifts || []).length === 0 && (
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>{t("admin.paneles.noGifts")}</p>
                )}
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    style={{ flex: 1, marginTop: 0 }}
                    value={giftName}
                    onChange={(e) => setGiftName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGiftAdmin(); } }}
                    placeholder={t("admin.paneles.giftPh")}
                  />
                  <button onClick={addGiftAdmin} disabled={pending || !giftName.trim()} className="share-btn share-btn--wa" style={{ border: "none", cursor: pending || !giftName.trim() ? "not-allowed" : "pointer", opacity: pending || !giftName.trim() ? 0.6 : 1 }}>
                    {t("admin.paneles.addGift")}
                  </button>
                </div>
              </div>
            </div>

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
