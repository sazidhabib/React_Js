import React from "react";

const Services = () => (
  <section className="relative bg-gray-50 py-12 lg:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between lg:space-x-10">
        {/* Image Section */}
        <div className="lg:w-7/12 lg:order-2">
          <div className="w-full">
            <img
              className="w-full rounded-lg object-contain shadow-lg"
              src="/images/sells-by-country.png"
              alt="Sells by Country"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="mt-8 lg:mt-0 lg:w-5/12 lg:order-1">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-4xl">
            Prevent failure from impacting your reputation
          </h2>
          <p className="mt-4 text-gray-600">
            Our platform helps you build secure onboarding authentication
            experiences that retain and engage your users. We build the
            infrastructure, you can.
          </p>

          {/* Tabs Navigation */}
          <ul className="mt-8 space-y-4">
            <li className="flex items-center rounded-lg border border-gray-300 p-4 shadow-md hover:shadow-lg transition">
              <img
                className="mr-4 h-8 w-8 object-contain"
                src="/images/icons/drop.svg"
                alt="Drop Icon"
              />
              <span className="text-gray-700">
                Habit building essential choose habit
              </span>
            </li>
            {/* Additional tab items can be added here */}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
