import { defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "FAQ Section",
  type: "document",
  fields: [
    defineField({
      name: "questions",
      title: "Questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
