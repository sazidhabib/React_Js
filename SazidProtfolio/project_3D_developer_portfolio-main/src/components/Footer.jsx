import { FaGithub } from "react-icons/fa6";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Mahbub Sazid Habib. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/sazidhabib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/mahabub-sazid-habib-ba4754168/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:mahabubsazid88@gmail.com"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <FaEnvelope className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
