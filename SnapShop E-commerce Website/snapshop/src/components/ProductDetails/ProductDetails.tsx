import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductInfo from "./ProductInfo";
import RelatedItems from "./RelatedItems";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string;
  stock: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product data", error);
      }
    };

    fetchProductData();
  }, [id]);

  return (
    <div
      data-layername="productDetailsPage"
      className="flex overflow-hidden flex-col bg-white"
    >
      {product ? (
        <>
          <ProductInfo product={product} />
          <RelatedItems />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
