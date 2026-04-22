import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "calendlyUrl", title: "Calendly URL", type: "url" }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2 }),
    defineField({
      name: "showBlogArrows",
      title: "Blog Section — Show Arrow Buttons",
      type: "boolean",
      description: "Toggle the left / right navigation arrows on the blog cards row. Arrows only appear when there are more than 3 posts.",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "seoTitle" } },
});
