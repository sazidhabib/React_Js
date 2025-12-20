import { Linkedin, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    roleBn: "সিইও এবং প্রতিষ্ঠাতা",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    bio: "10+ years leading tech startups",
    bioBn: "১০+ বছর টেক স্টার্টআপ নেতৃত্ব",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Marcus Johnson",
    role: "CTO",
    roleBn: "সিটিও",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "Former Google engineer, AI specialist",
    bioBn: "প্রাক্তন গুগল ইঞ্জিনিয়ার, AI বিশেষজ্ঞ",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Design",
    roleBn: "ডিজাইন প্রধান",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    bio: "Award-winning UX designer",
    bioBn: "পুরস্কারপ্রাপ্ত UX ডিজাইনার",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    roleBn: "লিড ডেভেলপার",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "Full-stack expert, open source contributor",
    bioBn: "ফুল-স্ট্যাক বিশেষজ্ঞ, ওপেন সোর্স অবদানকারী",
    social: { linkedin: "#", twitter: "#", github: "#" },
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

const TeamSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="team" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            {t("team.subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            {t("team.title1")}{" "}
            <span className="gradient-text">{t("team.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("team.description")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="group text-center"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="relative mb-6 mx-auto w-48 h-48">
                {/* Gradient ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent p-1 group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <div className="w-full h-full rounded-full bg-background p-1">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Social overlay */}
                <div className="absolute inset-0 rounded-full bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a
                    href={member.social.linkedin}
                    className="text-primary-foreground hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={member.social.twitter}
                    className="text-primary-foreground hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={member.social.github}
                    className="text-primary-foreground hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-medium text-sm mb-2">
                {language === "bn" ? member.roleBn : member.role}
              </p>
              <p className="text-muted-foreground text-sm">
                {language === "bn" ? member.bioBn : member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TeamSection;
