import Hero from "@/components/home/Hero";
import TemplatesShowcase from "@/components/home/TemplatesShowcase";
import TemplatesGallery from "@/components/home/TemplatesGallery";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import ComparisonTable from "@/components/home/ComparisonTable";
import ShareSection from "@/components/home/ShareSection";
import FaqSection from "@/components/home/FaqSection";
import Testimonials from "@/components/home/Testimonials";
import ContactSection from "@/components/home/ContactSection";
import { getHomeMedia, getGalleryFeatures } from "@/lib/home-queries";

// Reads admin-managed content from the DB on every request (not at build
// time) so uploads/picks made in /admin/inicio show up on Home immediately,
// without a redeploy.
export const dynamic = "force-dynamic";

// Server component: reads admin-managed showcase media + gallery picks once
// per request and hands them down as plain props — the Home page itself
// needs no client state for that, only its child sections do (i18n, motion).
export default async function HomePage() {
  const [media, galleryFeatures] = await Promise.all([getHomeMedia(), getGalleryFeatures()]);

  return (
    <>
      <Hero />
      <TemplatesShowcase media={media} />
      {/* Anchor for the header link and for the template detail page back
          link: the full catalogue is admin-only, so this gallery is where
          visitors browse templates. */}
      <div id="plantillas">
        <TemplatesGallery featured={galleryFeatures} />
      </div>

      <div id="como-funciona">
        <HowItWorks />
      </div>

      <Pricing />
      <ComparisonTable />
      <ShareSection />
      <FaqSection />
      <Testimonials />
      <ContactSection />
    </>
  );
}
