import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = ['About Us', 'Services', 'Portfolio', 'Pricing', 'Contact'];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <span className="text-xl md:text-2xl font-bold gradient-text">
                            Next Idea Solution
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                            Sign In
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 glow-primary">
                            Start Free
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-foreground"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-strong border-t border-border/30">
                    <div className="px-4 py-6 space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                        <div className="pt-4 space-y-3 flex flex-col gap-3">
                            <div className="flex justify-center">
                                <ThemeToggle />
                            </div>
                            <Button variant="outline" className="w-full">
                                Sign In
                            </Button>
                            <Button className="w-full bg-primary hover:bg-primary/90">
                                Start Free
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
