import { useEffect, useState } from "react";
import { usePortfolioData } from "../context/PortfolioDataContext";
import SayHiModal from "./SayHiModal";

const SECTION_IDS = ["home", "work", "about", "contact"];
const LINKS = [
  { label: "home", href: "#home", id: "home" },
  { label: "work", href: "#work", id: "work" },
  { label: "about", href: "#about", id: "about" },
  { label: "contact", href: "#contact", id: "contact" },
];

export default function Nav() {
  const { site } = usePortfolioData();
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-bg border-b-2 border-stroke">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-y-3">
        <a href="#home" className="font-display text-3xl tracking-wide">
          {site.name}
        </a>
        <div className="flex flex-wrap items-center gap-5 md:gap-6">
          <nav className="flex gap-5 md:gap-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-body text-sm uppercase tracking-widest ${
                  active === link.id ? "font-bold underline underline-offset-4" : "text-muted hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <span className="hidden sm:block w-px h-5 bg-stroke" />
          <div className="flex items-center gap-3">
            <a href={site.cvUrl} download className="tag-bar tag-bar-outline text-xs px-3 py-1.5">
              cv ↓
            </a>
            <SayHiModal buttonClassName="tag-bar tag-bar-outline text-xs px-3 py-1.5" label="write me →" />
          </div>
        </div>
      </div>
    </header>
  );
}
