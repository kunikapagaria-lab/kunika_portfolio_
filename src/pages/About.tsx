import { usePortfolioData } from "../context/PortfolioDataContext";

export default function About() {
  const { skills, journey, site } = usePortfolioData();

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <span className="scene-slug">INT. ABOUT — DAY</span>
      <span className="panel-label">03 — about</span>
      <h1 className="font-display text-5xl md:text-6xl mt-4 mb-6">About Me</h1>
      <p className="text-sm md:text-base leading-relaxed max-w-2xl mb-16">{site.bio}</p>

      <span className="panel-label">skills</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 mb-16">
        {skills.map((group) => (
          <div key={group.title} className="panel p-6">
            <h3 className="font-display text-2xl mb-3">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="text-xs border border-stroke px-2.5 py-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <span className="panel-label">education & experience</span>
      <div className="flex flex-col mt-4 mb-16">
        {journey.map((step, i) => (
          <div key={`${step.year}-${step.title}`} className="flex gap-6 py-4 border-b border-stroke">
            <span className="font-display text-2xl w-20 shrink-0">{step.year}</span>
            <div>
              <p className="font-bold text-sm">{step.title}</p>
              <p className="text-sm text-muted">{step.detail}</p>
            </div>
            {i === journey.length - 1 && <span className="tag-bar bg-accent ml-auto self-center">now</span>}
          </div>
        ))}
      </div>

      <div className="panel p-8 max-w-xl">
        <p className="font-display text-3xl mb-2">&ldquo;{site.quote}&rdquo;</p>
        <p className="text-xs text-muted uppercase tracking-widest">— {site.quoteAuthor}</p>
      </div>
    </div>
  );
}
