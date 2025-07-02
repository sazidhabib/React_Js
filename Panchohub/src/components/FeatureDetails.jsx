import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { keyFeatures, doctorsCategories } from "../constant";
import { imgLink } from "../constant";
import HtmlRenderer from "./HtmlRenderer";

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
  const [shoppingCategories, setShoppingCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);


  useEffect(() => {
    const feature = keyFeatures.find((item) => item.path === slug);
    setCurrentFeature(feature);

    // Reset states when slug changes
    setSelectedCategory(null);
    setShoppingCategories([]);


    // Fetch categories if shopping
    if (slug === "shopping") {
      setCategoriesLoading(true);
      fetch("your-shopping-categories-api-endpoint")
        .then(res => res.json())
        .then(data => {
          setShoppingCategories(data);
          setCategoriesLoading(false);
        })
        .catch(error => {
          console.error("Error fetching categories:", error);
          setCategoriesLoading(false);
        });
    }

    if (feature) {
      fetch(feature.api)
        .then((res) => res.json())
        .then((data) => {
          setAllData(data);

          if (slug === "doctors" && location.state?.filterCategory) {
            const filtered = data.filter(item =>
              item.category &&
              item.category.toLowerCase() === location.state.filterCategory.toLowerCase()
            );
            setFilteredData(filtered);
          } else if (slug === "shopping" && location.state?.filterCategory) {
            const filtered = data.filter(item =>
              item.category &&
              item.category.toLowerCase() === location.state.filterCategory.toLowerCase()
            );
            setFilteredData(filtered);
          } else {
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

  const handleShowChambers = (chambers) => {
    setSelectedChambers(chambers);
    setShowChambersModal(true);
  };

  const renderContent = (item) => {
    switch (slug) {
      case "doctors":
        return (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">
              {item.dr_name}
            </h2>
            <div className="space-y-2 text-sm text-left">
              {item.category && <p><strong>বিশেষজ্ঞ:</strong> {item.category}</p>}
              {item.education_qualify && <p><strong>শিক্ষাগত যোগ্যতা:</strong> {item.education_qualify}</p>}
              {item.current_servise && <p><strong>বর্তমান কর্মস্থল:</strong> {item.current_servise}</p>}
              {item.spacialist && (
                <p>
                  <span className="font-bold" >যেসব রোগের চিকিৎসা করেন:</span>
                  <HtmlRenderer encodedHtml={item.spacialist} />
                </p>
              )}
              {item.upazila && <p><strong>উপজেলা:</strong> {item.upazila}</p>}
              {item.address && <p><strong>বিস্তারিত ঠিকানা:</strong> {item.address}</p>}
              {item.contact && <p><strong>যোগাযোগ নম্বর:</strong> {item.contact}</p>}
              {item.facilities && <p><strong>সুযোগ-সুবিধা:</strong> {item.facilities}</p>}
            </div>
            {item.chambers?.length > 0 && (
              <div className="mt-3">
                <button
                  onClick={() => handleShowChambers(item.chambers)}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200"
                >
                  {item.chambers.length} Chamber(s) - Click to view
                </button>
              </div>
            )}
          </>
        );
      case "shopping":
        return (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">
              {item.title || item.hp_name || item.name || item.place_name}
            </h2>
            <div className="space-y-2 text-sm text-left">
              {item.description && (
                <p>
                  <span className="font-bold" >বিস্তারিত:</span>
                  <HtmlRenderer encodedHtml={item.description} />
                </p>
              )}
              {item.place_details && (
                <p>
                  <span className="font-bold" >বিস্তারিত:</span>
                  <HtmlRenderer encodedHtml={item.place_details} />
                </p>
              )}
              {item.category && <p><strong>শপিং এর ধরণ: </strong>{item.category}</p>}
              {item.rent_available && <p><strong>কোন মাস থেকে ভাড়া হবে: </strong>{item.rent_available}</p>}
              {item.area && <p><strong>আয়তন: </strong>{item.area}</p>}
              {item.number_of_rooms && <p><strong>রুম সংখ্যা: </strong>{item.number_of_rooms}</p>}
              {item.number_of_bath && <p><strong>বাথরুম সংখ্যা: </strong>{item.number_of_bath}</p>}
              {item.rent_amount && <p><strong>ভাড়ার পরিমান: </strong>{item.rent_amount}</p>}
              {item.facilities && (
                <p>
                  <span className="font-bold" >সুযোগ-সুবিধা:</span>
                  <HtmlRenderer encodedHtml={item.facilities} />
                </p>
              )}
              {item.address && <p><strong>বিস্তারিত ঠিকানা: </strong>{item.address}</p>}
              {item.others_info && <p><strong>অন্যান্য তথ্য: </strong>{item.others_info}</p>}
              {item.upazila && <p><strong>উপজেলা:</strong> {item.upazila}</p>}
              {item.contact && <p><strong>যোগাযোগ নম্বর:</strong> {item.contact}</p>}
            </div>
          </>
        );
      default:
        return (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">
              {item.title || item.hp_name || item.name || item.place_name}
            </h2>
            <div className="space-y-2 text-sm text-left">
              {item.description && (
                <p>
                  <span className="font-bold" >বিস্তারিত:</span>
                  <HtmlRenderer encodedHtml={item.description} />
                </p>
              )}
              {item.place_details && (
                <p>
                  <span className="font-bold" >বিস্তারিত:</span>
                  <HtmlRenderer encodedHtml={item.place_details} />
                </p>
              )}
              {item.category && <p><strong>বাসার ধরণ: </strong>{item.category}</p>}
              {item.rent_available && <p><strong>কোন মাস থেকে ভাড়া হবে: </strong>{item.rent_available}</p>}
              {item.area && <p><strong>আয়তন: </strong>{item.area}</p>}
              {item.number_of_rooms && <p><strong>রুম সংখ্যা: </strong>{item.number_of_rooms}</p>}
              {item.number_of_bath && <p><strong>বাথরুম সংখ্যা: </strong>{item.number_of_bath}</p>}
              {item.rent_amount && <p><strong>ভাড়ার পরিমান: </strong>{item.rent_amount}</p>}
              {item.facilities && (
                <p>
                  <span className="font-bold" >সুযোগ-সুবিধা:</span>
                  <HtmlRenderer encodedHtml={item.facilities} />
                </p>
              )}
              {item.address && <p><strong>বিস্তারিত ঠিকানা: </strong>{item.address}</p>}
              {item.others_info && <p><strong>অন্যান্য তথ্য: </strong>{item.others_info}</p>}
              {item.upazila && <p><strong>উপজেলা:</strong> {item.upazila}</p>}
              {item.contact && <p><strong>যোগাযোগ নম্বর:</strong> {item.contact}</p>}
            </div>
          </>
        );
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!currentFeature) return <div className="text-center py-10">Feature not found</div>;

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

      {/* Category filter (for doctors and shopping) */}
      {(slug === "doctors" || (slug === "shopping" && shoppingCategories.length > 0)) && (
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
            {(slug === "doctors" ? doctorsCategories : shoppingCategories).map((category) => (
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

      {/* Chambers Modal */}
      {showChambersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">চেম্বারসমূহ</h3>
              <button
                onClick={() => setShowChambersModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {selectedChambers.map((chamber, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                  <h4 className="font-semibold">চেম্বার {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {chamber.chamber_name && <p><strong>চেম্বারের নাম:</strong> {chamber.chamber_name}</p>}
                    {chamber.chamber_address && <p><strong>চেম্বারের ঠিকানা:</strong> {chamber.chamber_address}</p>}
                    {chamber.chamber_contact && <p><strong>চেম্বারের যোগাযোগ নম্বর:</strong> {chamber.chamber_contact}</p>}
                    {chamber.chamber_date && <p><strong>কোন কোন দিন খোলা থাকে:</strong> {chamber.chamber_date}</p>}
                    {chamber.chamber_time && <p><strong>কয়টা থেকে কয়টা পর্যন্ত খোলা থাকে:</strong> {chamber.chamber_time}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowChambersModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureDetails;