import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "currentlyLine", title: "Currently working on...", type: "string" }),
    defineField({ name: "cv", title: "CV / Resume", type: "file" }),
  ],
});
