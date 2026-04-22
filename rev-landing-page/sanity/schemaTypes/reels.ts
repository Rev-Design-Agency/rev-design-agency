import { defineField, defineType } from "sanity";

export const reelsType = defineType({
  name: "reels",
  title: "Reels Section",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Handwritten Label",
      type: "string",
      description: 'e.g. "Behind the work"',
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: 'e.g. "See how it\'s made."',
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "src", title: "Video URL (Cloudinary)", type: "url" }),
          ],
          preview: { select: { title: "src" } },
        },
      ],
    }),
    defineField({
      name: "instagramAccounts",
      title: "Instagram Accounts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Handle (e.g. @rev.design.agency)", type: "string" }),
            defineField({ name: "href", title: "Instagram URL", type: "url" }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "headline" } },
});
