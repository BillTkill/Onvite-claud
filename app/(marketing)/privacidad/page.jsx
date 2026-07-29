import Link from "next/link";

export const metadata = {
  title: "Política de privacidad · Onvite",
  description: "Cómo Onvite recopila, usa y protege los datos personales.",
};

const SECTIONS = [
  { t: "1. Responsable del tratamiento", b: "Onvite (en adelante, «nosotros») es responsable del tratamiento de los datos personales que se recopilan a través de la plataforma. Para cualquier consulta sobre privacidad puedes escribirnos a hola@onvite.com." },
  { t: "2. Qué datos recopilamos", b: "Recopilamos: (a) datos de cuenta que nos proporcionas (nombre, usuario, correo y contraseña, esta última siempre cifrada); (b) datos del evento que cargas (nombres de la pareja, fecha, lugar, dirección, textos, fotos, videos y música); (c) datos de tus invitados que decidas incluir (nombres, acompañantes y confirmaciones de asistencia); y (d) datos técnicos básicos necesarios para operar el sitio (por ejemplo, cookies de sesión)." },
  { t: "3. Para qué usamos los datos", b: "Usamos los datos únicamente para: crear y gestionar tu cuenta, prestar y personalizar el servicio, mostrar tu invitación y su panel, procesar confirmaciones de asistencia, comunicarnos contigo sobre tu proyecto y cumplir obligaciones legales. No usamos tus datos para fines distintos sin tu consentimiento." },
  { t: "4. Base para el tratamiento", b: "Tratamos tus datos sobre la base de la ejecución del servicio que contratas, tu consentimiento (que puedes retirar), y el cumplimiento de obligaciones legales aplicables." },
  { t: "5. Cookies", b: "Usamos una cookie de sesión necesaria para mantener tu inicio de sesión y una preferencia local para recordar el idioma del sitio. No utilizamos cookies de publicidad ni de seguimiento de terceros para perfilarte." },
  { t: "6. Con quién compartimos datos", b: "No vendemos tus datos. Podemos compartir datos con proveedores que nos ayudan a operar el servicio (por ejemplo, alojamiento, mapas, generación de códigos QR o mensajería), únicamente en la medida necesaria y bajo obligaciones de confidencialidad. También podremos divulgarlos si la ley lo exige." },
  { t: "7. Datos de tus invitados", b: "Cuando cargas datos de tus invitados, actúas como responsable de esa información y declaras contar con su consentimiento. Nosotros los tratamos por tu cuenta, solo para operar tu evento, y no los usamos para otros fines." },
  { t: "8. Conservación", b: "Conservamos los datos del evento mientras tu plan esté activo y durante el plazo de vigencia del enlace (por defecto hasta 60 días después del evento; hasta 90 días en Premium VIP). Luego pueden eliminarse, salvo renovación. Los datos de cuenta se conservan mientras tu cuenta exista o según lo exija la ley." },
  { t: "9. Tus derechos", b: "Puedes solicitar el acceso, la rectificación, la actualización o la eliminación de tus datos, así como retirar tu consentimiento, escribiéndonos a hola@onvite.com. Atenderemos tu solicitud en un plazo razonable conforme a la normativa aplicable." },
  { t: "10. Seguridad", b: "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos (por ejemplo, contraseñas cifradas y control de acceso por roles). Ningún sistema es 100% infalible, pero trabajamos para reducir los riesgos." },
  { t: "11. Menores", b: "El servicio está dirigido a personas mayores de edad. No recopilamos de forma consciente datos de menores para la creación de cuentas. Si detectamos un registro de un menor sin autorización, lo eliminaremos." },
  { t: "12. Cambios y contacto", b: "Podemos actualizar esta política; la versión vigente será siempre la publicada en esta página con su fecha. Para cualquier consulta sobre privacidad, escríbenos a hola@onvite.com o por WhatsApp." },
];

export default function PrivacidadPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 className="serif" style={{ fontSize: "clamp(30px,4vw,38px)", fontWeight: 600 }}>Política de privacidad</h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 8, fontSize: 14 }}>Última actualización: 28 de julio de 2026</p>
        <p style={{ color: "var(--ink-soft)", marginTop: 20, fontSize: 14, lineHeight: 1.7 }}>
          Esta política explica cómo Onvite recopila, usa y protege los datos personales al utilizar la plataforma. Léela junto con
          nuestros <Link href="/terminos" style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Términos y condiciones</Link>.
        </p>

        {SECTIONS.map((s) => (
          <div key={s.t}>
            <h2 className="serif" style={{ marginTop: 32, fontSize: 20, fontWeight: 600 }}>{s.t}</h2>
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
