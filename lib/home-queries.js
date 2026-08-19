import "server-only";
import { prisma } from "./db";

/**
 * Admin-managed Home media (showcase cards, envelopes, phone mockup) and
 * gallery "trending" picks — read by the public Home page. Returns plain,
 * client-safe shapes with sensible empty defaults so the page never breaks
 * before the admin has uploaded anything (see components/home/*
 * fallback rendering).
 */
const EMPTY_MEDIA = { SHOWCASE_CARD: {}, SHOWCASE_ENVELOPE: {}, PHONE_MOCK: {} };

export async function getHomeMedia() {
  try {
    const rows = await prisma.homeMedia.findMany({ orderBy: { position: "asc" } });
    const byKind = { SHOWCASE_CARD: {}, SHOWCASE_ENVELOPE: {}, PHONE_MOCK: {} };
    for (const r of rows) {
      if (!byKind[r.kind]) continue;
      byKind[r.kind][r.position] = { imageUrl: r.imageUrl || null, label: r.label || "" };
    }
    return byKind;
  } catch {
    // DB unreachable (build time with no local DB, or a transient outage) —
    // fall back to the built-in placeholder designs rather than break Home.
    return EMPTY_MEDIA;
  }
}

export async function getGalleryFeatures() {
  try {
    const rows = await prisma.galleryFeature.findMany({ orderBy: { position: "asc" } });
    return rows.map((r) => ({
      slug: r.slug,
      trending: r.trending,
      imageUrl: r.imageUrl || null,
      imageUrlBack: r.imageUrlBack || null,
    }));
  } catch {
    return [];
  }
}
