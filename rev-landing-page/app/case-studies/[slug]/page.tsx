import { client } from "@/sanity/lib/client";
import { caseStudyBySlugQuery, allCaseStudySlugsQuery } from "@/sanity/lib/queries";
import { getCaseStudyNav } from "@/lib/getCaseStudyNav";
import CaseStudyPageClient from "./CaseStudyPageClient";
import CaseStudyComingSoon from "./CaseStudyComingSoon";
import type { CaseStudyCms } from "./CaseStudyPageClient";

export const revalidate = 10;

// Allow any slug to be rendered on-demand, even if not pre-built
export const dynamicParams = true;

/* Pre-render known slugs at build time */
export async function generateStaticParams() {
  const docs: { slug: string }[] = await client
    .fetch(allCaseStudySlugsQuery)
    .catch(() => []);
  return docs.map((d) => ({ slug: d.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [cms, nav] = await Promise.all([
    client.fetch<CaseStudyCms | null>(caseStudyBySlugQuery, { slug }).catch(() => null),
    getCaseStudyNav(slug).catch(() => ({
      prevHref: "/#portfolio",
      nextHref: "/#portfolio",
    })),
  ]);

  // No Sanity document yet → show "Coming Soon" instead of 404
  if (!cms) {
    return <CaseStudyComingSoon slug={slug} nav={nav} />;
  }

  return <CaseStudyPageClient cms={cms} nav={nav} />;
}
