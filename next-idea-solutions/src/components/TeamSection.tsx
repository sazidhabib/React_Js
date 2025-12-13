import { Linkedin, Twitter, Github } from 'lucide-react';

const team = [
    {
        name: "Sarah Chen",
        role: "CEO & Founder",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
        bio: "10+ years leading tech startups",
        social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "Marcus Johnson",
        role: "CTO",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        bio: "Former Google engineer, AI specialist",
        social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "Emily Rodriguez",
        role: "Head of Design",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
        bio: "Award-winning UX designer",
        social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "David Kim",
        role: "Lead Developer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        bio: "Full-stack expert, open source contributor",
        social: { linkedin: "#", twitter: "#", github: "#" }
    }
];

const TeamSection = () => {
    return (
        <section id="team" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-medium tracking-wider uppercase">Our Team</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                        Meet the{' '}
                        <span className="gradient-text">Experts</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A passionate team of innovators dedicated to bringing your vision to life
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group text-center"
                        >
                            <div className="relative mb-6 mx-auto w-48 h-48">
                                {/* Gradient ring */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent p-1 group-hover:scale-105 transition-transform duration-300">
                                    <div className="w-full h-full rounded-full bg-background p-1">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Social overlay */}
                                <div className="absolute inset-0 rounded-full bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    <a href={member.social.linkedin} className="text-primary-foreground hover:scale-110 transition-transform">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href={member.social.twitter} className="text-primary-foreground hover:scale-110 transition-transform">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href={member.social.github} className="text-primary-foreground hover:scale-110 transition-transform">
                                        <Github className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                            <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                            <p className="text-muted-foreground text-sm">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
