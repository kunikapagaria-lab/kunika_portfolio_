import { ReactLenis } from "lenis/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortfolioDataProvider } from "./context/PortfolioDataContext";
import MainPage from "./pages/MainPage";
import ProjectDetail from "./pages/ProjectDetail";
import ScrollToTop from "./components/ScrollToTop";

const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const content = (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-text-primary">
        <div className="grain-overlay" />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );

  return (
    <PortfolioDataProvider>
      {reducedMotion ? content : <ReactLenis root options={{ duration: 1.1, lerp: 0.1 }}>{content}</ReactLenis>}
    </PortfolioDataProvider>
  );
}
