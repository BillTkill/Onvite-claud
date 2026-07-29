"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";

/** "Datos extra" cell: green if the client left a note, red if not. */
export default function UserNote({ note }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  if (!note) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#b91c1c", fontWeight: 600 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
        {t("admin.usuarios.noExtra")}
      </span>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
          border: "1px solid #86efac", background: "#dcfce7", color: "#15803d", borderRadius: 999, padding: "3px 10px",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
        {t("admin.usuarios.hasExtra")}
      </button>
      {open && (
        <div
          style={{
            position: "absolute", zIndex: 10, marginTop: 6, left: 0, minWidth: 220, maxWidth: 300,
            background: "#fff", border: "1px solid var(--brand200)", borderRadius: 12, padding: "10px 12px",
            boxShadow: "0 8px 24px rgba(28,25,23,.14)", fontSize: 13, color: "#374151", lineHeight: 1.5,
          }}
        >
          {note}
        </div>
      )}
    </div>
  );
}
