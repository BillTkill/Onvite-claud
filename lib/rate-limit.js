// Simple in-memory sliding-window rate limiter. Works for a single self-hosted
// Node instance. For multi-instance / serverless deployments, swap this for a
// shared store (Redis/Upstash) — see docs/ANTES-DE-PRODUCCION.md.

const hits = new Map(); // key -> number[] (timestamps within the window)

/**
 * Returns { ok } — false when `key` has exceeded `limit` requests in `windowMs`.
 */
export function rateLimit(key, { limit = 10, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return { ok: arr.length <= limit, remaining: Math.max(0, limit - arr.length) };
}

/** Best-effort client IP from proxy headers (behind a reverse proxy in prod). */
export function clientIp(req) {
  const xff = req.headers.get("x-forwarded-for");
  return (xff ? xff.split(",")[0].trim() : null) || req.headers.get("x-real-ip") || "unknown";
}
