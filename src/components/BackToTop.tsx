import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  const handleClick = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-40 w-11 h-11 flex items-center justify-center border-2 border-stroke bg-bg font-display text-2xl hover:bg-text-primary hover:text-bg transition-colors"
    >
      ↑
    </button>
  );
}
