import { defineField, defineType } from "sanity";

export const storyType = defineType({
  name: "story",
  title: "Story / Founder Section",
  type: "document",
  fields: [
    defineField({
      name: "preHeadline",
      title: "Pre-Headline",
      type: "string",
      description: 'e.g. "The face behind Rev"',
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "desktopPhoto",
      title: "Desktop Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mobilePhoto",
      title: "Mobile Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),
    defineField({
      name: "buttonUrl",
      title: "Button URL",
      type: "url",
    }),
  ],
  preview: { select: { title: "headline", media: "desktopPhoto" } },
});
