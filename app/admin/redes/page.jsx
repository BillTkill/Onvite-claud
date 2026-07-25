import { AdminTitle, Kpi } from "@/components/admin/AdminShell";
import { REDES_CONNECT, REDES_KPIS, REDES_NETWORKS, REDES_POSTS } from "@/lib/admin";

export const metadata = { title: "Redes sociales · Onvite Admin" };

export default function AdminRedesPage() {
  return (
    <>
      <AdminTitle title="Redes sociales" subtitle="Seguidores, vistas y comentarios por red y por publicación" />

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h2 className="serif admin-card__title" style={{ marginBottom: 8 }}>Conectar tus redes</h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>Conecta tus cuentas para ver las métricas en tiempo real, estilo Metricool.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {REDES_CONNECT.map((r) => (
            <span key={r} className="connect-pill">+ Conectar {r}</span>
          ))}
        </div>
      </div>

      <div className="admin-kpis">
        {REDES_KPIS.map((k) => <Kpi key={k.label} {...k} />)}
      </div>

      <div className="admin-kpis" style={{ marginTop: 24 }}>
        {REDES_NETWORKS.map((n) => (
          <div
            key={n.name}
            className="admin-kpi"
            style={{ padding: 16, border: n.active ? "1px solid var(--brand500)" : "1px solid #e5e7eb", background: n.active ? "var(--brand50)" : "#fff" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, color: "#1c1917" }}>{n.name}</span>
              <span style={{ fontSize: 12, color: "#16a34a" }}>{n.growth}</span>
            </div>
            <p className="serif" style={{ marginTop: 8, fontSize: 22, fontWeight: 700, color: "#1c1917" }}>{n.followers}</p>
            <p style={{ fontSize: 12, color: "#6b7280" }}>{n.note}</p>
          </div>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <h2 className="serif admin-card__title">Publicaciones en Instagram</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {REDES_POSTS.map((p) => (
            <div key={p.title} style={{ border: "1px solid #f3f4f6", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <p style={{ fontWeight: 600, color: "#1c1917" }}>{p.title}</p>
                <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{p.time}</span>
              </div>
              <div style={{ marginTop: 4, display: "flex", gap: 16, fontSize: 12, color: "#6b7280", flexWrap: "wrap" }}>
                <span>👁 {p.views} vistas</span>
                <span>♥ {p.likes} me gusta</span>
                <span>💬 {p.comments} comentarios</span>
              </div>
              <div style={{ marginTop: 12, borderTop: "1px solid #f3f4f6", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                {p.replies.map((r) => (
                  <div key={r.user}>
                    <span style={{ fontWeight: 600, color: "var(--brand700)" }}>{r.user}</span>{" "}
                    <span style={{ color: "#4b5563" }}>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "#9ca3af" }}>
        Nota: en Fase 2 estos datos vienen de las APIs oficiales (YouTube Data API, Meta Graph API, TikTok API). Por ahora son ejemplos.
      </p>
    </>
  );
}
