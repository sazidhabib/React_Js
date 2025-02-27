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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Feature Details</h1>

      {/* Map through the array to display all doctors/hospitals/bus info */}
      {featureData.map((item, index) => (
        <div key={index} className="border-b py-4">
          <h2 className="text-2xl font-semibold">{item.dr_name}</h2>
          <p className="mt-2">Category: {item.category}</p>
          <p>Education: {item.education_qualify}</p>
          <p>Current Service: {item.current_servise}</p>
          <img
            src={`${imgLink}/${slug}/${item.image}`}
            alt={item.dr_name}
            className="w-32 h-32 mt-4"
          />

          {/* Display chamber details if available */}
          {item.chambers && item.chambers.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Chambers:</h3>
              {item.chambers.map((chamber, idx) => (
                <div key={idx} className="mt-2">
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
      ))}
    </div>
  );
};

export default FeatureDetails;
