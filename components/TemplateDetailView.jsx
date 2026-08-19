"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import TemplateContact from "./TemplateContact";
import { useI18n } from "./I18nProvider";

/* The five perks every template ships with — the same list for the whole
   catalogue, so it lives here rather than per template in lib/templates.js. */
const INCLUDES = [
  { key: "incMusic", icon: "music" },
  { key: "incCountdown", icon: "calendarCheck" },
  { key: "incMap", icon: "mapPin" },
  { key: "incGallery", icon: "camera" },
  { key: "incRsvp", icon: "checkCircle" },
];

/** Returns to wherever the visitor came from — normally the Home gallery they
    tapped the template in, with their scroll position intact. Falls back to
    the Home for deep links (shared URL, search result, new tab). */
function BackLink({ label }) {
  const router = useRouter();

  function onClick(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let the browser open a new tab
    e.preventDefault();
    if (window.history.length > 1) router.back();
    else router.push("/#plantillas");
  }

  return (
    <a href="/#plantillas" className="tplp__back" onClick={onClick}>
      <Icon name="arrowLeft" size={16} /> {label}
    </a>
  );
}

/* Small marks that label the panel rows. They stay local to this file rather
   than joining components/Icon.jsx: that set is the app-wide UI vocabulary,
   while these are page decoration at a lighter stroke. */
const CrownGlyph = () => (
  <svg className="tplp__glyph" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6.5 6 13h8l3-6.5-4 2.6L10 4 7.4 9.1z" />
    <path d="M6.2 15.6h7.6" />
  </svg>
);

const LeafGlyph = () => (
  <svg className="tplp__glyph" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 4c0 6.4-3.6 10-9.4 10C4.5 14 4 12.2 4 10.6 4 6.7 8.6 4 16 4z" />
    <path d="M13.4 6.6 4.6 16" />
  </svg>
);

/** Botanical corner flourish, bled off the panel edge at low opacity so it
    reads as watermark rather than content. Purely decorative. */
const PanelFiligree = () => (
  <svg className="tplp__filigree" viewBox="0 0 140 140" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
    <path d="M138 6c-30 4-52 18-66 42-9 15-13 32-14 52" />
    <path d="M118 14c2 9 8 14 17 15-3-9-9-14-17-15z" />
    <path d="M112 20c-8 4-11 11-9 20 7-4 10-11 9-20z" />
    <path d="M96 38c3 9 9 13 18 13-4-9-10-13-18-13z" />
    <path d="M90 45c-8 5-10 12-7 21 6-5 9-12 7-21z" />
    <path d="M76 66c2 9 8 13 17 13-4-9-9-13-17-13z" />
    <path d="M71 74c-8 5-10 12-7 21 6-5 9-13 7-21z" />
    <circle cx="131" cy="9" r="1.8" fill="currentColor" stroke="none" />
  </svg>
);

/** Ornate rule between the description and the specification list: an outlined
    heart with diamonds and dots either side. Drawn rather than typed, because
    the ♥ character renders differently on every platform and reads flat. */
const DividerOrnament = () => (
  <svg className="tplp__divider-orn" viewBox="0 0 76 18" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M38 14.6s-6.3-3.8-6.3-7.9a3.2 3.2 0 0 1 6.3-1.4 3.2 3.2 0 0 1 6.3 1.4c0 4.1-6.3 7.9-6.3 7.9z" />
    <path d="M24.4 6.6 26.8 9l-2.4 2.4L22 9z" fill="currentColor" stroke="none" opacity=".8" />
    <path d="M51.6 6.6 54 9l-2.4 2.4L49.2 9z" fill="currentColor" stroke="none" opacity=".8" />
    <circle cx="14" cy="9" r="1" fill="currentColor" stroke="none" opacity=".55" />
    <circle cx="62" cy="9" r="1" fill="currentColor" stroke="none" opacity=".55" />
  </svg>
);

/** Gold sprig that flanks the main call to action, mirrored on the right.
    Drawn inline (not in components/Icon.jsx) because it is decoration for
    this one button, at a hairline weight the shared icon set does not use. */
const CtaFlourish = ({ side }) => (
  <svg
    className={`tplp__cta-orn tplp__cta-orn--${side}`}
    viewBox="0 0 54 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M52 16c-8 0-13 2-16 6-2-5 0-10 6-12" />
    <path d="M52 16c-8 0-13-2-16-6-2 5 0 10 6 12" />
    <path d="M36 16H14" />
    <path d="M14 16c-3-4-7-5-11-3 2 4 6 5 11 3z" />
    <path d="M14 16c-3 4-7 5-11 3 2-4 6-5 11-3z" />
    <circle cx="36" cy="16" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

/** The poster itself: an uploaded image when the admin has set one, otherwise
    the catalogue's built-in gradient — so a template with no artwork yet still
    looks deliberate rather than broken. */
function Poster({ template, src }) {
  if (src) return <img src={src} alt={template.name} className="tplp__poster-img" />;
  return (
    <div className="tplp__poster-fallback" style={{ background: template.grad, color: template.ink }}>
      <span className="tplp__poster-rule" style={{ borderColor: template.ink }} />
      <span className="tplp__poster-brand">Onvite</span>
      <span className="serif tplp__poster-name">{template.name}</span>
      <span className="tplp__poster-dash" style={{ background: template.ink }} />
    </div>
  );
}

export default function TemplateDetailView({ template, page }) {
  const { t } = useI18n();

  // The stage starts on the main image and the strip swaps it. `null` means
  // "the main one", so the poster falls back correctly when nothing is set.
  const [activeShot, setActiveShot] = useState(null);
  const [zoomed, setZoomed] = useState(false);

  const shots = page?.shots || [];
  const mainSrc = page?.mainImageUrl || shots[0] || null;
  const stageSrc = activeShot ?? mainSrc;
  const theme = (page?.theme || "DARK").toLowerCase();

  /* The shared site footer sits outside this section but on top of its fixed
     artwork, so it needs to know it is over a themed page. A body class is the
     only hook available from here — the footer is a sibling of <main>. */
  useEffect(() => {
    const marks = ["tplp-page", `tplp-page--${theme}`];
    document.body.classList.add(...marks);
    return () => document.body.classList.remove(...marks);
  }, [theme]);

  return (
    // The admin-set blur travels as a CSS variable rather than an inline
    // filter, so the stylesheet keeps ownership of how it is applied.
    <div
      className={`tplp tplp--${theme}`}
      style={{ "--p-blur": `${page?.backgroundBlur ?? 3}px` }}
    >
      {page?.backgroundUrl && (
        <div
          className="tplp__bg"
          style={{ backgroundImage: `url(${page.backgroundUrl})` }}
          aria-hidden="true"
        />
      )}
      <div className="tplp__veil" aria-hidden="true" />

      <div className="tplp__inner">
        <BackLink label={t("detail.back")} />

        <div className="tplp__grid">
          {/* ---- Left: thumbnail strip + stage ---- */}
          <div className="tplp__left">
            {shots.length > 0 && (
              <div className="tplp__strip">
                {shots.map((src, i) => {
                  const active = stageSrc === src;
                  return (
                    <button
                      key={src + i}
                      type="button"
                      className={`tplp__thumb ${active ? "is-active" : ""}`}
                      onClick={() => setActiveShot(src)}
                      aria-label={`${template.name} ${i + 1}`}
                    >
                      <img src={src} alt="" />
                      {active && (
                        <span className="tplp__thumb-check" aria-hidden="true">
                          <Icon name="check" size={12} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="tplp__stage">
              <div className="tplp__frame">
                {stageSrc && (
                  <button
                    type="button"
                    className="tplp__expand"
                    onClick={() => setZoomed(true)}
                    aria-label={t("detail.expand")}
                  >
                    <Icon name="plus" size={16} />
                  </button>
                )}

                <Poster template={template} src={stageSrc} />

                {/* Placeholder for the future demo route: it opens the zoom
                    view for now, so the control is never dead. Swap this
                    handler for a <Link> once a demo invitation exists. */}
                <button
                  type="button"
                  className="tplp__demo"
                  onClick={() => stageSrc && setZoomed(true)}
                >
                  <Icon name="play" size={14} /> {t("detail.demo")}
                </button>
              </div>

            </div>
          </div>

          {/* ---- Right: information panel ---- */}
          <aside className="tplp__panel">
            <PanelFiligree />
            {template.best && (
              <span className="tplp__best">
                <CrownGlyph /> {t("templates.bestBadge")}
              </span>
            )}

            <h1 className="serif tplp__title">{template.name}</h1>
            <p className="tplp__desc">{t(`templateDesc.${template.slug}`)}</p>

            <div className="tplp__divider" aria-hidden="true">
              <span className="line" />
              <DividerOrnament />
              <span className="line" />
            </div>

            <div className="tplp__meta">
              <span className="tplp__meta-label"><CrownGlyph /> {t("detail.format")}</span>
              <p className="tplp__meta-value">
                <Icon name="layout" size={15} /> {t(`templates.formats.${template.format}`)}
              </p>
            </div>

            <div className="tplp__meta">
              <span className="tplp__meta-label"><LeafGlyph /> {t("detail.style")}</span>
              <div className="tplp__pills">
                {template.styles.map((s, i) => (
                  <span key={s} className={`tplp__pill ${i === 0 ? "is-lead" : ""}`}>
                    {t(`templates.styles.${s}`)}
                  </span>
                ))}
              </div>
            </div>

            <div className="tplp__meta">
              <span className="tplp__meta-label">{t("detail.colors")}</span>
              <div className="tplp__swatches">
                {template.palette.map((c) => (
                  <span key={c} className="tplp__swatch" style={{ background: c }} title={c} />
                ))}
              </div>
            </div>

            <div className="tplp__meta">
              <span className="tplp__meta-label">{t("detail.includesTitle")}</span>
              <div className="tplp__includes">
                {INCLUDES.map((it) => (
                  <span className="tplp__include" key={it.key}>
                    <Icon name={it.icon} size={17} />
                    <span>{t(`detail.${it.key}`)}</span>
                  </span>
                ))}
              </div>
            </div>

            <Link href={`/book?template=${template.slug}`} className="tplp__cta">
              <CtaFlourish side="left" />
              <span className="tplp__cta-text">
                {t("detail.customize")} <Icon name="arrowRight" size={17} />
              </span>
              <CtaFlourish side="right" />
            </Link>

          </aside>
        </div>

        <TemplateContact />
      </div>

      {zoomed && stageSrc && (
        <div className="tplp__zoom" role="dialog" aria-modal="true" onClick={() => setZoomed(false)}>
          <button type="button" className="tplp__zoom-close" aria-label={t("detail.close")}>
            <Icon name="x" size={20} />
          </button>
          <img src={stageSrc} alt={template.name} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
