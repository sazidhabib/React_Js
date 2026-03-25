import ScrollToSection from '../components/ScrollToSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutUsPage from '../components/AboutUsPage';

async function getAboutData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${API_URL}/sections/about`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Server-side fetch error (about):', err);
    return null;
  }
}

export default async function AboutUsRoute() {
    const initialData = await getAboutData();
    
    return (
        <>
            <ScrollToSection />
            <Header />
            <AboutUsPage initialData={initialData} />
            <Footer />
        </>
    );
}
