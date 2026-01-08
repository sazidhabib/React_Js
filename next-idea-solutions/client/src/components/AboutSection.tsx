import { motion } from "framer-motion";
import { Target, Eye, Users, Award, Rocket, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "10+", label: t("about.yearsExperience"), icon: Award },
    { value: "500+", label: t("about.happyClients"), icon: Heart },
    { value: "1000+", label: t("about.projectsDelivered"), icon: Rocket },
    { value: "50+", label: t("about.teamMembers"), icon: Users },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section id="about-us" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            {t("about.subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            {t("about.title1")}{" "}
            <span className="gradient-text">{t("about.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("about.description")}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Image/Visual */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="glass-strong rounded-2xl p-6 glow-primary">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-card via-muted to-card overflow-hidden relative">
                {/* Abstract Office/Team Visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 p-6 w-full h-full">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="rounded-xl glass flex items-center justify-center"
                        initial={{ scale: 0, rotate: -10 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                            i % 3 === 0
                              ? "from-primary/40 to-accent/40"
                              : i % 3 === 1
                              ? "from-accent/40 to-primary/40"
                              : "from-chart-2/40 to-chart-3/40"
                          } flex items-center justify-center`}
                        >
                          <span className="text-lg font-bold text-primary-foreground">
                            {
                              [
                                "NI",
                                "S",
                                "❤️",
                                "🚀",
                                "💡",
                                "⚡",
                                "🎯",
                                "✨",
                                "🌟",
                              ][i]
                            }
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-4 right-4 glass rounded-lg px-3 py-2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-xs text-muted-foreground">Since</p>
                  <p className="text-lg font-bold gradient-text">2014</p>
                </motion.div>
              </div>
            </div>

            {/* Decorative blurs */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Right - Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Mission */}
            <div className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t("about.mission")}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.missionText")}
              </p>
            </div>

            {/* Vision */}
            <div className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold">{t("about.vision")}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.visionText")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 text-center hover:glow-primary transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
