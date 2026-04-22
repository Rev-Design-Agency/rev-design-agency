import { defineField, defineType } from "sanity";

export const portfolioType = defineType({
  name: "portfolio",
  title: "Portfolio Projects",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Project Title", type: "string" }),
    defineField({ name: "client", title: "Client Name", type: "string" }),
    defineField({ name: "country", title: "Country & Industry", type: "string", description: 'e.g. "Saudi Arabia · Creative & Marketing Agency"' }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Project Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "badge", title: "Badge Text", type: "string", description: 'e.g. "Concept Direction"' }),
    defineField({ name: "isFeatured", title: "Featured Project?", type: "boolean" }),
    defineField({ name: "cardBg", title: "Content Card Background Color", type: "string", description: 'Hex color for the content card, e.g. "#405212"' }),
    defineField({ name: "imageBg", title: "Image Block Background Color", type: "string", description: 'Hex fallback color behind the image, e.g. "#ffffff"' }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
    defineField({
      name: "caseStudySlug",
      title: "Case Study Slug",
      type: "string",
      description: 'URL slug for the case study page, e.g. "elve" or "oathnet". Leave empty if no case study page exists yet.',
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "client", media: "image" } },
});
