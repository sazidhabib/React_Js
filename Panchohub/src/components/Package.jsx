import React from "react";

const Package = ({ plans = [] }) => {
  if (!Array.isArray(plans) || plans.length === 0) {
    return <p>No plans available.</p>;
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Pricing Plans
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`max-w-sm rounded-lg shadow-lg p-6 border ${
              plan.featured
                ? "border-orange-500 bg-white"
                : "border-gray-200 bg-gray-50"
            } transition-transform transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                {plan.title}
              </h2>
              <div className="text-3xl">
                <img
                  src={plan.icon}
                  alt={`${plan.title} icon`}
                  className="w-10 h-10"
                />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mt-4 mb-4">
              ${plan.price}
              <span className="text-lg text-gray-500">/mo</span>
            </div>
            <p className="text-gray-500 mb-4">{plan.description}</p>
            <hr className="mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              What's included?
            </h3>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-600">
                  <svg
                    className={`w-5 h-5 mr-2 ${
                      plan.featured ? "text-orange-500" : "text-gray-500"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 px-4 rounded-lg font-bold ${
                plan.featured
                  ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:from-orange-500 hover:to-pink-600"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Buy Now
            </button>
            <a
              href="#"
              className="block mt-4 text-center text-indigo-600 font-bold hover:underline"
            >
              Start Free Trial →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Package;
