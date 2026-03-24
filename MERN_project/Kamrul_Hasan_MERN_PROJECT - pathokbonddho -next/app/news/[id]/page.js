import ScrollToSection from '../../components/ScrollToSection';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NewsDetails from '../../components/NewsDetails';

export default async function NewsRoute({ params }) {
    const { id } = await params;
    return (
        <>
            <ScrollToSection />
            <Header />
            <main className="main-content bg-light" style={{ minHeight: "80vh" }}>
                <NewsDetails id={id} />
            </main>
            <Footer />
        </>
    );
}
