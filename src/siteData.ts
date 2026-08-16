export const site = {
  name: "Kunika Pagaria",
  initials: "KP",
  roles: ["Software Engineer"],
  tagline: "To write is to carve a constellation onto paper. To code is to make it shine.",
  shortBio:
    "Kolkata-based, fresh out of engineering school, and currently freelancing on AI-assisted product work — I like building things end-to-end, from the first sketch to the deployed link.",
  bio: "Engineering graduate with a strong interest in product development, project management, and technology-driven problem solving. Skilled at turning ideas into practical, user-focused products through fast execution and modern development tools. Comfortable working across both technical and creative workflows, with a focus on building functional, deployment-ready applications. Known for adaptability, quick learning, problem-solving, and working effectively in fast-paced environments.",
  quote: "The journey is the destination.",
  quoteAuthor: "Ralph Waldo Emerson",
  location: "Kolkata, India",
  email: "hello@kunikapagaria.com",
};

export const skills = [
  {
    title: "Technical",
    items: ["Prompt Engineering", "UI Design", "Deployment & Hosting"],
  },
  {
    title: "Tools",
    items: ["HTML", "CSS", "JavaScript", "React", "Python", "C++", "Figma", "GitHub", "Docker"],
  },
  {
    title: "Soft Skills",
    items: ["Leadership", "Communication", "Teamwork", "Adaptability", "Problem Solving", "Fast Learning"],
  },
  {
    title: "Languages",
    items: ["English", "Hindi", "Bengali (understand well, limited spoken proficiency)"],
  },
];

export const journey = [
  { year: "2019", title: "Class X", detail: "Newtown School — 90%" },
  { year: "2021", title: "Class XII", detail: "Newtown School — 83%" },
  { year: "2025", title: "B.Tech CSE (AIML)", detail: "Univ. of Engineering & Management, Kolkata — Graduated" },
  { year: "2025", title: "NCC Naval", detail: "National Cadet Corps — C Certificate" },
  { year: "2026", title: "Freelancing", detail: "AI-Assisted Development — Independent Projects" },
];

export interface Project {
  title: string;
  slug: string;
  category: "personal" | "client";
  year: string;
  description: string;
  imageUrl: string;
  images: string[];
  techStack: string[];
  problemStatement: string;
  solution: string;
  githubUrl: string;
  siteUrl: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Automotive Motion",
    slug: "automotive-motion",
    category: "personal",
    year: "2024",
    description: "",
    imageUrl: "https://picsum.photos/seed/automotive/700/525",
    images: [
      "https://picsum.photos/seed/automotive/900/600",
      "https://picsum.photos/seed/automotive-2/900/600",
      "https://picsum.photos/seed/automotive-3/900/600",
    ],
    techStack: [],
    problemStatement: "",
    solution: "",
    githubUrl: "#",
    siteUrl: "#",
  },
  {
    title: "Human Perspective",
    slug: "human-perspective",
    category: "personal",
    year: "2023",
    description: "",
    imageUrl: "https://picsum.photos/seed/portrait/700/525",
    images: ["https://picsum.photos/seed/portrait/900/600", "https://picsum.photos/seed/portrait-2/900/600"],
    techStack: [],
    problemStatement: "",
    solution: "",
    githubUrl: "#",
    siteUrl: "#",
  },
  {
    title: "Urban Architecture",
    slug: "urban-architecture",
    category: "client",
    year: "2024",
    description: "",
    imageUrl: "https://picsum.photos/seed/architecture/700/525",
    images: [
      "https://picsum.photos/seed/architecture/900/600",
      "https://picsum.photos/seed/architecture-2/900/600",
    ],
    techStack: [],
    problemStatement: "",
    solution: "",
    githubUrl: "#",
    siteUrl: "#",
  },
  {
    title: "Brand Identity",
    slug: "brand-identity",
    category: "client",
    year: "2023",
    description: "",
    imageUrl: "https://picsum.photos/seed/brand/700/525",
    images: ["https://picsum.photos/seed/brand/900/600", "https://picsum.photos/seed/brand-2/900/600"],
    techStack: [],
    problemStatement: "",
    solution: "",
    githubUrl: "#",
    siteUrl: "#",
  },
];
