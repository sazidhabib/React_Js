import Header from "../components/Header";
import About from "../components/About";
import Report from "../components/Report";
import Asarernoy from "../components/Asarernoy";
import JetukuBoliniAga from "../components/JetukuBoliniAga";
import BookReadingSection from "../components/BookReadingSection";
import ListeningMusicSection from "../components/ListeningMusicSection";
import ScrollToSection from "../components/ScrollToSection";

const HomeLayout = () => {
  return (
    <>
      <ScrollToSection />
      <Header />
      <About />
      <Asarernoy />
      <Report />
      <JetukuBoliniAga />
      <BookReadingSection />
      <ListeningMusicSection />
    </>
  );
};

export default HomeLayout;
