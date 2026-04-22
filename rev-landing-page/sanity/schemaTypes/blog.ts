import { defineField, defineType } from "sanity";

export const blogType = defineType({
  name: "blog",
  title: "Blog Section",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Handwritten Label",
      type: "string",
      description: 'Small label above the headline (e.g. "Blogs")',
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: 'Main heading (e.g. "Digital Intelligence.")',
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
      description: "The paragraph below the headline.",
    }),
    defineField({
      name: "posts",
      title: "Blog Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Cover Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "category",
              title: "Category Tag",
              type: "string",
              description: 'e.g. "STRATEGY", "UI/UX", "GROWTH"',
            }),
            defineField({
              name: "readTime",
              title: "Read Time",
              type: "string",
              description: 'e.g. "5 MIN READ"',
            }),
            defineField({
              name: "title",
              title: "Card Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Short Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "ctaText",
              title: "CTA Link Text",
              type: "string",
              description: 'e.g. "Read More", "Explore the Difference"',
            }),
            defineField({
              name: "ctaUrl",
              title: "CTA Link URL",
              type: "url",
              description: "Where the card link points to.",
            }),
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: { select: { title: "headline" } },
});
