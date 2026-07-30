/** @type {import('next').NextConfig} */

// Baseline security headers applied to every route. HSTS only takes effect over
// HTTPS. A tuned Content-Security-Policy is a production task (see
// docs/ANTES-DE-PRODUCCION.md) — the app uses inline styles and a few external
// resources (Google Fonts/Maps, QR service) that a strict CSP must allow.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
