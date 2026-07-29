# 📋 Parte de trabajo — Marco (28/07/2026)

Hola 👋. Este archivo explica **todo lo que hice en esta sesión** para que puedas continuar sin perderte. Léelo de arriba a abajo; al final está el paso a paso para actualizar tu repositorio y arrancar.

---

## 1. Resumen en una línea

Implementé las **4 pantallas que faltaban** del mockup (README del handoff): **Álbum de fotos QR**, **Mesa de regalos**, **Música (VIP)** y la **vista del invitado para subir fotos sin cuenta**. No toqué nada de lo que ya funcionaba, ni el diseño, colores o logo.

---

## 2. Contexto importante (léelo antes de tocar nada)

El README del handoff (`design_handoff_onvite_mockups/README.md`) **fue escrito para otra variante del proyecto** que usaba **Tailwind v4 + next-intl + `src/styles/tokens.css`**. **Nuestro proyecto real (`Onvite-claud`) NO usa eso**: usa **CSS plano** (`app/globals.css` + `app/ui.css`) y un **i18n propio** (`lib/i18n/`).

👉 Por eso implementé todo con **los patrones reales de nuestro repo**, no con los que pedía el README. Los tokens de diseño (colores/tipografías) ya estaban copiados idénticos al mockup dentro de `app/globals.css`, así que el resultado respeta el diseño al pixel.

**Conclusión:** si en el futuro seguimos el handoff, hay que traducir sus instrucciones a nuestro stack (CSS plano + i18n propio), no copiar Tailwind/next-intl.

---

## 3. Qué construí (las 4 pantallas)

| Pantalla | Ruta | Acceso | Qué tiene |
|---|---|---|---|
| **Álbum de fotos QR** | `/panel/album` | Pro y VIP | QR imprimible + enlace del álbum, KPIs (fotos subidas, invitados que subieron, días disponibles), toggle **"revisar antes de publicar"**, galería tipo libro, y **permisos por invitado** (reutiliza el componente `UploadPermissions` que ya existía) |
| **Mesa de regalos** | `/panel/regalos` | Pro y VIP | Lista de regalos con estado **Disponible / Reservado por [invitado]**, aporte económico con **"Pagar por QR"**, y botón **"+ Añadir regalo"** |
| **Música de fondo** | `/panel/musica` | Solo VIP | Canción actual, lista para elegir o **"subir mi propia canción"**, y toggle **"reproducir al abrir"** |
| **Vista del invitado** | `/album/subir` | **Pública** (sin login) | Estilo móvil: elegir fotos/videos → nombre opcional → respaldo en Google Drive → pantalla **"¡Gracias!"**. Con límite de archivos por invitado |

Además **cablé** las tarjetas de los paneles Pro y VIP: las de "Álbum", "Mesa de regalos" y "Música" antes eran botones sin acción; ahora **enlazan** a estas páginas nuevas.

---

## 4. Archivos NUEVOS que creé

```
app/panel/album/page.jsx            ← página server del álbum (guarda plan Pro/VIP)
app/panel/regalos/page.jsx          ← página server de la mesa de regalos
app/panel/musica/page.jsx           ← página server de música (solo VIP)
app/album/subir/page.jsx            ← vista pública del invitado (sin cuenta)

components/panel/AlbumPanel.jsx      ← UI cliente del álbum (QR, KPIs, galería, permisos)
components/panel/GiftsPanel.jsx      ← UI cliente de la mesa de regalos
components/panel/MusicPanel.jsx      ← UI cliente de música

lib/panel-data.js                   ← helper server-only compartido: carga el evento del
                                       dueño y su lista de invitados (para no repetir código
                                       en las 3 sub-páginas del panel)

PARTE-DE-MARCO.md                    ← este archivo
```

## 5. Archivos que MODIFIQUÉ (cambios pequeños y seguros)

```
components/Icon.jsx                  ← añadí 5 iconos nuevos: upload, play, plus, printer, image
components/panel/parts.jsx           ← ExtraCard ahora acepta una prop `href` opcional
                                       (si la recibe, el botón es un <Link>; si no, sigue igual)
components/panel/ProPanel.jsx        ← enlacé las tarjetas Álbum y Regalos a sus rutas
components/panel/VipPanel.jsx        ← enlacé Álbum, Regalos y Música a sus rutas

lib/i18n/dictionaries/es.js          ← claves nuevas: panel.album, panel.gifts, panel.music
lib/i18n/dictionaries/en.js            y un bloque `album` (vista del invitado)
lib/i18n/dictionaries/fr.js            → TODO traducido en los 4 idiomas (ES/EN/FR/IT),
lib/i18n/dictionaries/it.js            igual que el resto del panel de la pareja

package-lock.json                    ← se normalizó solo al hacer npm install (sin dependencias nuevas)
```

> ⚠️ **No añadí ninguna dependencia nueva** a `package.json`. No hace falta volver a instalar nada especial.

---

## 6. Detalles técnicos que conviene saber

- **Guardas de acceso:** cada sub-página del panel comprueba sesión y plan en el servidor.
  - Sin sesión → redirige a `/login`.
  - Sin evento activo (panel bloqueado) → redirige a `/panel`.
  - `/panel/album` y `/panel/regalos` piden plan **Pro o VIP**; `/panel/musica` pide **VIP**. Si no cumple, redirige a `/panel`.
- **Reutilicé componentes y estilos existentes** para no romper el diseño: `PanelChrome`, `ExtraCard`, `UploadPermissions`, `StatCard`, y las clases CSS `pcard`, `toggle-switch`, `share-btn`, `pill-toggle`, `p-split`, etc. (todo ya estaba en `app/ui.css`).
- **El QR del álbum es decorativo** (un SVG generado con un patrón fijo). No es un QR real todavía.

---

## 7. ⚠️ Lo que es "de ejemplo" (placeholder) y falta para producción

Igual que el resto del mockup (el QR, los datos de "Redes" en el admin, etc.), estas pantallas usan **datos de ejemplo** para lo que aún no tiene backend:

- El **QR** es decorativo → falta generación real de QR.
- La **galería del álbum** y la **subida del invitado** no guardan archivos → falta almacenamiento real (subida + Google Drive).
- La **lista de regalos** y el **catálogo de canciones** son datos fijos en el código → faltan modelos en la base de datos (Prisma) para que persistan.

Cada pantalla lo indica con una nota al pie. **El siguiente paso natural** sería conectar uno de estos (por ejemplo, generar QR real y guardar las fotos subidas).

---

## 8. 🚀 Cómo continuar TÚ (paso a paso)

### A. Traer los cambios que subí

En tu cmd, dentro de la carpeta del proyecto:

```
cd /d "RUTA\DE\TU\Onvite-claud"
git pull origin main
```

### B. Preparar el entorno (solo la primera vez en tu máquina)

Si es tu primera vez con el proyecto en esta computadora:

```
npm install
copy .env.example .env
npx auth secret
```

> El archivo `.env` **NO está en el repositorio** (lleva secretos y está en `.gitignore`). Cada uno genera el suyo. Ojo: `npx auth secret` a veces imprime la variable con el nombre equivocado (`BETTER_AUTH_SECRET`). La correcta para este proyecto es **`AUTH_SECRET`** — pega un texto largo aleatorio en esa línea del `.env`.

Luego levanta la base de datos (necesitas Docker Desktop abierto):

```
npm run db:up
npm run db:migrate
npm run db:seed
```

### C. Arrancar

```
npm run dev
```

Abre **http://localhost:3000**.

> 💡 **Consejo:** para ver cambios **NO uses `npm run build`** mientras el `npm run dev` está corriendo — corrompe la carpeta `.next` (nos pasó). Con `dev` basta: recompila solo al guardar. Si algo se rompe, borra `.next` y arranca de nuevo:
> `rmdir /s /q .next` y luego `npm run dev`.

### D. Probar las pantallas nuevas

Entra con la cuenta de ejemplo `maria@mail.com` / `Cliente123!` (plan Pro):
- En su panel, clic en **"Álbum de fotos QR"** → `/panel/album`
- Clic en **"Mesa de regalos"** → `/panel/regalos`
- Vista del invitado (sin login): `http://localhost:3000/album/subir`
- La de **Música** es solo VIP. Para verla, cambia el plan de María a VIP desde el panel **admin** (`admin@onvite.com` / `Admin123!` → Usuarios), o en Prisma Studio (`npm run db:studio`).

---

## 9. Cuentas de ejemplo (recordatorio)

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Admin | `admin@onvite.com` | `Admin123!` |
| Cliente (plan Pro, con evento) | `maria@mail.com` | `Cliente123!` |
| Otros clientes | `rosaf@mail.com`, `valen@mail.com`… | `Demo123!` |

---

## 10. Idea para la próxima entrega (sugerencia, no obligatorio)

Cuando cada uno termine su parte, dejar un archivo de parte como este (por ejemplo `PARTE-DE-[NOMBRE].md`) explicando qué se hizo, para que el otro continúe sin perderse. Así nos vamos pasando la posta. 🙌

Cualquier duda con lo que hice, está todo comentado en el código.

---

# 🔟 Segunda sesión (28–29/07/2026) — mejoras grandes

Después de la primera entrega seguimos trabajando bastante. Resumen de lo nuevo:

## ⚠️ IMPORTANTE al actualizar (léelo primero)
Hay **3 migraciones nuevas** de Prisma. Después de `git pull` corre **sí o sí**:
```
npm run db:migrate
npm run db:seed
```
Si no, fallará (hay tablas/campos nuevos: `Gift`, `SocialConnection`, `Event.musicAutoplay`).

## Cuentas de prueba nuevas (contraseña `Test123!`)
| Plan | Correo |
|---|---|
| Estándar | `basico@test.com` |
| Premium | `premium@test.com` |
| Premium VIP | `vip@test.com` |
> Ahora **todos** los usuarios cliente aparecen de forma coherente en Usuarios, Clientes y Accesos (base de datos unificada). Solo hay **3 planes**: Estándar / Premium / Premium VIP.

## Correcciones y arreglos
- **Bug ciudad** en `/api/reservations` (el CRM ya la muestra).
- **Planes unificados** a 3 (antes había Normal/Pro/VIP/Premium Plus mezclados).
- **Permisos del álbum, mesa de regalos y música** ahora **persisten** en la base de datos.
- Quitamos textos fijos y el duplicado de "Quién puede subir al álbum" (queda solo en `/panel/album`).

## Admin
- **Traducido a 4 idiomas** (ES/EN/FR/IT) usando una **cookie de idioma** para el servidor (`lib/i18n/server.js`).
- **Nueva sección "Paneles"** (`/admin/paneles`): editar el evento del usuario (fecha, hora, lugar, dirección + **mapa Google gratis**, código de vestimenta, plan, plantilla, música) y **"Crear panel"** para usuarios sin panel.
- **Accesos** es ahora **por usuario** (no por reserva): selector de plan y de plantilla, **"Editar"** para cambiar el plan de un panel activo, mensaje verde **"Se le dio acceso a [nombre] (correo)"**, y **"días restantes"** con **auto-desactivación** a los 60/90 días (el panel se bloquea solo; el aviso al cliente se hace manual por WhatsApp/correo).
- **Usuarios**: cambiar plan a **cualquier** usuario, columna **"Datos extra"** (verde/rojo con la nota del cliente), orden **más reciente arriba**.
- **Clientes**: estados con **color** (rojo/azul/verde).
- **Redes**: botones **Conectar/Conectado** que persisten (modelo `SocialConnection`); claves en `.env.example` y guía en `docs/redes-integraciones.md` (OAuth real necesita cuentas/keys de cada plataforma).

## Panel del cliente
- **Rediseño visual glamuroso**: fondo con degradado, barra superior tipo cristal, tarjetas con sombras premium, banner dorado, estadísticas con acento de color, barra de asistencia con degradado.
- **Compartir invitación**: WhatsApp / copiar enlace / **QR real** (servicio gratuito). El "Pagar por QR" de regalos muestra un QR de ejemplo.
- **Ver ubicación en el mapa**: mapa de Google incrustado (gratis, sin API key).
- Panel bloqueado: los 3 planes llevan a **solicitar** (`/book`).

## Legal
- **Términos** ampliados a 18 secciones y nueva **Política de privacidad** (`/privacidad`), en español neutral.

## Español neutral
- Toda la web pasó de español de España ("contadnos/vuestra") a **español neutral** ("cuéntennos/su").

## Pendiente para próximos pases (lo hablado con el cliente)
1. **QR de pago real configurable por el admin** (hoy es de ejemplo).
2. **Agregar regalos y enlace del álbum desde el admin** (hoy los regalos se agregan desde el panel de la pareja).
3. **Página pública real de la invitación** (con fotos/videos) — hoy el enlace/QR/WhatsApp apuntan a un enlace de ejemplo (`onvite.com/i/...`).
4. **Redes**: conectar las APIs reales (necesita cuentas de desarrollador y claves).

— Marco
