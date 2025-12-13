import { useState } from 'react';
import { ArrowRight, Bot, LineChart, Link2, Workflow, BarChart, Plug } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tabs = [
    {
        id: 'automation',
        label: 'Automation',
        icon: Bot,
        title: 'Workflows that run themselves',
        description: 'Set rules once. Watch them execute flawlessly across your entire operation. No manual intervention. No errors.',
        features: ['Smart task routing', 'Event-driven triggers', 'Custom workflow builder'],
    },
    {
        id: 'analytics',
        label: 'Analytics',
        icon: LineChart,
        title: 'Insights that drive action',
        description: 'Real-time dashboards that tell stories. Predictive models that guide decisions. Data that works for you.',
        features: ['Live monitoring', 'Predictive analytics', 'Custom reports'],
    },
    {
        id: 'integration',
        label: 'Integration',
        icon: Link2,
        title: 'Connect everything seamlessly',
        description: 'One platform to rule them all. API-first architecture that plays nice with your existing tools.',
        features: ['500+ integrations', 'Custom API builder', 'Webhook automation'],
    },
];

const PlatformSection = () => {
    const [activeTab, setActiveTab] = useState('automation');
    const activeContent = tabs.find((tab) => tab.id === activeTab);

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <div className="absolute right-0 top-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                        Platform
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        Built for how you work
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
                        Next Idea Solution adapts to your workflow, not the other way around.
                        Three core modules power everything we do.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <Button className="bg-primary hover:bg-primary/90">Learn</Button>
                        <Button variant="ghost" className="group">
                            Arrow <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex glass rounded-full p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                        <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                            {activeContent?.label}
                        </span>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                            {activeContent?.title}
                        </h3>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            {activeContent?.description}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {activeContent?.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex gap-4">
                            <Button variant="outline" className="glass">
                                Discover
                            </Button>
                            <Button variant="ghost" className="group">
                                Arrow <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Visual - Dashboard/Software Image */}
                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            <div className="glass-strong rounded-2xl p-6 glow-primary">
                                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-card via-muted to-card overflow-hidden relative">
                                    {/* Platform Dashboard Mockup */}
                                    <div className="absolute inset-4">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                                    {activeContent && <activeContent.icon className="w-4 h-4 text-primary-foreground" />}
                                                </div>
                                                <span className="text-sm font-medium">{activeContent?.label} Hub</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-chart-2" />
                                                <div className="w-2 h-2 rounded-full bg-chart-3" />
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            </div>
                                        </div>

                                        {/* Content based on active tab */}
                                        {activeTab === 'automation' && (
                                            <div className="space-y-3">
                                                {/* Workflow Visualization */}
                                                <div className="flex items-center justify-between gap-2">
                                                    {[Workflow, ArrowRight, Bot, ArrowRight, Plug].map((Icon, i) => (
                                                        <div key={i} className={`${i % 2 === 0 ? 'w-12 h-12 rounded-xl glass flex items-center justify-center' : ''}`}>
                                                            <Icon className={`${i % 2 === 0 ? 'w-5 h-5 text-primary' : 'w-4 h-4 text-muted-foreground'}`} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 mt-4">
                                                    {['Active Workflows', 'Tasks Today', 'Success Rate', 'Time Saved'].map((label, i) => (
                                                        <div key={i} className="glass rounded-lg p-3">
                                                            <p className="text-xs text-muted-foreground">{label}</p>
                                                            <p className="text-lg font-bold gradient-text">{['24', '156', '99.8%', '12h'][i]}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'analytics' && (
                                            <div className="space-y-3">
                                                {/* Chart Visualization */}
                                                <div className="glass rounded-lg p-3">
                                                    <div className="flex items-end justify-between h-24 gap-1">
                                                        {[30, 50, 40, 70, 55, 85, 65, 90, 75, 95, 80, 88].map((h, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex-1 rounded-t bg-gradient-to-t from-primary to-accent"
                                                                style={{ height: `${h}%` }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {[
                                                        { label: 'Visitors', value: '45.2K' },
                                                        { label: 'Revenue', value: '$128K' },
                                                        { label: 'Growth', value: '+34%' },
                                                    ].map((stat, i) => (
                                                        <div key={i} className="glass rounded-lg p-2 text-center">
                                                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                                                            <p className="text-sm font-bold gradient-text">{stat.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'integration' && (
                                            <div className="space-y-3">
                                                {/* Integration Grid */}
                                                <div className="grid grid-cols-4 gap-2">
                                                    {['S', 'G', 'M', 'A', 'N', 'Z', 'H', 'D'].map((letter, i) => (
                                                        <div key={i} className="aspect-square glass rounded-lg flex items-center justify-center text-lg font-bold text-primary">
                                                            {letter}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="glass rounded-lg p-3 flex items-center justify-between">
                                                    <span className="text-sm">Connected Apps</span>
                                                    <span className="text-lg font-bold gradient-text">42</span>
                                                </div>
                                                <div className="glass rounded-lg p-3 flex items-center justify-between">
                                                    <span className="text-sm">API Calls Today</span>
                                                    <span className="text-lg font-bold gradient-text">12.4K</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Floating Elements */}
                                    <div className="absolute -top-2 -right-2 w-12 h-12 rounded-xl glass float-animation border border-primary/20" />
                                    <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full glass float-animation-delayed border border-accent/20" />
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformSection;
