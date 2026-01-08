import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const faqs = [
  {
    question: "How quickly can I launch my project?",
    questionBn: "আমার প্রকল্প কত দ্রুত লঞ্চ করতে পারি?",
    answer:
      "Most projects can be launched within 2-4 weeks depending on complexity. Our streamlined process and experienced team ensure rapid deployment without compromising quality.",
    answerBn:
      "বেশিরভাগ প্রকল্প জটিলতার উপর নির্ভর করে ২-৪ সপ্তাহের মধ্যে লঞ্চ করা যায়। আমাদের সুবিন্যস্ত প্রক্রিয়া এবং অভিজ্ঞ টিম গুণমানে আপোষ না করে দ্রুত ডিপ্লয়মেন্ট নিশ্চিত করে।",
  },
  {
    question: "What technologies do you use?",
    questionBn: "আপনারা কোন প্রযুক্তি ব্যবহার করেন?",
    answer:
      "We use cutting-edge technologies including React, TypeScript, Node.js, and cloud platforms like AWS and Google Cloud. Our tech stack is always evolving to incorporate the best tools available.",
    answerBn:
      "আমরা React, TypeScript, Node.js এবং AWS ও Google Cloud-এর মতো ক্লাউড প্ল্যাটফর্ম সহ অত্যাধুনিক প্রযুক্তি ব্যবহার করি।",
  },
  {
    question: "Do you provide ongoing support?",
    questionBn: "আপনারা কি চলমান সাপোর্ট প্রদান করেন?",
    answer:
      "Yes! We offer comprehensive maintenance and support packages. Our team is available 24/7 for critical issues and provides regular updates and improvements.",
    answerBn:
      "হ্যাঁ! আমরা ব্যাপক রক্ষণাবেক্ষণ এবং সাপোর্ট প্যাকেজ অফার করি। আমাদের টিম জরুরি সমস্যার জন্য ২৪/৭ উপলব্ধ।",
  },
  {
    question: "Can you integrate with existing systems?",
    questionBn: "আপনারা কি বিদ্যমান সিস্টেমের সাথে ইন্টিগ্রেট করতে পারেন?",
    answer:
      "Absolutely. We specialize in seamless integrations with existing databases, APIs, and third-party services. Our solutions are designed to work harmoniously with your current infrastructure.",
    answerBn:
      "অবশ্যই। আমরা বিদ্যমান ডেটাবেস, API এবং তৃতীয়-পক্ষ সেবার সাথে নিরবচ্ছিন্ন ইন্টিগ্রেশনে বিশেষজ্ঞ।",
  },
  {
    question: "What's your pricing model?",
    questionBn: "আপনাদের মূল্য নির্ধারণ মডেল কী?",
    answer:
      "We offer flexible pricing options including project-based, retainer, and subscription models. Contact us for a custom quote tailored to your specific needs and budget.",
    answerBn:
      "আমরা প্রকল্প-ভিত্তিক, রিটেইনার এবং সাবস্ক্রিপশন মডেল সহ নমনীয় মূল্য নির্ধারণ অপশন অফার করি।",
  },
  {
    question: "How do you ensure data security?",
    questionBn: "আপনারা কীভাবে ডেটা নিরাপত্তা নিশ্চিত করেন?",
    answer:
      "Security is our top priority. We implement industry-standard encryption, regular security audits, GDPR compliance, and follow best practices for data protection.",
    answerBn:
      "নিরাপত্তা আমাদের শীর্ষ অগ্রাধিকার। আমরা শিল্প-মানের এনক্রিপশন, নিয়মিত নিরাপত্তা অডিট, GDPR কমপ্লায়েন্স বাস্তবায়ন করি।",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t, language } = useLanguage();

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            {t("faq.subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            {t("faq.title1")}{" "}
            <span className="gradient-text">{t("faq.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("faq.description")}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl overflow-hidden"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
                whileHover={{ x: 5 }}
              >
                <span className="font-semibold text-foreground">
                  {language === "bn" ? faq.questionBn : faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-muted-foreground">
                      {language === "bn" ? faq.answerBn : faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQSection;
