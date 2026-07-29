import { AdminTitle, Kpi, Badge } from "@/components/admin/AdminShell";
import UserPlanSelect from "@/components/admin/UserPlanSelect";
import UserNote from "@/components/admin/UserNote";
import { getUsers } from "@/lib/admin-queries";
import { PLAN_ENUM, REGISTRADO } from "@/lib/admin-display";
import { getServerT } from "@/lib/i18n/server";

export const metadata = { title: "Usuarios · Onvite Admin" };

export default async function AdminUsuariosPage() {
  const { t } = await getServerT();
  const users = await getUsers();
  const total = users.length;
  const noPlan = users.filter((u) => !u.plan).length;
  const basico = users.filter((u) => u.plan === "BASICO").length;
  const pro = users.filter((u) => u.plan === "PRO").length;
  const vip = users.filter((u) => u.plan === "VIP").length;
  const paid = total - noPlan;

  const kpis = [
    { label: t("admin.usuarios.total"), value: String(total), color: "var(--brand700)" },
    { label: t("admin.usuarios.onlyRegistered"), value: String(noPlan), note: t("admin.usuarios.onlyRegisteredNote"), color: "#1c1917" },
    { label: t("admin.usuarios.basico"), value: String(basico), color: "#2563eb" },
    { label: t("admin.usuarios.pro"), value: String(pro), color: "var(--brand700)" },
    { label: t("admin.usuarios.vip"), value: String(vip), color: "#16a34a" },
  ];

  return (
    <>
      <AdminTitle title={t("admin.usuarios.title")} subtitle={t("admin.usuarios.subtitle")} />

      <div className="admin-kpis admin-kpis--5">
        {kpis.map((k) => <Kpi key={k.label} {...k} />)}
      </div>
      <p style={{ marginTop: 12, fontSize: 14, color: "#6b7280" }}>
        {t("admin.usuarios.summary", { total, paid })}
      </p>

      <div className="admin-card" style={{ marginTop: 16 }}>
        <h2 className="serif admin-card__title">{t("admin.usuarios.listTitle")}</h2>
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t("admin.usuarios.thName")}</th><th>{t("admin.usuarios.thUser")}</th><th>{t("admin.usuarios.thEmail")}</th><th>{t("admin.usuarios.thRegistered")}</th><th>{t("admin.usuarios.thExtra")}</th><th>{t("admin.usuarios.thPlan")}</th><th>{t("admin.usuarios.thChange")}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const badge = u.plan ? PLAN_ENUM[u.plan] : REGISTRADO;
                const badgeLabel = u.plan ? t(`admin.plan.${u.plan}`) : t("admin.plan.registered");
                return (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600, color: "#1c1917" }}>{u.name}</td>
                    <td style={{ color: "#6b7280" }}>{u.username}</td>
                    <td style={{ color: "#6b7280" }}>{u.email}</td>
                    <td style={{ color: "#9ca3af" }}>{u.date}</td>
                    <td><UserNote note={u.note} /></td>
                    <td><Badge label={badgeLabel} palette={badge.palette} /></td>
                    <td><UserPlanSelect userId={u.id} plan={u.plan} hasEvent={u.hasEvent} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
          {t("admin.usuarios.note")}
        </p>
      </div>
    </>
  );
}
