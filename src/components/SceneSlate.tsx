import { useEffect, useState } from "react";

const SCENES: Record<string, string> = {
  home: "01 — HOME",
  work: "02 — WORK",
  about: "03 — ABOUT",
  skills: "04 — SKILLS",
};
const SECTION_IDS = Object.keys(SCENES);

export default function SceneSlate() {
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
    <div className="fixed bottom-6 right-6 z-40 border-2 border-stroke bg-bg shadow-[4px_4px_0_#111]">
      <div
        className="h-2"
        style={{
          background: "repeating-linear-gradient(-45deg, #111 0, #111 6px, #fff 6px, #fff 12px)",
        }}
      />
      <p className="font-body text-xs font-bold tracking-widest px-3 py-2">SCENE {SCENES[active]}</p>
    </div>
  );
}
