"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminLayout({ children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/login");
    else if (user.role !== "admin") router.replace("/panel");
  }, [ready, user, router]);

  if (!ready || !user || user.role !== "admin") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
        <p style={{ color: "var(--brand600)", fontSize: 15 }}>Verificando acceso…</p>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
