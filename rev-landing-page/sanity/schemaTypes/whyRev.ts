import { defineField, defineType } from "sanity";

export const whyRevType = defineType({
  name: "whyRev",
  title: "Why REV Section",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Handwritten Label",
      type: "string",
      description: 'e.g. "Why REV"',
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: 'e.g. "Founder-led web design focused on speed, growth and real results."',
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "target", title: "Number (target)", type: "number" }),
            defineField({ name: "suffix", title: "Suffix", type: "string", description: 'e.g. "+", "%", or leave empty' }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "headline" } },
});
