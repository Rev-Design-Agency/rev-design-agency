import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline (Part 1 — before green word)",
      type: "string",
      description: 'e.g. "We design"',
    }),
    defineField({
      name: "headlineGreen",
      title: "Headline Green Word",
      type: "string",
      description: 'e.g. "websites"',
    }),
    defineField({
      name: "headlineEnd",
      title: "Headline (Part 2 — after green word)",
      type: "string",
      description: 'e.g. "that turn first clicks into loyal customers" (line break added automatically after green word)',
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),
    defineField({
      name: "buttonUrl",
      title: "Button URL (Calendly link)",
      type: "url",
    }),
    defineField({
      name: "trustName",
      title: "Trust Badge — Name",
      type: "string",
    }),
    defineField({
      name: "trustRole",
      title: "Trust Badge — Role",
      type: "string",
    }),
    defineField({
      name: "trustAvatar",
      title: "Trust Badge — Avatar Photo",
      type: "image",
      description: "Small profile photo shown in the trust badge. Recommended: 56×56px or larger square.",
      options: { hotspot: true },
    }),
    defineField({
      name: "cyclingWords",
      title: "Cycling Green Words",
      type: "array",
      of: [{ type: "string" }],
      description: 'The three words that cycle in the headline (e.g. "websites", "structure", "Strategy"). First word is shown on load.',
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      description: "Full-section background image for the hero. Recommended: min 1920×1080px, high quality.",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "headline" } },
});
