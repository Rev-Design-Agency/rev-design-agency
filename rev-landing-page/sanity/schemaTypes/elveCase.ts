import { defineField, defineType } from "sanity";

export const elveCaseType = defineType({
  name: "elveCase",
  title: "Case Study · Elve",
  type: "document",
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({
      name: "heroVideoUrl",
      title: "Hero Video URL",
      type: "url",
      description: "Cloudinary or any direct MP4 URL for the hero video",
    }),

    // ── Title block ───────────────────────────────────────
    defineField({ name: "projectTitle",    title: "Project Title",    type: "string" }),
    defineField({ name: "projectSubtitle", title: "Project Subtitle", type: "string" }),
    defineField({ name: "metaClient",      title: "Meta · Client",    type: "string" }),
    defineField({ name: "metaIndustry",    title: "Meta · Industry",  type: "string" }),
    defineField({ name: "metaYear",        title: "Meta · Year",      type: "string" }),
    defineField({ name: "metaServices",    title: "Meta · Services",  type: "string" }),

    // ── Section images ────────────────────────────────────
    defineField({
      name: "showcaseImage",
      title: "Showcase Image (Row 1 + 2 section)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "testimonialImage",
      title: "Testimonial Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "productShowcaseImage",
      title: "Product Showcase Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "projectTitle" },
    prepare: () => ({ title: "Elve Case Study" }),
  },
});
