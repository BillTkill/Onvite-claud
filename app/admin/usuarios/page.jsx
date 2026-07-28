import { AdminTitle, Kpi, Badge } from "@/components/admin/AdminShell";
import UserPlanSelect from "@/components/admin/UserPlanSelect";
import { getUsers } from "@/lib/admin-queries";
import { PLAN_ENUM, REGISTRADO } from "@/lib/admin-display";

export const metadata = { title: "Usuarios · Onvite Admin" };

export default async function AdminUsuariosPage() {
  const users = await getUsers();
  const total = users.length;
  const noPlan = users.filter((u) => !u.plan).length;
  const basico = users.filter((u) => u.plan === "BASICO").length;
  const pro = users.filter((u) => u.plan === "PRO").length;
  const vip = users.filter((u) => u.plan === "VIP").length;
  const paid = total - noPlan;

  const kpis = [
    { label: "Total registrados", value: String(total), color: "var(--brand700)" },
    { label: "Solo registrados", value: String(noPlan), note: "sin comprar", color: "#1c1917" },
    { label: "Básico", value: String(basico), color: "#2563eb" },
    { label: "Pro (Premium)", value: String(pro), color: "var(--brand700)" },
    { label: "Premium VIP", value: String(vip), color: "#16a34a" },
  ];

  return (
    <>
      <AdminTitle title="Usuarios registrados" subtitle="Todas las cuentas creadas en la página y su plan" />

      <div className="admin-kpis admin-kpis--5">
        {kpis.map((k) => <Kpi key={k.label} {...k} />)}
      </div>
      <p style={{ marginTop: 12, fontSize: 14, color: "#6b7280" }}>
        De {total} cuentas, {paid} {paid === 1 ? "tiene" : "tienen"} un plan de pago.
      </p>

      <div className="admin-card" style={{ marginTop: 16 }}>
        <h2 className="serif admin-card__title">Lista de usuarios</h2>
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th><th>Usuario</th><th>Correo</th><th>Registro</th><th>Plan</th><th>Cambiar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const badge = u.plan ? PLAN_ENUM[u.plan] : REGISTRADO;
                return (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600, color: "#1c1917" }}>{u.name}</td>
                    <td style={{ color: "#6b7280" }}>{u.username}</td>
                    <td style={{ color: "#6b7280" }}>{u.email}</td>
                    <td style={{ color: "#9ca3af" }}>{u.date}</td>
                    <td><Badge label={badge.label} palette={badge.palette} /></td>
                    <td><UserPlanSelect userId={u.id} plan={u.plan} hasEvent={u.hasEvent} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
          Datos reales de tu base de datos. Al cerrar una venta, cambia aquí el plan del usuario (afecta al panel que ve).
        </p>
      </div>
    </>
  );
}
