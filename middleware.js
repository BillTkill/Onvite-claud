import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Edge middleware: enforces the `authorized` callback on every non-asset route.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)"],
};