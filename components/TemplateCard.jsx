"use client";

import Link from "next/link";
import Icon from "./Icon";
import { useI18n } from "./I18nProvider";

/**
 * TemplateCard — preview card for a wedding design.
 * Mirrors OnviteTplCard.dc.html (gradient poster + best-seller flag + CTA).
 */
export default function TemplateCard({ template }) {
  const { t } = useI18n();
  const { slug, name, grad, ink, best, code } = template;
  const desc = t(`templateDesc.${slug}`);
  return (
    <Link href={`/templates/${slug}`} className="tpl-card">
      <div className="tpl-card__poster" style={{ background: grad, color: ink }}>
        {best && <span className="tpl-card__badge">{t("templates.bestBadge")}</span>}
        <div className="tpl-card__frame" style={{ borderColor: ink }} />
        <div className="tpl-card__center">
          <span className="tpl-card__kicker">Onvite</span>
          <span className="serif tpl-card__name">{name}</span>
          <span className="tpl-card__rule" style={{ background: ink }} />
        </div>
      </div>
      <div className="tpl-card__body">
        <h3 className="serif tpl-card__title">{name}</h3>
        {code && <p className="tpl-code">{t("templates.templateId")}: {code}</p>}
        <p className="tpl-card__desc">{desc}</p>
        <span className="tpl-card__cta">
          {t("templates.viewTemplate")} <Icon name="arrowUpRight" size={14} />
        </span>
      </div>
    </Link>
  );
}
