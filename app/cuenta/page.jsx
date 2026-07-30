import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ChangePassword from "@/components/ChangePassword";

export const metadata = { title: "Mi cuenta · Onvite" };

export default async function CuentaPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <ChangePassword />;
}
