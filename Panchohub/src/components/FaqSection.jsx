import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import FAQItem from "./FAQItem";
import clsx from "clsx";

const FaqSection = () => {
    // Define animation variants
    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const faqs = [
        {
            question: "পঞ্চহাব কি?",
            answer:
                "এটি একটি অ্যাপ | এই অ্যাপের মাধ্যমে পঞ্চগড় জেলার মানুষ নিজ জেলার তথ্য, যোগাযোগ, জরুরি নম্বর, চাকরির খবর, বাস-ট্রেনের সময়সূচি, রক্তদাতা খোঁজা, ঘর-বাড়ি ভাড়া এবং কেনা-বেচা, শিক্ষা ও স্বাস্থ্যসেবা সংক্রান্ত সহায়তা ইত্যাদি পাবে একদম সহজে।",
        },
        {
            question: "আমাদের সেবা সমূহ কি কি?",
            answer:
                "ডিজিটাল সেবা সমূহ: 🩺 ডাক্তারদের তথ্য(চেম্বার টাইম, নাম্বার) 🩸 রক্তদাতা খোঁজা(গ্রুপ ও অবস্থান অনুযায়ী)🏢 সরকারি অফিস ও কর্মকর্তা তথ্য 🏞️ দর্শনীয় স্থান, হোটেল, খাবারের দোকান ও ম্যাপ 🚑 হাসপাতাল, ক্লিনিক, অ্যাম্বুলেন্স ও টেলিমেডিসিন 🌾 আবহাওয়া ও কৃষি গাইডলাইন 💼 চাকরি, ইভেন্ট, ও ছোট ব্যবসা তথ্য 🛣️ বাস ও ট্রেন টাইমটেবিল 🏠 বাসা, ফ্ল্যাট ও জমি ভাড়া এবং ক্রয় - বিক্রয় 🛍️ নতুন ও পুরাতন পণ্যের ক্রয় - বিক্রয় 🚒 ফায়ার সার্ভিস অফিসের তথ্য 📦 কুরিয়ার সার্ভিস ও ডেলিভারি তথ্য 👮 থানা ও পুলিশ স্টেশনের তথ্য 🌐 পঞ্চগড়ের সরকারি ও সামাজিক ওয়েবসাইট লিংক 🔌 বিদ্যুৎ অফিসের ঠিকানা ও কাস্টমার সাপোর্ট 🏨 হোটেল ও রেস্টুরেন্ট বুকিং সুবিধা 🚗 গাড়ি ভাড়া সুবিধা 🔧 মেকানিক খোঁজা(বাইক / গাড়ি) 👩‍🏫 টিউটর খোঁজা 💇 সেলুন ও পার্লার সার্ভিস 🌱 নার্সারি ও গাছপালা সংক্রান্ত তথ্য |",
        },
        {
            question: "আমাদের উদেশ্য  কি?",
            answer:
                "প্রযুক্তির মাধ্যমে পঞ্চগড়কে বিশ্বে তুলে ধরা এবং জেলা ও গ্রামের মানুষের জীবনকে সহজতর করা। আমরা চাই কেউ যেন নিজের জেলা থেকে বিচ্ছিন্ন না থাকে। আমরা প্রতিটি থানা, গ্রাম ও ইউনিয়নের খবর ও তথ্য তুলে ধরবো।",
        },
    ];

    return (
        <section id="about" className="bg-white w-full overflow-hidden py-16 relative">
            {/* Decorative elements */}
            <div className="bg-blue-100 absolute top-20 -left-20 h-64 w-64 rounded-full blur-3xl" />
            <div className="bg-pink-100 absolute -right-20 bottom-20 h-64 w-64 rounded-full blur-3xl" />

            <div className="relative container mx-auto max-w-6xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mx-auto mb-12 max-w-2xl text-center"
                >
                    <div className="inline-block border px-3 py-1 text-xs font-medium uppercase tracking-wider text-blue-600 border-blue-600 rounded">
                        FAQs
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-rose-400 text-transparent bg-clip-text mt-3 mb-2">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-gray-500">
                        Everything you need to know about PanchoHub
                    </p>
                </motion.div>

                <div className="mx-auto max-w-2xl space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mx-auto mt-12 max-w-md rounded-lg p-6 text-center"
                >
                    <div className="bg-blue-100 text-blue-600 mb-4 inline-flex items-center justify-center rounded-full p-2">
                        <Mail className="h-4 w-4" />
                    </div>
                    <p className="text-black mb-1 text-sm font-medium">Still have questions?</p>
                    <p className="text-gray-500 mb-4 text-xs">We're here to help you</p>
                    <motion.a
                        href="mailto:support@panchohub.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition-all hover:bg-blue-700 hover:shadow-md"
                    >
                        <Mail className="h-5 w-5" />
                        Contact Support
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default FaqSection;