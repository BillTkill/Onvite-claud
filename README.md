# Onvite

Invitaciones de boda digitales y webs de RSVP online. Implementación en **Next.js 15 (App Router) + React 19** del mockup de Módulo 1 (`design-source/Onvite - Mockups.dc.html`), ahora con **backend real**.

**Stack:** Next.js 15 · React 19 · **PostgreSQL + Prisma** · **Auth.js (NextAuth v5)** · Fraunces + Inter · paleta marfil/oro · i18n ES · EN · FR · IT.

## Requisitos

- Node.js 20+
- Docker Desktop (para la base de datos PostgreSQL)

## Cómo ejecutar

```bash
npm install
```

1. Crea tu `.env` a partir del ejemplo y genera un secreto de Auth.js:

```bash
cp .env.example .env
npx auth secret   # o: openssl rand -base64 32  → pégalo en AUTH_SECRET
```

2. Levanta la base de datos, aplica el esquema y carga los datos de ejemplo:

```bash
npm run db:up        # docker compose up -d  (PostgreSQL en :5432)
npm run db:migrate   # prisma migrate dev
npm run db:seed      # carga usuarios, evento demo, reservas y consultas
```

3. Arranca la app:

```bash
npm run dev          # http://localhost:3000
```

Otros comandos: `npm run build` / `npm run start` (producción), `npm run db:studio` (Prisma Studio), `npm run db:down` (apaga la DB).

## Cuentas de ejemplo (seed)

La autenticación es **real** (PostgreSQL + Auth.js, contraseñas con bcrypt, sesión en cookie httpOnly).

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Admin | `admin@onvite.com` | `Admin123!` |
| Cliente (con evento, plan Pro) | `maria@mail.com` | `Cliente123!` |
| Otros clientes de ejemplo | `rosaf@mail.com`, `valen@mail.com`, … | `Demo123!` |

- **Admin** entra a `/admin`; un cliente que intente `/admin` es redirigido a su panel (protegido por middleware + comprobación de rol en el servidor).
- **maria** tiene un evento sembrado (Boda de María & Carlos, plan Pro) → ve su panel con datos reales (RSVP calculado desde la lista de invitados).
- Al **registrar** una cuenta nueva no hay evento asociado → **panel bloqueado** hasta que un admin lo habilite.

## Qué incluye

**01 · Sitio público (marketing)** — Home, galería de plantillas (filtros), detalle, reserva + éxito, términos.
**02 · Acceso** — login y registro reales (Auth.js), cabecera con menú de cuenta según sesión, panel bloqueado sin evento.
**03 · Panel de la pareja** — `/panel` renderiza Básico/Pro/VIP según el `plan` del evento del usuario, con datos reales desde la base de datos (invitados, conteos de RSVP, cuenta regresiva calculada).
**04 · Panel de administración** — `/admin` protegido por rol, conectado a la base de datos:
- **Usuarios** — cuentas reales y su plan; cambiar el plan de un usuario con evento.
- **Clientes (CRM)** — reservas reales con búsqueda/filtros; cambiar estado de contacto y de pago.
- **Consultas** — bandeja real; «marcar atendido».
- **Accesos** — habilitar el panel de un usuario: crea/activa su evento según el plan (pasa de «bloqueado» a activo).
- **Ventas / Resumen** — tablas transaccionales y contadores reales; los totales anuales y gráficos son ilustrativos.
- **Redes** — panel de integraciones (métricas de muestra, «Fase 2 APIs»).

**Idiomas** — selector ES/EN/FR/IT (en la cabecera del sitio y del panel); sitio público, acceso y **panel de la pareja** traducidos, con fechas localizadas por idioma.

## Backend

- **Base de datos:** PostgreSQL vía `docker-compose.yml`. Esquema en `prisma/schema.prisma` (modelos `User`, `Event`, `Guest`, `Reservation`, `Consulta` + enums). Datos de ejemplo en `prisma/seed.mjs`.
- **Auth:** Auth.js v5 con proveedor de credenciales (email/contraseña, bcrypt) y sesión JWT que lleva `role` y `username`. Configuración dividida en `auth.config.js` (edge, protección de rutas en `middleware.js`) y `auth.js` (Node, acceso a Prisma).
- **Capa de datos del admin:** lecturas en `lib/admin-queries.js` (server-only) y mutaciones en `app/admin/actions.js` (server actions con guard de rol + `revalidatePath`). Mapeos de presentación en `lib/admin-display.js`.
- **API:** `POST /api/register` (crea cuenta), `POST /api/reservations` (guarda una reserva desde `/book`), y `/api/auth/[...nextauth]` (Auth.js).

## Pendiente para próximos pases

- Traducir el **panel de administración** (herramienta interna) y el **texto legal completo de Términos** (hoy muestra un aviso localizado; conviene traducción profesional).
- Conectar el panel de **Redes** a APIs reales (Meta, TikTok, YouTube); hoy es de muestra.
- Integración de pagos: el modelo de negocio coordina el pago por WhatsApp/QR/transferencia y el admin marca el estado; no hay pasarela.

## Estructura

```
app/
  layout.jsx              # raíz: fuentes, <Providers> (SessionProvider + I18nProvider)
  (marketing)/            # rutas públicas con cabecera + pie
  login/  registro/       # acceso (Auth.js)
  panel/                  # panel de la pareja (server component, lee de la DB)
  admin/                  # admin (layout con gate de rol en el servidor)
  api/                    # register, reservations, auth/[...nextauth]
components/
  Providers.jsx           # SessionProvider + I18nProvider
  SiteHeader / SiteFooter / TemplateCard / Faq / Icon / Seal
  I18nProvider.jsx        # motor de i18n
  panel/  admin/          # componentes de panel y administración
lib/
  db.js                   # cliente Prisma (singleton)
  templates.js  admin.js  format.js
  i18n/                   # config, index y diccionarios es/en/fr/it
prisma/
  schema.prisma  seed.mjs
auth.js  auth.config.js  middleware.js  docker-compose.yml
design-source/            # mockup original (.dc.html) — solo referencia
```

## Notas

- Las fuentes se cargan vía Google Fonts (`<link>`), con degradado a Georgia / system-ui si no hay red.
- Los marcos de navegador y de móvil del mockup eran andamiaje de presentación; la implementación es una web responsive real.
