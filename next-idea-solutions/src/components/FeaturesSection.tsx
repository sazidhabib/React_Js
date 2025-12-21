import { Cpu, BarChart3, Puzzle, Zap, Shield, Globe, Earth, Handshake, Clapperboard } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

import type { ElementType } from "react";

type Feature = {
  icon: ElementType;
  title: string;
  descriptions: string[];
};

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features: Feature[] = [
    {
      icon: Cpu,
      title: t("features.ai.title"),
      descriptions: [
        t("features.ai.description"),
        t("features.ai.description2"),
        t("features.ai.description3"),
        t("features.ai.description4"),
      ],
    },
    {
      icon: BarChart3,
      title: t("features.analytics.title"),
      descriptions: [
        t("features.analytics.description"),
        t("features.analytics.description2"),
        t("features.analytics.description3"),
        t("features.analytics.description4"),
        t("features.analytics.description5"),
        t("features.analytics.description6"),
      ],
    },
    {
      icon: Puzzle,
      title: t("features.integration.title"),
      descriptions: [
        t("features.integration.description"),
        t("features.integration.description2"),
        t("features.integration.description3"),
        t("features.integration.description4"),
      ],
    },
    {
      icon: Zap,
      title: t("features.performance.title"),
      descriptions: [
        t("features.performance.description"),
        t("features.performance.description2"),
        t("features.performance.description3"),
        t("features.performance.description4"),
      ],
    },
    {
      icon: Shield,
      title: t("features.security.title"),
      descriptions: [
        t("features.security.description"),
        t("features.security.description2"),
        t("features.security.description3"),
        t("features.security.description4"),
        t("features.security.description5"),
      ],
    },
    {
      icon: Clapperboard,
      title: t("features.global.title"),
      descriptions: [
        t("features.global.description"),
        t("features.global.description2"),
        t("features.global.description3"),
      ],
    },
    {
      icon: Globe,
      title: t("features.digital.title"),
      descriptions: [
        t("features.digital.description"),
        t("features.digital.description2"),
        t("features.digital.description3"),
      ],
    },
    {
      icon: Handshake,
      title: t("features.other.title"),
      descriptions: [
        t("features.other.description"),
        t("features.other.description2"),
        t("features.other.description3"),
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section
      id="services"
      className="relative pt-0 pb-24 md:pb-32 overflow-hidden"
    >
      {/* Seamless blend from hero - gradient continues */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={itemVariants}
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {t("features.subtitle")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t("features.title1")}
            <br />
            <span className="gradient-text">{t("features.title2")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            {t("features.description")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative glass rounded-2xl p-6 md:p-8 hover:glow-primary transition-all duration-500"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/20 group-hover:via-transparent group-hover:to-accent/20 transition-all duration-500" />

              <div className="relative">
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="w-7 h-7 text-primary" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {feature.descriptions
                    .filter((desc): desc is string => Boolean(desc))
                    .map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
