import TermsNotice from "@/components/TermsNotice";

export const metadata = {
  title: "Términos y condiciones · Onvite",
  description: "Términos y condiciones del servicio de invitaciones digitales Onvite.",
};

const HIGHLIGHTS = [
  {
    label: "Vigencia estándar",
    title: "Hasta 60 días después del evento",
    body: "Plan Premium VIP hasta 90 días. Pasado el plazo, el enlace y su información pueden darse de baja salvo renovación previa.",
  },
  {
    label: "Inicio del proyecto",
    title: "Con reserva confirmada y datos completos",
    body: "Los tiempos corren desde la recepción del pago inicial y del formulario con la información del evento.",
  },
  {
    label: "Activación final",
    title: "Después de la aprobación y pago total",
    body: "La invitación se habilita en línea una vez aprobado el diseño y cancelado el saldo pendiente.",
  },
];

const SUMMARY = [
  { t: "Reserva no reembolsable", b: "El servicio personalizado requiere agenda, planificación y ejecución previa." },
  { t: "Cambios limitados", b: "Se incluyen revisiones razonables; los cambios fuera de alcance se cotizan aparte." },
  { t: "Diseño protegido", b: "La copia, reutilización o reproducción del diseño sin autorización está prohibida." },
  { t: "Datos del cliente", b: "Nombres, fechas y contenidos deben revisarse antes de la aprobación final." },
  { t: "Uso de portafolio", b: "Podemos mostrar muestras promocionales del proyecto, salvo acuerdo distinto por escrito." },
  { t: "Testimonios cuidados", b: "Mensajes y audios solo se exhiben de forma parcial, cuidando la identidad del cliente." },
];

const SECTIONS = [
  { t: "1. El servicio", b: "Onvite ofrece invitaciones digitales personalizables para eventos (bodas, quinceañeros, bautizos, graduaciones y otros), con opciones para compartir la invitación y confirmar asistencia (RSVP). Las funciones disponibles dependen del plan contratado." },
  { t: "2. Cuentas de usuario", b: "Para elegir un plan o un diseño debes crear una cuenta con datos veraces (nombre, usuario, correo y contraseña). Eres responsable de mantener la confidencialidad de tu contraseña y de la actividad de tu cuenta. Podemos suspender cuentas que incumplan estos términos o que hagan un uso fraudulento." },
  { t: "3. Reservas, precios y pagos", b: "Los precios se muestran de forma referencial en el sitio. La contratación y el pago se coordinan de forma personalizada por WhatsApp o los canales de contacto indicados. Aceptamos los métodos de pago informados al momento de la coordinación (por ejemplo QR, transferencia, billeteras móviles, PayPal o Airtm). El servicio se considera confirmado una vez recibido el pago acordado." },
  { t: "4. Personalización y entregas", b: "Antes de publicar la invitación te enviamos una vista previa para tu aprobación. Los tiempos de entrega dependen del plan y de la información que nos proporciones a tiempo. Es tu responsabilidad revisar que los datos del evento (nombres, fecha, lugar) sean correctos antes de la aprobación final." },
  { t: "5. Cancelaciones y reembolsos", b: "Al tratarse de un servicio personalizado, las condiciones de cancelación y reembolso se acuerdan de forma individual en cada contratación. Cualquier solicitud debe realizarse por los canales de contacto oficiales." },
  { t: "6. Datos personales y de invitados", b: "Para prestar el servicio tratamos datos tuyos y de tus invitados (como nombres y confirmaciones de asistencia). Usamos esta información únicamente para operar tu evento y comunicarnos contigo. No vendemos tus datos a terceros. Es tu responsabilidad contar con el consentimiento de los invitados cuyos datos cargues en la plataforma." },
  { t: "7. Propiedad intelectual", b: "Los diseños, plantillas, marca y contenidos de Onvite son de su propiedad o de sus licenciantes. Al contratar obtienes una licencia de uso para tu evento; no puedes revender ni redistribuir los diseños." },
  { t: "8. Uso aceptable", b: "No está permitido usar la plataforma para fines ilícitos, cargar contenido ofensivo o que infrinja derechos de terceros, ni intentar vulnerar la seguridad del sistema." },
  { t: "9. Responsabilidad", b: "Hacemos nuestro mejor esfuerzo para que el servicio funcione correctamente, pero no garantizamos disponibilidad ininterrumpida. Onvite no será responsable por fallos ajenos a su control (proveedores externos, conexión a internet del usuario, etc.)." },
  { t: "10. Cambios en los términos", b: "Podemos actualizar estos términos cuando sea necesario. La versión vigente será siempre la publicada en esta página, con su fecha de actualización." },
  { t: "11. Contacto", b: "Para cualquier consulta sobre estos términos, escríbenos a hola@onvite.com o por WhatsApp." },
];

export default function TerminosPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 className="serif" style={{ fontSize: "clamp(30px,4vw,38px)", fontWeight: 600 }}>Términos y condiciones</h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 8, fontSize: 14 }}>Última actualización: 23 de julio de 2026</p>
        <TermsNotice />
        <p style={{ color: "var(--ink-soft)", marginTop: 20, fontSize: 14, lineHeight: 1.7 }}>
          Este documento regula el uso del sitio y de los servicios de Onvite (en adelante, «la plataforma»), un servicio de
          invitaciones digitales. Al crear una cuenta, realizar una reserva o utilizar cualquier función del sitio, aceptas estos términos.
        </p>

        <div className="grid grid-3" style={{ marginTop: 28, gap: 12 }}>
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} style={{ border: "1px solid var(--border)", background: "var(--surface)", borderRadius: 14, padding: 18 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--gold-deep)" }}>{h.label}</p>
              <p className="serif" style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginTop: 6 }}>{h.title}</p>
              <p style={{ color: "var(--ink-soft)", marginTop: 6, fontSize: 13, lineHeight: 1.55 }}>{h.body}</p>
            </div>
          ))}
        </div>

        <div style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,.6)", borderRadius: 16, padding: 24, marginTop: 16 }}>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 600 }}>Resumen rápido</h2>
          <p style={{ color: "var(--ink-soft)", marginTop: 2, fontSize: 13 }}>Los puntos más importantes del servicio, antes del detalle completo.</p>
          <div className="grid grid-3" style={{ marginTop: 18, gap: 20 }}>
            {SUMMARY.map((s) => (
              <div key={s.t}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{s.t}</p>
                <p style={{ color: "var(--ink-soft)", marginTop: 6, fontSize: 12, lineHeight: 1.55 }}>{s.b}</p>
              </div>
            ))}
          </div>
        </div>

        {SECTIONS.map((s) => (
          <div key={s.t}>
            <h2 className="serif" style={{ marginTop: 36, fontSize: 20, fontWeight: 600 }}>{s.t}</h2>
            <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>{s.b}</p>
          </div>
        ))}

        <p
          style={{
            marginTop: 36, border: "1px solid var(--border)", background: "rgba(255,255,255,.6)",
            borderRadius: 12, padding: 16, fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.6,
          }}
        >
          Nota: este texto es una base general y debe revisarse y adaptarse a la legislación local (Bolivia) antes de su uso definitivo.
          Se recomienda la validación por un profesional legal.
        </p>
      </div>
    </section>
  );
}
