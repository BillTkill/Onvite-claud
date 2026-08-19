/**
 * Edge-safe Auth.js base config (no Prisma / no bcrypt here).
 * Shared by `auth.js` (Node runtime, adds the Credentials provider) and
 * `middleware.js` (Edge runtime, route protection via the `authorized` callback).
 */
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const { pathname } = nextUrl;

      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false; // -> redirected to signIn page
        if (role !== "ADMIN") return Response.redirect(new URL("/panel", nextUrl));
        return true;
      }
      // The full catalogue is an internal inventory: visitors browse templates
      // from the Home gallery instead. Matched exactly, not by prefix, so the
      // public detail pages at /templates/<slug> stay reachable by anyone.
      if (pathname === "/templates") {
        if (role !== "ADMIN") return Response.redirect(new URL("/#plantillas", nextUrl));
        return true;
      }
      if (pathname.startsWith("/panel")) {
        return isLoggedIn; // false -> redirected to signIn page
      }
      return true;
    },
  },
  providers: [],
};
