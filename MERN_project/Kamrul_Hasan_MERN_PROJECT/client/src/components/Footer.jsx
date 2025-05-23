import React from 'react';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-auto custom-font-initial">
            <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
                <div className="d-flex align-items-center gap-2">
                    <div className="d-none d-md-block">কোনো প্রয়োজনে যোগাযোগ করুন:</div>

                    <MdEmail className="text-info" size={20} />

                    <a
                        href="mailto:me@kamrulhasan.info"
                        className="text-info text-decoration-none"
                    >
                        me@kamrulhasan.info |
                    </a>
                </div>
                <span className="text-white ">
                    &copy; {new Date().getFullYear()} কামরুল হাসান। সকল অধিকার সংরক্ষিত।
                </span>
                <a href="/nitimala.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">নীতিমালা</a>
            </div>
        </footer >
    );
};

export default Footer;
