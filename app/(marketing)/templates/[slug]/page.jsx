import { notFound } from "next/navigation";
import TemplateDetailView from "@/components/TemplateDetailView";
import { TEMPLATES, getTemplate } from "@/lib/templates";
import { getTemplatePage } from "@/lib/template-queries";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

// Admin-managed artwork lives in the database, so the page is rendered per
// request rather than frozen at build time — an upload shows up immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return { title: "Plantilla no encontrada · Onvite" };
  return {
    title: `${t.name} · Plantillas · Onvite`,
    description: t.desc,
  };
}

export default async function TemplateDetailPage({ params }) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const page = await getTemplatePage(slug);
  return <TemplateDetailView template={template} page={page} />;
}
