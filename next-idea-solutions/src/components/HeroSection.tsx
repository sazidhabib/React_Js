import {
  ArrowRight,
  Play,
  Zap,
  Shield,
  Globe,
  Cpu,
  Database,
  Cloud,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-0">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-8"
          variants={itemVariants}
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          variants={itemVariants}
        >
          {t("hero.title1")}
          <br />
          <span className="gradient-text">{t("hero.title2")}</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10"
          variants={itemVariants}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          variants={itemVariants}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 glow-primary text-lg px-8 py-6 group"
          >
            {t("hero.startBuilding")}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 group glass"
          >
            <Play className="mr-2 w-5 h-5" />
            {t("hero.watchDemo")}
          </Button>
        </motion.div>

        {/* 3D Tech Dashboard Illustration */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <div className="relative glass-strong rounded-2xl p-4 md:p-8 glow-primary">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-card via-muted to-card overflow-hidden relative">
              {/* Dashboard Mockup */}
              <div className="absolute inset-4 md:inset-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-chart-3/60" />
                    <div className="w-3 h-3 rounded-full bg-chart-2/60" />
                  </div>
                  <div className="flex-1 max-w-xs mx-4 h-6 rounded-lg glass" />
                  <div className="w-8 h-8 rounded-lg glass" />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-3 md:gap-4 h-[calc(100%-60px)]">
                  {/* Sidebar */}
                  <div className="col-span-2 glass rounded-xl p-2 md:p-3 space-y-3">
                    {[Zap, Shield, Globe, Database].map((Icon, i) => (
                      <motion.div
                        key={i}
                        className={`p-2 rounded-lg ${
                          i === 0 ? "bg-primary/30" : "hover:bg-primary/10"
                        } transition-colors`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Main Area */}
                  <div className="col-span-7 space-y-3 md:space-y-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      {[
                        {
                          label: t("hero.activeUsers"),
                          value: "12.4K",
                          color: "from-primary to-accent",
                        },
                        {
                          label: t("hero.revenue"),
                          value: "$84K",
                          color: "from-chart-2 to-chart-4",
                        },
                        {
                          label: t("hero.growth"),
                          value: "+24%",
                          color: "from-chart-3 to-chart-1",
                        },
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          className="glass rounded-xl p-2 md:p-3"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <p className="text-[10px] md:text-xs text-muted-foreground">
                            {stat.label}
                          </p>
                          <p
                            className={`text-sm md:text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                          >
                            {stat.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Chart Area */}
                    <div className="glass rounded-xl p-3 md:p-4 flex-1">
                      <div className="flex items-end justify-between h-20 md:h-32 gap-1 md:gap-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                          (height, i) => (
                            <motion.div
                              key={i}
                              className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/80 to-accent/60"
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{
                                delay: 0.8 + i * 0.05,
                                duration: 0.5,
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Panel */}
                  <div className="col-span-3 glass rounded-xl p-2 md:p-3 space-y-2 md:space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Cloud className="w-4 h-4 text-primary" />
                      <span className="text-[10px] md:text-xs font-medium">
                        {t("hero.activity")}
                      </span>
                    </div>
                    {[1, 2, 3, 4].map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                      >
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/40" />
                        <div className="flex-1 space-y-1">
                          <div className="h-2 bg-muted rounded w-3/4" />
                          <div className="h-1.5 bg-muted/50 rounded w-1/2" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Accent Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl float-animation" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl float-animation-delayed" />
            </div>
          </div>

          {/* Floating Stats Cards */}
          <motion.div
            className="absolute -left-4 top-1/4 hidden lg:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="glass-strong rounded-xl p-4 float-animation border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-4 h-4 text-primary" />
                <p className="text-2xl font-bold gradient-text">99.9%</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("hero.uptime")}
              </p>
            </div>
          </motion.div>
          <motion.div
            className="absolute -right-4 bottom-1/4 hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div className="glass-strong rounded-xl p-4 float-animation-delayed border border-accent/20">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-accent-foreground" />
                <p className="text-2xl font-bold gradient-text">500+</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("hero.projects")}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Logos - Infinite Scroll Marquee */}
        <motion.div
          className="mt-16 md:mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground mb-8">
            {t("hero.trustedBy")}
          </p>
          <div className="relative overflow-hidden">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex animate-marquee">
              {[...Array(2)].map((_, setIndex) => (
                <div
                  key={setIndex}
                  className="flex items-center gap-12 md:gap-16 px-6 py-6"
                >
                  {[
                    { name: "Microsoft", icon: "⬜" },
                    { name: "Google", icon: "🔴🟡🟢🔵" },
                    { name: "Amazon", icon: "📦" },
                    { name: "Meta", icon: "∞" },
                    { name: "Apple", icon: "🍎" },
                    { name: "Netflix", icon: "🎬" },
                    { name: "Spotify", icon: "🎵" },
                    { name: "Slack", icon: "#" },
                  ].map((company) => (
                    <div
                      key={`${setIndex}-${company.name}`}
                      className="flex items-center gap-3 text-muted-foreground/60 hover:text-muted-foreground transition-colors whitespace-nowrap"
                    >
                      <span className="text-2xl">{company.icon}</span>
                      <span className="text-lg md:text-xl font-semibold">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
