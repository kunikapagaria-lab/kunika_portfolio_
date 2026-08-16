import Nav from "../components/Nav";
import BackToTop from "../components/BackToTop";
import SceneSlate from "../components/SceneSlate";
import Reveal from "../components/Reveal";
import Home from "./Home";
import About from "./About";
import Work from "./Work";
import Contact from "./Contact";
import Bonus from "./Bonus";

export default function MainPage() {
  return (
    <>
      <Nav />
      <BackToTop />
      <SceneSlate />
      <section id="home" className="min-h-[calc(100vh-var(--nav-h))] flex flex-col justify-center">
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
      <section id="bonus" className="min-h-screen flex flex-col justify-center">
        <Reveal>
          <Bonus />
        </Reveal>
      </section>
    </>
  );
}
