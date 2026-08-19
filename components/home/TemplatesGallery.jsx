"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import { useI18n } from "@/components/I18nProvider";
import { TEMPLATES } from "@/lib/templates";

// Fallback when the admin hasn't picked anything yet in /admin/inicio:
// the first 6 of the real catalogue (leads with the 4 best-sellers).
const DEFAULT_FEATURED = TEMPLATES.slice(0, 6);

function GalleryCard({ template, index, best, imageUrl, imageUrlBack }) {
  const { t } = useI18n();
  const desc = t(`templateDesc.${template.slug}`);

  return (
    <motion.div
      className="tpl-item"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
    >
      <Link href={`/templates/${template.slug}`} className="tpl-preview">
        {best && (
          <span className="badge-best"><span className="star">★</span> {t("templates.bestBadge")}</span>
        )}
        <span className="eye-icon" aria-hidden="true"><Icon name="arrowUpRight" size={15} /></span>

        {/* Each mock-up shows a real uploaded invitation when the admin has set
            one, and falls back to the catalogue's CSS gradient preview when
            not — the two are independent, so a card can be half-filled. */}
        <div className="phone-mock phone-mock-lg">
          {imageUrl ? (
            <img src={imageUrl} alt="" className="mock-img" />
          ) : (
            <div className="mock-screen" style={{ background: template.grad }}>
              <span className="m-top" style={{ color: template.ink }}>{template.name.toUpperCase()}</span>
              <span className="m-names" style={{ color: template.ink }}>{template.name}</span>
              <span className="m-date" style={{ color: template.ink }}>ONVITE</span>
              <span className="m-dots">
                <span className="active" /><span /><span /><span />
              </span>
            </div>
          )}
        </div>
        <div className="phone-mock phone-mock-sm">
          {imageUrlBack ? (
            <img src={imageUrlBack} alt="" className="mock-img" />
          ) : (
            <div className="mock-screen" style={{ background: template.grad }}>
              <span className="m-btn" style={{ color: template.ink }}>CONFIRM ATTENDANCE</span>
              <span className="m-dots">
                <span /><span className="active" /><span /><span />
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="tpl-info">
        <h3 className="serif">{template.name}</h3>
        {template.code && <p className="tpl-code">{t("templates.templateId")}: {template.code}</p>}
        <p className="tpl-desc">{desc}</p>
        <Link href={`/templates/${template.slug}`} className="ver-tema">
          {t("templates.viewTemplate").toUpperCase()} <Icon name="arrowUpRight" size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function TemplatesGallery({ featured }) {
  const { t } = useI18n();

  // Admin picks (lib/home-queries.js) resolve to real catalog entries; a
  // slug that no longer exists in the catalog is silently skipped. Empty
  // selection (nothing picked yet, or every pick was invalid) falls back to
  // the default first-6 with the catalog's own `best` flag.
  const items = featured?.length
    ? featured
        .map((f) => {
          const tpl = TEMPLATES.find((t2) => t2.slug === f.slug);
          return tpl ? { tpl, best: f.trending, imageUrl: f.imageUrl, imageUrlBack: f.imageUrlBack } : null;
        })
        .filter(Boolean)
    : DEFAULT_FEATURED.map((tpl) => ({ tpl, best: !!tpl.best }));

  return (
    <section className="plantillas-section">
      <h2 className="serif">{t("home.templatesPreview.title")}</h2>
      <p className="sub-desc">{t("home.templatesPreview.subtitle")}</p>
      <div className="gold-line" />

      <div className="tpl-grid">
        {items.map(({ tpl, best, imageUrl, imageUrlBack }, i) => (
          <GalleryCard
            key={tpl.slug}
            template={tpl}
            index={i}
            best={best}
            imageUrl={imageUrl}
            imageUrlBack={imageUrlBack}
          />
        ))}
      </div>
    </section>
  );
}
