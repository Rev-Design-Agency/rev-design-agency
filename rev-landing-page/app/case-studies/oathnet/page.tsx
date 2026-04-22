import { client } from "@/sanity/lib/client";
import { oathnetCaseQuery } from "@/sanity/lib/queries";
import { getCaseStudyNav } from "@/lib/getCaseStudyNav";
import OathnetPageClient from "./OathnetPageClient";

export const revalidate = 10;

export default async function OathnetPage() {
  const [cms, nav] = await Promise.all([
    client.fetch(oathnetCaseQuery).catch(() => ({})),
    getCaseStudyNav("oathnet").catch(() => ({
      prevHref: "/case-studies/elve",
      nextHref: "/case-studies/elve",
    })),
  ]);
  return <OathnetPageClient cms={cms ?? {}} nav={nav} />;
}
