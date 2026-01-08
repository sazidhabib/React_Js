import { useState } from "react";
import {
  ArrowRight,
  Bot,
  LineChart,
  Link2,
  Workflow,
  Plug,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const PlatformSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("automation");

  const tabs = [
    {
      id: "automation",
      label: t("platform.automation"),
      icon: Bot,
      title: t("platform.automation.title"),
      description: t("platform.automation.description"),
      features: [
        "Smart task routing",
        "Event-driven triggers",
        "Custom workflow builder",
      ],
    },
    {
      id: "analytics",
      label: t("platform.analytics"),
      icon: LineChart,
      title: t("platform.analytics.title"),
      description: t("platform.analytics.description"),
      features: ["Live monitoring", "Predictive analytics", "Custom reports"],
    },
    {
      id: "integration",
      label: t("platform.integration"),
      icon: Link2,
      title: t("platform.integration.title"),
      description: t("platform.integration.description"),
      features: [
        "500+ integrations",
        "Custom API builder",
        "Webhook automation",
      ],
    },
  ];

  const activeContent = tabs.find((tab) => tab.id === activeTab);

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
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <motion.div
        className="absolute right-0 top-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {t("platform.subtitle")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t("platform.title")}
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
            {t("platform.description")}
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90">
              {t("platform.learn")}
            </Button>
            <Button variant="ghost" className="group">
              Arrow{" "}
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          variants={itemVariants}
        >
          <div className="inline-flex glass rounded-full p-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div className="order-2 lg:order-1" variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                  {activeContent?.label}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  {activeContent?.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {activeContent?.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {activeContent?.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  <Button variant="outline" className="glass">
                    {t("platform.discover")}
                  </Button>
                  <Button variant="ghost" className="group">
                    Arrow{" "}
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Visual - Dashboard/Software Image */}
          <motion.div className="order-1 lg:order-2" variants={itemVariants}>
            <div className="relative">
              <motion.div
                className="glass-strong rounded-2xl p-6 glow-primary"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-card via-muted to-card overflow-hidden relative">
                  {/* Platform Dashboard Mockup */}
                  <div className="absolute inset-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          {activeContent && (
                            <activeContent.icon className="w-4 h-4 text-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {activeContent?.label} Hub
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-chart-2" />
                        <div className="w-2 h-2 rounded-full bg-chart-3" />
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                    </div>

                    {/* Content based on active tab */}
                    <AnimatePresence mode="wait">
                      {activeTab === "automation" && (
                        <motion.div
                          key="automation"
                          className="space-y-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Workflow Visualization */}
                          <div className="flex items-center justify-between gap-2">
                            {[Workflow, ArrowRight, Bot, ArrowRight, Plug].map(
                              (Icon, i) => (
                                <motion.div
                                  key={i}
                                  className={`${
                                    i % 2 === 0
                                      ? "w-12 h-12 rounded-xl glass flex items-center justify-center"
                                      : ""
                                  }`}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <Icon
                                    className={`${
                                      i % 2 === 0
                                        ? "w-5 h-5 text-primary"
                                        : "w-4 h-4 text-muted-foreground"
                                    }`}
                                  />
                                </motion.div>
                              )
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-4">
                            {[
                              "Active Workflows",
                              "Tasks Today",
                              "Success Rate",
                              "Time Saved",
                            ].map((label, i) => (
                              <motion.div
                                key={i}
                                className="glass rounded-lg p-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                              >
                                <p className="text-xs text-muted-foreground">
                                  {label}
                                </p>
                                <p className="text-lg font-bold gradient-text">
                                  {["24", "156", "99.8%", "12h"][i]}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "analytics" && (
                        <motion.div
                          key="analytics"
                          className="space-y-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Chart Visualization */}
                          <div className="glass rounded-lg p-3">
                            <div className="flex items-end justify-between h-24 gap-1">
                              {[
                                30, 50, 40, 70, 55, 85, 65, 90, 75, 95, 80, 88,
                              ].map((h, i) => (
                                <motion.div
                                  key={i}
                                  className="flex-1 rounded-t bg-gradient-to-t from-primary to-accent"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${h}%` }}
                                  transition={{
                                    delay: i * 0.05,
                                    duration: 0.5,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: "Visitors", value: "45.2K" },
                              { label: "Revenue", value: "$128K" },
                              { label: "Growth", value: "+34%" },
                            ].map((stat, i) => (
                              <motion.div
                                key={i}
                                className="glass rounded-lg p-2 text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                              >
                                <p className="text-xs text-muted-foreground">
                                  {stat.label}
                                </p>
                                <p className="text-sm font-bold gradient-text">
                                  {stat.value}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "integration" && (
                        <motion.div
                          key="integration"
                          className="space-y-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Integration Grid */}
                          <div className="grid grid-cols-4 gap-2">
                            {["S", "G", "M", "A", "N", "Z", "H", "D"].map(
                              (letter, i) => (
                                <motion.div
                                  key={i}
                                  className="aspect-square glass rounded-lg flex items-center justify-center text-lg font-bold text-primary"
                                  initial={{ scale: 0, rotate: -10 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                >
                                  {letter}
                                </motion.div>
                              )
                            )}
                          </div>
                          <motion.div
                            className="glass rounded-lg p-3 flex items-center justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <span className="text-sm">Connected Apps</span>
                            <span className="text-lg font-bold gradient-text">
                              42
                            </span>
                          </motion.div>
                          <motion.div
                            className="glass rounded-lg p-3 flex items-center justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <span className="text-sm">API Calls Today</span>
                            <span className="text-lg font-bold gradient-text">
                              12.4K
                            </span>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-12 h-12 rounded-xl glass border border-primary/20"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full glass border border-accent/20"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default PlatformSection;
