"use client";

import { useState } from "react";
import Icon from "./Icon";
import { useI18n } from "./I18nProvider";

export default function Faq() {
  const { t } = useI18n();
  const items = t("home.faq.items");
  const [open, setOpen] = useState(0);

  return (
    <div className="faq">
      {(Array.isArray(items) ? items : []).map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="faq__item" key={i} data-open={isOpen}>
            <button className="faq__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              {item.q}
              <Icon name="chevronDown" size={18} className="chev" />
            </button>
            {isOpen && <p className="faq__a">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
