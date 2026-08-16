import { useEffect, useRef, useState } from "react";
import turtleUrl from "../assets/turtle.svg";

const PATH_D = "M50 0 C 50 90, 78 90, 78 180 C 78 270, 22 270, 22 360 C 22 450, 78 450, 78 540 C 78 630, 22 630, 22 720";
const VIEW_W = 100;
const VIEW_H = 720;

// One-way crawl from top to bottom, then back up, forever — independent of scrolling.
const ONE_WAY_MS = 60000;
const CYCLE_MS = ONE_WAY_MS * 2;

export default function ScrollPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const [point, setPoint] = useState({ x: 50, y: 0 });
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const clickCount = useRef(0);
  const startTime = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const path = pathRef.current;
    if (path) setPathLength(path.getTotalLength());

    if (reduced) {
      if (path) setPoint(path.getPointAtLength(0));
      return;
    }

    startTime.current = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const p = pathRef.current;
      if (p) {
        const elapsed = (now - startTime.current) % CYCLE_MS;
        const cyclePos = elapsed / ONE_WAY_MS;
        const t = cyclePos <= 1 ? cyclePos : 2 - cyclePos;
        const length = p.getTotalLength();
        setPoint(p.getPointAtLength(t * length));
        setProgress(t);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
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
    <div className="hidden md:block fixed right-10 top-0 h-screen w-24 z-40 pointer-events-none">
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" className="w-full h-full" fill="none">
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
      </svg>
      <div
        style={{
          position: "absolute",
          left: `${(point.x / VIEW_W) * 100}%`,
          top: `${(point.y / VIEW_H) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className={spinning ? "animate-turtle-spin" : ""}>
          <div onClick={handleTurtleClick} className="pointer-events-auto cursor-pointer turtle-crawl">
            <img src={turtleUrl} alt="" width={40} className="block" draggable={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
