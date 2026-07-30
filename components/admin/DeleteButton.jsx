"use client";

import { useTransition } from "react";
import { deleteUser, deleteReservation } from "@/app/admin/actions";

/**
 * Small ✕ delete button used across the admin (clients, users).
 * `confirm` is the already-translated confirmation text.
 */
export default function DeleteButton({ kind, id, confirm, label }) {
  const [pending, start] = useTransition();

  function onDelete() {
    if (confirm && !window.confirm(confirm)) return;
    start(async () => {
      try {
        if (kind === "user") await deleteUser(id);
        else await deleteReservation(id);
      } catch {
        /* ignore */
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={pending}
      title={label || "Eliminar"}
      aria-label={label || "Eliminar"}
      style={{
        border: "1px solid #fecaca", background: pending ? "#fee2e2" : "transparent", color: "#b91c1c",
        borderRadius: 8, width: 28, height: 28, cursor: pending ? "default" : "pointer", fontWeight: 700, fontSize: 13, lineHeight: 1,
      }}
    >
      ✕
    </button>
  );
}
