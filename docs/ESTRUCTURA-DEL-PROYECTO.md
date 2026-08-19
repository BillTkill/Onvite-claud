# Estructura del proyecto — Onvite

Guía de orientación: dónde está cada pantalla, cómo se arma la página principal y qué hace cada carpeta. Pensada para encontrar rápido "¿en qué archivo edito esto?".

> **Actualización (rediseño visual):** la Home se reconstruyó siguiendo `Guias visuales/onvite-mockup-v2.html` — nueva identidad (Playfair Display + paleta refinada, tokens en `app/globals.css`), animaciones con **Framer Motion**, y componentes nuevos en `components/home/` (ver sección 1.3 actualizada más abajo). El resto del sitio hereda los tokens de color/tipografía pero conserva su estructura.

> Los números de línea son una referencia al momento de escribir esto — si el archivo crece o se reordena, se mueven. Los nombres de sección (comentarios `{/* ... */}`) son el punto de referencia estable: búscalos con Ctrl+F si el número ya no coincide.

---

## 1. ¿Dónde está el "index" (página principal)?

En Next.js **App Router** (el que usa este proyecto) no existe un único `index.html`. La página principal se arma en capas, cada una envolviendo a la siguiente:

```
app/layout.jsx                    ← 1) Layout raíz de TODO el sitio
  └─ app/(marketing)/layout.jsx   ← 2) Layout del sitio público (cabecera + pie)
       └─ app/(marketing)/page.jsx ← 3) ESTA es la página principal (Home / "index")
```

`(marketing)` es un **route group** de Next.js: la carpeta entre paréntesis organiza archivos pero **no aparece en la URL**. Por eso `app/(marketing)/page.jsx` es lo que se sirve en `https://tu-sitio.com/` (la raíz).

### 1.1 — Capa 1: [`app/layout.jsx`](../app/layout.jsx) — layout raíz

Envuelve **absolutamente todo** (marketing, login, panel, admin...). Aquí vive lo que es igual en cualquier pantalla del sitio.

| Líneas | Qué hay |
|---|---|
| 1–3 | Imports: hojas de estilo globales (`globals.css`, `ui.css`) y `<Providers>` |
| 5–15 | `metadata` — título, descripción y Open Graph por defecto de todo el sitio |
| 17–21 | `viewport` — color de tema de la barra del navegador |
| 23–38 | `RootLayout`: etiqueta `<html lang="es">`, carga de las fuentes Google Fonts (Fraunces + Inter, líneas 28–33), y `<Providers>{children}</Providers>` que monta el resto de la app |

### 1.2 — Capa 2: [`app/(marketing)/layout.jsx`](../app/(marketing)/layout.jsx) — layout del sitio público

Solo 12 líneas. Envuelve las páginas públicas (home, plantillas, reserva, términos, privacidad) con la cabecera y el pie de página:

```
línea 7  → <SiteHeader />   (la cabecera, ver 1.4)
línea 8  → <main>{children}</main>   (aquí se inyecta cada página)
línea 9  → <SiteFooter />   (el pie, ver 1.4)
```

> Nota: `/login`, `/registro`, `/panel*`, `/admin*`, `/i/[slug]` y `/album/subir` **no** usan este layout — tienen su propia cabecera (ver sección 3).

### 1.3 — Capa 3: [`app/(marketing)/page.jsx`](../app/(marketing)/page.jsx) — la página Home

**Esta es la página principal.** Desde el rediseño visual, ya no tiene el contenido inline: es un **orquestador** que monta un componente por sección, cada uno en su propio archivo dentro de `components/home/`. Así se ve en orden:

| Sección | Componente | Qué contiene |
|---|---|---|
| **HERO** | [`components/home/Hero.jsx`](../components/home/Hero.jsx) | Título con palabra animada en loop (Bodas/Graduaciones/Bautizos/Festividades), subtítulo, CTAs |
| **SHOWCASE** | [`components/home/TemplatesShowcase.jsx`](../components/home/TemplatesShowcase.jsx) | Doble marquee infinito (tarjetas + sobres) con celular superpuesto. Datos en `lib/home-data.js` |
| **TEMPLATES GALLERY** | [`components/home/TemplatesGallery.jsx`](../components/home/TemplatesGallery.jsx) | Grid de 6 plantillas reales (`lib/templates.js`) con doble mockup de celular |
| **HOW IT WORKS** (`id="como-funciona"`) | [`components/home/HowItWorks.jsx`](../components/home/HowItWorks.jsx) | Los 4 pasos reales del proceso, panel dorado |
| **PRICING** (`id="precios"`) | [`components/home/Pricing.jsx`](../components/home/Pricing.jsx) | Los 3 planes con su lista de features |
| **COMPARISON TABLE** | [`components/home/ComparisonTable.jsx`](../components/home/ComparisonTable.jsx) | Tabla función-por-función entre los 3 planes (sección nueva) |
| **SHARE** | [`components/home/ShareSection.jsx`](../components/home/ShareSection.jsx) | QR real del sitio + copiar enlace + compartir (sección nueva) |
| **FAQ** (`id="preguntas"`) | inline en `page.jsx` + [`components/Faq.jsx`](../components/Faq.jsx) | Encabezado + acordeón (sin cambios de contenido) |
| **TESTIMONIALS** | [`components/home/Testimonials.jsx`](../components/home/Testimonials.jsx) | 8 reseñas de ejemplo, full-bleed dorado (sección nueva) |
| **CONTACT** (`id="contacto"`) | [`components/home/ContactSection.jsx`](../components/home/ContactSection.jsx) | Sello + email/Instagram/WhatsApp |

Los `id="como-funciona"`, `id="precios"`, etc. son los anclas que usa el menú de la cabecera (`/#precios`, `/#preguntas`...) para hacer scroll directo a cada sección. El botón de WhatsApp flotante (`components/WhatsAppFloat.jsx`) **no** vive en la Home — está montado en `app/layout.jsx` para persistir en todo el sitio.

### 1.4 — Cabecera y pie (usados por el layout de marketing)

| Archivo | Qué es |
|---|---|
| [`components/SiteHeader.jsx`](../components/SiteHeader.jsx) | Logo, menú (Plantillas/Cómo funciona/Precios/Preguntas/Contacto), selector de idioma, botones Ingresar/Crear cuenta o el menú de cuenta si hay sesión, y el menú móvil |
| [`components/SiteFooter.jsx`](../components/SiteFooter.jsx) | Logo, contacto (email/Instagram/WhatsApp), enlace a Términos, copyright |
| [`components/LangSelect.jsx`](../components/LangSelect.jsx) | El desplegable ES/EN/FR/IT, compartido entre la cabecera del sitio y la del panel |

---

## 2. Estructura completa de carpetas

```
Onvite claude/
├── app/                        ← Rutas de Next.js (App Router): cada carpeta = un segmento de URL
│   ├── layout.jsx              ← Layout raíz (ver 1.1)
│   ├── not-found.jsx           ← Página 404
│   ├── globals.css             ← Tokens de diseño (colores, tipografías) + reseteo base
│   ├── ui.css                  ← Estilos de componentes (botones, tarjetas, formularios, admin...)
│   │
│   ├── (marketing)/            ← Grupo de rutas públicas (no aparece en la URL)
│   │   ├── layout.jsx          ← Cabecera + pie (ver 1.2)
│   │   ├── page.jsx            ← Home "/" (ver 1.3) ⭐
│   │   ├── templates/
│   │   │   ├── page.jsx        ← Galería "/templates"
│   │   │   └── [slug]/page.jsx ← Detalle "/templates/beach-romance" (y las otras 13)
│   │   ├── book/
│   │   │   ├── page.jsx        ← Formulario de reserva "/book"
│   │   │   └── success/page.jsx← Confirmación "/book/success"
│   │   ├── terminos/page.jsx   ← "/terminos"
│   │   └── privacidad/page.jsx ← "/privacidad"
│   │
│   ├── login/page.jsx          ← "/login"
│   ├── registro/page.jsx       ← "/registro"
│   │
│   ├── panel/                  ← Panel de la pareja (requiere sesión)
│   │   ├── page.jsx            ← "/panel" — Básico/Pro/VIP o bloqueado, según el evento
│   │   ├── actions.js          ← Server actions: permisos de álbum, regalos, música, moderar fotos
│   │   ├── album/page.jsx      ← "/panel/album" (Pro y VIP)
│   │   ├── regalos/page.jsx    ← "/panel/regalos" (Pro y VIP)
│   │   └── musica/page.jsx     ← "/panel/musica" (solo VIP)
│   │
│   ├── cuenta/
│   │   ├── page.jsx            ← "/cuenta" — cambiar contraseña
│   │   └── actions.js          ← Server action: changeOwnPassword
│   │
│   ├── i/[slug]/page.jsx       ← "/i/<slug>" — invitación PÚBLICA que abren los invitados
│   ├── album/subir/page.jsx    ← "/album/subir" — el invitado sube fotos, sin cuenta
│   │
│   ├── admin/                  ← Panel de administración (requiere rol ADMIN)
│   │   ├── layout.jsx          ← Verifica sesión + rol, monta el sidebar (AdminShell)
│   │   ├── actions.js          ← TODAS las server actions del admin (300+ líneas)
│   │   ├── page.jsx            ← "/admin" — Resumen
│   │   ├── ventas/page.jsx     ← "/admin/ventas"
│   │   ├── usuarios/page.jsx   ← "/admin/usuarios"
│   │   ├── clientes/page.jsx   ← "/admin/clientes" (CRM)
│   │   ├── paneles/page.jsx    ← "/admin/paneles" — editor del evento de cada pareja
│   │   ├── accesos/page.jsx    ← "/admin/accesos" — habilitar/editar planes
│   │   ├── consultas/page.jsx  ← "/admin/consultas" — bandeja de mensajes
│   │   └── redes/page.jsx      ← "/admin/redes" — métricas sociales
│   │
│   └── api/                    ← Endpoints HTTP (no páginas)
│       ├── auth/[...nextauth]/route.js  ← Auth.js (login/logout/sesión)
│       ├── register/route.js            ← POST — crear cuenta
│       ├── reservations/route.js        ← POST — guardar una reserva de "/book"
│       ├── album/route.js               ← POST — registrar foto subida por un invitado
│       └── upload/route.js              ← POST — subir el archivo físico (a /public/uploads)
│
├── components/                 ← Piezas de UI reutilizables
│   ├── SiteHeader.jsx / SiteFooter.jsx / LangSelect.jsx   (ver 1.4)
│   ├── I18nProvider.jsx        ← Motor de idiomas (contexto React, hook useI18n)
│   ├── Providers.jsx           ← Junta SessionProvider (Auth.js) + I18nProvider
│   ├── Icon.jsx                ← Set de íconos SVG usados en todo el sitio
│   ├── Seal.jsx                ← El logo (sello de cera)
│   ├── TemplateCard.jsx / TemplateDetailView.jsx  ← Tarjeta y vista de detalle de plantillas
│   ├── BookForm.jsx            ← El formulario de "/book"
│   ├── Faq.jsx                 ← Acordeón de preguntas frecuentes (usado en el Home)
│   ├── ChangePassword.jsx      ← Formulario de "/cuenta"
│   ├── InvitationView.jsx      ← La invitación pública que ve el invitado ("/i/[slug]")
│   ├── TermsNotice.jsx         ← Aviso de "disponible solo en español" en Términos
│   ├── WhatsAppFloat.jsx       ← Botón flotante persistente, montado en app/layout.jsx
│   │
│   ├── home/                   ← Componentes de la Home (ver 1.3) — usan Framer Motion
│   │   ├── Hero.jsx / TemplatesShowcase.jsx / TemplatesGallery.jsx
│   │   ├── HowItWorks.jsx / Pricing.jsx / ComparisonTable.jsx
│   │   └── ShareSection.jsx / Testimonials.jsx / ContactSection.jsx
│   │
│   ├── panel/                  ← Componentes del panel de la pareja
│   │   ├── PanelChrome.jsx     ← Cabecera propia del panel (plan, idioma, cerrar sesión)
│   │   ├── parts.jsx           ← Piezas compartidas: EventDetails, StatCard, GuestList, ShareCard...
│   │   ├── BasicPanel.jsx / ProPanel.jsx / VipPanel.jsx / LockedPanel.jsx
│   │   ├── AlbumPanel.jsx      ← UI de "/panel/album"
│   │   ├── GiftsPanel.jsx      ← UI de "/panel/regalos"
│   │   └── MusicPanel.jsx      ← UI de "/panel/musica"
│   │
│   └── admin/                  ← Componentes del admin
│       ├── AdminShell.jsx      ← Sidebar + estructura común de todas las páginas admin
│       ├── Charts.jsx          ← Gráficos SVG (Resumen, Ventas)
│       ├── AccesosManager.jsx / ClientesTable.jsx / ConsultasBoard.jsx / UserPlanSelect.jsx
│       ├── PanelesEditor.jsx   ← El editor completo del evento (357 líneas — el más grande)
│       ├── AddContact.jsx / DeleteButton.jsx / ResetPassword.jsx / UserNote.jsx / RedesConnect.jsx
│
├── lib/                        ← Lógica de servidor, datos y utilidades (sin JSX)
│   ├── db.js                   ← Cliente Prisma (conexión a PostgreSQL)
│   ├── home-data.js            ← Datos decorativos del marquee de la Home (tarjetas/sobres de muestra)
│   ├── templates.js            ← Catálogo de las 14 plantillas de diseño
│   ├── format.js               ← formatDate/formatTime (por idioma), slugify, accessInfo, rsvpKey
│   ├── admin.js                ← Datos de ejemplo (KPIs anuales, gráficos — no vienen de la BD)
│   ├── admin-queries.js        ← Lecturas reales del admin (usuarios, clientes, ventas...)
│   ├── admin-display.js        ← Mapeos de enums a etiquetas/colores (client-safe)
│   ├── panel-data.js           ← Carga compartida del evento+invitados para las sub-páginas del panel
│   ├── rate-limit.js           ← Limitador de peticiones (registro, subidas, reservas)
│   ├── social.js               ← Adaptador para APIs de redes sociales (aún sin conectar — Fase 2)
│   └── i18n/
│       ├── config.js           ← Lista de idiomas soportados (ES/EN/FR/IT)
│       ├── index.js            ← Junta los 4 diccionarios
│       ├── server.js           ← Versión server-side de t() (lee la cookie de idioma, usada en admin)
│       └── dictionaries/es.js, en.js, fr.js, it.js   ← Todos los textos traducidos
│
├── prisma/
│   ├── schema.prisma           ← El modelo de datos completo (User, Event, Guest, Gift, Photo...)
│   ├── seed.mjs                ← Datos de ejemplo (cuentas demo, evento de María, etc.)
│   └── migrations/             ← Historial de cambios a la base de datos
│
├── design-source/              ← El mockup original (.dc.html) — solo referencia, no se usa en runtime
├── docs/                       ← Documentación del proyecto (este archivo vive aquí)
│
├── auth.js / auth.config.js    ← Configuración de Auth.js (login, sesión, protección de rutas)
├── middleware.js               ← Aplica la protección de rutas en cada request
├── docker-compose.yml          ← Levanta PostgreSQL local
└── next.config.mjs             ← Configuración de Next.js + cabeceras de seguridad
```

---

## 3. Mapa de TODAS las rutas (URL → archivo)

| URL | Archivo | Sección |
|---|---|---|
| `/` | `app/(marketing)/page.jsx` | Marketing — **Home** |
| `/templates` | `app/(marketing)/templates/page.jsx` | Marketing |
| `/templates/<slug>` | `app/(marketing)/templates/[slug]/page.jsx` | Marketing |
| `/book` | `app/(marketing)/book/page.jsx` | Marketing |
| `/book/success` | `app/(marketing)/book/success/page.jsx` | Marketing |
| `/terminos` | `app/(marketing)/terminos/page.jsx` | Marketing |
| `/privacidad` | `app/(marketing)/privacidad/page.jsx` | Marketing |
| `/login` | `app/login/page.jsx` | Acceso |
| `/registro` | `app/registro/page.jsx` | Acceso |
| `/panel` | `app/panel/page.jsx` | Panel de la pareja |
| `/panel/album` | `app/panel/album/page.jsx` | Panel (Pro/VIP) |
| `/panel/regalos` | `app/panel/regalos/page.jsx` | Panel (Pro/VIP) |
| `/panel/musica` | `app/panel/musica/page.jsx` | Panel (solo VIP) |
| `/cuenta` | `app/cuenta/page.jsx` | Cuenta |
| `/i/<slug>` | `app/i/[slug]/page.jsx` | **Pública** — invitación real |
| `/album/subir` | `app/album/subir/page.jsx` | **Pública** — subida del invitado |
| `/admin` | `app/admin/page.jsx` | Admin (rol ADMIN) |
| `/admin/ventas` | `app/admin/ventas/page.jsx` | Admin |
| `/admin/usuarios` | `app/admin/usuarios/page.jsx` | Admin |
| `/admin/clientes` | `app/admin/clientes/page.jsx` | Admin |
| `/admin/paneles` | `app/admin/paneles/page.jsx` | Admin |
| `/admin/accesos` | `app/admin/accesos/page.jsx` | Admin |
| `/admin/consultas` | `app/admin/consultas/page.jsx` | Admin |
| `/admin/redes` | `app/admin/redes/page.jsx` | Admin |

---

## 4. ¿Cómo encuentro algo rápido?

- **"Quiero cambiar un texto del Home"** → sección 1.3 de arriba, busca el comentario de la sección (`{/* HERO */}`, etc.) en `app/(marketing)/page.jsx`. Si el texto viene de `t("home....")`, el texto real está en `lib/i18n/dictionaries/es.js` (y hay que replicar el cambio en `en.js`/`fr.js`/`it.js`).
- **"Quiero cambiar el diseño de una tarjeta del panel"** → `components/panel/parts.jsx` (piezas compartidas) o el panel específico (`BasicPanel.jsx`/`ProPanel.jsx`/`VipPanel.jsx`).
- **"Quiero cambiar qué ve el admin"** → la página en `app/admin/<sección>/page.jsx` trae los datos (`lib/admin-queries.js`) y el componente visual está en `components/admin/`.
- **"Quiero cambiar cómo se guarda algo en la base"** → `prisma/schema.prisma` (el modelo) + la función que escribe (`app/admin/actions.js`, `app/panel/actions.js`, o las rutas en `app/api/`).
