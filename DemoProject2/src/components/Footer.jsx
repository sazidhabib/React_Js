import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-sm mb-4">
          © {new Date().getFullYear()} Mahbub Sazid Habib. All rights reserved.
        </p>
        <div className="flex space-x-6">
          {/* GitHub */}
          <a
            href="https://github.com/sazidhabib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-xl"
          >
            GitHub Profile
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mahabub-sazid-habib-ba4754168/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-xl"
          >
            LinkedIn
          </a>

          {/* Email */}
          <a
            href="mailto:mahabubsazid88@gmail.com"
            className="text-gray-400 hover:text-white text-xl"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
