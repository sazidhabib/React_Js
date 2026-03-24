import ScrollToSection from '../components/ScrollToSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutUsPage from '../components/AboutUsPage';

export const metadata = {
    title: 'About Us | Pathokbonddho'
};

export default function AboutUsRoute() {
    return (
        <>
            <ScrollToSection />
            <Header />
            <AboutUsPage />
            <Footer />
        </>
    );
}
