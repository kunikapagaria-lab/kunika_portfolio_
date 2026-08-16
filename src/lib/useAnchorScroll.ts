import { useLenis } from "lenis/react";

// Same-page hash links (e.g. href="#work") need to route through Lenis
// instead of the browser's native anchor jump — otherwise the native jump
// fights Lenis's virtualized scroll position on the next animation frame.
export function useAnchorScroll() {
  const lenis = useLenis();

  return (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!lenis) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el, { offset: -84 });
  };
}
