import { defineField, defineType } from "sanity";

export const footerCtaType = defineType({
  name: "footerCta",
  title: "Footer CTA Section",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subtext", title: "Subtext", type: "text", rows: 2 }),
    defineField({ name: "responseTime", title: "Response Time Note", type: "string", description: 'e.g. "Usually responds within 24 hours"' }),
    defineField({ name: "location", title: "Location Note", type: "string", description: 'e.g. "Based in Cairo · Working with businesses across Egypt and the MENA region"' }),
    defineField({ name: "calendlyUrl", title: "Calendly Embed URL", type: "url" }),
    defineField({ name: "copyrightNote", title: "Copyright Extra Note", type: "string", description: 'e.g. "Last updated: March 2026 · By Youssef, Web Designer, Cairo"' }),
  ],
  preview: { select: { title: "headline" } },
});
