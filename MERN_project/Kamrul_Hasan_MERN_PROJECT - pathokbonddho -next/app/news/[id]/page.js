import ScrollToSection from '../../components/ScrollToSection';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NewsDetails from '../../components/NewsDetails';

async function getNewsData(id) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const [newsRes, headerAdsRes, sidebarAdsRes, footerAdsRes] = await Promise.all([
      fetch(`${API_URL}/news/${id}`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/ads/position?position=header&page=details`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/ads/position?position=sidebar&page=details`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/ads/position?position=footer&page=details`, { next: { revalidate: 60 } })
    ]);

    const newsData = newsRes.ok ? await newsRes.json() : null;
    const headerAds = headerAdsRes.ok ? await headerAdsRes.json() : [];
    const sidebarAds = sidebarAdsRes.ok ? await sidebarAdsRes.json() : [];
    const footerAds = footerAdsRes.ok ? await footerAdsRes.json() : [];

    return {
      news: newsData ? (newsData.data || newsData.news || newsData) : null,
      ads: { header: headerAds, sidebar: sidebarAds, footer: footerAds }
    };
  } catch (err) {
    console.error('Server-side fetch error (news details/ads):', err);
    return { news: null, ads: { header: [], sidebar: [], footer: [] } };
  }
}

export default async function NewsRoute({ params }) {
    const { id } = await params;
    const { news, ads } = await getNewsData(id);
    
    return (
        <>
            <ScrollToSection />
            <Header />
            <main className="main-content bg-light" style={{ minHeight: "80vh" }}>
                <NewsDetails id={id} initialData={news} initialAds={ads} />
            </main>
            <Footer />
        </>
    );
}
