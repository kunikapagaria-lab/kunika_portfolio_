import { usePortfolioData } from "../context/PortfolioDataContext";
import SayHiModal from "./SayHiModal";

export default function Footer() {
  const { site } = usePortfolioData();

  return (
    <footer className="border-t-2 border-stroke">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="font-display text-2xl mb-1">let's connect</p>
          <a href={`mailto:${site.email}`} className="text-sm text-muted hover:text-text-primary">
            {site.email}
          </a>
        </div>
        <SayHiModal buttonClassName="tag-bar bg-accent text-base px-4 py-2" label="write me →" />
      </div>
    </footer>
  );
}
