import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechVentures",
    roleBn: "সিটিও, টেকভেঞ্চার্স",
    avatar: "SC",
    rating: 5,
    text: "Next Idea Solution transformed our entire development pipeline. What used to take weeks now happens in days. The automation capabilities are unmatched in the industry.",
    textBn:
      "নেক্সট আইডিয়া সল্যুশন আমাদের সম্পূর্ণ ডেভেলপমেন্ট পাইপলাইন রূপান্তরিত করেছে। যা সপ্তাহ লাগতো তা এখন দিনে হয়ে যায়।",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Engineering, DataFlow",
    roleBn: "ইঞ্জিনিয়ারিং প্রধান, ডেটাফ্লো",
    avatar: "MJ",
    rating: 5,
    text: "The real-time analytics changed how we make decisions. We're no longer reactive—we're predictive. Our team efficiency increased by 40% in just three months.",
    textBn:
      "রিয়েল-টাইম অ্যানালিটিক্স আমাদের সিদ্ধান্ত নেওয়ার পদ্ধতি বদলে দিয়েছে। আমরা এখন প্রেডিক্টিভ। তিন মাসে টিম দক্ষতা ৪০% বেড়েছে।",
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Operations, CloudScale",
    roleBn: "অপারেশন ভিপি, ক্লাউডস্কেল",
    avatar: "ER",
    rating: 5,
    text: "Integration was seamless. We connected 50+ tools in our stack without a single hiccup. The support team is phenomenal—they truly understand enterprise needs.",
    textBn:
      "ইন্টিগ্রেশন নিরবচ্ছিন্ন ছিল। আমরা আমাদের স্ট্যাকে ৫০+ টুল কোনো সমস্যা ছাড়াই সংযুক্ত করেছি।",
  },
  {
    name: "David Park",
    role: "Founder, InnovateLab",
    roleBn: "প্রতিষ্ঠাতা, ইনোভেটল্যাব",
    avatar: "DP",
    rating: 5,
    text: "As a startup, we needed to move fast without breaking things. Next Idea Solution gave us enterprise-grade infrastructure with startup-friendly simplicity.",
    textBn:
      "স্টার্টআপ হিসেবে, আমাদের দ্রুত এগিয়ে যেতে হয়েছিল। নেক্সট আইডিয়া সল্যুশন আমাদের এন্টারপ্রাইজ-গ্রেড ইনফ্রাস্ট্রাকচার দিয়েছে।",
  },
];

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

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, language } = useLanguage();

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute left-0 top-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

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
            {t("testimonials.subtitle")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t("testimonials.title1")}
            <br />
            <span className="gradient-text">{t("testimonials.title2")}</span>
          </h2>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {/* Main Testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="glass-strong rounded-2xl p-8 md:p-12 text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                "
                {language === "bn"
                  ? testimonials[currentIndex].textBn
                  : testimonials[currentIndex].text}
                "
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "bn"
                      ? testimonials[currentIndex].roleBn
                      : testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 md:mt-24"
          variants={containerVariants}
        >
          {[
            { value: "500+", label: t("testimonials.projectsDelivered") },
            { value: "98%", label: t("testimonials.clientSatisfaction") },
            { value: "50+", label: t("testimonials.countriesServed") },
            { value: "24/7", label: t("testimonials.supportAvailable") },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
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

export default TestimonialsSection;
