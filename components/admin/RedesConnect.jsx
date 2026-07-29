"use client";

import { useState, useTransition } from "react";
import { setSocialConnected } from "@/app/admin/actions";
import { useI18n } from "@/components/I18nProvider";

const NETWORKS = [
  { slug: "facebook", label: "Facebook" },
  { slug: "instagram", label: "Instagram" },
  { slug: "tiktok", label: "TikTok" },
  { slug: "youtube", label: "YouTube" },
  { slug: "x", label: "X (Twitter)" },
  { slug: "telegram", label: "Telegram" },
];

export default function RedesConnect({ connections = [] }) {
  const { t } = useI18n();
  const initial = Object.fromEntries(connections.map((c) => [c.network, c.connected]));
  const [state, setState] = useState(() => Object.fromEntries(NETWORKS.map((n) => [n.slug, !!initial[n.slug]])));
  const [pending, start] = useTransition();

  function toggle(slug) {
    const next = !state[slug];
    setState((s) => ({ ...s, [slug]: next }));
    start(async () => {
      try {
        await setSocialConnected(slug, next);
      } catch {
        setState((s) => ({ ...s, [slug]: !next })); // revert on failure
      }
    });
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {NETWORKS.map((n) => {
        const on = state[n.slug];
        return (
          <button
            key={n.slug}
            type="button"
            onClick={() => toggle(n.slug)}
            disabled={pending}
            className="connect-pill"
            style={{
              cursor: "pointer",
              border: on ? "1px solid var(--brand500)" : undefined,
              background: on ? "var(--brand50)" : undefined,
              color: on ? "var(--brand700)" : undefined,
              fontWeight: on ? 700 : undefined,
            }}
          >
            {on ? `✓ ${n.label} · ${t("admin.redes.connected")}` : `+ ${t("admin.redes.connect")} ${n.label}`}
          </button>
        );
      })}
    </div>
  );
}
