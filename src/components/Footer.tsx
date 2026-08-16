import { usePortfolioData } from "../context/PortfolioDataContext";
import SayHiModal from "./SayHiModal";

const LINKEDIN_URL = "https://www.linkedin.com/in/kunika-pagaria";
const GITHUB_URL = "https://github.com/kunikapagaria-lab";

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
          <div className="flex items-center gap-4 mt-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest underline underline-offset-4 text-muted hover:text-text-primary"
            >
              linkedin →
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest underline underline-offset-4 text-muted hover:text-text-primary"
            >
              github →
            </a>
          </div>
        </div>
        <SayHiModal buttonClassName="tag-bar bg-accent text-base px-4 py-2" label="write me →" />
      </div>
    </footer>
  );
}
