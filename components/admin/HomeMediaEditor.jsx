"use client";

import { useRef, useState, useTransition } from "react";
import { saveHomeMedia, clearHomeMedia, saveGalleryFeatures } from "@/app/admin/actions";
import { TEMPLATES } from "@/lib/templates";
import { useI18n } from "@/components/I18nProvider";

const CARD_SLOTS = 8; // matches lib/home-data.js SHOWCASE_CARDS
const ENVELOPE_SLOTS = 8; // matches lib/home-data.js SHOWCASE_ENVELOPES

function keyOf(kind, position) {
  return `${kind}-${position}`;
}

async function uploadFile(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!data.ok || !data.url) throw new Error(data.error || "upload_failed");
  return data.url;
}

function MediaSlot({ kind, position, entry, onPicked, onCleared, busy, t }) {
  const inputRef = useRef(null);

  function onFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) onPicked(kind, position, file);
  }

  return (
    <div className="home-media-slot">
      <div className="home-media-slot__preview">
        {entry?.imageUrl ? (
          <img src={entry.imageUrl} alt="" />
        ) : (
          <span className="home-media-slot__placeholder">{t("admin.inicio.slot", { n: position + 1 })}</span>
        )}
      </div>
      <div className="home-media-slot__actions">
        <button type="button" className="btn btn-outline btn-sm" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? t("admin.inicio.uploading") : t("admin.inicio.upload")}
        </button>
        {entry?.imageUrl && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onCleared(kind, position)} disabled={busy}>
            {t("admin.inicio.remove")}
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
    </div>
  );
}

/** One of the two mock-up image pickers on a gallery-card row. */
function GalleryImagePick({ label, url, busy, onPick }) {
  const inputRef = useRef(null);
  return (
    <button
      type="button"
      className="home-gallery-picker__img"
      title={label}
      onClick={() => inputRef.current?.click()}
      disabled={busy}
    >
      {url ? <img src={url} alt="" /> : <span>{busy ? "…" : label}</span>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (f) onPick(f);
        }}
      />
    </button>
  );
}

export default function HomeMediaEditor({ media, features }) {
  const { t } = useI18n();
  const [pending, start] = useTransition();
  const [busyKey, setBusyKey] = useState(null);
  const [msg, setMsg] = useState(null);

  const [mediaMap, setMediaMap] = useState(() => {
    const map = {};
    for (const m of media) map[keyOf(m.kind, m.position)] = { imageUrl: m.imageUrl, label: m.label };
    return map;
  });

  const [selection, setSelection] = useState(() =>
    features.length
      ? features.map((f) => ({ slug: f.slug, trending: f.trending, imageUrl: f.imageUrl, imageUrlBack: f.imageUrlBack }))
      : TEMPLATES.slice(0, 6).map((tpl) => ({ slug: tpl.slug, trending: !!tpl.best, imageUrl: "", imageUrlBack: "" }))
  );

  function toggleSelected(slug) {
    setSelection((sel) =>
      sel.some((s) => s.slug === slug)
        ? sel.filter((s) => s.slug !== slug)
        : [...sel, { slug, trending: false, imageUrl: "", imageUrlBack: "" }]
    );
  }
  function toggleTrending(slug) {
    setSelection((sel) => sel.map((s) => (s.slug === slug ? { ...s, trending: !s.trending } : s)));
  }

  /** Uploads and stores one of a gallery card's two mock-up images. */
  function onPickGalleryImage(slug, field, file) {
    const k = `gal-${slug}-${field}`;
    setBusyKey(k);
    setMsg(null);
    start(async () => {
      try {
        const url = await uploadFile(file);
        setSelection((sel) => sel.map((s) => (s.slug === slug ? { ...s, [field]: url } : s)));
      } catch {
        setMsg({ ok: false });
      } finally {
        setBusyKey(null);
      }
    });
  }

  function onPicked(kind, position, file) {
    const k = keyOf(kind, position);
    setBusyKey(k);
    setMsg(null);
    start(async () => {
      try {
        const url = await uploadFile(file);
        const res = await saveHomeMedia({ kind, position, imageUrl: url });
        if (res.ok) setMediaMap((m) => ({ ...m, [k]: { imageUrl: url, label: "" } }));
      } catch {
        setMsg({ ok: false });
      } finally {
        setBusyKey(null);
      }
    });
  }

  function onCleared(kind, position) {
    const k = keyOf(kind, position);
    setBusyKey(k);
    start(async () => {
      await clearHomeMedia(kind, position);
      setMediaMap((m) => { const n = { ...m }; delete n[k]; return n; });
      setBusyKey(null);
    });
  }

  function onSaveGallery() {
    setMsg(null);
    start(async () => {
      const list = selection.map((s, i) => ({
        slug: s.slug,
        position: i,
        trending: s.trending,
        imageUrl: s.imageUrl || null,
        imageUrlBack: s.imageUrlBack || null,
      }));
      const res = await saveGalleryFeatures(list);
      setMsg(res);
    });
  }

  return (
    <div style={{ display: "grid", gap: 24, marginTop: 8 }}>
      <div className="admin-card">
        <h2 className="serif admin-card__title">{t("admin.inicio.cardsTitle")}</h2>
        <p className="admin-card__hint">{t("admin.inicio.cardsBody")}</p>
        <div className="home-media-grid">
          {Array.from({ length: CARD_SLOTS }, (_, i) => (
            <MediaSlot
              key={i}
              kind="SHOWCASE_CARD"
              position={i}
              entry={mediaMap[keyOf("SHOWCASE_CARD", i)]}
              busy={busyKey === keyOf("SHOWCASE_CARD", i)}
              onPicked={onPicked}
              onCleared={onCleared}
              t={t}
            />
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2 className="serif admin-card__title">{t("admin.inicio.envelopesTitle")}</h2>
        <p className="admin-card__hint">{t("admin.inicio.envelopesBody")}</p>
        <div className="home-media-grid">
          {Array.from({ length: ENVELOPE_SLOTS }, (_, i) => (
            <MediaSlot
              key={i}
              kind="SHOWCASE_ENVELOPE"
              position={i}
              entry={mediaMap[keyOf("SHOWCASE_ENVELOPE", i)]}
              busy={busyKey === keyOf("SHOWCASE_ENVELOPE", i)}
              onPicked={onPicked}
              onCleared={onCleared}
              t={t}
            />
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2 className="serif admin-card__title">{t("admin.inicio.phoneTitle")}</h2>
        <p className="admin-card__hint">{t("admin.inicio.phoneBody")}</p>
        <div className="home-media-grid home-media-grid--single">
          <MediaSlot
            kind="PHONE_MOCK"
            position={0}
            entry={mediaMap[keyOf("PHONE_MOCK", 0)]}
            busy={busyKey === keyOf("PHONE_MOCK", 0)}
            onPicked={onPicked}
            onCleared={onCleared}
            t={t}
          />
        </div>
      </div>

      <div className="admin-card">
        <h2 className="serif admin-card__title">{t("admin.inicio.galleryTitle")}</h2>
        <p className="admin-card__hint">{t("admin.inicio.galleryBody")}</p>
        <div className="home-gallery-picker">
          {TEMPLATES.map((tpl) => {
            const sel = selection.find((s) => s.slug === tpl.slug);
            return (
              <div key={tpl.slug} className="home-gallery-picker__row">
                <span className="home-gallery-picker__swatch" style={{ background: tpl.grad }} />
                <span className="home-gallery-picker__name">{tpl.name}</span>
                <label className="home-gallery-picker__check">
                  <input type="checkbox" checked={!!sel} onChange={() => toggleSelected(tpl.slug)} />
                  {t("admin.inicio.featured")}
                </label>
                <label className="home-gallery-picker__check">
                  <input type="checkbox" checked={!!sel?.trending} disabled={!sel} onChange={() => toggleTrending(tpl.slug)} />
                  {t("admin.inicio.trending")}
                </label>
                {sel && (
                  <span className="home-gallery-picker__imgs">
                    <GalleryImagePick
                      label={t("admin.inicio.imageFront")}
                      url={sel.imageUrl}
                      busy={busyKey === `gal-${tpl.slug}-imageUrl`}
                      onPick={(f) => onPickGalleryImage(tpl.slug, "imageUrl", f)}
                    />
                    <GalleryImagePick
                      label={t("admin.inicio.imageBack")}
                      url={sel.imageUrlBack}
                      busy={busyKey === `gal-${tpl.slug}-imageUrlBack`}
                      onPick={(f) => onPickGalleryImage(tpl.slug, "imageUrlBack", f)}
                    />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <button type="button" className="btn btn-dark" style={{ marginTop: 16 }} onClick={onSaveGallery} disabled={pending}>
          {pending ? t("admin.inicio.saving") : t("admin.inicio.save")}
        </button>
        {msg && <span style={{ marginLeft: 12, fontSize: 13, color: msg.ok ? "var(--gold-deep)" : "#dc2626" }}>{msg.ok ? t("admin.inicio.saved") : "Error"}</span>}
      </div>
    </div>
  );
}
