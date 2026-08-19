# Guía para llevar el mockup de Onvite a tu proyecto principal

Esta guía tiene dos partes:

1. **Los pasos** que vas a seguir vos (qué hacer y en qué orden).
2. **El prompt ya redactado**, listo para copiar y pegar en tu proyecto principal (Claude Code, Cursor, v0, etc.) para que la IA construya la pantalla de inicio con un stack profesional en vez de HTML plano.

---

## Parte 1 — Pasos a seguir

### Paso 1: Elige dónde vas a pegar el prompt
El prompt de abajo está pensado para una herramienta de código (Claude Code, Cursor, Windsurf, etc.) porque necesita crear varios archivos/componentes, instalar dependencias y correr el proyecto. No lo uses en un chat normal sin acceso a archivos.

### Paso 2: Ten a mano estos dos archivos
- `onvite-mockup-v2.html` → el mockup visual completo que hicimos (referencia de diseño).
- Este documento con el prompt.

Súbelos ambos a tu proyecto (o pega el prompt y adjunta el HTML como referencia) para que la IA pueda "leer" exactamente los colores, textos y estructura que ya definimos.

### Paso 3: Pega el prompt de la Parte 2 tal cual, y al final agrega la ruta o el contenido del HTML de referencia.

### Paso 4: Revisa lo que la IA te entregue
Pídele que te muestre capturas o que lo corras localmente antes de aceptar cambios grandes. Como ya tienes el mockup, es fácil comparar visualmente si algo quedó distinto.

### Paso 5: Reemplaza los placeholders
En el mockup usamos degradados de color en vez de fotos reales de las plantillas, y un QR simulado. Cuando tengas los assets reales (fotos, logo final, etc.) pídele a la IA que los reemplace en los componentes correspondientes.

### Paso 6: Repetimos el proceso para las siguientes pantallas
Una vez validada la home, seguimos maquetando las demás pantallas (plantillas completas, checkout, panel de invitados, etc.) y generamos un prompt igual de específico para cada una.

---

## Parte 2 — El prompt (copiar y pegar tal cual)

```
Quiero que implementes la pantalla de inicio (home) de "Onvite", una plataforma de
invitaciones de boda digitales, usando un stack profesional en vez de HTML plano.

CONTEXTO
Ya tengo un mockup funcional en HTML/CSS/JS puro (archivo adjunto: onvite-mockup-v2.html)
que define el diseño final aprobado: colores, tipografías, textos, layout y animaciones
básicas de cada sección. Tu tarea NO es rediseñar nada — es tomar ese mockup como fuente
de verdad visual y reconstruirlo con una arquitectura de componentes profesional,
reutilizable y mantenible.

STACK A USAR
- Framework: React con Next.js (App Router), usando TypeScript.
- Estilos: Tailwind CSS, configurando un theme personalizado con los tokens de diseño
  que están en el <style> del mockup (variables --cream, --ink, --gold, --gold-soft,
  --line, etc.) como colores custom de Tailwind, y "Playfair Display" + "Inter" como
  fuentes (next/font/google).
- Animaciones: Framer Motion para las animaciones de entrada/scroll y para el texto
  deslizante del hero ("Bodas / Cumpleaños / Fiestas"). Usa CSS puro (keyframes) solo
  para animaciones continuas simples como el marquee infinito de las plantillas y sobres.
- Componentes de interacción: si necesitas un carrusel/slider (por ejemplo para que la
  galería de plantillas sea deslizable en mobile, o para las tarjetas de testimonios),
  usa la librería "Embla Carousel" (embla-carousel-react) o "Swiper" — elige la que
  mejor se integre con Next.js y explica cuál elegiste y por qué.
- Iconos: usa "lucide-react" para los íconos genéricos (flechas, ojo, sobre, etc.) en
  vez de los SVGs inline del mockup, salvo los logos de marca (WhatsApp, Instagram,
  TikTok, Facebook) que sí deben mantenerse como SVG de marca correctos.

ESTRUCTURA DE COMPONENTES
Divide la home en componentes independientes, cada uno en su propio archivo, dentro de
una carpeta components/home/:

1. Header.tsx — navbar flotante tipo "pill" con: logo Onvite, links (Plantillas, Cómo
   funciona, Precios, Preguntas, Contacto), selector de idioma, Ingresar, Crear cuenta.
   Debe volverse un menú hamburguesa en mobile.
2. Hero.tsx — título con la palabra que se desliza en loop (Bodas / Cumpleaños / Fiestas),
   subtítulo, botones CTA, texto de garantías.
3. TemplatesShowcase.tsx — las dos filas de marquee infinito (plantillas arriba
   deslizando a la derecha, sobres abajo deslizando a la izquierda) con el mockup de
   celular estático superpuesto en el centro. Implementa el marquee de forma performante
   (translate3d / will-change, pausfuncionando en hover) y que la data de las tarjetas
   venga de un array tipado, no hardcodeada en el JSX.
4. TemplatesGallery.tsx — grid de las 9 plantillas destacadas con badge "mejor vendido",
   ícono de ojo (preview), y los dos mockups de celular superpuestos. Los datos de cada
   plantilla (nombre, id, descripción, colores) deben venir de un array/objeto tipado
   (interface Template) para poder mapear fácilmente cuando conectemos datos reales o un
   CMS más adelante.
5. HowItWorks.tsx — la caja de fondo dorado con los 3 pasos numerados y sus íconos.
6. Pricing.tsx — las 3 tarjetas de precios (Estándar, Premium, Premium VIP) con la
   tarjeta Premium destacada.
7. ComparisonTable.tsx — la tabla comparativa de funciones. Que sea responsive: en
   mobile, transformarla en tarjetas apiladas o en un scroll horizontal, no comprimir
   el texto hasta ilegible.
8. FAQ.tsx — el grid de 2 columnas de preguntas frecuentes con acordeón (usa el
   componente Accordion de shadcn/ui o Radix UI para tener buena accesibilidad de
   teclado y ARIA, en vez de reimplementar el toggle a mano).
9. ShareSection.tsx — la tarjeta con el QR y los botones de compartir. Genera el QR
   real con la librería "qrcode.react" apuntando a la URL del sitio (no un SVG
   simulado). El botón "copiar enlace" debe usar la Clipboard API con feedback visual
   (ya está resuelto conceptualmente en el mockup, solo pásalo a React con estado).
10. Testimonials.tsx — sección full-bleed (edge-to-edge) de fondo mostaza con el grid
    de reseñas. Que el ancho completo se logre correctamente dentro del layout de
    Next.js (rompiendo el contenedor con un wrapper full-width, no con hacks de
    overflow que rompan el scroll horizontal de la página).
11. ContactSection.tsx — la sección "Trabaja con un diseñador..." de dos columnas.
12. Footer.tsx — footer final con logo, tagline, links de contacto, términos y
    copyright.
13. WhatsAppFloat.tsx — botón flotante fijo, montado a nivel de layout (no dentro de
    cada página) para que persista en toda la navegación del sitio, no solo en home.

REQUISITOS TÉCNICOS ESPECÍFICOS
- Todo el texto que se repite o vendrá de una base de datos a futuro (plantillas,
  testimonios, preguntas frecuentes, planes de precios) debe vivir en archivos de datos
  separados (por ejemplo lib/data/templates.ts, lib/data/faq.ts, lib/data/pricing.ts)
  con sus interfaces de TypeScript, NO hardcodeado dentro del JSX de cada componente.
- Optimiza imágenes con next/image en cuanto reemplacemos los degradados placeholder
  por fotos reales.
- Usa Server Components de Next.js por defecto, y marca con "use client" solo los
  componentes que realmente necesitan interactividad (Header por el menú mobile,
  Hero por el texto animado, TemplatesShowcase por el marquee, FAQ por el acordeón,
  ShareSection por copiar al portapapeles).
- Accesibilidad: botones con aria-label donde corresponda, contraste de color
  verificado (sobre todo texto claro sobre el fondo mostaza y sobre la caja dorada de
  "Cómo empezar"), navegación por teclado funcional en el acordeón y en los sliders.
- Responsive: mobile-first. Revisa especialmente TemplatesShowcase, ComparisonTable y
  ContactSection, que en el mockup están pensadas para desktop.
- Rendimiento: lazy-load de las secciones que están por debajo del fold usando
  dynamic import de Next.js donde tenga sentido (por ejemplo ComparisonTable y
  Testimonials).

QUÉ NO CAMBIAR SIN PREGUNTAR
- Paleta de colores, tipografías (Playfair Display + Inter), textos y el orden de las
  secciones ya están aprobados. Si ves algo que técnicamente conviene cambiar (por
  ejemplo la librería de carrusel), preguntame antes de decidir por tu cuenta.

ENTREGABLE
1. Los componentes listados arriba, dentro de app/(marketing)/page.tsx o donde
   corresponda según la estructura de carpetas de mi proyecto (revisa el proyecto
   existente antes de asumir la estructura).
2. Los archivos de datos tipados.
3. La configuración de Tailwind con los tokens de color/tipografía.
4. Un resumen breve al final de qué decisiones tomaste (librería de carrusel elegida,
   cómo resolviste el full-bleed de testimonios, etc.) para que yo las revise.

Antes de escribir código, mostrame primero el árbol de componentes y archivos que vas a
crear, para que lo apruebe.
```

---

## Notas para cuando sigamos con las próximas pantallas

Cuando armemos el siguiente mockup (por ejemplo la vista de una plantilla individual, el
checkout, o el panel de invitados), vamos a generar un prompt igual de detallado que este,
pero enfocado solo en esa pantalla — reutilizando el mismo stack y los mismos componentes
base (Header, Footer, WhatsAppFloat) que ya vas a tener implementados.
