import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.aboutUs": "About Us",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.signIn": "Sign In",
    "nav.startFree": "Start Free",

    // Hero
    "hero.badge": "Trusted by 500+ companies worldwide",
    "hero.title1": "Build tomorrow, today with",
    "hero.title2": "Next Idea Solution",
    "hero.subtitle":
      "Transform your vision into reality with intelligent software built for the modern world. We deliver precision, speed, and elegance in every line of code.",
    "hero.startBuilding": "Start Building",
    "hero.watchDemo": "Watch Demo",
    "hero.trustedBy": "Trusted by companies that build the future",
    "hero.uptime": "Uptime",
    "hero.projects": "Projects",
    "hero.activeUsers": "Active Users",
    "hero.revenue": "Revenue",
    "hero.growth": "Growth",
    "hero.activity": "Activity",

    // About
    "about.subtitle": "About Us",
    "about.title1": "We are",
    "about.title2": "Next Idea Solution",
    "about.description":
      "A passionate team of innovators, developers, and designers dedicated to transforming businesses through cutting-edge technology solutions.",
    "about.mission": "Our Mission",
    "about.missionText":
      "To empower businesses of all sizes with innovative software solutions that drive growth, efficiency, and success in the digital age.",
    "about.vision": "Our Vision",
    "about.visionText":
      "To be the global leader in digital transformation, setting new standards for innovation, quality, and customer satisfaction.",
    "about.yearsExperience": "Years Experience",
    "about.happyClients": "Happy Clients",
    "about.projectsDelivered": "Projects Delivered",
    "about.teamMembers": "Team Members",

    // Features
    "features.subtitle": "Capabilities",
    "features.title1": "What makes Next Idea Solution",
    "features.title2": "different",
    "features.description":
      "We built our platform on three pillars that matter. Uncompromising speed. Learning intelligence. Integrations that just work.",
    "features.ai.title": "AI, Data & Automation",
    "features.ai.description": "AI & Machine Learning Solutions",
    "features.ai.description2": "Chatbot Development",
    "features.ai.description3": "Data Analytics",
    "features.ai.description4": "Business Process Automation",

    "features.analytics.title": "Web & Software Development",
    "features.analytics.description": "Website Design & Development",
    "features.analytics.description2": "E-commerce Website Development",
    "features.analytics.description3": "Custom Software Development",
    "features.analytics.description4": "Web Application Development",
    "features.analytics.description5": "ERP / POS Software Solutions",
    "features.analytics.description6": "SaaS Product Development",
    "features.integration.title": "Mobile App Development",
    "features.integration.description": "Android App Development",
    "features.integration.description2": "iOS App Development",
    "features.integration.description3": "Flutter / React Native Applications",
    "features.integration.description4": "App Maintenance & Update Services",
    "features.performance.title": "UI/UX & Graphic Design",
    "features.performance.description": "UI/UX Design",
    "features.performance.description2": "Logo & Brand Identity Design",
    "features.performance.description3": "Social Media Graphics",
    "features.performance.description4": "Product Design (App & Web)",
    "features.security.title": "Cloud & IT Support",
    "features.security.description": "Cloud Hosting & Management",
    "features.security.description2": "AWS / Google Cloud / Azure Services",
    "features.security.description3": "Domain & Hosting Services",
    "features.security.description4": "Server Maintenance",
    "features.security.description5": "IT Consultancy",
    "features.global.title": "Media & Content",
    "features.global.description": "Video Editing",
    "features.global.description2": "Motion Graphics",
    "features.global.description3": "YouTube & Facebook Video Content",
    "features.digital.title": "Digital Marketing",
    "features.digital.description": "Social Media Marketing (SMM)",
    "features.digital.description2": "Search Engine Optimization (SEO)",
    "features.digital.description3": "Google & Facebook Ads Management",
    "features.digital.description4": "Content Marketing",
    "features.digital.description5": "Email Marketing",
    "features.other.title": "Other Popular Services",
    "features.other.description": "CRM Software",
    "features.other.description2": "API Development & Integration",
    "features.other.description3": "QA & Software Testing",
    "features.other.description4": "Maintenance & Support Services",

    // Platform
    "platform.subtitle": "Platform",
    "platform.title": "Built for how you work",
    "platform.description":
      "Next Idea Solution adapts to your workflow, not the other way around. Three core modules power everything we do.",
    "platform.learn": "Learn",
    "platform.automation": "Automation",
    "platform.analytics": "Analytics",
    "platform.integration": "Integration",
    "platform.automation.title": "Workflows that run themselves",
    "platform.automation.description":
      "Set rules once. Watch them execute flawlessly across your entire operation. No manual intervention. No errors.",
    "platform.analytics.title": "Insights that drive action",
    "platform.analytics.description":
      "Real-time dashboards that tell stories. Predictive models that guide decisions. Data that works for you.",
    "platform.integration.title": "Connect everything seamlessly",
    "platform.integration.description":
      "One platform to rule them all. API-first architecture that plays nice with your existing tools.",
    "platform.discover": "Discover",

    // Portfolio
    "portfolio.subtitle": "Portfolio",
    "portfolio.title1": "Our Latest",
    "portfolio.title2": "Case Studies",
    "portfolio.description":
      "Explore our recent projects and see how we've helped businesses transform their digital presence",
    "portfolio.viewProject": "View Project",

    // Testimonials
    "testimonials.subtitle": "Testimonials",
    "testimonials.title1": "What Our Clients Say",
    "testimonials.title2": "Results From Clients",
    "testimonials.projectsDelivered": "Projects Delivered",
    "testimonials.clientSatisfaction": "Client Satisfaction",
    "testimonials.countriesServed": "Countries Served",
    "testimonials.supportAvailable": "Support Available",

    // Team
    "team.subtitle": "Our Team",
    "team.title1": "Meet the",
    "team.title2": "Experts",
    "team.description":
      "A passionate team of innovators dedicated to bringing your vision to life",

    // Blog
    "blog.subtitle": "Blog",
    "blog.title1": "Latest",
    "blog.title2": "Updates",
    "blog.description": "Insights, tutorials, and news from our team",
    "blog.viewAllPosts": "View All Posts",

    // Pricing
    "pricing.subtitle": "Pricing",
    "pricing.title1": "Simple, transparent",
    "pricing.title2": "pricing",
    "pricing.description":
      "Choose the plan that fits your needs. All plans include our core features. Upgrade or downgrade anytime.",
    "pricing.starter": "Starter",
    "pricing.professional": "Professional",
    "pricing.enterprise": "Enterprise",
    "pricing.mostPopular": "Most Popular",
    "pricing.getStarted": "Get Started",
    "pricing.contactSales": "Contact Sales",
    "pricing.month": "/month",
    "pricing.custom": "Custom",

    // FAQ
    "faq.subtitle": "FAQ",
    "faq.title1": "Frequently Asked",
    "faq.title2": "Questions",
    "faq.description":
      "Find answers to common questions about our services and process",

    // Contact
    "contact.subtitle": "Contact",
    "contact.title1": "Get in",
    "contact.title2": "Touch",
    "contact.description":
      "Ready to start your project? We'd love to hear from you.",
    "contact.info": "Contact Information",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.name": "Name",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.mapComingSoon": "Interactive map coming soon",

    // CTA
    "cta.subtitle": "Get Started",
    "cta.title": "Ready to move faster?",
    "cta.description":
      "Start building with Next Idea Solution today. No credit card required for your trial. Experience the future of software development.",
    "cta.trial": "14-day free trial",
    "cta.noCard": "No credit card required",
    "cta.cancel": "Cancel anytime",
    "cta.fullAccess": "Full feature access",
    "cta.startFree": "Start Free",
    "cta.scheduleDemo": "Schedule Demo",
    "cta.launchTime": "Launch Time",
    "cta.successRate": "Success Rate",

    // Footer
    "footer.description":
      "Building the future of software development. Empowering teams to create, innovate, and scale.",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.resources": "Resources",
    "footer.legal": "Legal",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
  bn: {
    // Navbar
    "nav.aboutUs": "আমাদের সম্পর্কে",
    "nav.services": "সেবাসমূহ",
    "nav.portfolio": "পোর্টফোলিও",
    "nav.pricing": "মূল্য",
    "nav.contact": "যোগাযোগ",
    "nav.signIn": "সাইন ইন",
    "nav.startFree": "বিনামূল্যে শুরু",

    // Hero
    "hero.badge": "৫০০+ কোম্পানি বিশ্বব্যাপী বিশ্বাস করে",
    "hero.title1": "আগামীকাল, আজই তৈরি করুন",
    "hero.title2": "নেক্সট আইডিয়া সলিউশন দিয়ে",
    "hero.subtitle":
      "আধুনিক বিশ্বের জন্য তৈরি বুদ্ধিমান সফটওয়্যারের মাধ্যমে আপনার স্বপ্নকে বাস্তবে রূপান্তর করুন। আমরা প্রতিটি কোডে নির্ভুলতা, গতি এবং সৌন্দর্য সরবরাহ করি।",
    "hero.startBuilding": "বিল্ডিং শুরু করুন",
    "hero.watchDemo": "ডেমো দেখুন",
    "hero.trustedBy": "ভবিষ্যৎ নির্মাতা কোম্পানিদের বিশ্বাস",
    "hero.uptime": "আপটাইম",
    "hero.projects": "প্রকল্প",
    "hero.activeUsers": "সক্রিয় ব্যবহারকারী",
    "hero.revenue": "রাজস্ব",
    "hero.growth": "প্রবৃদ্ধি",
    "hero.activity": "কার্যকলাপ",

    // About
    "about.subtitle": "আমাদের সম্পর্কে",
    "about.title1": "আমরা",
    "about.title2": "নেক্সট আইডিয়া সল্যুশন",
    "about.description":
      "উদ্ভাবক, ডেভেলপার এবং ডিজাইনারদের একটি উৎসাহী দল যারা অত্যাধুনিক প্রযুক্তি সমাধানের মাধ্যমে ব্যবসাকে রূপান্তরিত করতে প্রতিশ্রুতিবদ্ধ।",
    "about.mission": "আমাদের মিশন",
    "about.missionText":
      "ডিজিটাল যুগে প্রবৃদ্ধি, দক্ষতা এবং সাফল্য চালিত করে এমন উদ্ভাবনী সফটওয়্যার সমাধান দিয়ে সব আকারের ব্যবসাকে ক্ষমতায়ন করা।",
    "about.vision": "আমাদের ভিশন",
    "about.visionText":
      "ডিজিটাল রূপান্তরে বিশ্ব নেতা হওয়া, উদ্ভাবন, গুণমান এবং গ্রাহক সন্তুষ্টিতে নতুন মান স্থাপন করা।",
    "about.yearsExperience": "বছরের অভিজ্ঞতা",
    "about.happyClients": "সুখী ক্লায়েন্ট",
    "about.projectsDelivered": "সম্পন্ন প্রকল্প",
    "about.teamMembers": "টিম সদস্য",

    // Features
    "features.subtitle": "সক্ষমতা",
    "features.title1": "নেক্সট আইডিয়া সল্যুশনকে যা করে",
    "features.title2": "আলাদা",
    "features.description":
      "আমরা তিনটি গুরুত্বপূর্ণ স্তম্ভের উপর আমাদের প্ল্যাটফর্ম তৈরি করেছি। আপোষহীন গতি। শেখে এমন বুদ্ধিমত্তা। সহজে কাজ করে এমন ইন্টিগ্রেশন।",
    "features.ai.title": "AI, ডাটা ও অটোমেশন",
    "features.ai.description": "AI ও মেশিন লার্নিং সল্যুশন",
    "features.ai.description2": "চ্যাটবট ডেভেলপমেন্ট",
    "features.ai.description3": "ডাটা অ্যানালিটিক্স",
    "features.ai.description4": "বিজনেস প্রসেস অটোমেশন",
    "features.analytics.title": "ওয়েব ও সফটওয়্যার ডেভেলপমেন্ট",
    "features.analytics.description": "ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট",
    "features.analytics.description2": "ই-কমার্স ওয়েবসাইট ডেভেলপমেন্ট",
    "features.analytics.description3": "কাস্টম সফটওয়্যার ডেভেলপমেন্ট",
    "features.analytics.description4": "ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট",
    "features.analytics.description5": "ERP/POS সফটওয়্যার সল্যুশন",
    "features.analytics.description6": "SaaS প্রোডাক্ট ডেভেলপমেন্ট",
    "features.integration.title": "মোবাইল অ্যাপ ডেভেলপমেন্ট",
    "features.integration.description": "অ্যান্ড্রয়েড অ্যাপ ডেভেলপমেন্ট",
    "features.integration.description2": "iOS অ্যাপ ডেভেলপমেন্ট",
    "features.integration.description3": "ফ্লাটার/রিঅ্যাক্ট নেটিভ অ্যাপ",
    "features.integration.description4": "অ্যাপ মেইনটেন্যান্স ও আপডেট সার্ভিস",
    "features.performance.title": "UI/UX ও গ্রাফিক ডিজাইন",
    "features.performance.description": "UI/UX ডিজাইন",
    "features.performance.description2": "লোগো ও ব্র্যান্ড আইডেন্টিটি ডিজাইন",
    "features.performance.description3": "সোশ্যাল মিডিয়া গ্রাফিক্স",
    "features.performance.description4": "প্রোডাক্ট ডিজাইন (App/Web) ",
    "features.security.title": "ক্লাউড ও আইটি সাপোর্ট",
    "features.security.description": "ক্লাউড হোস্টিং ও ম্যানেজমেন্ট",
    "features.security.description2": "AWS / Google Cloud / Azure সার্ভিস",
    "features.security.description3": "ডোমেইন ও হোস্টিং সার্ভিস",
    "features.security.description4": "সার্ভার মেইনটেন্যান্স",
    "features.security.description5": "আইটি কনসালটেন্সি",
    "features.global.title": "মিডিয়া ও কনটেন্ট",
    "features.global.description": "ভিডিও এডিটিং",
    "features.global.description2": "মোশন গ্রাফিক্স",
    "features.global.description3": "ইউটিউব ও ফেসবুক ভিডিও কনটেন্ট",
    "features.digital.title": "ডিজিটাল মার্কেটিং",
    "features.digital.description": "সোশ্যাল মিডিয়া মার্কেটিং (SMM)",
    "features.digital.description2": "সার্চ ইঞ্জিন অপটিমাইজেশন (SEO)",
    "features.digital.description3": "গুগল ও ফেসবুক অ্যাড ম্যানেজমেন্ট",
    "features.digital.description4": "কনটেন্ট মার্কেটিং",
    "features.digital.description5": "ইমেইল মার্কেটিং",
    "features.other.title": "অন্যান্য জনপ্রিয় সার্ভিস",
    "features.other.description": "CRM সফটওয়্যার",
    "features.other.description2": "API ডেভেলপমেন্ট ও ইন্টিগ্রেশন",
    "features.other.description3": "QA & সফটওয়্যার টেস্টিং",
    "features.other.description4": "মেইনটেন্যান্স ও সাপোর্ট সার্ভিস",

    // Platform
    "platform.subtitle": "প্ল্যাটফর্ম",
    "platform.title": "আপনার কাজের ধরনের জন্য তৈরি",
    "platform.description":
      "নেক্সট আইডিয়া সল্যুশন আপনার কর্মপ্রবাহের সাথে মানিয়ে নেয়। তিনটি মূল মডিউল সবকিছু চালায়।",
    "platform.learn": "শিখুন",
    "platform.automation": "অটোমেশন",
    "platform.analytics": "অ্যানালিটিক্স",
    "platform.integration": "ইন্টিগ্রেশন",
    "platform.automation.title": "নিজে চলে এমন ওয়ার্কফ্লো",
    "platform.automation.description":
      "একবার নিয়ম সেট করুন। আপনার সম্পূর্ণ অপারেশনে নির্ভুলভাবে কাজ হতে দেখুন।",
    "platform.analytics.title": "কার্যকর অন্তর্দৃষ্টি",
    "platform.analytics.description":
      "রিয়েল-টাইম ড্যাশবোর্ড যা গল্প বলে। ভবিষ্যদ্বাণীমূলক মডেল যা সিদ্ধান্ত নির্দেশ করে।",
    "platform.integration.title": "সবকিছু নিরবচ্ছিন্নভাবে সংযুক্ত করুন",
    "platform.integration.description":
      "সব নিয়ন্ত্রণে একটি প্ল্যাটফর্ম। API-প্রথম আর্কিটেকচার।",
    "platform.discover": "আবিষ্কার করুন",

    // Portfolio
    "portfolio.subtitle": "পোর্টফোলিও",
    "portfolio.title1": "আমাদের সাম্প্রতিক",
    "portfolio.title2": "কেস স্টাডি",
    "portfolio.description":
      "আমাদের সাম্প্রতিক প্রকল্পগুলো দেখুন এবং জানুন কীভাবে আমরা ব্যবসাগুলোকে রূপান্তরিত করেছি",
    "portfolio.viewProject": "প্রকল্প দেখুন",

    // Testimonials
    "testimonials.subtitle": "প্রশংসাপত্র",
    "testimonials.title1": "আমাদের ক্লায়েন্টরা কী বলেন",
    "testimonials.title2": "ক্লায়েন্টদের ফলাফল",
    "testimonials.projectsDelivered": "সম্পন্ন প্রকল্প",
    "testimonials.clientSatisfaction": "ক্লায়েন্ট সন্তুষ্টি",
    "testimonials.countriesServed": "সেবা প্রদত্ত দেশ",
    "testimonials.supportAvailable": "সাপোর্ট উপলব্ধ",

    // Team
    "team.subtitle": "আমাদের টিম",
    "team.title1": "বিশেষজ্ঞদের",
    "team.title2": "সাথে পরিচিত হন",
    "team.description":
      "উদ্ভাবকদের একটি উৎসাহী দল যারা আপনার স্বপ্ন বাস্তবায়নে নিবেদিত",

    // Blog
    "blog.subtitle": "ব্লগ",
    "blog.title1": "সর্বশেষ",
    "blog.title2": "আপডেট",
    "blog.description": "আমাদের টিম থেকে অন্তর্দৃষ্টি, টিউটোরিয়াল এবং খবর",
    "blog.viewAllPosts": "সব পোস্ট দেখুন",

    // Pricing
    "pricing.subtitle": "মূল্য",
    "pricing.title1": "সহজ, স্বচ্ছ",
    "pricing.title2": "মূল্য নির্ধারণ",
    "pricing.description":
      "আপনার প্রয়োজন অনুযায়ী প্ল্যান বেছে নিন। সব প্ল্যানে মূল বৈশিষ্ট্য অন্তর্ভুক্ত। যেকোনো সময় আপগ্রেড বা ডাউনগ্রেড করুন।",
    "pricing.starter": "স্টার্টার",
    "pricing.professional": "প্রফেশনাল",
    "pricing.enterprise": "এন্টারপ্রাইজ",
    "pricing.mostPopular": "সবচেয়ে জনপ্রিয়",
    "pricing.getStarted": "শুরু করুন",
    "pricing.contactSales": "সেলস-এ যোগাযোগ",
    "pricing.month": "/মাস",
    "pricing.custom": "কাস্টম",

    // FAQ
    "faq.subtitle": "প্রশ্নোত্তর",
    "faq.title1": "সাধারণ",
    "faq.title2": "প্রশ্নসমূহ",
    "faq.description":
      "আমাদের সেবা এবং প্রক্রিয়া সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন",

    // Contact
    "contact.subtitle": "যোগাযোগ",
    "contact.title1": "আমাদের সাথে",
    "contact.title2": "যোগাযোগ করুন",
    "contact.description":
      "আপনার প্রকল্প শুরু করতে প্রস্তুত? আমরা আপনার কথা শুনতে চাই।",
    "contact.info": "যোগাযোগের তথ্য",
    "contact.email": "ইমেইল",
    "contact.phone": "ফোন",
    "contact.location": "অবস্থান",
    "contact.name": "নাম",
    "contact.subject": "বিষয়",
    "contact.message": "বার্তা",
    "contact.send": "বার্তা পাঠান",
    "contact.sending": "পাঠানো হচ্ছে...",
    "contact.mapComingSoon": "ইন্টারেক্টিভ ম্যাপ শীঘ্রই আসছে",

    // CTA
    "cta.subtitle": "শুরু করুন",
    "cta.title": "দ্রুত এগিয়ে যেতে প্রস্তুত?",
    "cta.description":
      "আজই নেক্সট আইডিয়া সল্যুশন দিয়ে বিল্ডিং শুরু করুন। ট্রায়ালের জন্য ক্রেডিট কার্ড প্রয়োজন নেই।",
    "cta.trial": "১৪ দিনের বিনামূল্যে ট্রায়াল",
    "cta.noCard": "ক্রেডিট কার্ড প্রয়োজন নেই",
    "cta.cancel": "যেকোনো সময় বাতিল করুন",
    "cta.fullAccess": "সম্পূর্ণ ফিচার অ্যাক্সেস",
    "cta.startFree": "বিনামূল্যে শুরু",
    "cta.scheduleDemo": "ডেমো শিডিউল করুন",
    "cta.launchTime": "লঞ্চ টাইম",
    "cta.successRate": "সাফল্যের হার",

    // Footer
    "footer.description":
      "সফটওয়্যার ডেভেলপমেন্টের ভবিষ্যৎ তৈরি করছি। টিমগুলোকে তৈরি, উদ্ভাবন এবং স্কেল করতে ক্ষমতায়ন করছি।",
    "footer.product": "প্রোডাক্ট",
    "footer.company": "কোম্পানি",
    "footer.resources": "রিসোর্স",
    "footer.legal": "আইনি",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত।",
    "footer.privacy": "গোপনীয়তা নীতি",
    "footer.terms": "সেবার শর্তাবলী",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "bn" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
