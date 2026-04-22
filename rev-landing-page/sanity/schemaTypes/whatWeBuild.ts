import { defineField, defineType } from "sanity";

export const whatWeBuildType = defineType({
  name: "whatWeBuild",
  title: "What We Build Section",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Handwritten Label",
      type: "string",
      description: 'e.g. "What We Build"',
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: 'e.g. "Not just websites. We build a better first impression."',
    }),
    defineField({
      name: "buttonText",
      title: "CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "buttonUrl",
      title: "CTA Button URL",
      type: "url",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "prefix", title: "Title Prefix (green part)", type: "string" }),
            defineField({ name: "suffix", title: "Title Suffix (white part)", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "prefix" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "headline" } },
});
