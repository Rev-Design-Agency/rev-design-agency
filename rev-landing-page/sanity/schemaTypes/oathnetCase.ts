import { defineField, defineType } from "sanity";

export const oathnetCaseType = defineType({
  name: "oathnetCase",
  title: "Oathnet Case Study",
  type: "document",
  fields: [
    defineField({
      name: "showcaseImage",
      title: "Showcase Image",
      type: "image",
      options: { hotspot: true },
      description: "The large image shown in the middle of the Oathnet case study page.",
    }),
  ],
  preview: { prepare: () => ({ title: "Oathnet Case Study" }) },
});
