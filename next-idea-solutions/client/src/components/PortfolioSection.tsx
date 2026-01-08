import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const projects = [
  {
    title: "E-Commerce Platform",
    titleBn: "ই-কমার্স প্ল্যাটফর্ম",
    category: "Web Development",
    categoryBn: "ওয়েব ডেভেলপমেন্ট",
    description:
      "A scalable e-commerce solution with real-time inventory management and AI-powered recommendations.",
    descriptionBn:
      "রিয়েল-টাইম ইনভেন্টরি ম্যানেজমেন্ট এবং AI-চালিত সুপারিশ সহ একটি স্কেলেবল ই-কমার্স সমাধান।",
    image:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=400&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL"],
    color: "from-primary/20 to-accent/20",
  },
  {
    title: "FinTech Dashboard",
    titleBn: "ফিনটেক ড্যাশবোর্ড",
    category: "Financial Technology",
    categoryBn: "আর্থিক প্রযুক্তি",
    description:
      "Comprehensive financial analytics dashboard with real-time market data and predictive insights.",
    descriptionBn:
      "রিয়েল-টাইম মার্কেট ডেটা এবং প্রেডিক্টিভ ইনসাইট সহ বিস্তৃত আর্থিক অ্যানালিটিক্স ড্যাশবোর্ড।",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["TypeScript", "D3.js", "AWS"],
    color: "from-accent/20 to-primary/20",
  },
  {
    title: "Healthcare App",
    titleBn: "হেলথকেয়ার অ্যাপ",
    category: "Mobile Development",
    categoryBn: "মোবাইল ডেভেলপমেন্ট",
    description:
      "Patient management system with telemedicine capabilities and secure health records.",
    descriptionBn:
      "টেলিমেডিসিন সুবিধা এবং নিরাপদ স্বাস্থ্য রেকর্ড সহ রোগী ব্যবস্থাপনা সিস্টেম।",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    tags: ["React Native", "HIPAA", "Firebase"],
    color: "from-primary/20 to-accent/20",
  },
  {
    title: "AI Content Platform",
    titleBn: "AI কন্টেন্ট প্ল্যাটফর্ম",
    category: "Artificial Intelligence",
    categoryBn: "কৃত্রিম বুদ্ধিমত্তা",
    description:
      "Content generation platform powered by advanced AI models for marketing automation.",
    descriptionBn:
      "মার্কেটিং অটোমেশনের জন্য উন্নত AI মডেল দ্বারা চালিত কন্টেন্ট জেনারেশন প্ল্যাটফর্ম।",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    tags: ["Python", "OpenAI", "FastAPI"],
    color: "from-accent/20 to-primary/20",
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

const PortfolioSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            {t("portfolio.subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            {t("portfolio.title1")}{" "}
            <span className="gradient-text">{t("portfolio.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("portfolio.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-56 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`}
                />
                <img
                  src={project.image}
                  alt={language === "bn" ? project.titleBn : project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-primary">
                    {language === "bn" ? project.categoryBn : project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {language === "bn" ? project.titleBn : project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {language === "bn"
                    ? project.descriptionBn
                    : project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("portfolio.viewProject")}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PortfolioSection;
