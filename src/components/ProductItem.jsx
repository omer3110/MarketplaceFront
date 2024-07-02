import React from "react";
import { useNavigate } from "react-router-dom";
import categoryAuto from "../images/categoryAuto.jpeg";
import categoryElectronics from "../images/categoryElectronics.jpg";
import categoryGuns from "../images/categoryGuns.jpeg";
import categoryJewelry from "../images/categoryJewerly.webp";
import categoryShoes from "../images/categoryShoes.png";
import categorySports from "../images/categorySports.jpeg";
import categoryClothing from "../images/categoryClothing.jpeg";

const categoryImages = {
  Automotive: categoryAuto,
  Electronics: categoryElectronics,
  Guns: categoryGuns,
  Jewelry: categoryJewelry,
  Shoes: categoryShoes,
  Sports: categorySports,
  Clothing: categoryClothing,
  // Add other categories and their corresponding images here
};

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  // Determine the image to display based on the first category
  const firstCategoryImage =
    product.categories.length > 0
      ? categoryImages[product.categories[0]]
      : `https://via.placeholder.com/150?text=${product.name}`;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={firstCategoryImage}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-700">Price: ${product.price}</p>
        <p className="text-gray-500">
          Categories: {product.categories.join(", ")}
        </p>
        <button
          id={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
