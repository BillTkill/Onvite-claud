<<<<<<< HEAD
# Onvite-claude
Invitaciones 
=======
# Onvite

Invitaciones de boda digitales y webs de RSVP online. Implementación en **Next.js 15 (App Router) + React 19** del mockup de Módulo 1 (`design-source/Onvite - Mockups.dc.html`).

Paleta marfil / oro · tipografías **Fraunces + Inter** · español (con selector ES · EN · FR · IT en la cabecera).

## Cómo ejecutar

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # build de producción (prerenderiza todas las rutas)
npm run start    # sirve el build de producción
```

## Credenciales de demostración

La autenticación es **solo demo** (sin backend; los usuarios viven en `localStorage`).

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Cliente (con plan Pro) | `maria@mail.com` | `Cliente123!` |
| Admin | `admin@onvite.com` | `Admin123!` |

- Al **registrar** una cuenta nueva, el usuario queda sin plan → ve el **panel bloqueado**.
- En `/panel`, el control **«Vista demo»** permite previsualizar los cuatro estados del panel (Bloqueado · Básico · Pro · Premium VIP) sin cambiar de cuenta.

## Qué incluye este pase

**01 · Sitio público (marketing)**
- `/` — Home: hero, features, plantillas destacadas, cómo funciona, promo álbum, precios, FAQ (acordeón), contacto.
- `/templates` — galería con filtros por formato (Todas / Una página / Libro) y por estilo.
- `/templates/[slug]` — detalle de plantilla (14 diseños, prerenderizados).
- `/book` + `/book/success` — formulario de reserva y confirmación.
- `/terminos` — términos y condiciones.

**02 · Acceso**
- `/login` y `/registro` (con verificación anti-bot), cabecera con menú de cuenta al iniciar sesión, y panel bloqueado para usuarios sin plan.

**03 · Panel de la pareja**
- `/panel` — Básico, Pro y Premium VIP, con cuenta regresiva, estadísticas de RSVP, barra de asistencia, compartir, álbum QR, mesa de regalos, música, permisos de subida y lista de invitados.

**04 · Panel de administración** (`/admin`, solo rol admin)
- `/admin` — Resumen: KPIs del negocio y gráficos de evolución/acumulado anual.
- `/admin/ventas` — ingresos por mes, por método de pago y detalle de últimas ventas.
- `/admin/usuarios` — cuentas registradas y su plan.
- `/admin/clientes` — CRM con búsqueda y filtros de contacto/pago.
- `/admin/accesos` — habilitar paneles: dar acceso a solicitudes y vincular plan/plantilla.
- `/admin/consultas` — bandeja unificada (WhatsApp/Correo/Telegram/Instagram) con «marcar atendido».
- `/admin/redes` — métricas de redes sociales estilo Metricool.

Entra con la cuenta admin (`admin@onvite.com` / `Admin123!`). El acceso está protegido: un cliente que intente abrir `/admin` es redirigido a su panel.

**Idiomas (ES · EN · FR · IT)**
- Selector de idioma funcional en la cabecera. La preferencia se guarda en `localStorage` y actualiza `<html lang>`.
- Todo el sitio público y el acceso están traducidos a los 4 idiomas: cabecera/pie, home, plantillas (filtros, estilos y descripciones), detalle, reserva, éxito, login, registro, FAQ y 404.
- Motor propio y ligero (contexto de React + diccionarios en `lib/i18n/dictionaries/`), sin dependencias externas.
- Aún en español (se traducirán en un próximo pase): el panel de la pareja, el panel de administración y el cuerpo legal de Términos (que muestra un aviso localizado). Añadir estas traducciones es solo ampliar los diccionarios.

## Pendiente para próximos pases

- Traducir el panel de la pareja, el admin y el texto legal completo de Términos.
- Backend real (auth, base de datos, pagos) — hoy todo es demo con datos de ejemplo.

## Estructura

```
app/
  layout.jsx              # raíz: fuentes, AuthProvider, metadata
  globals.css             # design tokens + base
  ui.css                  # estilos de componentes
  (marketing)/            # rutas públicas con cabecera + pie compartidos
    layout.jsx  page.jsx  templates/  book/  terminos/
  login/  registro/       # pantallas de acceso (sin cabecera de marketing)
  panel/                  # panel de la pareja (cabecera propia)
  admin/                  # panel de administración (layout con gate de rol admin)
components/
  SiteHeader / SiteFooter / TemplateCard / Faq / Icon / Seal
  AuthProvider.jsx        # auth demo (localStorage)
  BookForm.jsx
  panel/                  # BasicPanel / ProPanel / VipPanel / LockedPanel / parts
  admin/                  # AdminShell (sidebar) / Charts / helpers
  I18nProvider.jsx        # motor de i18n (contexto + hook useI18n)
lib/
  templates.js            # catálogo de 14 plantillas
  event.js                # datos demo del evento y de invitados
  admin.js                # datos demo del panel de administración
  i18n/                   # config, index y diccionarios es/en/fr/it
design-source/            # mockup original (.dc.html) — solo referencia
```

## Notas

- Las fuentes se cargan vía Google Fonts (`<link>`), con degradado elegante a Georgia / system-ui si no hay red.
- Los marcos de navegador y de móvil del mockup eran andamiaje de presentación; la implementación es una web responsive real.
>>>>>>> eeeeb8c (Initial commit)
