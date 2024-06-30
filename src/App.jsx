import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CreationPage from "./pages/CreationPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Navbar />
      <h1 className="text-center text-3xl font-semibold my-4">My Products</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/product/create" element={<CreationPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/product/login" element={<LoginPage />} />
        <Route path="/product/register" element={<RegisterPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <footer className="bg-blue-600 text-white p-4 text-center mt-8">
        <p>&copy; 2024 Product Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
