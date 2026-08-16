import { PortfolioDataProvider } from "./context/PortfolioDataContext";
import Nav from "./components/Nav";
import ScrollPath from "./components/ScrollPath";
import BackToTop from "./components/BackToTop";
import SceneSlate from "./components/SceneSlate";
import Reveal from "./components/Reveal";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <PortfolioDataProvider>
      <div className="min-h-screen bg-bg text-text-primary">
        <div className="grain-overlay" />
        <Nav />
        <ScrollPath />
        <BackToTop />
        <SceneSlate />
        <section id="home" className="min-h-screen flex flex-col justify-center">
          <Home />
        </section>
        <section id="work" className="min-h-screen flex flex-col justify-center">
          <Reveal>
            <Work />
          </Reveal>
        </section>
        <section id="about" className="min-h-screen flex flex-col justify-center">
          <Reveal>
            <About />
          </Reveal>
        </section>
        <section id="contact" className="min-h-screen flex flex-col justify-center">
          <Reveal>
            <Contact />
          </Reveal>
        </section>
      </div>
    </PortfolioDataProvider>
  );
}
