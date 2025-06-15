import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { keyFeatures } from "../constant";
import { imgLink } from "../constant";

const FeatureDetails = () => {
  const { slug } = useParams();
  const [featureData, setFeatureData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the feature by slug
    const feature = keyFeatures.find((item) => item.path === slug);

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
  if (!featureData || featureData.length === 0) return <p>Feature not found</p>;

  return (
    <div className="container mx-auto p-6 py-12">
      <h1 className="text-3xl font-bold">Feature Details</h1>

      {/* Map through the array to display all doctors/hospitals/bus info */}
      {featureData.map((item, index) => (
        <div key={index} className="border-b py-8">
          <div
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-6`}
          >
            {/* Image Section */}
            <div className="flex-shrink-0">
              <img
                src={`${imgLink}/${slug}/${item.image}`}
                alt={item.dr_name}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Content Section */}
            <div className="flex-grow text-left">
              <h2 className="text-2xl font-semibold mb-2">
                {item.dr_name || item.hp_name || item.title}
              </h2>
              <div className="space-y-1">
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
              </div>

              {/* Chambers if exist */}
              {item.chambers && item.chambers.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Chambers:</h3>
                  {item.chambers.map((chamber, idx) => (
                    <div
                      key={idx}
                      className="mt-2 pl-2 border-l-2 border-gray-300"
                    >
                      <p>
                        <strong>Name:</strong> {chamber.chamber_name}
                      </p>
                      <p>
                        <strong>Address:</strong> {chamber.chamber_address}
                      </p>
                      <p>
                        <strong>Contact:</strong> {chamber.chamber_contact}
                      </p>
                      <p>
                        <strong>Schedule:</strong> {chamber.chamber_date} (
                        {chamber.chamber_time})
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureDetails;
