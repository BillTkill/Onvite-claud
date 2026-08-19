import "./globals.css";
import "./ui.css";
import Providers from "@/components/Providers";
import SiteBackground from "@/components/SiteBackground";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata = {
  title: "Onvite — Invitaciones digitales con RSVP online",
  description:
    "Invitaciones digitales elegantes y personalizadas para bodas, graduaciones, bautizos y festividades — con RSVP, fotos, música, mapas y seguimiento de invitados, todo en un enlace privado.",
  metadataBase: new URL("https://onvite.com"),
  openGraph: {
    title: "Onvite — Invitaciones digitales",
    description: "Invitaciones elegantes con RSVP online, álbum de fotos y seguimiento de invitados.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Fonts — loaded via Google Fonts so the site degrades gracefully offline. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Manrope:wght@300;400;500;600;700;800&display=swap"
        />
        <SiteBackground />
        <Providers>
          {children}
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
