import { defineField, defineType } from "sanity";

export const problemType = defineType({
  name: "problem",
  title: "Problem Section",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Handwritten Label",
      type: "string",
      description: 'e.g. "That\'s exactly why Rev exists."',
    }),
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
      description: 'e.g. "Sound familiar?"',
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline (gray text)",
      type: "string",
      description: 'e.g. "Your website is supposed to bring you clients."',
    }),
    defineField({
      name: "headline",
      title: "Main Headline",
      type: "string",
      description: 'e.g. "Why isn\'t it?"',
    }),
    defineField({
      name: "problems",
      title: "Problem List Items",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: { select: { title: "headline" } },
});
