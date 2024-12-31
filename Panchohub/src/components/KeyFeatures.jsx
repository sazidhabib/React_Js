import React from "react";

const KeyFeatures = () => (
  <section className="relative py-12 lg:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-between text-center lg:flex-row lg:text-left">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 lg:text-4xl">
            The Highlighting Part Of Our Solution
          </h2>
        </div>
        <div className="mt-6 lg:w-1/2 lg:mt-0">
          <p className="text-gray-600 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            egestas viverra id et aliquet. Viverra egestas sollicitudin.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {[
          { title: "Live Caption", icon: "feature-icon-1.svg" },
          { title: "Smart Reply", icon: "feature-icon-2.svg" },
          { title: "Sound Amplifier", icon: "feature-icon-3.svg" },
          { title: "Gesture Navigation", icon: "feature-icon-4.svg" },
          { title: "Dark Theme", icon: "feature-icon-5.svg" },
          { title: "Privacy Controls", icon: "feature-icon-6.svg" },
          { title: "Location Controls", icon: "feature-icon-7.svg" },
          { title: "Security Updates", icon: "feature-icon-8.svg" },
          { title: "Focus Mode", icon: "feature-icon-9.svg" },
          { title: "Family Link", icon: "feature-icon-10.svg" },
        ].map((feature, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition"
          >
            {/* Feature Title */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 lg:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>
            </div>

            {/* Feature Icon */}
            <span className="mt-4 flex justify-center">
              <img
                className="h-16 w-16 object-contain"
                src={`/images/icons/${feature.icon}`}
                alt={`${feature.title} Icon`}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default KeyFeatures;
