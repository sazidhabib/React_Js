import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'CTO, TechVentures',
        avatar: 'SC',
        rating: 5,
        text: "Next Idea Solution transformed our entire development pipeline. What used to take weeks now happens in days. The automation capabilities are unmatched in the industry.",
    },
    {
        name: 'Marcus Johnson',
        role: 'Head of Engineering, DataFlow',
        avatar: 'MJ',
        rating: 5,
        text: "The real-time analytics changed how we make decisions. We're no longer reactive—we're predictive. Our team efficiency increased by 40% in just three months.",
    },
    {
        name: 'Elena Rodriguez',
        role: 'VP of Operations, CloudScale',
        avatar: 'ER',
        rating: 5,
        text: "Integration was seamless. We connected 50+ tools in our stack without a single hiccup. The support team is phenomenal—they truly understand enterprise needs.",
    },
    {
        name: 'David Park',
        role: 'Founder, InnovateLab',
        avatar: 'DP',
        rating: 5,
        text: "As a startup, we needed to move fast without breaking things. Next Idea Solution gave us enterprise-grade infrastructure with startup-friendly simplicity.",
    },
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute left-0 top-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                        Testimonials
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        What Our Clients Say
                        <br />
                        <span className="gradient-text">Results From Clients</span>
                    </h2>
                </div>

                {/* Testimonials Slider */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Main Testimonial */}
                    <div className="glass-strong rounded-2xl p-8 md:p-12 text-center">
                        {/* Stars */}
                        <div className="flex justify-center gap-1 mb-6">
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                            "{testimonials[currentIndex].text}"
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                                {testimonials[currentIndex].avatar}
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-foreground">{testimonials[currentIndex].name}</p>
                                <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-primary' : 'bg-muted-foreground/30'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextTestimonial}
                            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 md:mt-24">
                    {[
                        { value: '500+', label: 'Projects Delivered' },
                        { value: '98%', label: 'Client Satisfaction' },
                        { value: '50+', label: 'Countries Served' },
                        { value: '24/7', label: 'Support Available' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                            <p className="text-muted-foreground text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
