import Tape from "../components/Tape";
import { projects } from "../siteConfig";
import "./Projects.css";

export default function Projects() {
  return (
    <>
      <section className="container page-header-inner">
        <p className="eyebrow">Selected Work</p>
        <h1 className="hand page-title">Project Portfolio</h1>
      </section>

      <section className="container projects-section">
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div className="torn-wrap" key={project.title}>
              <Tape
                pattern={i % 2 === 0 ? "check" : "dot"}
                rotate={i % 2 === 0 ? -10 : 12}
                style={{ top: -16, left: i % 2 === 0 ? 30 : "auto", right: i % 2 !== 0 ? 30 : "auto" }}
              />
              <div className="torn-paper project-card">
                <div className="project-photo">
                  <img src={`https://picsum.photos/seed/project-${i}/500/360`} alt={project.title} loading="lazy" />
                </div>
                <span className="project-tag">{project.tag}</span>
                <h3 className="hand project-title">&bull; {project.title}</h3>
                <p className="project-detail">{project.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
