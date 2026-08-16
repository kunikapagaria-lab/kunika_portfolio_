import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({ name: "author", title: "Author Name", type: "string" }),
    defineField({ name: "role", title: "Author Role / Company", type: "string" }),
    defineField({ name: "project", title: "Related Project", type: "reference", to: [{ type: "project" }] }),
  ],
  preview: {
    select: { title: "author", subtitle: "role" },
  },
});
