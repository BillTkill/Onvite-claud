import { AdminTitle, Kpi } from "@/components/admin/AdminShell";
import RedesConnect from "@/components/admin/RedesConnect";
import { REDES_NETWORKS, REDES_POSTS } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { getServerT } from "@/lib/i18n/server";

export const metadata = { title: "Redes sociales · Onvite Admin" };

export default async function AdminRedesPage() {
  const { t } = await getServerT();
  const connections = await prisma.socialConnection.findMany({ select: { network: true, connected: true } });

  const kpis = [
    { label: t("admin.redes.totalFollowers"), value: "17.800", color: "var(--brand700)" },
    { label: t("admin.redes.allViews"), value: "249.200", color: "#1c1917" },
    { label: t("admin.redes.interactions"), value: "16.810", color: "#1c1917" },
    { label: t("admin.redes.platforms"), value: "4", color: "#1c1917" },
  ];

  return (
    <>
      <AdminTitle title={t("admin.redes.title")} subtitle={t("admin.redes.subtitle")} />

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h2 className="serif admin-card__title" style={{ marginBottom: 8 }}>{t("admin.redes.connectTitle")}</h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>{t("admin.redes.connectBody")}</p>
        <RedesConnect connections={connections} />
      </div>

      <div className="admin-kpis">
        {kpis.map((k) => <Kpi key={k.label} {...k} />)}
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
            <p style={{ fontSize: 12, color: "#6b7280" }}>{t("admin.redes.followersWord")} · {n.views} {t("admin.redes.views")}</p>
          </div>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <h2 className="serif admin-card__title">{t("admin.redes.postsTitle")}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {REDES_POSTS.map((p) => (
            <div key={p.title} style={{ border: "1px solid #f3f4f6", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <p style={{ fontWeight: 600, color: "#1c1917" }}>{p.title}</p>
                <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{p.time}</span>
              </div>
              <div style={{ marginTop: 4, display: "flex", gap: 16, fontSize: 12, color: "#6b7280", flexWrap: "wrap" }}>
                <span>👁 {p.views} {t("admin.redes.views")}</span>
                <span>♥ {p.likes} {t("admin.redes.likes")}</span>
                <span>💬 {p.comments} {t("admin.redes.comments")}</span>
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
        {t("admin.redes.note")}
      </p>
    </>
  );
}
