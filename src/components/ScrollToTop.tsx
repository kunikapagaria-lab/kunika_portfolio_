import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only force scroll-to-top when navigating to a new route (PUSH), not on
    // browser back/forward (POP) — that should keep the browser's native
    // scroll restoration so "back to work" lands where you left off.
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, navigationType]);

  return null;
}
