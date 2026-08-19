"use client";

import { useRef, useState, useTransition } from "react";
import { saveTemplatePage, clearTemplatePage } from "@/app/admin/actions";
import { TEMPLATES } from "@/lib/templates";
import { useI18n } from "@/components/I18nProvider";

/* The public page shows a four-thumbnail strip beside the main poster, so the
   editor exposes exactly four shot slots — the same fixed count as the design. */
const SHOT_SLOTS = 4;
const EMPTY_ROW = { theme: "DARK", backgroundBlur: 3, backgroundUrl: "", mainImageUrl: "", shots: ["", "", "", ""] };

async function uploadFile(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!data.ok || !data.url) throw new Error(data.error || "upload_failed");
  return data.url;
}

/** One upload square. `wide` is for the ambient background, which is landscape
    rather than portrait like the poster and the shots. */
function Slot({ label, url, busy, wide, onPick, onClear, t }) {
  const inputRef = useRef(null);

  return (
    <div className={`tpl-admin-slot ${wide ? "tpl-admin-slot--wide" : ""}`}>
      <span className="tpl-admin-slot__label">{label}</span>
      <button
        type="button"
        className="tpl-admin-slot__box"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        title={label}
      >
        {url ? <img src={url} alt="" /> : <span>{busy ? "…" : "+"}</span>}
      </button>
      {url && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClear} disabled={busy}>
          {t("admin.plantillas.remove")}
        </button>
      )}
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
    </div>
  );
}

export default function TemplatePagesEditor({ pages }) {
  const { t } = useI18n();
  const [, start] = useTransition();
  const [busyKey, setBusyKey] = useState(null);
  const [msg, setMsg] = useState(null);

  // Local mirror of the DB rows, prefilled with an empty shape for templates
  // that have no row yet, so every card renders the same way.
  const [rows, setRows] = useState(() => {
    const map = {};
    for (const tpl of TEMPLATES) {
      const p = pages[tpl.slug];
      map[tpl.slug] = p
        ? {
            theme: p.theme || "DARK",
            backgroundBlur: p.backgroundBlur ?? 3,
            backgroundUrl: p.backgroundUrl || "",
            mainImageUrl: p.mainImageUrl || "",
            shots: Array.from({ length: SHOT_SLOTS }, (_, i) => p.shots?.[i] || ""),
          }
        : { ...EMPTY_ROW, shots: [...EMPTY_ROW.shots] };
    }
    return map;
  });

  /** Flattens the local shape into the columns the Server Action expects. */
  function toPayload(slug, row) {
    return {
      slug,
      theme: row.theme,
      backgroundBlur: row.backgroundBlur,
      backgroundUrl: row.backgroundUrl,
      mainImageUrl: row.mainImageUrl,
      shot1Url: row.shots[0] || "",
      shot2Url: row.shots[1] || "",
      shot3Url: row.shots[2] || "",
      shot4Url: row.shots[3] || "",
    };
  }

  /* Every edit persists immediately — same behaviour as the Home media editor,
     so there is never an unsaved state to lose. */
  function persist(slug, next, key) {
    setBusyKey(key);
    setMsg(null);
    start(async () => {
      try {
        await saveTemplatePage(toPayload(slug, next));
        setRows((r) => ({ ...r, [slug]: next }));
        setMsg({ ok: true });
      } catch {
        setMsg({ ok: false });
      } finally {
        setBusyKey(null);
      }
    });
  }

  function onPickImage(slug, field, file, shotIndex = null) {
    const key = `${slug}-${field}${shotIndex ?? ""}`;
    setBusyKey(key);
    setMsg(null);
    start(async () => {
      try {
        const url = await uploadFile(file);
        const row = rows[slug];
        const next =
          shotIndex === null
            ? { ...row, [field]: url }
            : { ...row, shots: row.shots.map((s, i) => (i === shotIndex ? url : s)) };
        await saveTemplatePage(toPayload(slug, next));
        setRows((r) => ({ ...r, [slug]: next }));
        setMsg({ ok: true });
      } catch {
        setMsg({ ok: false });
      } finally {
        setBusyKey(null);
      }
    });
  }

  function onClearImage(slug, field, shotIndex = null) {
    const row = rows[slug];
    const next =
      shotIndex === null
        ? { ...row, [field]: "" }
        : { ...row, shots: row.shots.map((s, i) => (i === shotIndex ? "" : s)) };
    persist(slug, next, `${slug}-${field}${shotIndex ?? ""}`);
  }

  /* The readout follows the thumb immediately, but the write waits for the
     slider to settle. Debouncing rather than listening for pointer release,
     because a drag that ends outside the input never fires mouseup on it. */
  const blurTimers = useRef({});
  function onBlurChange(slug, backgroundBlur) {
    const next = { ...rows[slug], backgroundBlur };
    setRows((r) => ({ ...r, [slug]: next }));
    clearTimeout(blurTimers.current[slug]);
    blurTimers.current[slug] = setTimeout(() => persist(slug, next, `${slug}-blur`), 450);
  }

  function onTheme(slug, theme) {
    persist(slug, { ...rows[slug], theme }, `${slug}-theme`);
  }

  /** Wipes the whole row, returning the page to its built-in gradient poster. */
  function onResetTemplate(slug) {
    setBusyKey(`${slug}-reset`);
    start(async () => {
      try {
        await clearTemplatePage(slug);
        setRows((r) => ({ ...r, [slug]: { ...EMPTY_ROW, shots: [...EMPTY_ROW.shots] } }));
        setMsg({ ok: true });
      } catch {
        setMsg({ ok: false });
      } finally {
        setBusyKey(null);
      }
    });
  }

  return (
    <div className="tpl-admin">
      <div className="tpl-admin__bar">
        <p className="admin-card__hint">{t("admin.plantillas.intro")}</p>
        {/* The public catalogue is admin-only now, and nothing else links to
           it — visitors reach templates from the Home gallery instead. */}
        <a className="tpl-admin__catalog" href="/templates" target="_blank" rel="noopener noreferrer">
          {t("admin.plantillas.viewCatalog")}
        </a>
        {msg && (
          <span className="tpl-admin__msg" style={{ color: msg.ok ? "var(--gold-deep)" : "#dc2626" }}>
            {msg.ok ? t("admin.plantillas.saved") : t("admin.plantillas.error")}
          </span>
        )}
      </div>

      {TEMPLATES.map((tpl) => {
        const row = rows[tpl.slug];
        return (
          <div className="admin-card tpl-admin-card" key={tpl.slug}>
            <div className="tpl-admin-card__head">
              <span className="tpl-admin-card__swatch" style={{ background: tpl.grad }} />
              <span className="tpl-admin-card__name">
                <strong>{tpl.name}</strong>
                <small>{tpl.code}</small>
              </span>

              <label className="tpl-admin-card__theme">
                {t("admin.plantillas.theme")}
                <select
                  value={row.theme}
                  onChange={(e) => onTheme(tpl.slug, e.target.value)}
                  disabled={busyKey === `${tpl.slug}-theme`}
                >
                  <option value="DARK">{t("admin.plantillas.dark")}</option>
                  <option value="LIGHT">{t("admin.plantillas.light")}</option>
                </select>
              </label>

              <label className="tpl-admin-card__blur">
                {t("admin.plantillas.sharpness")}
                <input
                  type="range"
                  min="0"
                  max="24"
                  step="1"
                  value={row.backgroundBlur}
                  onChange={(e) => onBlurChange(tpl.slug, Number(e.target.value))}
                />
                <span className="tpl-admin-card__blur-val">{row.backgroundBlur}px</span>
              </label>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => onResetTemplate(tpl.slug)}
                disabled={busyKey === `${tpl.slug}-reset`}
              >
                {t("admin.plantillas.reset")}
              </button>
            </div>

            <div className="tpl-admin-card__slots">
              <Slot
                label={t("admin.plantillas.background")}
                url={row.backgroundUrl}
                busy={busyKey === `${tpl.slug}-backgroundUrl`}
                wide
                onPick={(f) => onPickImage(tpl.slug, "backgroundUrl", f)}
                onClear={() => onClearImage(tpl.slug, "backgroundUrl")}
                t={t}
              />
              <Slot
                label={t("admin.plantillas.main")}
                url={row.mainImageUrl}
                busy={busyKey === `${tpl.slug}-mainImageUrl`}
                onPick={(f) => onPickImage(tpl.slug, "mainImageUrl", f)}
                onClear={() => onClearImage(tpl.slug, "mainImageUrl")}
                t={t}
              />
              {Array.from({ length: SHOT_SLOTS }, (_, i) => (
                <Slot
                  key={i}
                  label={t("admin.plantillas.shot", { n: i + 1 })}
                  url={row.shots[i]}
                  busy={busyKey === `${tpl.slug}-shots${i}`}
                  onPick={(f) => onPickImage(tpl.slug, "shots", f, i)}
                  onClear={() => onClearImage(tpl.slug, "shots", i)}
                  t={t}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
