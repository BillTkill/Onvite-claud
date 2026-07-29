# Integraciones de redes sociales (Fase 2)

Esta guía explica cómo pasar la pantalla **Admin → Redes** de "modo demo" a **métricas reales**.

## Estado actual (lo que ya está hecho)
- El botón **Conectar / Conectado** de cada red **persiste** su estado en la base de datos (modelo `SocialConnection`).
- Las métricas (seguidores, vistas, publicaciones) son **datos de ejemplo** (`lib/admin.js`).
- Hay un adaptador stub en `lib/social.js` con las funciones listas para conectar cada API.

## Qué falta para métricas reales
Cada plataforma exige registrar una "app de desarrollador" y obtener claves. Pega cada clave en el `.env` (ver nombres en `.env.example`). El adaptador `lib/social.js` detecta automáticamente qué redes tienen clave configurada.

| Red | Qué registrar | Variable en `.env` | Notas |
|-----|---------------|--------------------|-------|
| **Facebook + Instagram** | App en [Meta for Developers](https://developers.facebook.com/) → Graph API. Requiere verificación del negocio. | `META_APP_ID`, `META_APP_SECRET` | Instagram debe ser cuenta *Business* vinculada a una página de Facebook. |
| **TikTok** | [TikTok for Developers](https://developers.tiktok.com/) → API for Business. Requiere revisión de la app. | `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET` | Las métricas requieren permisos de Insights. |
| **YouTube** | Proyecto en [Google Cloud](https://console.cloud.google.com/) → habilitar *YouTube Data API v3*. | `YOUTUBE_API_KEY` | Estadísticas del canal con `channels.list?part=statistics`. |
| **X (Twitter)** | [X Developer Platform](https://developer.twitter.com/) → API v2 (tiene planes de pago). | `X_BEARER_TOKEN` | `public_metrics` da seguidores; vistas requieren tier superior. |
| **Telegram** | Crear un bot con [@BotFather](https://t.me/BotFather). | `TELEGRAM_BOT_TOKEN` | Es la más simple: solo el token del bot. |

## Pasos para activar una red
1. Registra la app en la plataforma y copia sus claves.
2. Pégalas en tu `.env` (no se suben al repositorio).
3. Implementa la llamada real en `getNetworkMetrics()` de `lib/social.js` (hay TODOs por plataforma).
4. En la página `app/admin/redes/page.jsx`, reemplaza los datos de ejemplo por lo que devuelva `getNetworkMetrics()` cuando la red esté configurada.

## Importante
- Las claves y tokens **nunca** van en la base de datos ni en el código: solo en variables de entorno del servidor.
- El botón "Conectar" de hoy es un interruptor de estado; el flujo OAuth real (donde el usuario autoriza en la plataforma) se añade en el paso 3.
