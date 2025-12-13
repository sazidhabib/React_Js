import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PlatformSection from '@/components/PlatformSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import PortfolioSection from '@/components/PortfolioSection';
import TeamSection from '@/components/TeamSection';
import BlogSection from '@/components/BlogSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/hooks/useTheme';

const Index = () => {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />
                <main>
                    <HeroSection />
                    <FeaturesSection />
                    <PlatformSection />
                    <PortfolioSection />
                    <TestimonialsSection />
                    <TeamSection />
                    <BlogSection />
                    <PricingSection />
                    <FAQSection />
                    <ContactSection />
                    <CTASection />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Index;
