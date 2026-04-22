import { client } from "@/sanity/lib/client";
import { elveCaseQuery, portfolioQuery } from "@/sanity/lib/queries";
import { getCaseStudyNav } from "@/lib/getCaseStudyNav";
import ElvePageClient from "./ElvePageClient";

export const revalidate = 10;

export default async function ElvePage() {
  const [cms, portfolio, nav] = await Promise.all([
    client.fetch(elveCaseQuery),
    client.fetch(portfolioQuery),
    getCaseStudyNav("elve").catch(() => ({
      prevHref: "/case-studies/oathnet",
      nextHref: "/case-studies/oathnet",
    })),
  ]);
  return <ElvePageClient cms={{ ...(cms ?? {}), portfolio }} nav={nav} />;
}
