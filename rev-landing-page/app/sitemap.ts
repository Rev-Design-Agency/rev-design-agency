import type { MetadataRoute } from "next";

const BASE_URL = "https://rev-design-agency.com";

const blogSlugs = [
  "stop-wasting-budget-on-a-pretty-website",
  "ui-vs-ux-the-invisible-line-between-success-and-failure",
  "the-anatomy-of-a-high-converting-landing-page",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...blogEntries,
  ];
}
