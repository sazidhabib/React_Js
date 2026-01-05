import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const plans = [
  {
    nameKey: "pricing.starter",
    price: "15k-30k",
    descriptionKey: "pricing.starterDesc",
    description: "Small businesses, local shops, startups",
    descriptionBn: "ছোট ব্যবসা, দোকান, নতুন উদ্যোক্তা",
    features: [
      {
        en: "5-page Website (WordPress / Static)",
        bn: "৫ পেজ ওয়েবসাইট (WordPress/Static)",
      },
      { en: "Mobile-Friendly Design", bn: "মোবাইল ফ্রেন্ডলি ডিজাইন" },
      { en: "Basic UI/UX", bn: "বেসিক UI/UX" },
      { en: "Facebook Business Page Setup", bn: "ফেসবুক বিজনেস পেজ সেটআপ" },
      {
        en: "Google Map Integration & Contact Form",
        bn: "Google Map + Contact Form",
      },
      { en: "1 Month Free Support", bn: "১ মাস ফ্রি সাপোর্ট" },
    ],
    popular: false,
  },
  {
    nameKey: "pricing.professional",
    price: "35k-70k",
    descriptionKey: "pricing.professionalDesc",
    description: "SMEs, online businesses, service-based companies",
    descriptionBn: "SME, অনলাইন বিজনেস, সার্ভিস কোম্পানি",
    features: [
      {
        en: "Dynamic Website (8–12 pages)",
        bn: "ডায়নামিক ওয়েবসাইট (৮–১২ পেজ)",
      },
      { en: "Custom Design", bn: "কাস্টম ডিজাইন" },
      { en: "SEO (On-page + Basic)", bn: "SEO (On-page + Basic) " },
      {
        en: "Facebook & Google Analytics Setup",
        bn: "Facebook & Google Analytics সেটআপ",
      },
      {
        en: "5 Social Media Post Designs",
        bn: "৫ সোশ্যাল মিডিয়া পোস্ট ডিজাইন",
      },
      { en: "2 Months Support", bn: "২ মাস সাপোর্ট" },
    ],
    popular: true,
  },
  {
    nameKey: "pricing.enterprise",
    price: "50k-120k",
    descriptionKey: "pricing.enterpriseDesc",
    description: "Online shops, Facebook / WhatsApp-based businesses",
    descriptionBn: "অনলাইন শপ, Facebook/WhatsApp ব্যবসা",
    features: [
      { en: "E-commerce Website", bn: "ই-কমার্স ওয়েবসাইট" },
      {
        en: "Product Upload (20–50 products)",
        bn: "Product Upload (২০–৫০ টি)",
      },
      { en: "Enterprise analytics", bn: "এন্টারপ্রাইজ অ্যানালিটিক্স" },
      { en: "SSL & Payment Gateway Integration", bn: "SSL + Payment Gateway" },
      { en: "Order Management System", bn: "Order Management" },
      { en: "Facebook Pixel Setup", bn: "Facebook Pixel সেটআপ" },
      { en: "Basic SEO", bn: "Basic SEO" },
      { en: "3 Months Support", bn: "৩ মাস সাপোর্ট" },
    ],
    popular: false,
  },
  {
    nameKey: "pricing.enterprise",
    price: "10k-30k",
    descriptionKey: "pricing.enterpriseDesc",
    description: "Local Brands, E-commerce Stores, Real Estate",
    descriptionBn: "লোকাল ব্র্যান্ড, ই-কমার্স, রিয়েল এস্টেট",
    features: [
      { en: "Facebook & Instagram Marketing", bn: "ফেসবুক ও ইনস্টাগ্রাম মার্কেটিং" },
      {
        en: "8-12 Post/Creative Designs",
        bn: "৮-১২টি পোস্ট/কার্ড ডিজাইন",
      },
      { en: "Ad Campaign Management (Ad Budget Separate)", bn: "বিজ্ঞাপন ক্যাম্পেইন ম্যানেজমেন্ট (বিজ্ঞাপন বাজেট আলাদা)" },
      { en: "Basic SEO/Content Posting", bn: "বেসিক এসইও/কন্টেন্ট পোস্টিং" },
      { en: "Monthly Performance Report", bn: "মাসিক রিপোর্ট" },

    ],
    popular: false,
  },
  {
    nameKey: "pricing.enterprise",
    price: "80k-300k",
    descriptionKey: "pricing.enterpriseDesc",
    description: "Online shops, Facebook / WhatsApp-based businesses",
    descriptionBn: "আধুনিক ব্যবসা, SaaS, অনলাইন সার্ভিস প্রদানকারী",
    features: [
      { en: "E-commerce Website", bn: "AI চ্যাটবট (ওয়েবসাইট/ফেসবুক)" },
      {
        en: "Product Upload (20–50 products)",
        bn: "বিজনেস প্রক্রিয়া অটোমেশন",
      },
      { en: "Enterprise analytics", bn: "API ইন্টিগ্রেশন" },
      { en: "SSL & Payment Gateway Integration", bn: "অ্যানালিটিক্স ড্যাশবোর্ড" },

    ],
    popular: false,
  },
  {
    nameKey: "pricing.premium",
    price: "150k-500k",
    descriptionKey: "pricing.enterpriseDesc",
    description: "Large organizations, schools, hospitals, group of companies",
    descriptionBn: "অনলাইন শপ, Facebook/WhatsApp ব্যবসা",
    features: [
      { en: "E-commerce Website", bn: "ই-কমার্স ওয়েবসাইট" },
      {
        en: "Product Upload (20–50 products)",
        bn: "Product Upload (২০–৫০ টি)",
      },
      { en: "Enterprise analytics", bn: "এন্টারপ্রাইজ অ্যানালিটিক্স" },
      { en: "SSL & Payment Gateway Integration", bn: "SSL + Payment Gateway" },
      { en: "Order Management System", bn: "Order Management" },
      { en: "Facebook Pixel Setup", bn: "Facebook Pixel সেটআপ" },
      { en: "Basic SEO", bn: "Basic SEO" },
      { en: "3 Months Support", bn: "৩ মাস সাপোর্ট" },
    ],
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const PricingSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {t("pricing.subtitle")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t("pricing.title1")}
            <br />
            <span className="gradient-text">{t("pricing.title2")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            {t("pricing.description")}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${plan.popular
                ? "glass-strong border-primary/50 glow-primary"
                : "glass hover:border-primary/30"
                }`}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                    {t("pricing.mostPopular")}
                  </span>
                </motion.div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">
                  {t(plan.nameKey)}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {language === "bn" ? plan.descriptionBn : plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  {plan.price ? (
                    <>
                      <span className="text-3xl font-bold">৳{plan.price}</span>
                      <span className="text-muted-foreground">
                        {t("pricing.month")}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold">
                      {t("pricing.custom")}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: featureIndex * 0.1 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">
                      {language === "bn" ? feature.bn : feature.en}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className={`w-full ${plan.popular
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                >
                  {plan.price
                    ? t("pricing.getStarted")
                    : t("pricing.contactSales")}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PricingSection;
