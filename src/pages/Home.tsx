import ScribbleAvatar from "../components/ScribbleAvatar";
import { usePortfolioData } from "../context/PortfolioDataContext";

export default function Home() {
  const { site } = usePortfolioData();
  const firstName = site.name.split(" ")[0];

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <span className="panel-label mb-6">01 — Home</span>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mt-6 mb-4">i'm {firstName}--</h1>
        <p className="text-sm md:text-base leading-relaxed mb-6 max-w-md">
          a {site.roles.join(" and ").toLowerCase()}. {site.tagline}
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#work" className="tag-bar bg-accent">
            see my work →
          </a>
          <a href="#about" className="panel-label">
            about me
          </a>
        </div>
      </div>
      <ScribbleAvatar className="w-56 h-56 md:w-72 md:h-72 justify-self-center" />
    </div>
  );
}
