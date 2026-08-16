import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortfolioDataProvider } from "./context/PortfolioDataContext";
import MainPage from "./pages/MainPage";
import ProjectDetail from "./pages/ProjectDetail";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <PortfolioDataProvider>
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
    </PortfolioDataProvider>
  );
}
