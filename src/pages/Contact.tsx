import { usePortfolioData } from "../context/PortfolioDataContext";
import SayHiModal from "../components/SayHiModal";

export default function Contact() {
  const { site } = usePortfolioData();

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <span className="scene-slug">INT. CONTACT — NIGHT</span>
      <span className="panel-label">04 — contact</span>
      <h1 className="font-display text-5xl md:text-6xl mt-4 mb-6">Let's Talk</h1>
      <p className="text-sm md:text-base leading-relaxed max-w-md mb-10">
        Got a project, a question, or just want to say hi? My inbox is open.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <a href={`mailto:${site.email}`} className="tag-bar bg-[#111] text-base px-4 py-2">
          {site.email} →
        </a>
        <SayHiModal />
        <a href={site.cvUrl} download className="tag-bar tag-bar-outline text-base px-4 py-2">
          download cv ↓
        </a>
      </div>
    </div>
  );
}
