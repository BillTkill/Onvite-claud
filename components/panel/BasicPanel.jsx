"use client";

import { PanelHero, DesignCard, EventDetails, ShareCard } from "./parts";
import { EVENT } from "@/lib/event";

const PINK = "linear-gradient(160deg,rgba(249,168,212,.4),#f9a8d4)";

export default function BasicPanel({ onUpgrade }) {
  return (
    <>
      <PanelHero />

      <div className="p-split" style={{ marginTop: 24 }}>
        <DesignCard designName="Rosa Eterno" gradient={PINK} lines={[`${EVENT.dateLabel} · ${EVENT.time}`]} />
        <EventDetails
          rows={[
            { label: "Fecha", value: EVENT.dateLabel },
            { label: "Hora", value: EVENT.time },
            { label: "Lugar", value: EVENT.venue },
            { label: "Plan contratado", value: "Básico" },
          ]}
        />
      </div>

      <div className="p-half" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="pcard" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#6b7280" }}>Cuenta regresiva</p>
            <p className="serif" style={{ marginTop: 2, fontSize: 36, fontWeight: 700, color: "var(--brand600)" }}>{EVENT.daysLeft}</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>días para el gran día</p>
          </div>
          <div className="pcard" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#6b7280" }}>Confirmaron asistencia</p>
            <p className="serif" style={{ marginTop: 2, fontSize: 36, fontWeight: 700, color: "#16a34a" }}>37</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>solo el total — sin lista de nombres</p>
          </div>
        </div>
        <ShareCard />
      </div>

      <div
        style={{
          marginTop: 16, border: "1px solid var(--gold)",
          background: "linear-gradient(120deg,rgba(240,230,212,.6),rgba(255,255,255,.4))",
          borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16, flexWrap: "wrap",
        }}
      >
        <div>
          <p className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>
            ¿Quieres saber <em>quién</em> asiste?
          </p>
          <p style={{ color: "var(--ink-soft)", marginTop: 4, fontSize: 14 }}>
            En Básico ves cuántos confirmaron en total. El plan Pro activa el RSVP en vivo con la lista de nombres y el seguimiento de acompañantes.
          </p>
        </div>
        <button
          className="btn btn-dark"
          style={{ flex: "none", padding: "11px 22px", fontSize: 14, fontWeight: 600 }}
          onClick={onUpgrade}
        >
          Mejorar a Pro
        </button>
      </div>

      <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 20, fontSize: 12 }}>
        Panel Básico: invitación, datos del evento, cuenta regresiva, total de confirmaciones y compartir. Sin lista de nombres.
      </p>
    </>
  );
}
