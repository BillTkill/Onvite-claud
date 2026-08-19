import "server-only";
import { prisma } from "./db";

/**
 * Admin-managed artwork for the template detail pages (/templates/[slug]),
 * read by the public page and by /admin/plantillas.
 *
 * Every field is optional by design: a template with no uploads yet still
 * renders, falling back to the catalogue's CSS gradient poster. That is why
 * these helpers always return a complete shape with empty defaults rather
 * than null — the page never has to guard for a missing row.
 */
const EMPTY = {
  theme: "DARK",
  backgroundBlur: 3,
  backgroundUrl: null,
  mainImageUrl: null,
  shots: [],
};

function toView(row) {
  if (!row) return { ...EMPTY };
  return {
    theme: row.theme || "DARK",
    // Null-safe: 0 is a valid, meaningful value (fully sharp).
    backgroundBlur: row.backgroundBlur ?? 3,
    backgroundUrl: row.backgroundUrl || null,
    mainImageUrl: row.mainImageUrl || null,
    // Collapsed to a list and stripped of empty slots, so the thumbnail strip
    // can simply map over whatever the admin actually uploaded.
    shots: [row.shot1Url, row.shot2Url, row.shot3Url, row.shot4Url].filter(Boolean),
  };
}

/** One template's page media. Never throws — a DB outage degrades to defaults. */
export async function getTemplatePage(slug) {
  try {
    return toView(await prisma.templatePage.findUnique({ where: { slug } }));
  } catch {
    return { ...EMPTY };
  }
}

/** Every row, keyed by slug — used by the admin editor to prefill all cards. */
export async function getTemplatePagesAdmin() {
  try {
    const rows = await prisma.templatePage.findMany();
    const bySlug = {};
    for (const r of rows) {
      bySlug[r.slug] = {
        theme: r.theme,
        backgroundBlur: r.backgroundBlur ?? 3,
        backgroundUrl: r.backgroundUrl || "",
        mainImageUrl: r.mainImageUrl || "",
        shots: [r.shot1Url || "", r.shot2Url || "", r.shot3Url || "", r.shot4Url || ""],
      };
    }
    return bySlug;
  } catch {
    return {};
  }
}
