import { useEffect, useRef } from "react";

export default function ParallaxLayer({ speed = 0.2, className = "", style }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !el) return;

    let raf = null;

    const update = () => {
      raf = null;
      const rect = el.parentElement.getBoundingClientRect();
      el.style.transform = `translate3d(0, ${rect.top * speed}px, 0)`;
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return <div ref={ref} className={`parallax-layer ${className}`} style={style} />;
}
