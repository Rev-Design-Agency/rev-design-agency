import { defineField, defineType } from "sanity";

export const budgetCtaType = defineType({
  name: "budgetCta",
  title: "Budget CTA Section",
  type: "document",
  fields: [
    defineField({ name: "badge", title: "Badge Text", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "body", title: "Body Text", type: "text", rows: 3 }),
    defineField({ name: "buttonText", title: "Button Text", type: "string" }),
    defineField({ name: "buttonUrl", title: "Button URL", type: "url" }),
  ],
  preview: { select: { title: "headline" } },
});
