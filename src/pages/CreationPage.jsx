import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function makeid(length = 5) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function CreationPage() {
  const categories = [
    "Electronics",
    "Automotive",
    "Guns",
    "Sports",
    "Clothing",
    "Shoes",
    "Jewelry",
  ];

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      id: makeid(),
      name: formData.name,
      price: formData.price,
      quantity: formData.quantity,
      category: formData.category,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/create",
        newProduct
      );
      console.log("Product creation successful:", response.data);
      navigate("/product"); // Navigate back to home page after successful creation
    } catch (error) {
      console.error("Error creating product:", error);
      // Optionally handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={() => navigate("/product")}
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="create">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreationPage;
