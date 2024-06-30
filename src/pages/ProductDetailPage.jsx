import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import categoryAuto from "../images/categoryAuto.jpeg";
import categoryElectronics from "../images/categoryElectronics.jpg";
import categoryGuns from "../images/categoryGuns.jpeg";
import categoryJewelry from "../images/categoryJewerly.webp";
import categoryShoes from "../images/categoryShoes.png";
import categorySports from "../images/categorySports.jpeg";
import categoryClothing from "../images/categoryClothing.jpeg";

const categories = [
  "Electronics",
  "Automotive",
  "Guns",
  "Sports",
  "Clothing",
  "Shoes",
  "Jewelry",
];

const categoryImages = {
  Automotive: categoryAuto,
  Electronics: categoryElectronics,
  Guns: categoryGuns,
  Jewelry: categoryJewelry,
  Shoes: categoryShoes,
  Sports: categorySports,
  Clothing: categoryClothing,
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/product/${id}`)
      .then((response) => {
        setProduct(response.data);
        setEditedProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/product/${id}`)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        setError(error);
      });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    console.log(editedProduct);
    axios
      .patch(`http://localhost:3000/api/product/edit/${id}`, editedProduct)
      .then((response) => {
        setProduct(response.data.product);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving product:", error);
        setError(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container p-16 m-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mx-40">
        <img
          src={
            categoryImages[product.category] ||
            `https://via.placeholder.com/150?text=${product.name}`
          }
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded"
                />
              ) : (
                product.name
              )}
            </h2>
            <button onClick={handleEditToggle}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
          </div>
          <p className="text-gray-700">
            Price:{" "}
            {isEditing ? (
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded"
              />
            ) : (
              `$${product.price}`
            )}
          </p>
          <p className="text-gray-500">
            Category:{" "}
            {isEditing ? (
              <select
                className="w-full px-3 py-2 border rounded-md"
                id="category"
                name="category"
                value={editedProduct.category}
                onChange={handleInputChange}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            ) : (
              product.category
            )}
          </p>
          <p className="text-gray-500">
            Quantity:{" "}
            {isEditing ? (
              <input
                type="number"
                name="quantity"
                value={editedProduct.quantity}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded"
              />
            ) : (
              product.quantity
            )}
          </p>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleDelete}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
