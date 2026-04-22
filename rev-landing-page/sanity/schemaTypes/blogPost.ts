import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({
      name: "isHidden",
      title: "Hide from Website",
      type: "boolean",
      description: "Toggle ON to remove this post from the landing page and keep it as a draft.",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: 'Auto-generated from title. e.g. "stop-wasting-budget"',
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "Controls the order cards appear on the landing page (newest first).",
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
      name: "excerpt",
      title: "Card Excerpt",
      type: "text",
      rows: 2,
      description: "Short description shown on the blog card on the landing page.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Shown below the title on the blog post page.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "intro",
              title: "Intro Line",
              type: "string",
              description: "Optional small line shown above the heading.",
            }),
            defineField({
              name: "heading",
              title: "Section Heading",
              type: "string",
            }),
            defineField({
              name: "body",
              title: "Body Paragraphs",
              type: "array",
              of: [{ type: "block" }],
            }),
            defineField({
              name: "callout",
              title: "Green Callout Quote",
              type: "string",
              description: "Optional. Shown in green as a pull-quote.",
            }),
            defineField({
              name: "bulletHeading",
              title: "Bullet List Heading",
              type: "string",
              description: "Optional heading for a bullet list inside this section.",
            }),
            defineField({
              name: "bullets",
              title: "Bullet Points",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "bold", title: "Bold Part", type: "string" }),
                    defineField({ name: "text", title: "Regular Part", type: "string" }),
                  ],
                  preview: { select: { title: "bold" } },
                },
              ],
            }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
    defineField({
      name: "ctaDisplayText",
      title: "Closing CTA — Large Text",
      type: "text",
      rows: 2,
      description: "The big statement at the bottom of the post.",
    }),
    defineField({
      name: "ctaButtonText",
      title: "Closing CTA — Button Text",
      type: "string",
    }),
    defineField({
      name: "ctaButtonUrl",
      title: "Closing CTA — Button URL",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "heroImage" },
  },
});
