import { usePortfolioData } from "../context/PortfolioDataContext";
import { useAnchorScroll } from "../lib/useAnchorScroll";
import kunikaIllustration from "../assets/kunika-colour-pixel.png";

export default function Home() {
  const { site } = usePortfolioData();
  const handleAnchorClick = useAnchorScroll();

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <span className="panel-label mb-6">01 — Home</span>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mt-6 mb-2">{site.name}</h1>
        <p className="font-body text-base md:text-lg text-muted mb-4">{site.roles.join(" · ")}</p>
        <p className="text-sm md:text-base leading-relaxed mb-6 max-w-md">{site.shortBio}</p>
        <div className="flex flex-wrap gap-4">
          <a href="#work" onClick={(e) => handleAnchorClick(e, "work")} className="tag-bar bg-accent">
            see my work →
          </a>
          <a href="#about" onClick={(e) => handleAnchorClick(e, "about")} className="panel-label">
            about me
          </a>
        </div>
      </div>
      <img
        src={kunikaIllustration}
        alt={site.name}
        className="h-72 md:h-96 w-auto justify-self-center object-contain"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
