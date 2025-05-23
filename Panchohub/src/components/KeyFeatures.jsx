import { keyFeatures } from "../constant";
import { useNavigate } from "react-router-dom";
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
    <section className="relative py-12 lg:py-20">
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
  );
};

export default KeyFeatures;
