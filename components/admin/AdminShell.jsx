"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { useAuth } from "@/components/AuthProvider";

const NAV = [
  { href: "/admin", label: "Resumen", icon: "layout" },
  { href: "/admin/ventas", label: "Ventas", icon: "barChart" },
  { href: "/admin/usuarios", label: "Usuarios", icon: "users" },
  { href: "/admin/clientes", label: "Clientes", icon: "user" },
  { href: "/admin/accesos", label: "Accesos", icon: "key" },
  { href: "/admin/consultas", label: "Consultas", icon: "mail" },
  { href: "/admin/redes", label: "Redes sociales", icon: "share" },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--brand700)" }}>✦ Onvite Admin</span>
        </div>
        <nav className="admin-nav">
          {NAV.map((n) => {
            const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} className={`admin-nav__item ${active ? "admin-nav__item--active" : ""}`}>
                <Icon name={n.icon} size={16} /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar__footer">
          <Link href="/" className="admin-nav__item">← Volver al sitio</Link>
          <button
            className="admin-nav__item"
            style={{ color: "#dc2626", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

/* Reusable page header + KPI card, shared by admin pages. */
export function AdminTitle({ title, subtitle, action }) {
  return (
    <div className="admin-page-head">
      <div>
        <h1 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "#1c1917" }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 14, color: "#6b7280" }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Kpi({ label, value, note, color }) {
  return (
    <div className="admin-kpi">
      <p style={{ fontSize: 14, color: "#6b7280" }}>{label}</p>
      <p className="serif" style={{ marginTop: 4, fontSize: 24, fontWeight: 700, color: color || "#1c1917" }}>{value}</p>
      {note && <p style={{ fontSize: 12, color: "#9ca3af" }}>{note}</p>}
    </div>
  );
}

/** Pill badge for table cells; `palette` is { bg, fg }. */
export function Badge({ label, palette, size = "sm" }) {
  const pad = size === "sm" ? "2px 8px" : "3px 10px";
  return (
    <span
      style={{
        display: "inline-block",
        background: palette?.bg || "#f3f4f6",
        color: palette?.fg || "#4b5563",
        borderRadius: 999,
        padding: pad,
        fontSize: size === "sm" ? 12 : 11,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
