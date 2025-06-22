import React from "react";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaGithub
} from "react-icons/fa";
import { FaGooglePlay, FaAppStore } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Our Company</h3>
                        <p className="text-gray-400">
                            Building amazing digital experiences for users worldwide.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Services</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <ul className="text-gray-400 space-y-2">
                            <li>info@company.com</li>
                            <li>+1 (123) 456-7890</li>
                            <li>123 Street, City, Country</li>
                        </ul>
                    </div>

                    {/* Social Media & App Downloads */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect With Us</h3>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaFacebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaTwitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaInstagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaYoutube className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaGithub className="w-6 h-6" />
                            </a>
                        </div>

                        {/* App Download Buttons */}
                        <div className="space-y-3">
                            <a href="#" className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                                <FaGooglePlay className="w-5 h-5 mr-2" />
                                <div className="text-left">
                                    <div className="text-xs">GET IT ON</div>
                                    <div className="text-sm font-semibold">Google Play</div>
                                </div>
                            </a>
                            <a href="#" className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                                <FaAppStore className="w-5 h-5 mr-2" />
                                <div className="text-left">
                                    <div className="text-xs">Download on the</div>
                                    <div className="text-sm font-semibold">App Store</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;