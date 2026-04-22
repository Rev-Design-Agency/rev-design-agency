import { defineField, defineType } from "sanity";

export const processType = defineType({
  name: "process",
  title: "Process Section",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Handwritten Label",
      type: "string",
      description: 'e.g. "The Rev Process"',
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "string",
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "step", title: "Step Number", type: "string", description: 'e.g. "01"' }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "side", title: "Side (left or right)", type: "string", options: { list: ["left", "right"] } }),
            defineField({ name: "cta", title: "Show CTA Button?", type: "boolean" }),
          ],
          preview: { select: { title: "title", subtitle: "step" } },
        },
      ],
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA Button URL",
      type: "url",
    }),
  ],
  preview: { select: { title: "headline" } },
});
