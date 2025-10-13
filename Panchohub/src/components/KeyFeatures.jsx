import { keyFeatures } from "../constant";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { baseLink } from "../constant/index";
import { imgLink } from "../constant";

const KeyFeatures = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path.toLowerCase() === "doctors") {
      navigate("/doctors");
    } else {
      const slug = path.replace(/\s+/g, "-").toLowerCase();
      navigate(`/feature/${slug}`);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center mx-auto"
    >
      <section id="features" className="relative w-full bg-gray-100 py-12 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 lg:text-4xl md:text-3xl">
                আমাদের সেবা সমূহ
              </h2>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(feature.path)}
                className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition cursor-pointer"
              >
                {/* Feature Title */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 lg:text-xl">
                    {feature.title}
                  </h3>
                </div>

                {/* Feature Icon */}
                <span className="mt-4 flex justify-center">
                  <img
                    className="h-16 w-16 object-contain"
                    src={`${feature.icon}`}
                    alt={`${feature.title} Icon`}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default KeyFeatures;
