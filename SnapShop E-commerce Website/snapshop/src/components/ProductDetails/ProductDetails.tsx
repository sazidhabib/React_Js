import React from "react";

import ProductInfo from "./ProductInfo";
import RelatedItems from "./RelatedItems";

const ProductDetails: React.FC = () => {
  return (
    <div
      data-layername="productDetailsPage"
      className="flex overflow-hidden flex-col bg-white"
    >
      <ProductInfo />
      <RelatedItems />
    </div>
  );
};

export default ProductDetails;
