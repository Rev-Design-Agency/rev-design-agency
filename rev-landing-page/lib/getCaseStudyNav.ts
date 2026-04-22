import { client } from "@/sanity/lib/client";
import { caseStudySlugsQuery } from "@/sanity/lib/queries";

interface NavLinks {
  prevHref: string;
  nextHref: string;
}

/**
 * Hardcoded fallback used when Sanity hasn't been set up with caseStudySlug yet.
 * Key = current slug, value = { prev, next }.
 * Edit this list when adding new case studies — it will be overridden by Sanity automatically.
 */
const FALLBACK_MAP: Record<string, { prev: string; next: string }> = {
  elve:    { prev: "/case-studies/clarity", next: "/case-studies/oathnet" },
  oathnet: { prev: "/case-studies/elve",    next: "/case-studies/clarity" },
  clarity: { prev: "/case-studies/oathnet", next: "/case-studies/elve"    },
};

/**
 * Fetches all case study slugs from Sanity (ordered by `order` field),
 * then returns the prev/next hrefs for the given current slug.
 * Loops circularly: last → first, first → last.
 *
 * Falls back to FALLBACK_MAP if Sanity returns no results or errors.
 */
export async function getCaseStudyNav(currentSlug: string): Promise<NavLinks> {
  try {
    const docs: { slug: string }[] = await client.fetch(caseStudySlugsQuery);

    console.log(`[CaseStudyNav] currentSlug="${currentSlug}" — Sanity returned ${docs?.length ?? 0} slug(s):`, docs);

    // ── Sanity has slugs set up ────────────────────────────────────────
    if (docs && docs.length > 0) {
      const idx = docs.findIndex((d) => d.slug === currentSlug);

      if (idx !== -1) {
        const prevDoc = docs[(idx - 1 + docs.length) % docs.length];
        const nextDoc = docs[(idx + 1) % docs.length];
        const result = {
          prevHref: `/case-studies/${prevDoc.slug}`,
          nextHref: `/case-studies/${nextDoc.slug}`,
        };
        console.log(`[CaseStudyNav] Resolved from Sanity:`, result);
        return result;
      }

      // Current slug not in Sanity yet — use first/last as fallback
      console.warn(`[CaseStudyNav] slug "${currentSlug}" not found in Sanity list, using edge fallback`);
      return {
        prevHref: `/case-studies/${docs[docs.length - 1].slug}`,
        nextHref: `/case-studies/${docs[0].slug}`,
      };
    }

    // ── Sanity returned empty — use hardcoded fallback ─────────────────
    console.warn(`[CaseStudyNav] Sanity returned 0 slugs. Have you set 'caseStudySlug' on your Portfolio documents? Using hardcoded fallback.`);
  } catch (err) {
    console.error(`[CaseStudyNav] Sanity fetch failed, using hardcoded fallback:`, err);
  }

  // ── Final fallback ─────────────────────────────────────────────────
  const fallback = FALLBACK_MAP[currentSlug];
  if (fallback) {
    return { prevHref: fallback.prev, nextHref: fallback.next };
  }

  // Absolute last resort — loop to self so buttons never disappear
  return {
    prevHref: `/case-studies/${currentSlug}`,
    nextHref: `/case-studies/${currentSlug}`,
  };
}
