import Nav from "../components/Nav";
import BackToTop from "../components/BackToTop";
import SceneSlate from "../components/SceneSlate";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";
import Home from "./Home";
import About from "./About";
import Work from "./Work";
import Skills from "./Skills";
import Bonus from "./Bonus";

export default function MainPage() {
  return (
    <>
      <Nav />
      <BackToTop />
      <SceneSlate />
      <section id="home" className="min-h-screen flex flex-col justify-center pt-20">
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
      <section id="skills" className="min-h-screen flex flex-col justify-center">
        <Reveal>
          <Skills />
        </Reveal>
      </section>
      <section id="bonus" className="min-h-screen flex flex-col justify-center">
        <Reveal>
          <Bonus />
        </Reveal>
      </section>
      <Footer />
    </>
  );
}
