import "./globals.css";
import "./ui.css";
import { AuthProvider } from "@/components/AuthProvider";
import { I18nProvider } from "@/components/I18nProvider";

export const metadata = {
  title: "Onvite — Invitaciones de boda digitales y RSVP online",
  description:
    "Invitaciones de boda digitales elegantes y personalizadas con RSVP, fotos, música, mapas y seguimiento de invitados — todo en un enlace privado.",
  metadataBase: new URL("https://onvite.com"),
  openGraph: {
    title: "Onvite — Invitaciones de boda digitales",
    description: "Invitaciones elegantes con RSVP online, álbum de fotos y seguimiento de invitados.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#fbf8f3",
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap"
        />
        <I18nProvider>
          <AuthProvider>{children}</AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
