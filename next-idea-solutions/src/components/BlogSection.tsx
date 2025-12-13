import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const posts = [
    {
        title: "The Future of AI in Web Development",
        excerpt: "Exploring how artificial intelligence is revolutionizing the way we build and maintain web applications.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
        category: "Technology",
        date: "Dec 10, 2024",
        readTime: "5 min read",
        author: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face"
        }
    },
    {
        title: "Building Scalable Systems: Best Practices",
        excerpt: "Learn the key principles and patterns for designing systems that can grow with your business.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop",
        category: "Engineering",
        date: "Dec 8, 2024",
        readTime: "8 min read",
        author: {
            name: "Marcus Johnson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
        }
    },
    {
        title: "Design Trends to Watch in 2025",
        excerpt: "A comprehensive look at the emerging design trends that will shape the digital landscape.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=300&fit=crop",
        category: "Design",
        date: "Dec 5, 2024",
        readTime: "6 min read",
        author: {
            name: "Emily Rodriguez",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face"
        }
    }
];

const BlogSection = () => {
    return (
        <section id="blog" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <span className="text-primary text-sm font-medium tracking-wider uppercase">Blog</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
                            Latest{' '}
                            <span className="gradient-text">Updates</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Insights, tutorials, and news from our team
                        </p>
                    </div>
                    <Button variant="outline" className="mt-6 md:mt-0">
                        View All Posts
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <article
                            key={index}
                            className="group glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                                <span className="absolute bottom-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium">
                                    {post.category}
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center gap-3">
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-sm font-medium">{post.author.name}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
