import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { keyFeatures } from "../constant";
import { imgLink } from "../constant";

const FeatureDetails = () => {
  const { slug } = useParams();
  const [featureData, setFeatureData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFeature, setCurrentFeature] = useState(null);

  useEffect(() => {
    // Find the feature by slug
    const feature = keyFeatures.find((item) => item.path === slug);
    setCurrentFeature(feature);

    if (feature) {
      fetch(feature.api)
        .then((res) => res.json())
        .then((data) => {
          console.log("API Response:", data);
          setFeatureData(data); // Data is an array
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching feature data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!currentFeature) return <p>Feature not found</p>;
  if (!featureData || featureData.length === 0) return <p>No data available</p>;

  return (
    <div className="container mx-auto p-6 py-12">
      {/* Feature Header with Icon */}
      <div className="flex items-center gap-4 mb-8">
        {currentFeature.icon && (
          <img
            src={currentFeature.icon}
            alt={`${currentFeature.title} Icon`}
            className="h-12 w-12 object-contain"
          />
        )}
        <h1 className="text-3xl font-bold">{currentFeature.title}</h1>
      </div>

      {/* Grid Layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featureData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            {/* Image */}
            <div className="flex justify-center mb-4">
              <img
                src={`${imgLink}/${slug}/${item.image}`}
                alt={item.dr_name || item.hp_name || item.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2 text-center">
                {item.dr_name || item.hp_name || item.title}
              </h2>

              <div className="space-y-2 text-sm">
                {item.category && (
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                )}
                {item.education_qualify && (
                  <p>
                    <strong>Education:</strong> {item.education_qualify}
                  </p>
                )}
                {item.current_servise && (
                  <p>
                    <strong>Current Service:</strong> {item.current_servise}
                  </p>
                )}
                {item.upazila && (
                  <p>
                    <strong>উপজেলা:</strong> {item.upazila}
                  </p>
                )}
                {item.address && (
                  <p>
                    <strong>বিস্তারিত ঠিকানা:</strong> {item.address}
                  </p>
                )}
                {item.contact && (
                  <p>
                    <strong>ফোন:</strong> {item.contact}
                  </p>
                )}
                {item.facilities && (
                  <p>
                    <strong>সুযোগ-সুবিধা:</strong> {item.facilities}
                  </p>
                )}
              </div>

              {/* Chambers - shown as a badge if exists */}
              {item.chambers && item.chambers.length > 0 && (
                <div className="mt-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {item.chambers.length} Chamber(s)
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureDetails;
