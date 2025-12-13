import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "How quickly can I launch my project?",
        answer: "Most projects can be launched within 2-4 weeks depending on complexity. Our streamlined process and experienced team ensure rapid deployment without compromising quality."
    },
    {
        question: "What technologies do you use?",
        answer: "We use cutting-edge technologies including React, TypeScript, Node.js, and cloud platforms like AWS and Google Cloud. Our tech stack is always evolving to incorporate the best tools available."
    },
    {
        question: "Do you provide ongoing support?",
        answer: "Yes! We offer comprehensive maintenance and support packages. Our team is available 24/7 for critical issues and provides regular updates and improvements."
    },
    {
        question: "Can you integrate with existing systems?",
        answer: "Absolutely. We specialize in seamless integrations with existing databases, APIs, and third-party services. Our solutions are designed to work harmoniously with your current infrastructure."
    },
    {
        question: "What's your pricing model?",
        answer: "We offer flexible pricing options including project-based, retainer, and subscription models. Contact us for a custom quote tailored to your specific needs and budget."
    },
    {
        question: "How do you ensure data security?",
        answer: "Security is our top priority. We implement industry-standard encryption, regular security audits, GDPR compliance, and follow best practices for data protection."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-medium tracking-wider uppercase">FAQ</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                        Frequently Asked{' '}
                        <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Find answers to common questions about our services and process
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="glass rounded-xl overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
                            >
                                <span className="font-semibold text-foreground">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="px-6 pb-5 text-muted-foreground">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
