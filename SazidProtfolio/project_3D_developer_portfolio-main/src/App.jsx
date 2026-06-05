import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Works,
  StarsCanvas,
  ErrorBoundary,
} from "./components";
import Skills from "./components/Skills";

import Footer from "./components/Footer";
import SkillShow from "./components/SkillShow";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="relative bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>

          <About />
          <Skills />
          <Experience />

          {/* <Tech /> */}

          <SkillShow />
          <div className="relative z-0">
            <Works />
            <Contact />
            <StarsCanvas />
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
