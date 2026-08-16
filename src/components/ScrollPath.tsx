import { useEffect, useRef, useState } from "react";

const PATH_D = "M50 0 C 50 90, 78 90, 78 180 C 78 270, 22 270, 22 360 C 22 450, 78 450, 78 540 C 78 630, 22 630, 22 720";

function TurtleIcon({ tucked }: { tucked: boolean }) {
  return (
    <g stroke="#111" strokeWidth="2" fill="url(#turtle-stipple)" strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <pattern id="turtle-stipple" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="#fff" />
          <rect width="1.6" height="1.6" fill="#111" />
        </pattern>
      </defs>
      <path d="M-20 0 C -20 -15, -8 -22, 0 -22 C 8 -22, 20 -15, 20 0 C 20 13, 8 20, 0 20 C -8 20, -20 13, -20 0 Z" />
      <path d="M0 -22 L 0 20 M-15 -9 L 15 -9 M-15 9 L 15 9" strokeWidth="1.3" fill="none" />
      <circle cx={tucked ? 14 : 26} cy="-2" r="6.5" style={{ transition: "cx 0.25s ease" }} />
      <circle cx={tucked ? 17 : 29} cy="-4" r="1" fill="#111" stroke="none" style={{ transition: "cx 0.25s ease" }} />
      <g opacity={tucked ? 0 : 1} style={{ transition: "opacity 0.2s ease" }}>
        <ellipse cx="-15" cy="-17" rx="5.5" ry="3.2" transform="rotate(-25 -15 -17)" />
        <ellipse cx="-15" cy="17" rx="5.5" ry="3.2" transform="rotate(25 -15 17)" />
        <ellipse cx="15" cy="-17" rx="5.5" ry="3.2" transform="rotate(25 15 -17)" />
        <ellipse cx="15" cy="17" rx="5.5" ry="3.2" transform="rotate(-25 15 17)" />
      </g>
      <path d="M-20 0 L -27 0" strokeWidth="2" opacity={tucked ? 0 : 1} style={{ transition: "opacity 0.2s ease" }} />
    </g>
  );
}

export default function ScrollPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const [point, setPoint] = useState({ x: 50, y: 0 });
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tucked, setTucked] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const clickCount = useRef(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const tuckTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const path = pathRef.current;
    if (path) setPathLength(path.getTotalLength());

    let raf: number | null = null;

    const update = () => {
      raf = null;
      if (!path) return;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = scrollableHeight > 0 ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1) : 0;
      const length = path.getTotalLength();
      const pt = path.getPointAtLength(currentProgress * length);
      setPoint(pt);
      setProgress(currentProgress);

      if (!reduced) {
        const now = performance.now();
        const dt = now - lastTime.current;
        const dy = Math.abs(window.scrollY - lastScrollY.current);
        if (dt > 0 && dy / dt > 1.2) {
          setTucked(true);
          window.clearTimeout(tuckTimeout.current);
          tuckTimeout.current = window.setTimeout(() => setTucked(false), 350);
        }
        lastScrollY.current = window.scrollY;
        lastTime.current = now;
      }
    };

    update();
    if (reduced) return;

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(tuckTimeout.current);
    };
  }, []);

  const handleTurtleClick = () => {
    clickCount.current += 1;
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      setSpinning(true);
      window.setTimeout(() => setSpinning(false), 900);
    }
  };

  return (
    <div className="hidden md:block fixed right-2 top-0 h-screen w-24 z-40 pointer-events-none">
      <svg viewBox="0 0 100 720" preserveAspectRatio="none" className="w-full h-full" fill="none">
        <path d={PATH_D} stroke="hsl(var(--stroke))" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" fill="none" />
        <path
          ref={pathRef}
          d={PATH_D}
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength * (1 - progress)}
        />
        <circle cx="50" cy="0" r="4" fill="#fff" stroke="#111" strokeWidth="2" />
        <circle cx="22" cy="720" r="4" fill="#111" />
        <g style={{ transform: `translate(${point.x}px, ${point.y}px)`, transition: "transform 0.05s linear" }}>
          <g className={spinning ? "animate-turtle-spin" : ""}>
            <g onClick={handleTurtleClick} className="pointer-events-auto cursor-pointer" transform="scale(1.3)">
              <TurtleIcon tucked={tucked} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
