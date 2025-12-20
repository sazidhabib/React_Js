import { Github, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t, language } = useLanguage();

  const footerLinks = {
    product: [
      { label: language === "bn" ? "বৈশিষ্ট্য" : "Features", href: "#" },
      { label: language === "bn" ? "মূল্য" : "Pricing", href: "#pricing" },
      { label: language === "bn" ? "ইন্টিগ্রেশন" : "Integrations", href: "#" },
      { label: language === "bn" ? "চেঞ্জলগ" : "Changelog", href: "#" },
    ],
    company: [
      {
        label: language === "bn" ? "আমাদের সম্পর্কে" : "About Us",
        href: "#about-us",
      },
      { label: language === "bn" ? "ব্লগ" : "Blog", href: "#" },
      { label: language === "bn" ? "ক্যারিয়ার" : "Careers", href: "#" },
      { label: language === "bn" ? "প্রেস" : "Press", href: "#" },
    ],
    resources: [
      { label: language === "bn" ? "ডকুমেন্টেশন" : "Documentation", href: "#" },
      { label: language === "bn" ? "হেল্প সেন্টার" : "Help Center", href: "#" },
      { label: language === "bn" ? "কমিউনিটি" : "Community", href: "#" },
      { label: language === "bn" ? "যোগাযোগ" : "Contact", href: "#contact" },
    ],
    legal: [
      { label: language === "bn" ? "গোপনীয়তা" : "Privacy", href: "#" },
      { label: language === "bn" ? "শর্তাবলী" : "Terms", href: "#" },
      { label: language === "bn" ? "নিরাপত্তা" : "Security", href: "#" },
      { label: language === "bn" ? "কুকিজ" : "Cookies", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
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

  return (
    <motion.footer
      className="relative border-t border-border/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo & Description */}
          <motion.div className="col-span-2" variants={itemVariants}>
            <span className="text-2xl font-bold gradient-text mb-4 block">
              Next Idea Solution
            </span>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">{t("footer.product")}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">{t("footer.resources")}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4"
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Next Idea Solution.{" "}
            {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <motion.a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              {t("footer.privacy")}
            </motion.a>
            <motion.a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              {t("footer.terms")}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
