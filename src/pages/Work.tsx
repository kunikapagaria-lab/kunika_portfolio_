import { Link } from "react-router-dom";
import { usePortfolioData } from "../context/PortfolioDataContext";
import type { Project } from "../siteData";

const TAG_COLORS = ["bg-emerald-600", "bg-blue-600", "bg-violet-600", "bg-amber-600"];

function ProjectCard({ project, shot }: { project: Project; shot: number }) {
  const hasSite = project.siteUrl && project.siteUrl !== "#";
  const hasGithub = project.githubUrl && project.githubUrl !== "#";

  return (
    <div className="group panel">
      <Link to={`/project/${project.slug}`} className="block">
        <div className="sprocket-strip">
          {Array.from({ length: 9 }).map((_, h) => (
            <span key={h} className="sprocket-hole" />
          ))}
        </div>
        <div className="aspect-[4/3] overflow-hidden border-b-2 border-stroke">
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="tag-bar bg-[#111]">SHOT {String(shot).padStart(2, "0")}</span>
          {project.year && <span className={`tag-bar ${TAG_COLORS[shot % TAG_COLORS.length]}`}>{project.year}</span>}
        </div>

        <Link to={`/project/${project.slug}`}>
          <h3 className="font-display text-2xl mb-2 hover:underline underline-offset-4">{project.title}</h3>
        </Link>

        {project.description && (
          <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">{project.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <Link
            to={`/project/${project.slug}`}
            className="text-xs uppercase tracking-widest underline underline-offset-4"
          >
            view project →
          </Link>
          {hasSite && (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest underline underline-offset-4"
            >
              visit site →
            </a>
          )}
          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest underline underline-offset-4"
            >
              github →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const { projects } = usePortfolioData();
  const personalProjects = projects.filter((p) => p.category === "personal");
  const clientWork = projects.filter((p) => p.category === "client");

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <span className="scene-slug">INT. WORK — DAY</span>
      <span className="panel-label">02 — work</span>
      <h1 className="font-display text-5xl md:text-6xl mt-4 mb-10">Selected Work</h1>

      {personalProjects.length > 0 && (
        <>
          <span className="panel-label">personal projects</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4 mb-14">
            {personalProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} shot={i + 1} />
            ))}
          </div>
        </>
      )}

      {clientWork.length > 0 && (
        <>
          <span className="panel-label">client work</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
            {clientWork.map((project, i) => (
              <ProjectCard key={project.slug} project={project} shot={personalProjects.length + i + 1} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
