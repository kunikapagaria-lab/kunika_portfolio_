import { usePortfolioData } from "../context/PortfolioDataContext";

export default function Skills() {
  const { skills } = usePortfolioData();

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <span className="panel-label">04 — skills</span>
      <h1 className="font-display text-5xl md:text-6xl mt-4 mb-10">Skills</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
    </div>
  );
}
