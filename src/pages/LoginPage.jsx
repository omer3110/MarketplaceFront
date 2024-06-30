import React, { useState } from "react";
import ProductsPage from "./ProductsPage";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Data:", formData);
    navigate("/product");
    // For now, just log the form data to the console
    // In a real application, you would send this data to your backend server for authentication
  }

  return (
    <>
      <div className=" p-4 absolute top-10 right-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <p>
            Don't have account yet?{" "}
            <Link
              to="/product/register"
              className=" cursor-pointer text-blue-700"
            >
              register
            </Link>
          </p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" variant="primary">
              Login
            </Button>
          </div>
        </form>
      </div>
      <ProductsPage />
    </>
  );
}

export default LoginPage;
