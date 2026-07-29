import "server-only";

/**
 * Social metrics adapter — SCAFFOLD (Fase 2).
 *
 * Hoy la pantalla "Redes" del admin muestra datos de ejemplo (lib/admin.js) y
 * el botón "Conectar" solo persiste un estado (SocialConnection). Para métricas
 * reales, cada función de abajo debe llamar a la API oficial usando las claves
 * de .env (ver docs/redes-integraciones.md). Devuelven `null` mientras no haya
 * clave configurada, para que la UI caiga al modo demo sin romperse.
 */

export function isConfigured(network) {
  const env = process.env;
  switch (network) {
    case "facebook":
    case "instagram":
      return !!(env.META_APP_ID && env.META_APP_SECRET);
    case "tiktok":
      return !!(env.TIKTOK_CLIENT_KEY && env.TIKTOK_CLIENT_SECRET);
    case "youtube":
      return !!env.YOUTUBE_API_KEY;
    case "x":
      return !!env.X_BEARER_TOKEN;
    case "telegram":
      return !!env.TELEGRAM_BOT_TOKEN;
    default:
      return false;
  }
}

/**
 * Fetch { followers, views, growth } for a network. TODO (Fase 2): implement
 * per-platform. Returns null until the platform's keys are set.
 */
export async function getNetworkMetrics(network) {
  if (!isConfigured(network)) return null;
  // TODO: llamar a la API real de cada plataforma:
  //  - facebook/instagram → Meta Graph API (GET /{id}/insights)
  //  - tiktok             → TikTok API for Business (Research/Insights)
  //  - youtube            → YouTube Data API v3 (channels.list?part=statistics)
  //  - x                  → X API v2 (GET /2/users/:id con user.fields=public_metrics)
  //  - telegram           → Bot API (getChatMemberCount, etc.)
  return null;
}
