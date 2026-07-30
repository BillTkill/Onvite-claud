# ✅ Antes de subir a la nube (producción)

Checklist de todo lo que hay que hacer **antes** de poner Onvite en internet.
Ordenado por prioridad. Cada punto dice qué falta y por qué.

> Estado: la app funciona bien en local (self-host). Estos puntos son para un
> despliegue serio y seguro en la nube.

---

## 🔴 Imprescindible (sin esto NO se sube)

### 1. Almacenamiento de archivos en la nube
- **Hoy:** las fotos del álbum y la música se guardan en el disco del servidor (`public/uploads/`).
- **Problema:** en la nube (Vercel, etc.) el disco es efímero o de solo lectura → los archivos se pierden.
- **Hacer:** usar almacenamiento de objetos: **Cloudinary**, **AWS S3**, **Vercel Blob** o **Supabase Storage**. Cambiar `app/api/upload/route.js` para subir ahí y guardar la URL pública. La estructura ya está lista para el cambio (solo cambia dónde se guarda).

### 2. Base de datos gestionada + backups
- **Hoy:** PostgreSQL local vía Docker.
- **Hacer:** una base gestionada en la nube — **Supabase**, **Neon**, **Railway** o **AWS RDS**. Configurar `DATABASE_URL` de producción. **Activar backups automáticos** (diarios).
- **Migraciones en producción:** usar `npx prisma migrate deploy` (NO `migrate dev`).

### 3. Variables de entorno de producción
- `AUTH_SECRET` → un secreto **nuevo, largo y aleatorio** (distinto al de dev).
- `DATABASE_URL` → la base en la nube.
- `AUTH_TRUST_HOST=true` y la URL pública del sitio.
- Claves de los servicios que se conecten (correo, almacenamiento, etc.).
- **Nunca** subir el `.env` al repositorio (ya está en `.gitignore`).

### 4. Quitar las cuentas y datos de demo
- El `seed` crea cuentas de prueba (`admin@onvite.com`, `maria@mail.com`, `basico@test.com`, etc.) con contraseñas conocidas.
- **Hacer:** en producción **no correr el seed** de demo. Crear el/los admin reales con contraseñas fuertes. Borrar cuentas de prueba.

### 5. HTTPS obligatorio
- Desplegar siempre con **HTTPS** (Vercel/Cloud lo dan automático).
- Con HTTPS, Auth.js activa **cookies seguras** solo. La cabecera **HSTS** ya está configurada (`next.config.mjs`).

---

## 🟡 Muy recomendable

### 6. Servicio de correo (email)
- **Para:** recuperación de contraseña self-service ("olvidé mi contraseña"), avisos de vencimiento de acceso, confirmaciones.
- **Hacer:** conectar **Resend** o **SMTP de Gmail**. Con eso se activa el flujo completo de recuperar contraseña (página de solicitud → correo con enlace/token → nueva contraseña). Hoy la recuperación es **asistida por el admin** (botón 🔑 en Usuarios → contraseña temporal por WhatsApp).

### 7. Rate limiting compartido
- **Hoy:** hay límite de peticiones **en memoria** (`lib/rate-limit.js`) en registro, reservas, subidas y álbum. Funciona para **una sola instancia**.
- **Hacer:** si se escala a varias instancias o serverless, usar un store compartido: **Upstash Redis**. Reemplazar el Map por Redis.

### 8. Content-Security-Policy (CSP) a medida
- Ya están las cabeceras base (`X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS).
- **Falta:** un **CSP** afinado. Es delicado porque la app usa estilos en línea y recursos externos (Google Fonts, mapa de Google, servicio de QR). Hay que permitir esos orígenes y probar bien para no romper la página.

### 9. Monitoreo de errores y logs
- **Hacer:** conectar **Sentry** (o similar) para ver errores en producción, y logs del servidor.

---

## 🟢 Mejoras de calidad (cuando haya tiempo)

### 10. Generación de QR propia
- Hoy el QR se genera con un servicio externo (`api.qrserver.com`), que recibe el enlace.
- **Mejor:** generar el QR en el servidor (librería `qrcode`) para no depender de terceros ni exponer enlaces.

### 11. Mapas con API key
- Hoy el mapa es el **embed gratuito** de Google (sin clave). Si se quiere mapa interactivo con marcadores, usar la **Google Maps API** con su clave.

### 12. Redes sociales (APIs reales)
- Conectar Meta/TikTok/YouTube/X/Telegram con sus cuentas de desarrollador (ver `docs/redes-integraciones.md`).

### 13. Validación de archivos más estricta
- Además del tipo declarado, verificar los **magic bytes** del archivo (que un `.jpg` sea realmente una imagen).

### 14. Términos y Privacidad revisados por un abogado
- Los textos actuales son una base sólida, pero deben validarse legalmente (Bolivia) antes de producción.

### 15. Traducir el panel de administración completo
- (Ya está traducido a ES/EN/FR/IT; revisar que no falte ningún texto nuevo.)

---

## 🚀 Cómo desplegar (resumen)
1. Subir el código a GitHub (ya se hace).
2. Elegir hosting: **Vercel** (fácil, serverless — requiere puntos 1 y 7) o un **servidor Node** propio (VPS — el self-host actual funciona tal cual).
3. Configurar las **variables de entorno** de producción.
4. Correr `npx prisma migrate deploy`.
5. `npm run build` y arrancar (`npm start` o Vercel lo hace solo).
6. Verificar HTTPS, subidas, correo y accesos.

---

*Este archivo se actualiza a medida que completamos los puntos. — Onvite*
