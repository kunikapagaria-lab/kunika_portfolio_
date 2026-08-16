import { defineField, defineType } from "sanity";

export default defineType({
  name: "journeyEntry",
  title: "Journey Entry",
  type: "document",
  fields: [
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "detail", title: "Detail", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "year" },
  },
});
