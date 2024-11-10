import React, { useState, useEffect, useCallback } from "react";

import ProductCard from "./ProductCard";

// Define a type for the product data
interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  category: string;
  ratingRate: number;
  ratingCount: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | JSX.Element | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const fetchProductHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);

      const transformedProduct: Product[] = data.map((productData: any) => {
        return {
          id: productData.id,
          image: productData.image,
          title: productData.title,
          price: productData.price,
          description: productData.description,
          category: productData.category,
          rating: productData.rating.rate,
          reviews: productData.rating.count,
        };
      });
      setProducts(transformedProduct);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProductHandler();
  }, [fetchProductHandler]);

  useEffect(() => {
    // Check if user is logged in, for instance, by checking local storage
    const userLoggedIn = localStorage.getItem("userToken") !== null;
    setIsLoggedIn(userLoggedIn);
  }, []);

  let content: JSX.Element | string | JSX.Element[] = (
    <p>Found no products...</p>
  );

  if (products.length > 0) {
    content = products.map((item) => (
      <ProductCard key={item.id} {...item} isLoggedIn={isLoggedIn} />
    ));
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  console.log(products);

  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <main className="flex flex-col self-center mt-20 max-md:mt-10 max-md:max-w-full">
        <section className="flex flex-col max-md:max-w-full">
          <div className="flex flex-wrap items-center gap-3 max-md:max-w-full">
            <h2 className="self-stretch my-auto  leading-tight text-center text-black opacity-50">
              Home
            </h2>
            <span>ShopNow</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-start my-16 max-md:mt-10 max-md:max-w-full">
            {content}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductsPage;
