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
  { t: "1. El servicio", b: "Onvite ofrece invitaciones digitales personalizables para eventos (bodas, quinceañeros, bautizos, graduaciones y otros), con opciones para compartir la invitación y confirmar asistencia (RSVP). Las funciones disponibles dependen del plan contratado. Nos reservamos el derecho de modificar, suspender o descontinuar funciones del servicio, informándolo con antelación razonable cuando afecte a proyectos activos." },
  { t: "2. Requisitos para contratar", b: "Para crear una cuenta y contratar debes ser mayor de edad según la legislación de tu país (18 años en Bolivia) o contar con la autorización de tu representante legal. Al usar la plataforma declaras que la información que proporcionas es veraz y que tienes capacidad legal para aceptar estos términos." },
  { t: "3. Cuentas de usuario", b: "Para elegir un plan o un diseño debes crear una cuenta con datos veraces (nombre, usuario, correo y contraseña). Eres responsable de mantener la confidencialidad de tu contraseña y de toda la actividad realizada desde tu cuenta. Notifícanos de inmediato ante cualquier uso no autorizado. Podemos suspender o cerrar cuentas que incumplan estos términos o que hagan un uso fraudulento." },
  { t: "4. Reservas, precios y pagos", b: "Los precios se muestran de forma referencial en el sitio y pueden actualizarse; el precio aplicable es el acordado al momento de la contratación. La contratación y el pago se coordinan de forma personalizada por WhatsApp o los canales de contacto indicados; el pago NO se procesa dentro del sitio. Aceptamos los métodos informados al momento de la coordinación (por ejemplo QR, transferencia, billeteras móviles, PayPal o Airtm). El servicio se considera confirmado una vez recibido el pago acordado. Los impuestos que correspondan según la normativa vigente se aplicarán cuando sea el caso." },
  { t: "5. Personalización y entregas", b: "Antes de publicar la invitación te enviamos una vista previa para tu aprobación. Los tiempos de entrega dependen del plan y de que nos proporciones la información a tiempo. Es tu responsabilidad revisar que los datos del evento (nombres, fecha, lugar, textos) sean correctos antes de la aprobación final; los errores detectados después de la publicación pueden implicar un costo adicional de corrección." },
  { t: "6. Cancelaciones y reembolsos", b: "Al tratarse de un servicio personalizado que requiere agenda, planificación y trabajo de diseño, la reserva inicial no es reembolsable una vez iniciado el proyecto. Las condiciones específicas de cancelación y reembolso se acuerdan de forma individual en cada contratación y deben solicitarse por los canales de contacto oficiales." },
  { t: "7. Contenido del cliente", b: "Conservas la titularidad de los contenidos que cargas (nombres, fotos, videos, textos, música y datos del evento). Al cargarlos, nos otorgas una licencia limitada para alojarlos, procesarlos y mostrarlos con el único fin de prestar el servicio. Declaras que cuentas con los derechos necesarios sobre ese contenido y con el consentimiento de las personas que aparezcan o cuyos datos incluyas." },
  { t: "8. Datos personales y de invitados", b: "Para prestar el servicio tratamos datos tuyos y de tus invitados (como nombres y confirmaciones de asistencia), conforme a nuestra Política de Privacidad. Usamos esta información únicamente para operar tu evento y comunicarnos contigo. No vendemos tus datos a terceros. Es tu responsabilidad contar con el consentimiento de los invitados cuyos datos cargues en la plataforma." },
  { t: "9. Álbum de fotos y contenido de invitados", b: "En los planes que lo incluyen, los invitados pueden subir fotos y videos al álbum. Tú, como titular del evento, decides quién puede subir y puedes activar la revisión previa antes de publicar. No nos responsabilizamos por el contenido cargado por los invitados; sin embargo, podremos retirar contenido manifiestamente ilícito, ofensivo o que infrinja derechos de terceros cuando tengamos conocimiento de ello." },
  { t: "10. Propiedad intelectual", b: "Los diseños, plantillas, marca, logotipo y contenidos de Onvite son de su propiedad o de sus licenciantes y están protegidos por la ley. Al contratar obtienes una licencia de uso, personal y no exclusiva, para tu evento; no puedes copiar, revender, redistribuir ni crear obras derivadas de los diseños sin autorización escrita." },
  { t: "11. Uso aceptable", b: "No está permitido usar la plataforma para fines ilícitos, cargar contenido ofensivo, engañoso o que infrinja derechos de terceros, enviar spam, ni intentar vulnerar, sobrecargar o eludir la seguridad del sistema. El incumplimiento puede derivar en la suspensión inmediata del servicio." },
  { t: "12. Servicios de terceros", b: "El servicio puede apoyarse en proveedores externos (por ejemplo, alojamiento, mapas, generación de códigos QR, tipografías, plataformas de pago o mensajería). No controlamos ni respondemos por dichos servicios, que se rigen por sus propios términos. La disponibilidad del servicio puede depender de estos proveedores." },
  { t: "13. Vigencia del enlace", b: "La invitación permanece disponible en línea durante el plazo del plan contratado (por defecto hasta 60 días después del evento; hasta 90 días en Premium VIP). Pasado ese plazo, el enlace y su información pueden darse de baja, salvo renovación previamente acordada. Te recomendamos descargar tus fotos y datos antes del vencimiento." },
  { t: "14. Garantías y limitación de responsabilidad", b: "Hacemos nuestro mejor esfuerzo para que el servicio funcione correctamente, pero se presta «tal cual» y no garantizamos disponibilidad ininterrumpida ni ausencia total de errores. En la medida permitida por la ley, la responsabilidad total de Onvite frente a ti por cualquier reclamo relacionado con el servicio no excederá el monto efectivamente pagado por la contratación correspondiente. No respondemos por daños indirectos, lucro cesante ni por fallos ajenos a nuestro control." },
  { t: "15. Fuerza mayor", b: "No seremos responsables por incumplimientos o retrasos causados por hechos fuera de nuestro control razonable, como desastres naturales, cortes de energía o de internet, fallos de proveedores, medidas de autoridad o conmoción social." },
  { t: "16. Ley aplicable y resolución de disputas", b: "Estos términos se rigen por las leyes del Estado Plurinacional de Bolivia. Ante cualquier controversia, las partes procurarán una solución de buena fe por los canales de contacto oficiales; de no lograrse, se someterán a los tribunales competentes del domicilio de Onvite, sin perjuicio de los derechos que la normativa de protección al consumidor reconozca al usuario." },
  { t: "17. Divisibilidad y cambios", b: "Si alguna cláusula de estos términos fuera declarada inválida, las demás seguirán vigentes. Podemos actualizar estos términos cuando sea necesario; la versión vigente será siempre la publicada en esta página, con su fecha de actualización. El uso continuado del servicio tras un cambio implica su aceptación." },
  { t: "18. Contacto", b: "Para cualquier consulta sobre estos términos o para ejercer tus derechos sobre tus datos, escríbenos a hola@onvite.com o por WhatsApp a los canales indicados en el sitio." },
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
