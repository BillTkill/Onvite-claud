"use client";

import { PanelHero, DesignCard, StatCard, AttendanceBar, UploadPermissions, GuestList, ExtraCard } from "./parts";
import { EVENT } from "@/lib/event";

const GOLD = "linear-gradient(160deg,rgba(252,211,77,.33),#fcd34d)";

export default function VipPanel() {
  return (
    <>
      <PanelHero />

      <div className="p-split" style={{ marginTop: 24 }}>
        <DesignCard label="Diseño personalizado" designName="" gradient={GOLD} lines={[`${EVENT.dateLabel} · ${EVENT.time}`]} />
        <div style={{ display: "grid", gridTemplateRows: "auto auto", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="vip-stats">
            <StatCard label="Confirmados" value="5" color="#16a34a" compact />
            <StatCard label="Pendientes" value="2" color="#ca8a04" compact />
            <StatCard label="No asisten" value="1" color="#ef4444" compact />
            <StatCard label="Días" value={String(EVENT.daysLeft)} color="var(--brand600)" compact />
          </div>
          <AttendanceBar />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 28 }}>
        <span style={{ background: "linear-gradient(120deg,#8a6a34,#b4894a)", color: "#fff", borderRadius: 7, padding: "3px 9px", fontSize: 11, fontWeight: 700 }}>VIP</span>
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>Extras de tu plan</h2>
      </div>
      <div className="grid grid-4" style={{ marginTop: 14, gap: 16 }}>
        <ExtraCard icon="grid" title="Álbum de fotos QR" body="Los invitados suben fotos y videos con un QR, sin app." meta="30 fotos / invitado · 90 días" cta="Ver álbum · Imprimir QR" />
        <ExtraCard icon="gift" title="Mesa de regalos" body="Lista de regalos y galería compartida, sin repetir." meta="8 regalos reservados" cta="Gestionar" />
        <ExtraCard icon="music" title="Música de fondo" body="Suena suavemente al abrir la invitación." meta={`♪ ${EVENT.music}`} cta="Cambiar canción" />
        <ExtraCard icon="shield" title="Soporte prioritario" body="Atención directa por WhatsApp." meta="Respuesta < 1 hora" cta="Chatear ahora" ctaWhatsapp />
      </div>

      <div style={{ marginTop: 16 }}><UploadPermissions /></div>
      <div style={{ marginTop: 16 }}><GuestList withFilter={false} /></div>

      <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 20, fontSize: 12 }}>
        Panel Premium VIP: todo lo de Pro + álbum de fotos QR, mesa de regalos, música y soporte prioritario.
      </p>
    </>
  );
}
