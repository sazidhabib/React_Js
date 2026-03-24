import ScrollToSection from '../components/ScrollToSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageRenderer from '../components/PageRenderer';

export default async function DynamicCategoryRoute({ params }) {
    const { slug } = await params;
    
    return (
        <>
            <ScrollToSection />
            <Header />
            <main className="main-content">
                <PageRenderer slug={slug} />
            </main>
            <Footer />
        </>
    );
}
