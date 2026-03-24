import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToSection from './components/ScrollToSection';
import PageRenderer from './components/PageRenderer';

export const metadata = {
  title: 'কামরুল হাসান - Home',
  description: 'Welcome to Kamrul Hasan, the news portal.',
};

export default function HomePage() {
  return (
    <>
      <ScrollToSection />
      <Header />
      <main className="main-content custom-font">
        <PageRenderer slug="home" />
      </main>
      <Footer />
    </>
  );
}
