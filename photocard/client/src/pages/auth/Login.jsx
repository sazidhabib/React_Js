import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">স্বাগতম!</h2>
                    <p className="text-gray-500">আপনার অ্যাকাউন্টে লগইন করুন</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ইমেইল</label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="example@email.com"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    <button className="w-full py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                        লগইন করুন <ArrowRight size={18} />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        একাউন্ট নেই?{' '}
                        <Link to="/register" className="text-primary font-bold hover:underline">
                            রেজিস্ট্রেশন করুন
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
