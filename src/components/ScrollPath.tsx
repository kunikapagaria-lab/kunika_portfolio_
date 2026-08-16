import { useEffect, useRef, useState } from "react";
import turtleImg from "../assets/turtle-walk.png";

const PATH_D = "M50 0 C 50 90, 78 90, 78 180 C 78 270, 22 270, 22 360 C 22 450, 78 450, 78 540 C 78 630, 22 630, 22 720";

function TurtleIcon({ tucked, crawling }: { tucked: boolean; crawling: boolean }) {
  return (
    <g className={crawling ? "turtle-crawl" : "turtle-idle"}>
      <image
        href={turtleImg}
        x="-25"
        y="-13"
        width="50"
        height="26"
        preserveAspectRatio="xMidYMid meet"
        style={{
          transform: tucked ? "scale(0.85, 0.9)" : "scale(1, 1)",
          transformOrigin: "center",
          transition: "transform 0.25s ease",
        }}
      />
    </g>
  );
}

export default function ScrollPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const [point, setPoint] = useState({ x: 50, y: 0 });
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tucked, setTucked] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const clickCount = useRef(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const tuckTimeout = useRef<number | undefined>(undefined);
  const targetProgress = useRef(0);
  const animatedProgress = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const path = pathRef.current;
    if (path) setPathLength(path.getTotalLength());

    const readTarget = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress.current =
        scrollableHeight > 0 ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1) : 0;

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
    };

    readTarget();

    if (reduced) {
      const p = pathRef.current;
      if (p) {
        const length = p.getTotalLength();
        animatedProgress.current = targetProgress.current;
        setPoint(p.getPointAtLength(targetProgress.current * length));
        setProgress(targetProgress.current);
      }
      window.addEventListener("scroll", readTarget, { passive: true });
      window.addEventListener("resize", readTarget);
      return () => {
        window.removeEventListener("scroll", readTarget);
        window.removeEventListener("resize", readTarget);
        window.clearTimeout(tuckTimeout.current);
      };
    }

    let raf: number;
    const tick = () => {
      const p = pathRef.current;
      if (p) {
        const diff = targetProgress.current - animatedProgress.current;
        animatedProgress.current += diff * 0.12;
        if (Math.abs(diff) < 0.0006) animatedProgress.current = targetProgress.current;

        const length = p.getTotalLength();
        setPoint(p.getPointAtLength(animatedProgress.current * length));
        setProgress(animatedProgress.current);
        setCrawling(Math.abs(diff) > 0.0008);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("scroll", readTarget, { passive: true });
    window.addEventListener("resize", readTarget);
    return () => {
      window.removeEventListener("scroll", readTarget);
      window.removeEventListener("resize", readTarget);
      cancelAnimationFrame(raf);
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
    <div className="hidden md:block fixed right-10 top-0 h-screen w-24 z-40 pointer-events-none">
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
        <g style={{ transform: `translate(${point.x}px, ${point.y}px)` }}>
          <g className={spinning ? "animate-turtle-spin" : ""}>
            <g onClick={handleTurtleClick} className="pointer-events-auto cursor-pointer" transform="scale(1.3)">
              <TurtleIcon tucked={tucked} crawling={crawling} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
