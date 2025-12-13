import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';

const projects = [
    {
        title: "E-Commerce Platform",
        category: "Web Development",
        description: "A scalable e-commerce solution with real-time inventory management and AI-powered recommendations.",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=400&fit=crop",
        tags: ["React", "Node.js", "PostgreSQL"],
        color: "from-primary/20 to-accent/20"
    },
    {
        title: "FinTech Dashboard",
        category: "Financial Technology",
        description: "Comprehensive financial analytics dashboard with real-time market data and predictive insights.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        tags: ["TypeScript", "D3.js", "AWS"],
        color: "from-accent/20 to-primary/20"
    },
    {
        title: "Healthcare App",
        category: "Mobile Development",
        description: "Patient management system with telemedicine capabilities and secure health records.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
        tags: ["React Native", "HIPAA", "Firebase"],
        color: "from-primary/20 to-accent/20"
    },
    {
        title: "AI Content Platform",
        category: "Artificial Intelligence",
        description: "Content generation platform powered by advanced AI models for marketing automation.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        tags: ["Python", "OpenAI", "FastAPI"],
        color: "from-accent/20 to-primary/20"
    }
];

const PortfolioSection = () => {
    return (
        <section id="portfolio" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-medium tracking-wider uppercase">Portfolio</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                        Our Latest{' '}
                        <span className="gradient-text">Case Studies</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Explore our recent projects and see how we've helped businesses transform their digital presence
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`} />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-primary">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        View Project
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Github className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;

