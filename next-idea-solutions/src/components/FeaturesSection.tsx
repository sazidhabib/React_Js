import { Cpu, BarChart3, Puzzle, Zap, Shield, Globe } from 'lucide-react';

const features = [
    {
        icon: Cpu,
        title: 'AI automation at your core',
        description: 'Let machines handle what machines do best while you focus on strategy and innovation.',
    },
    {
        icon: BarChart3,
        title: 'Real-time analytics that move fast',
        description: 'See what matters the moment it happens, not after the fact. Make decisions at the speed of data.',
    },
    {
        icon: Puzzle,
        title: 'Seamless integration with your stack',
        description: 'Connect to what you already use. No rip and replace. No headaches. Just pure productivity.',
    },
    {
        icon: Zap,
        title: 'Lightning-fast performance',
        description: 'Built for speed from the ground up. Experience sub-millisecond response times.',
    },
    {
        icon: Shield,
        title: 'Enterprise-grade security',
        description: 'Bank-level encryption and compliance. Your data stays yours, always protected.',
    },
    {
        icon: Globe,
        title: 'Global scale, local speed',
        description: 'Deploy anywhere in the world with edge computing. Your users get local performance, globally.',
    },
];

const FeaturesSection = () => {
    return (
        <section id="services" className="relative pt-0 pb-24 md:pb-32 overflow-hidden">
            {/* Seamless blend from hero - gradient continues */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
            <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                        Capabilities
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        What makes Next Idea Solution
                        <br />
                        <span className="gradient-text">different</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
                        We built our platform on three pillars that matter. Speed without compromise.
                        Intelligence that learns. Integration that just works.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative glass rounded-2xl p-6 md:p-8 hover:glow-primary transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Gradient Border on Hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/20 group-hover:via-transparent group-hover:to-accent/20 transition-all duration-500" />

                            <div className="relative">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-7 h-7 text-primary" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-all duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
