import { ArrowRight, Rocket, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Image/Visual */}
                    <div className="relative">
                        <div className="glass-strong rounded-2xl p-6 glow-primary">
                            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-card via-muted to-card overflow-hidden relative">
                                {/* Rocket Launch Visual */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        {/* Central Rocket */}
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center animate-pulse">
                                            <div className="w-16 h-16 rounded-full glass border border-primary/50 flex items-center justify-center">
                                                <Rocket className="w-8 h-8 text-primary" />
                                            </div>
                                        </div>

                                        {/* Orbiting Elements */}
                                        <div className="absolute -top-8 -right-8 w-12 h-12 rounded-xl glass float-animation flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-accent" />
                                        </div>
                                        <div className="absolute -bottom-6 -left-10 w-10 h-10 rounded-full glass float-animation-delayed flex items-center justify-center">
                                            <Check className="w-4 h-4 text-chart-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Speed Lines */}
                                <div className="absolute top-1/4 left-4 w-16 h-1 bg-gradient-to-r from-primary/60 to-transparent rounded-full" />
                                <div className="absolute top-1/3 left-8 w-12 h-0.5 bg-gradient-to-r from-accent/40 to-transparent rounded-full" />
                                <div className="absolute bottom-1/3 left-6 w-20 h-0.5 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />

                                {/* Stats Cards */}
                                <div className="absolute top-4 left-4 glass rounded-lg px-3 py-2">
                                    <p className="text-xs text-muted-foreground">Launch Time</p>
                                    <p className="text-sm font-bold gradient-text">2 mins</p>
                                </div>
                                <div className="absolute bottom-4 right-4 glass rounded-lg px-3 py-2">
                                    <p className="text-xs text-muted-foreground">Success Rate</p>
                                    <p className="text-sm font-bold gradient-text">99.9%</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative blurs */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
                    </div>

                    {/* Right - Content */}
                    <div className="text-center lg:text-left">
                        <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                            Get Started
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                            Ready to move faster?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                            Start building with Next Idea Solution today. No credit card required for your trial.
                            Experience the future of software development.
                        </p>

                        {/* Benefits */}
                        <ul className="space-y-3 mb-8">
                            {['14-day free trial', 'No credit card required', 'Cancel anytime', 'Full feature access'].map((benefit, i) => (
                                <li key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-primary" />
                                    </div>
                                    <span className="text-foreground">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 glow-primary text-lg px-8 py-6 group">
                                Start Free
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass">
                                Schedule Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;

