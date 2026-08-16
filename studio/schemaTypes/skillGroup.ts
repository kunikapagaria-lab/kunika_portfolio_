import { defineField, defineType } from "sanity";

export default defineType({
  name: "skillGroup",
  title: "Skill Group",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Category Title", type: "string" }),
    defineField({ name: "items", title: "Skills", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      return { title, subtitle: items?.join(", ") };
    },
  },
});
