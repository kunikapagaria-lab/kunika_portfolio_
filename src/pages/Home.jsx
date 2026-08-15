import { Link } from "react-router-dom";
import Tape from "../components/Tape";
import Polaroid from "../components/Polaroid";
import Paperclip from "../components/Paperclip";
import Rings from "../components/Rings";
import Tag from "../components/Tag";
import Stamp from "../components/Stamp";
import ParallaxLayer from "../components/ParallaxLayer";
import Pin from "../components/Pin";
import Thread from "../components/Thread";
import StickyNote from "../components/StickyNote";
import ArrowNote from "../components/ArrowNote";
import { site, education, experience } from "../siteConfig";
import "./Home.css";

export default function Home() {
  return (
    <>
      <section className="notebook-stage">
        <ParallaxLayer speed={0.15} className="stage-backdrop" />
        <div className="notebook-page">
          <Rings count={9} />

          <Tag rotate={-6} className="page-tag">
            {site.name}
          </Tag>

          <Stamp rotate={7} className="page-stamp">
            <span className="stamp-line1">{site.role.split("|")[0].trim()}</span>
            {site.role.includes("|") && <span className="stamp-line2">{site.role.split("|")[1].trim()}</span>}
          </Stamp>

          <div className="photo-stack">
            <Pin color="blue" rotate={-8} style={{ top: -8, left: 20 }} />
            <Polaroid seed="hero-b" rotate={7} edge="torn" className="stack-photo stack-photo-b" />
            <Polaroid seed="hero-a" rotate={-5} edge="torn" className="stack-photo stack-photo-a" />
            <Paperclip className="paperclip stack-clip" />
          </div>

          <p className="eyebrow">Creative Portfolio</p>
          <h1 className="notebook-title">
            <span className="title-script">Hello, I'm</span>
            <span className="title-serif">{site.name}</span>
          </h1>
          <p className="hero-tagline">{site.tagline}</p>
          <div className="hero-actions-wrap">
            <div className="hero-actions">
              <Link to="/projects" className="btn">
                View Projects
              </Link>
              <Link to="/contact" className="btn outline">
                Contact Me
              </Link>
            </div>
            <ArrowNote rotate={-6} className="hero-arrow-note">
              start here
            </ArrowNote>
          </div>

          <p className="spine-label">{site.role}</p>
        </div>
      </section>

      <section className="about-split">
        <div className="about-left">
          <div className="about-photo-frame">
            <Tape pattern="dot" size="lg" rotate={38} style={{ top: -20, right: -22 }} />
            <p className="hand about-hello">Hello! I'm</p>
            <div className="about-photo-box">
              <img src="https://picsum.photos/seed/portrait-main/500/650" alt={site.name} loading="lazy" />
            </div>
            <p className="hand about-name">{site.name}</p>
          </div>
        </div>
        <div className="about-right">
          <h2 className="hand page-title about-title">About Me</h2>
          <p className="about-bio">{site.bio}</p>
          <div className="about-secondary">
            <StickyNote color="yellow" rotate={-3} className="about-quote">
              {site.quote}
            </StickyNote>
            <div className="about-secondary-photo">
              <Tape pattern="dot" size="sm" rotate={0} style={{ top: -12, right: -12, borderRadius: "50%" }} />
              <img src="https://picsum.photos/seed/portrait-side/400/500" alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="container experience-section">
        <div className="section-head">
          <h2 className="hand page-title">Work Experience</h2>
        </div>
        <div className="experience-grid">
          {experience.map((item, i) => (
            <div className="torn-wrap" key={item.title}>
              {i % 2 === 0 ? (
                <Tape pattern="dot" rotate={-8} style={{ top: -16, left: 96 }} />
              ) : (
                <>
                  <Pin color="red" rotate={-4} style={{ top: -12, right: 44 }} />
                  <Thread color="red" width={86} rotate={64} style={{ top: 6, right: 60 }} />
                </>
              )}
              <div className="torn-paper exp-card">
                <h3 className="hand exp-heading">&bull; {item.title}</h3>
                <p className="exp-detail">{item.detail}</p>
                <div className="exp-photos">
                  <Polaroid seed={`exp-${i}-a`} rotate={-6} className="exp-photo-a" />
                  <Polaroid seed={`exp-${i}-b`} rotate={5} className="exp-photo-b" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container education-section">
        <div className="section-head">
          <h2 className="hand page-title">My Education</h2>
        </div>
        <div className="education-grid">
          {education.map((item, i) => (
            <div className="torn-wrap" key={`${item.school}-${item.period}`}>
              <Tape pattern={i % 2 === 0 ? "check" : "dot"} rotate={i % 2 === 0 ? -10 : 12} style={{ top: -16, left: 30 }} />
              <div className="torn-paper edu-card">
                <div className="edu-photo">
                  <img src={`https://picsum.photos/seed/edu-${i}/500/360`} alt={item.school} loading="lazy" />
                </div>
                <h3 className="hand edu-school">{item.school}</h3>
                <p className="script edu-period">({item.period})</p>
                <p className="edu-detail">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
