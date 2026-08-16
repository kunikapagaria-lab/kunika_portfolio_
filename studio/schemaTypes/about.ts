import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "shortBio",
      title: "Short Bio (Home page)",
      description: "A punchy 1-2 sentence version for the Home page hero — the full Bio below is for the About page.",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 6 }),
    defineField({ name: "photo", title: "Profile Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "quote", title: "Favorite Quote", type: "string" }),
    defineField({ name: "quoteAuthor", title: "Quote Author", type: "string" }),
  ],
});
