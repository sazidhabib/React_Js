import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  keyFeatures,
  doctorsCategories,
  shoppingCategories,
  thanaPolishiceCategories,
  BloodDonorsNeedersCategories,
  vehicleRentCategories,
} from "../constant";
import { imgLink } from "../constant";

// Import our new components
import { FeatureHeader } from "./FeatureHeader";
import { CategoryFilterButtons } from "./CategoryFilterButtons";
import {
  DoctorContent,
  ShoppingContent,
  VehicleRentContent,
  DefaultContent
} from "./ContentRenderers";
import { ChambersModal } from "./ChambersModal";
import { DataGrid } from "./DataGrid";

const FeatureDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChambers, setSelectedChambers] = useState(null);
  const [showChambersModal, setShowChambersModal] = useState(false);
  const [attemptedCategory, setAttemptedCategory] = useState(null);

  // Data fetching and initialization
  useEffect(() => {
    const feature = keyFeatures.find(
      (item) => item.path === slug || item.path2 === slug
    );
    setCurrentFeature(feature);

    // Initialize categories based on slug
    initializeCategories(feature, slug);

    if (feature) {
      fetchData(feature, slug);
    } else {
      setLoading(false);
    }
  }, [slug, location.state]);

  const initializeCategories = (feature, slug) => {
    if (feature?.path === "donors" || feature?.path2 === "needers") {
      const defaultCategory = BloodDonorsNeedersCategories.find(
        (cat) => cat.slug === (slug === "needers" ? "needers" : "donors")
      );
      setSelectedCategory(defaultCategory);
    }

    if (feature?.path === "police" || feature?.path2 === "thana") {
      const defaultCategory = thanaPolishiceCategories.find(
        (cat) => cat.slug === (slug === "thana" ? "thana" : "police")
      );
      setSelectedCategory(defaultCategory);
    }

    if (slug === "vehicle_rent") {
      const defaultCategory = { title: "All Categories" };
      setSelectedCategory(defaultCategory);
    }
  };

  const fetchData = async (feature, slug) => {
    try {
      const apiUrl = slug === "needers" ? feature.api2 :
        slug === "thana" ? feature.api2 :
          feature.api;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setAllData(data);
      applyInitialFilters(data, slug);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching feature data:", error);
      setLoading(false);
    }
  };

  const applyInitialFilters = (data, slug) => {
    if (location.state?.filterCategory) {
      let category;
      let filtered = data;

      switch (slug) {
        case "doctors":
          category = doctorsCategories.find(
            cat => cat.title.toLowerCase() ===
              location.state.filterCategory.toLowerCase()
          );
          if (category) {
            filtered = data.filter(item =>
              item.category?.toLowerCase() ===
              location.state.filterCategory.toLowerCase()
            );
          }
          break;
        case "shopping":
          category = shoppingCategories.find(
            cat => cat.title.toLowerCase() ===
              location.state.filterCategory.toLowerCase()
          );
          if (category) {
            filtered = data.filter(item =>
              item.category?.toLowerCase() ===
              location.state.filterCategory.toLowerCase()
            );
          }
          break;
        case "vehicle_rent":
          category = vehicleRentCategories.find(
            cat => cat.title === location.state.filterCategory
          );
          if (category) {
            filtered = data.filter(item =>
              item.category === category.title
            );
          }
          break;
        default:
          break;
      }

      if (category) setSelectedCategory(category);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  // Category handlers
  const handleBloodCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchCategoryData(currentFeature, category.slug);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchCategoryData(currentFeature, category.slug);
  };

  // Update the vehicle rent handler
  const handleVehicleRentCategoryChange = (category) => {
    setAttemptedCategory(category);

    if (category.title === "All Categories") {
      setFilteredData(allData);
      setSelectedCategory(category);
    } else {
      const filtered = allData.filter(item =>
        item.category && item.category.trim() === category.title.trim()
      );
      setFilteredData(filtered);
      setSelectedCategory(filtered.length > 0 ? category : null);
    }
  };

  // Similar updates for other category handlers
  const handleGenericCategoryChange = (category) => {
    setAttemptedCategory(category);
    const filtered = allData.filter(item =>
      item.category?.toLowerCase() === category.title.toLowerCase()
    );
    setFilteredData(filtered);

    // Only update selected category if we have results
    setSelectedCategory(filtered.length > 0 ? category : null);
  };

  const fetchCategoryData = async (feature, categorySlug) => {
    try {
      const apiUrl = categorySlug === "needers" ? feature.api2 :
        categorySlug === "thana" ? feature.api2 :
          feature.api;

      const response = await fetch(apiUrl);
      const data = await response.json();
      setAllData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const handleShowChambers = (chambers) => {
    setSelectedChambers(chambers);
    setShowChambersModal(true);
  };

  // Content renderer selector
  const renderContent = (item) => {
    const contentComponents = {
      doctors: <DoctorContent item={item} onShowChambers={handleShowChambers} />,
      shopping: <ShoppingContent item={item} />,
      vehicle_rent: <VehicleRentContent item={item} />,
    };

    return contentComponents[slug] || <DefaultContent item={item} slug={slug} />;
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!currentFeature) return <div className="text-center py-10">Feature not found</div>;

  return (
    <div className="container mx-auto p-6 py-12">
      <FeatureHeader
        feature={currentFeature}
        selectedCategory={selectedCategory}
        location={location}
      />

      {/* Category filters */}
      {(slug === "thana" || slug === "police") && (
        <CategoryFilterButtons
          categories={thanaPolishiceCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {(slug === "needers" || slug === "donors") && (
        <CategoryFilterButtons
          categories={BloodDonorsNeedersCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleBloodCategoryChange}
        />
      )}

      {slug === "vehicle_rent" && (
        <CategoryFilterButtons
          categories={vehicleRentCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleVehicleRentCategoryChange}
          slugField="title"
        />
      )}

      {/* For doctors and shopping categories */}
      {(slug === "doctors" || slug === "shopping") && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setAttemptedCategory(null);
                setFilteredData(allData);
                setSelectedCategory(null);
              }}
              className={`px-4 py-2 rounded ${!selectedCategory
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              All Categories
            </button>
            {(slug === "doctors" ? doctorsCategories : shoppingCategories).map((category) => (
              <button
                key={category.title}
                onClick={() => handleGenericCategoryChange(category)}
                className={`px-4 py-2 rounded ${selectedCategory?.title === category.title
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <DataGrid
        data={filteredData}
        renderItem={renderContent}
        imageLink={imgLink}
        imagePath={currentFeature.imagePath}
        attemptedCategory={attemptedCategory}
        selectedCategory={selectedCategory}
      />

      <ChambersModal
        show={showChambersModal}
        onClose={() => setShowChambersModal(false)}
        chambers={selectedChambers}
      />
    </div>
  );
};

export default FeatureDetails;