import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const posts = [
  {
    title: "The Future of AI in Web Development",
    titleBn: "ওয়েব ডেভেলপমেন্টে AI-এর ভবিষ্যৎ",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing the way we build and maintain web applications.",
    excerptBn:
      "কৃত্রিম বুদ্ধিমত্তা কীভাবে ওয়েব অ্যাপ্লিকেশন তৈরি এবং রক্ষণাবেক্ষণের পদ্ধতি বদলে দিচ্ছে তার অন্বেষণ।",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
    category: "Technology",
    categoryBn: "প্রযুক্তি",
    date: "Dec 10, 2024",
    dateBn: "১০ ডিসেম্বর, ২০২৪",
    readTime: "5 min read",
    readTimeBn: "৫ মিনিট পড়া",
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face",
    },
  },
  {
    title: "Building Scalable Systems: Best Practices",
    titleBn: "স্কেলেবল সিস্টেম তৈরি: সেরা অভ্যাস",
    excerpt:
      "Learn the key principles and patterns for designing systems that can grow with your business.",
    excerptBn:
      "আপনার ব্যবসার সাথে বড় হতে পারে এমন সিস্টেম ডিজাইনের মূল নীতি এবং প্যাটার্ন শিখুন।",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop",
    category: "Engineering",
    categoryBn: "ইঞ্জিনিয়ারিং",
    date: "Dec 8, 2024",
    dateBn: "৮ ডিসেম্বর, ২০২৪",
    readTime: "8 min read",
    readTimeBn: "৮ মিনিট পড়া",
    author: {
      name: "Marcus Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
  },
  {
    title: "Design Trends to Watch in 2025",
    titleBn: "২০২৫-এ দেখার মতো ডিজাইন ট্রেন্ড",
    excerpt:
      "A comprehensive look at the emerging design trends that will shape the digital landscape.",
    excerptBn:
      "ডিজিটাল ল্যান্ডস্কেপ গঠন করবে এমন উদীয়মান ডিজাইন ট্রেন্ডগুলোর বিস্তৃত দৃষ্টিভঙ্গি।",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=300&fit=crop",
    category: "Design",
    categoryBn: "ডিজাইন",
    date: "Dec 5, 2024",
    dateBn: "৫ ডিসেম্বর, ২০২৪",
    readTime: "6 min read",
    readTimeBn: "৬ মিনিট পড়া",
    author: {
      name: "Emily Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face",
    },
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

const BlogSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="blog" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
          variants={itemVariants}
        >
          <div>
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              {t("blog.subtitle")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              {t("blog.title1")}{" "}
              <span className="gradient-text">{t("blog.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              {t("blog.description")}
            </p>
          </div>
          <motion.div whileHover={{ x: 5 }}>
            <Button variant="outline" className="mt-6 md:mt-0">
              {t("blog.viewAllPosts")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              className="group glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={language === "bn" ? post.titleBn : post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium">
                  {language === "bn" ? post.categoryBn : post.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {language === "bn" ? post.dateBn : post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {language === "bn" ? post.readTimeBn : post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {language === "bn" ? post.titleBn : post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {language === "bn" ? post.excerptBn : post.excerpt}
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">
                    {post.author.name}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BlogSection;
