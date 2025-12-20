import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const plans = [
  {
    nameKey: "pricing.starter",
    price: 29,
    descriptionKey: "pricing.starterDesc",
    description: "Perfect for small teams getting started",
    descriptionBn: "শুরু করা ছোট টিমের জন্য নিখুঁত",
    features: [
      { en: "Up to 5 team members", bn: "৫ জন টিম সদস্য পর্যন্ত" },
      { en: "10 GB storage", bn: "১০ জিবি স্টোরেজ" },
      { en: "Basic analytics", bn: "বেসিক অ্যানালিটিক্স" },
      { en: "Email support", bn: "ইমেইল সাপোর্ট" },
      { en: "API access", bn: "API অ্যাক্সেস" },
    ],
    popular: false,
  },
  {
    nameKey: "pricing.professional",
    price: 99,
    descriptionKey: "pricing.professionalDesc",
    description: "For growing teams that need more power",
    descriptionBn: "বড় হতে থাকা টিমের জন্য যাদের আরো শক্তি প্রয়োজন",
    features: [
      { en: "Up to 25 team members", bn: "২৫ জন টিম সদস্য পর্যন্ত" },
      { en: "100 GB storage", bn: "১০০ জিবি স্টোরেজ" },
      { en: "Advanced analytics", bn: "অ্যাডভান্সড অ্যানালিটিক্স" },
      { en: "Priority support", bn: "প্রায়োরিটি সাপোর্ট" },
      { en: "Full API access", bn: "সম্পূর্ণ API অ্যাক্সেস" },
      { en: "Custom integrations", bn: "কাস্টম ইন্টিগ্রেশন" },
      { en: "SSO authentication", bn: "SSO অথেনটিকেশন" },
    ],
    popular: true,
  },
  {
    nameKey: "pricing.enterprise",
    price: null,
    descriptionKey: "pricing.enterpriseDesc",
    description: "For large organizations with complex needs",
    descriptionBn: "জটিল প্রয়োজনের বড় প্রতিষ্ঠানের জন্য",
    features: [
      { en: "Unlimited team members", bn: "আনলিমিটেড টিম সদস্য" },
      { en: "Unlimited storage", bn: "আনলিমিটেড স্টোরেজ" },
      { en: "Enterprise analytics", bn: "এন্টারপ্রাইজ অ্যানালিটিক্স" },
      { en: "Dedicated support", bn: "ডেডিকেটেড সাপোর্ট" },
      { en: "Custom development", bn: "কাস্টম ডেভেলপমেন্ট" },
      { en: "On-premise option", bn: "অন-প্রিমাইজ অপশন" },
      { en: "SLA guarantee", bn: "SLA গ্যারান্টি" },
      { en: "Security audit", bn: "সিকিউরিটি অডিট" },
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
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
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
                      <span className="text-4xl font-bold">${plan.price}</span>
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
                  className={`w-full ${
                    plan.popular
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
