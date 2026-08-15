import Tape from "../components/Tape";
import { skills } from "../siteConfig";
import "./Skills.css";

export default function Skills() {
  return (
    <>
      <section className="container page-header-inner">
        <p className="eyebrow">What I Bring</p>
        <h1 className="hand page-title">Personal Skills</h1>
      </section>

      <section className="container skills-section">
        <div className="skills-grid">
          {skills.map((group, i) => (
            <div className="torn-wrap" key={group.title}>
              <Tape
                pattern={i % 2 === 0 ? "dot" : "check"}
                rotate={i % 2 === 0 ? -10 : 12}
                style={{ top: -16, left: 28 }}
              />
              <div className="torn-paper skill-card">
                <h3 className="hand skill-heading">&bull; {group.title}</h3>
                <ul className="skill-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
