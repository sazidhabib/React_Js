import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">অ্যাকাউন্ট খুলুন</h2>
                    <p className="text-gray-500">সম্পূর্ণ ফ্রিতে রেজিস্ট্রেশন করুন</p>
                </div>

                <form className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">নাম</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="আপনার নাম"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

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
                        <label className="text-sm font-medium text-gray-700">মোবাইল নম্বর</label>
                        <div className="relative">
                            <input
                                type="tel"
                                placeholder="017xxxxxxxx"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
                        রেজিস্ট্রেশন করুন <ArrowRight size={18} />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        আগেই অ্যাকাউন্ট আছে?{' '}
                        <Link to="/login" className="text-primary font-bold hover:underline">
                            লগইন করুন
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
