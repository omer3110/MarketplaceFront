import React from "react";
import ProductItem from "./ProductItem";

const ProductsList = ({ products }) => {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-4">No products available</p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </ul>{" "}
    </>
  );
};

export default ProductsList;
