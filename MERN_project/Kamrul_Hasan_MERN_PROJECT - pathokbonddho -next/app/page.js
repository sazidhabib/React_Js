import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToSection from './components/ScrollToSection';
import PageRenderer from './components/PageRenderer';

export const metadata = {
  title: 'কামরুল হাসান - Home',
  description: 'Welcome to Kamrul Hasan, the news portal.',
};

async function getPageData(slug = 'home') {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    // 1. Resolve page ID from slug
    const listRes = await fetch(`${API_URL}/layout`, { next: { revalidate: 60 } });
    if (!listRes.ok) return null;
    const allPages = await listRes.json();
    
    const matchPage = allPages.find(p => p.name.toLowerCase() === slug.toLowerCase()) || 
                      allPages.find(p => p.name.toLowerCase() === 'home') || 
                      allPages[0];
    
    if (!matchPage) return null;

    // 2. Fetch full layout details
    const layoutRes = await fetch(`${API_URL}/layout/${matchPage.id}`, { next: { revalidate: 60 } });
    if (!layoutRes.ok) return null;
    const layout = await layoutRes.json();

    // 3. Pre-resolve news data for all cells to make it "instant"
    if (layout?.PageSections) {
      for (const section of layout.PageSections) {
        const rows = section.rows || section.Rows || [];
        for (const row of rows) {
          const columns = row.columns || row.Columns || [];
          for (const cell of columns) {
            if (cell.contentType === 'news' && (cell.contentId || cell.tag)) {
              try {
                let newsItem = null;
                if (cell.contentId) {
                  const nRes = await fetch(`${API_URL}/news/${cell.contentId}`, { next: { revalidate: 60 } });
                  if (nRes.ok) {
                    const data = await nRes.json();
                    newsItem = data.data || data.news || data;
                  }
                } else if (cell.tag) {
                  const nRes = await fetch(`${API_URL}/news?tag=${cell.tag}&limit=1`, { next: { revalidate: 60 } });
                  if (nRes.ok) {
                    const data = await nRes.json();
                    const items = data.news || data.rows || [];
                    if (items.length > 0) newsItem = items[0];
                  }
                }
                cell.resolvedContent = newsItem;
              } catch (e) {
                console.error('Error pre-fetching news for cell:', e);
              }
            } else if (cell.contentType === 'image' && cell.contentId) {
              try {
                const iRes = await fetch(`${API_URL}/photos/${cell.contentId}`, { next: { revalidate: 60 } });
                if (iRes.ok) {
                  cell.resolvedContent = await iRes.json();
                }
              } catch (e) {
                console.error('Error pre-fetching image for cell:', e);
              }
            }
          }
        }
      }
    }

    return layout;
  } catch (err) {
    console.error('Server-side fetch error:', err);
    return null;
  }
}

export default async function HomePage() {
  const initialData = await getPageData('home');
  
  return (
    <>
      <ScrollToSection />
      <Header />
      <main className="main-content custom-font">
        <PageRenderer slug="home" initialLayout={initialData} />
      </main>
      <Footer />
    </>
  );
}
