import React from "react";
import Header from "./Header";
import ProductInfo from "./ProductInfo";
import RelatedItems from "./RelatedItems";
import Footer from "./Footer";

const ProductDetails: React.FC = () => {
  return (
    <div
      data-layername="productDetailsPage"
      className="flex overflow-hidden flex-col bg-white"
    >
      <Header />
      <ProductInfo />
      <RelatedItems />
      <Footer />
    </div>
  );
};

export default ProductDetails;
