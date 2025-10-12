// ContactInfo.jsx
import React from "react";

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone",
      details: "+1 (555) 123-4567",
      subtitle: "Mon-Fri from 9am to 6pm",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      details: "hello@company.com",
      subtitle: "We reply within 24 hours",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Office",
      details: "123 Business Ave, Suite 100",
      subtitle: "San Francisco, CA 94107",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 leading-relaxed">
          Have a project in mind or want to learn more about our services? We'd
          love to hear from you. Send us a message and we'll respond as soon as
          possible.
        </p>
      </div>

      <div className="space-y-6">
        {contactMethods.map((method, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              {method.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{method.title}</h3>
              <p className="text-gray-900 font-medium">{method.details}</p>
              <p className="text-gray-600 text-sm">{method.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
        <h3 className="font-semibold text-gray-900 mb-2">Follow Us</h3>
        <div className="flex space-x-4">
          {["Twitter", "LinkedIn", "GitHub", "Instagram"].map((social) => (
            <a
              key={social}
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-md transition-all duration-200"
            >
              <span className="font-medium text-sm">{social[0]}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
