import { useParams } from "react-router-dom";
import { keyFeatures } from "../constant";
import { imgLink } from "../constant";

const FeatureDetail = () => {
  const { slug } = useParams();
  const feature = keyFeatures.find(
    (item) => item.path.replace(/\s+/g, "-").toLowerCase() === slug
  );

  if (!feature) {
    return <h2 className="text-center mt-10">Feature Not Found</h2>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold text-gray-800">{feature.dr_name}</h1>
      <img
        className="mt-4 h-24 w-24 object-contain"
        src={`${imgLink}/sliders/${feature.image}`}
        alt={feature.title}
      />
      <p className="mt-4 text-gray-600">{feature.category}</p>
    </div>
  );
};

export default FeatureDetail;
