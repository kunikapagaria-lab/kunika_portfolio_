import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { sanityClient, sanityEnabled } from "../lib/sanity";
import { PORTFOLIO_QUERY, type SanityPortfolioData } from "../lib/queries";
import { site as fallbackSite, skills as fallbackSkills, journey as fallbackJourney, projects as fallbackProjects, type Project } from "../siteData";

interface PortfolioData {
  site: typeof fallbackSite;
  skills: typeof fallbackSkills;
  journey: typeof fallbackJourney;
  projects: Project[];
  loading: boolean;
}

const PortfolioDataContext = createContext<PortfolioData | null>(null);

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [remote, setRemote] = useState<SanityPortfolioData | null>(null);
  const [loading, setLoading] = useState(sanityEnabled);

  useEffect(() => {
    if (!sanityEnabled || !sanityClient) return;

    sanityClient
      .fetch<SanityPortfolioData>(PORTFOLIO_QUERY)
      .then((data) => setRemote(data))
      .catch((err) => console.error("Sanity fetch failed, using fallback content:", err))
      .finally(() => setLoading(false));
  }, []);

  const site = {
    ...fallbackSite,
    name: remote?.settings?.name || fallbackSite.name,
    tagline: remote?.settings?.tagline || fallbackSite.tagline,
    email: remote?.settings?.email || fallbackSite.email,
    location: remote?.settings?.location || fallbackSite.location,
    shortBio: remote?.about?.shortBio || fallbackSite.shortBio,
    bio: remote?.about?.bio || fallbackSite.bio,
    quote: remote?.about?.quote || fallbackSite.quote,
    quoteAuthor: remote?.about?.quoteAuthor || fallbackSite.quoteAuthor,
    cvUrl: remote?.settings?.cvUrl || "/resume.pdf",
    currentlyLine: remote?.settings?.currentlyLine || "",
    photoUrl: remote?.about?.photoUrl || "",
  };

  const skills = remote?.skillGroups?.length ? remote.skillGroups : fallbackSkills;
  const journey = remote?.journey?.length ? remote.journey : fallbackJourney;
  const projects: Project[] = remote?.projects?.length
    ? remote.projects.map((p) => ({
        title: p.title,
        category: p.category,
        year: p.year || "",
        description: p.description || "",
        imageUrl: p.coverImageUrl || "https://picsum.photos/seed/placeholder/700/525",
        techStack: p.techStack || [],
        problemStatement: p.problemStatement || "",
        solution: p.solution || "",
        githubUrl: p.githubUrl || "#",
        siteUrl: p.siteUrl || "#",
        featured: p.featured,
      }))
    : fallbackProjects;

  return (
    <PortfolioDataContext.Provider value={{ site, skills, journey, projects, loading }}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) throw new Error("usePortfolioData must be used within PortfolioDataProvider");
  return ctx;
}
