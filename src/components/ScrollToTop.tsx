import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // A hash target (e.g. /#work) always wins: scroll to that section once
    // it's mounted, regardless of navigation type — that's what lets the
    // nav links work correctly when coming from a different route.
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
      return;
    }

    // Otherwise, only force scroll-to-top when navigating to a new route
    // (PUSH), not on browser back/forward (POP) — that keeps the browser's
    // native scroll restoration so "back to work" lands where you left off.
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash, navigationType]);

  return null;
}
