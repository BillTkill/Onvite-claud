"use client";

import { PanelHero, DesignCard, EventDetails, StatRow, AttendanceBar, ShareCard, UploadPermissions, GuestList, ExtraCard } from "./parts";
import { EVENT } from "@/lib/event";

const GOLD = "linear-gradient(160deg,rgba(252,211,77,.33),#fcd34d)";

export default function ProPanel() {
  return (
    <>
      <PanelHero />

      <div className="p-split" style={{ marginTop: 24 }}>
        <DesignCard designName="Dorado Clásico" gradient={GOLD} lines={[EVENT.dateLabel, EVENT.time]} />
        <EventDetails
          rows={[
            { label: "Fecha", value: EVENT.dateLabel },
            { label: "Hora", value: EVENT.time },
            { label: "Lugar", value: EVENT.venue },
            { label: "Dirección", value: EVENT.address },
            { label: "Código de vestimenta", value: EVENT.dressCode },
            { label: "Plan contratado", value: "Pro (Premium)" },
          ]}
        />
      </div>

      <div style={{ marginTop: 16 }}><StatRow /></div>
      <div style={{ marginTop: 16 }}><AttendanceBar /></div>
      <div style={{ marginTop: 16 }}><ShareCard inline /></div>

      <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917", marginTop: 20 }}>Álbum y regalos</h2>
      <div className="p-half" style={{ marginTop: 14 }}>
        <ExtraCard
          icon="grid"
          title="Álbum de fotos QR"
          body="Recibe las fotos de tus invitados con un QR imprimible, sin app."
          meta="15 fotos / invitado · 60 días"
          cta="Ver álbum · Imprimir QR"
        />
        <ExtraCard
          icon="gift"
          title="Mesa de regalos"
          body="Comparte tu lista de regalos para que no se repitan."
          meta="Añade y comparte tu lista"
          cta="Gestionar"
        />
      </div>

      <div style={{ marginTop: 16 }}><UploadPermissions /></div>
      <div style={{ marginTop: 16 }}><GuestList withFilter /></div>

      <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 20, fontSize: 12 }}>
        Panel de demostración con datos de ejemplo. En producción, cada invitado confirma desde su propia invitación y aquí aparece automáticamente.
      </p>
    </>
  );
}
