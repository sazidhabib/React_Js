import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users, Globe, Award } from 'lucide-react';

const AboutUs = () => {
    // Sample data - replace with your actual content
    const aboutData = {
        title: "About Our Company",
        subtitle: "Innovating since 2018",
        description: "We are a passionate team dedicated to creating innovative solutions that make a difference. Our mission is to deliver exceptional products and services while maintaining the highest standards of quality and customer satisfaction.",
        stats: [
            { value: "10+", label: "Team Members", icon: Users },
            { value: "12+", label: "Projects Completed", icon: Rocket },
            { value: "5+", label: "Countries Served", icon: Globe },
            { value: "3+", label: "Industry Awards", icon: Award }
        ],
        media: {
            type: "image", // or "video"
            src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            alt: "Our team working together"
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div id="about" className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                    className="text-center mb-16"
                >
                    <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
                        {aboutData.subtitle}
                    </h2>
                    <h1 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        {aboutData.title}
                    </h1>
                </motion.div>

                {/* Content Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="flex flex-col lg:flex-row gap-12 items-center"
                >
                    {/* Text Content - Left Side */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:w-1/2"
                    >
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-gray-600 mb-8 leading-relaxed"
                        >
                            {aboutData.description}
                        </motion.p>

                        {/* Key Stats */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-2 gap-6 mt-10"
                        >
                            {aboutData.stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                                    >
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                                <Icon className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Media - Right Side */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:w-1/2"
                    >
                        {aboutData.media.type === 'image' ? (
                            <motion.div
                                initial={{ scale: 0.95 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative rounded-2xl overflow-hidden shadow-xl"
                            >
                                <img
                                    src={aboutData.media.src}
                                    alt={aboutData.media.alt}
                                    className="w-full h-auto object-cover rounded-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-2xl" />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.95 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative rounded-2xl overflow-hidden shadow-xl pt-[56.25%]"
                            >
                                <iframe
                                    src={aboutData.media.src}
                                    title="About Us Video"
                                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;