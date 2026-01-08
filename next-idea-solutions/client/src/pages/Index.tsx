import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import PlatformSection from "@/components/PlatformSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import PortfolioSection from "@/components/PortfolioSection";
import TeamSection from "@/components/TeamSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider } from "@/hooks/useLanguage";

const Index = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
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
    </LanguageProvider>
  );
};

export default Index;
