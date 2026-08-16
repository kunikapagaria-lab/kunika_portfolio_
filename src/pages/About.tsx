import { usePortfolioData } from "../context/PortfolioDataContext";
import aboutIllustration from "../assets/kunika-about.png";

export default function About() {
  const { journey, site } = usePortfolioData();
  const photoSrc = site.photoUrl ? `${site.photoUrl}?w=640&h=800&fit=crop&auto=format` : aboutIllustration;

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <span className="panel-label">03 — about</span>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center mt-4 mb-16">
        <div>
          <h1 className="font-display text-5xl md:text-6xl mb-6">About Me</h1>
          <p className="text-sm md:text-base leading-relaxed max-w-2xl">{site.bio}</p>
        </div>
        <img
          src={photoSrc}
          alt={site.name}
          className="h-64 md:h-80 w-52 md:w-64 justify-self-center object-cover border-2 border-stroke"
          style={{ imageRendering: "auto" }}
        />
      </div>

      <span className="panel-label">education & experience</span>
      <div className="flex flex-col mt-4">
        {journey.map((step, i) => (
          <div key={`${step.year}-${step.title}`} className="flex gap-6 py-4 border-b border-stroke">
            <span className="font-display text-2xl w-20 shrink-0">{step.year}</span>
            <div>
              <p className="font-bold text-sm">{step.title}</p>
              <p className="text-sm text-muted">{step.detail}</p>
            </div>
            {i === 0 && <span className="tag-bar bg-accent ml-auto self-center">now</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
