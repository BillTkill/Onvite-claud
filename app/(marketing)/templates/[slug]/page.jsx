import { notFound } from "next/navigation";
import TemplateDetailView from "@/components/TemplateDetailView";
import { TEMPLATES, getTemplate } from "@/lib/templates";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

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

  const related = TEMPLATES.filter((t) => t.slug !== slug).slice(0, 4);
  return <TemplateDetailView template={template} related={related} />;
}
