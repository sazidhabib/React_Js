import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import FAQItem from "./FAQItem";
import clsx from "clsx";

const FaqSection = () => {
    const faqs = [
        {
            question: "What makes MVPBlocks unique?",
            answer:
                "MVPBlocks stands out through its intuitive design, powerful component library, and seamless integration options. We've focused on creating a user experience that combines simplicity with advanced features, all while maintaining excellent performance and accessibility.",
        },
        {
            question: "How can I customize the components?",
            answer:
                "All components are built with Tailwind CSS, making them highly customizable. You can modify colors, spacing, typography, and more by simply adjusting the class names or using our theme variables to match your brand identity.",
        },
        {
            question: "Do the components work with dark mode?",
            answer:
                "Yes, all MVPBlocks components are designed to work seamlessly with both light and dark modes. They automatically adapt to your site's theme settings, providing a consistent user experience regardless of the user's preference.",
        },
        {
            question: "How can I get started with MVPBlocks?",
            answer:
                "You can get started by browsing our component library and copying the code for the components you need. Our documentation provides clear instructions for installation and usage, and you can always reach out to our support team if you need assistance.",
        },
        {
            question: "Can I use MVPBlocks for commercial projects?",
            answer:
                "Absolutely! MVPBlocks is free to use for both personal and commercial projects. There are no licensing fees or attribution requirements—just build and launch your MVP faster than ever before.",
        },
    ];

    return (
        <section className="bg-white w-full overflow-hidden py-16 relative">
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
                        Everything you need to know about MVPBlocks
                    </p>
                </motion.div>

                <div className="mx-auto max-w-2xl space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mx-auto mt-12 max-w-md rounded-lg p-6 text-center"
                >
                    <div className="bg-blue-100 text-blue-600 mb-4 inline-flex items-center justify-center rounded-full p-2">
                        <Mail className="h-4 w-4" />
                    </div>
                    <p className="text-black mb-1 text-sm font-medium">Still have questions?</p>
                    <p className="text-gray-500 mb-4 text-xs">We're here to help you</p>
                    <button
                        type="button"
                        className={clsx(
                            "rounded-md px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors duration-200"
                        )}
                    >
                        Contact Support
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default FaqSection;
