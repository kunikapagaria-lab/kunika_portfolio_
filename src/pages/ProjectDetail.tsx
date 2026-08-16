import { useParams } from "react-router-dom";
import { usePortfolioData } from "../context/PortfolioDataContext";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects } = usePortfolioData();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-[900px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <a href="/#work" className="panel-label mb-8 inline-block">
          ← back to work
        </a>
        <h1 className="font-display text-4xl md:text-5xl mb-4">Project not found</h1>
        <p className="text-sm text-muted">That project doesn't exist — it may have moved or been renamed.</p>
      </div>
    );
  }

  const hasSite = project.siteUrl && project.siteUrl !== "#";
  const hasGithub = project.githubUrl && project.githubUrl !== "#";

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <a href="/#work" className="panel-label mb-8 inline-block">
        ← back to work
      </a>

      <div className="border-2 border-stroke mb-8 overflow-hidden">
        <img src={project.imageUrl} alt={project.title} className="w-full aspect-[16/9] object-cover" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        {project.year && <span className="tag-bar bg-[#111]">{project.year}</span>}
        <span className="panel-label">{project.category === "personal" ? "personal project" : "client work"}</span>
      </div>

      <h1 className="font-display text-5xl md:text-6xl mb-6">{project.title}</h1>

      {project.description && (
        <p className="text-sm md:text-base leading-relaxed mb-10 max-w-2xl">{project.description}</p>
      )}

      {project.techStack.length > 0 && (
        <div className="mb-10">
          <span className="panel-label mb-3 inline-block">tech stack</span>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-xs uppercase tracking-widest border border-stroke px-3 py-1.5">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {(project.problemStatement || project.solution) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {project.problemStatement && (
            <div className="panel p-6">
              <span className="panel-label mb-3 inline-block">problem</span>
              <p className="text-sm leading-relaxed">{project.problemStatement}</p>
            </div>
          )}
          {project.solution && (
            <div className="panel p-6">
              <span className="panel-label mb-3 inline-block">solution</span>
              <p className="text-sm leading-relaxed">{project.solution}</p>
            </div>
          )}
        </div>
      )}

      {(hasSite || hasGithub) && (
        <div className="flex flex-wrap gap-4">
          {hasSite && (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="tag-bar bg-[#111] text-base px-4 py-2"
            >
              visit site →
            </a>
          )}
          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="tag-bar tag-bar-outline text-base px-4 py-2"
            >
              view on github →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
