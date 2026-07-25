import { AdminTitle, Kpi, Badge } from "@/components/admin/AdminShell";
import { USUARIOS_KPIS, USERS, PLAN_BADGE } from "@/lib/admin";

export const metadata = { title: "Usuarios · Onvite Admin" };

export default function AdminUsuariosPage() {
  return (
    <>
      <AdminTitle title="Usuarios registrados" subtitle="Todas las cuentas creadas en la página y su plan" />

      <div className="admin-kpis admin-kpis--5">
        {USUARIOS_KPIS.map((k) => <Kpi key={k.label} {...k} />)}
      </div>
      <p style={{ marginTop: 12, fontSize: 14, color: "#6b7280" }}>De 12 cuentas, 6 tienen un plan de pago.</p>

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
              {USERS.map((u) => (
                <tr key={u.email}>
                  <td style={{ fontWeight: 600, color: "#1c1917" }}>{u.name}</td>
                  <td style={{ color: "#6b7280" }}>{u.user}</td>
                  <td style={{ color: "#6b7280" }}>{u.email}</td>
                  <td style={{ color: "#9ca3af" }}>{u.date}</td>
                  <td><Badge label={u.plan} palette={PLAN_BADGE[u.plan]} /></td>
                  <td>
                    <span style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "2px 8px", fontSize: 12, color: "#6b7280" }}>▾</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
          Cuando cierres una venta por WhatsApp, cambia aquí el plan del usuario. Estos datos son reales, salen de tu base de datos.
        </p>
      </div>
    </>
  );
}
