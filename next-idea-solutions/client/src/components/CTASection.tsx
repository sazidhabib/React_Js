import { ArrowRight, Rocket, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const CTASection = () => {
  const { t } = useLanguage();

  const benefits = [
    t("cta.trial"),
    t("cta.noCard"),
    t("cta.cancel"),
    t("cta.fullAccess"),
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Visual */}
          <motion.div className="relative" variants={itemVariants}>
            <motion.div
              className="glass-strong rounded-2xl p-6 glow-primary"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-card via-muted to-card overflow-hidden relative">
                {/* Rocket Launch Visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Central Rocket */}
                    <motion.div
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-16 h-16 rounded-full glass border border-primary/50 flex items-center justify-center">
                        <Rocket className="w-8 h-8 text-primary" />
                      </div>
                    </motion.div>

                    {/* Orbiting Elements */}
                    <motion.div
                      className="absolute -top-8 -right-8 w-12 h-12 rounded-xl glass flex items-center justify-center"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-accent" />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-6 -left-10 w-10 h-10 rounded-full glass flex items-center justify-center"
                      animate={{ y: [0, 10, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    >
                      <Check className="w-4 h-4 text-chart-2" />
                    </motion.div>
                  </div>
                </div>

                {/* Speed Lines */}
                <motion.div
                  className="absolute top-1/4 left-4 w-16 h-1 bg-gradient-to-r from-primary/60 to-transparent rounded-full"
                  animate={{ scaleX: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/3 left-8 w-12 h-0.5 bg-gradient-to-r from-accent/40 to-transparent rounded-full"
                  animate={{ scaleX: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-1/3 left-6 w-20 h-0.5 bg-gradient-to-r from-primary/50 to-transparent rounded-full"
                  animate={{ scaleX: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
                />

                {/* Stats Cards */}
                <motion.div
                  className="absolute top-4 left-4 glass rounded-lg px-3 py-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs text-muted-foreground">
                    {t("cta.launchTime")}
                  </p>
                  <p className="text-sm font-bold gradient-text">2 mins</p>
                </motion.div>
                <motion.div
                  className="absolute bottom-4 right-4 glass rounded-lg px-3 py-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-xs text-muted-foreground">
                    {t("cta.successRate")}
                  </p>
                  <p className="text-sm font-bold gradient-text">99.9%</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative blurs */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={itemVariants}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              {t("cta.subtitle")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              {t("cta.description")}
            </p>

            {/* Benefits */}
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 glow-primary text-lg px-8 py-6 group"
                >
                  {t("cta.startFree")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 glass"
                >
                  {t("cta.scheduleDemo")}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
