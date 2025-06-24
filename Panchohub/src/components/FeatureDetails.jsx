import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { keyFeatures, doctorsCategories } from "../constant";
import { imgLink } from "../constant";

const FeatureDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Find the feature by slug
    const feature = keyFeatures.find((item) => item.path === slug);
    setCurrentFeature(feature);

    // For doctor categories, find the matching category
    if (slug === "doctors" && location.state?.filterCategory) {
      const category = doctorsCategories.find(
        cat => cat.title.toLowerCase() === location.state.filterCategory.toLowerCase()
      );
      setSelectedCategory(category);
    }

    if (feature) {
      fetch(feature.api)
        .then((res) => res.json())
        .then((data) => {
          setAllData(data);

          // Special handling for doctors with category filter
          if (slug === "doctors" && location.state?.filterCategory) {
            const filtered = data.filter(item =>
              item.category &&
              item.category.toLowerCase() === location.state.filterCategory.toLowerCase()
            );
            setFilteredData(filtered);
          } else {
            // Default case for all other features
            setFilteredData(data);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching feature data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [slug, location.state]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!currentFeature) return <div className="text-center py-10">Feature not found</div>;

  // Function to render different content based on feature type
  const renderContent = (item) => {
    switch (slug) {
      case "doctors":
        return (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">
              {item.dr_name}
            </h2>
            <div className="space-y-2 text-sm">
              {item.category && <p><strong>Category:</strong> {item.category}</p>}
              {item.education_qualify && <p><strong>Education:</strong> {item.education_qualify}</p>}
              {item.current_servise && <p><strong>Current Service:</strong> {item.current_servise}</p>}
              {item.upazila && <p><strong>উপজেলা:</strong> {item.upazila}</p>}
              {item.address && <p><strong>বিস্তারিত ঠিকানা:</strong> {item.address}</p>}
              {item.contact && <p><strong>ফোন:</strong> {item.contact}</p>}
              {item.facilities && <p><strong>সুযোগ-সুবিধা:</strong> {item.facilities}</p>}
            </div>
            {item.chambers?.length > 0 && (
              <div className="mt-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {item.chambers.length} Chamber(s)
                </span>
              </div>
            )}
          </>
        );
      default:
        // Default template for other features
        return (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">
              {item.title || item.hp_name || item.name}
            </h2>
            <div className="space-y-2 text-sm">
              {item.description && <p>{item.description}</p>}
              {item.location && <p><strong>Location:</strong> {item.location}</p>}
              {item.contact && <p><strong>Contact:</strong> {item.contact}</p>}
              {/* Add more fields as needed for other features */}
            </div>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto p-6 py-12">
      {/* Feature Header */}
      <div className="flex items-center gap-4 mb-8">
        {currentFeature.icon && (
          <img
            src={currentFeature.icon}
            alt={`${currentFeature.title} Icon`}
            className="h-12 w-12 object-contain"
          />
        )}
        <h1 className="text-3xl font-bold">
          {selectedCategory?.title || location.state?.filterCategory || currentFeature.title}
        </h1>
      </div>

      {/* Category filter (only for doctors) */}
      {slug === "doctors" && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilteredData(allData)}
              className={`px-4 py-2 rounded ${!location.state?.filterCategory
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              All Categories
            </button>
            {doctorsCategories.map((category) => (
              <button
                key={category.title}
                onClick={() => {
                  const filtered = allData.filter(item =>
                    item.category?.toLowerCase() === category.title.toLowerCase()
                  );
                  setFilteredData(filtered);
                  setSelectedCategory(category);
                }}
                className={`px-4 py-2 rounded ${selectedCategory?.title === category.title
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                  }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Grid */}
      {filteredData.length === 0 ? (
        <div className="text-center py-10">
          <p>No data found</p>
          {location.state?.filterCategory && (
            <p className="text-sm text-gray-500 mt-2">
              No results found for "{location.state.filterCategory}"
            </p>
          )}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition cursor-pointer"
            >
              {/* Image */}
              {item.image && (
                <div className="flex justify-center mb-4">
                  <img
                    src={`${imgLink}/${currentFeature.imagePath}/${item.image}`}
                    alt={item.dr_name || item.title || item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Dynamic Content */}
              <div className="flex-grow">
                {renderContent(item)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureDetails;