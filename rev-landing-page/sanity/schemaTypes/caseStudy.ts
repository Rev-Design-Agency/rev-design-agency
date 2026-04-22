import { defineField, defineType } from "sanity";

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  fields: [
    /* ─── Identity ─────────────────────────────────────────────────── */
    defineField({
      name: "projectName",
      title: "Project Name",
      type: "string",
      description: 'Shown as the big H1 on the page, e.g. "Oathnet"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "projectName", maxLength: 96 },
      description: 'Auto-generated from project name. Used as the page URL: /case-studies/[slug]',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the prev/next navigation order. Lower number = appears first.",
    }),

    /* ─── 1. Hero Video ─────────────────────────────────────────────── */
    defineField({
      name: "heroVideoUrl",
      title: "① Hero Video URL",
      type: "string",
      description: "Paste a Cloudinary (or any .mp4) URL. Leave empty to hide the video section.",
    }),

    /* ─── 2. Project Identity & Context ────────────────────────────── */
    defineField({
      name: "accentColor",
      title: "② Accent Background Color",
      type: "string",
      description: 'Hex color for the project identity block behind the title. e.g. "#405212" (Oathnet green)',
      initialValue: "#405212",
    }),
    defineField({
      name: "accentTextColor",
      title: "② Accent Text Color",
      type: "string",
      description: 'Hex color for the text on the accent background. e.g. "#f6faeb"',
      initialValue: "#f6faeb",
    }),
    defineField({
      name: "descriptionParagraphs",
      title: "② Project Description Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Add one item per paragraph. Each becomes a separate <p> block.",
    }),

    /* ─── 3. What We Did ────────────────────────────────────────────── */
    defineField({
      name: "services",
      title: "③ What We Did (Services)",
      type: "array",
      of: [{ type: "string" }],
      description: 'Each item gets the ↪ arrow prefix. e.g. "Strategy", "Website Design"',
    }),

    /* ─── 4. Visual Proof (Images) ──────────────────────────────────── */
    defineField({
      name: "showcaseImages",
      title: "④ Showcase Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        },
      ],
      description: "Upload 1–4 images. 1 image = full width. 2+ images = side-by-side grid.",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "projectName", subtitle: "slug.current" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `/${subtitle}` : "No slug yet" }),
  },
});
