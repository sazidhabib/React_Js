import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
    {
        name: 'Starter',
        price: 29,
        description: 'Perfect for small teams getting started',
        features: [
            'Up to 5 team members',
            '10 GB storage',
            'Basic analytics',
            'Email support',
            'API access',
        ],
        popular: false,
    },
    {
        name: 'Professional',
        price: 99,
        description: 'For growing teams that need more power',
        features: [
            'Up to 25 team members',
            '100 GB storage',
            'Advanced analytics',
            'Priority support',
            'Full API access',
            'Custom integrations',
            'SSO authentication',
        ],
        popular: true,
    },
    {
        name: 'Enterprise',
        price: null,
        description: 'For large organizations with complex needs',
        features: [
            'Unlimited team members',
            'Unlimited storage',
            'Enterprise analytics',
            'Dedicated support',
            'Custom development',
            'On-premise option',
            'SLA guarantee',
            'Security audit',
        ],
        popular: false,
    },
];

const PricingSection = () => {
    return (
        <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                        Pricing
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        Simple, transparent
                        <br />
                        <span className="gradient-text">pricing</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
                        Choose the plan that fits your needs. All plans include our core features.
                        Upgrade or downgrade anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${plan.popular
                                    ? 'glass-strong border-primary/50 glow-primary'
                                    : 'glass hover:border-primary/30'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    {plan.price ? (
                                        <>
                                            <span className="text-4xl font-bold">${plan.price}</span>
                                            <span className="text-muted-foreground">/month</span>
                                        </>
                                    ) : (
                                        <span className="text-4xl font-bold">Custom</span>
                                    )}
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-primary" />
                                        </div>
                                        <span className="text-foreground text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Button
                                className={`w-full ${plan.popular
                                        ? 'bg-primary hover:bg-primary/90'
                                        : 'bg-muted hover:bg-muted/80 text-foreground'
                                    }`}
                            >
                                {plan.price ? 'Get Started' : 'Contact Sales'}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
