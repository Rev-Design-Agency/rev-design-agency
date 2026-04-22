import { defineField, defineType } from "sanity";

export const testimonialsType = defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "sectionHeadline",
      title: "Section Headline",
      type: "string",
      description: 'e.g. "A reliable partner for world-class quality and on-time delivery"',
    }),
    defineField({
      name: "statNumber",
      title: "Stat Number",
      type: "string",
      description: 'e.g. "+10"',
    }),
    defineField({
      name: "statLabel",
      title: "Stat Label",
      type: "string",
      description: 'e.g. "Successfully delivered projects"',
    }),
    defineField({
      name: "cards",
      title: "Testimonial Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role & Company", type: "string", description: 'e.g. "CEO of EfxPro"' }),
            defineField({ name: "quote", title: "Quote Title", type: "string" }),
            defineField({ name: "body", title: "Full Quote", type: "text", rows: 3 }),
            defineField({ name: "avatar", title: "Avatar Photo", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "avatar" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "sectionHeadline" } },
});
