export const PORTFOLIO_QUERY = `{
  "settings": *[_type == "siteSettings"][0]{
    name, tagline, email, location, currentlyLine, "cvUrl": cv.asset->url
  },
  "about": *[_type == "about"][0]{
    shortBio, bio, "photoUrl": photo.asset->url, quote, quoteAuthor
  },
  "skillGroups": *[_type == "skillGroup"] | order(order asc){
    title, items
  },
  "journey": *[_type == "journeyEntry"] | order(order asc){
    year, title, detail
  },
  "projects": *[_type == "project"] | order(order asc){
    title, "slug": slug.current, category, year, description, "coverImageUrl": coverImage.asset->url,
    techStack, problemStatement, solution, githubUrl, siteUrl, featured
  }
}`;

export interface SanityProject {
  title: string;
  slug?: string;
  category: "personal" | "client";
  year?: string;
  description?: string;
  coverImageUrl?: string;
  techStack?: string[];
  problemStatement?: string;
  solution?: string;
  githubUrl?: string;
  siteUrl?: string;
  featured?: boolean;
}

export interface SanityPortfolioData {
  settings: {
    name?: string;
    tagline?: string;
    email?: string;
    location?: string;
    currentlyLine?: string;
    cvUrl?: string;
  } | null;
  about: {
    shortBio?: string;
    bio?: string;
    photoUrl?: string;
    quote?: string;
    quoteAuthor?: string;
  } | null;
  skillGroups: { title: string; items: string[] }[];
  journey: { year: string; title: string; detail: string }[];
  projects: SanityProject[];
}
