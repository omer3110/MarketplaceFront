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
import { UserProvider } from "./contexts/LoggedInUser.context";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/product/create" element={<CreationPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <footer className="bg-blue-600 text-white p-4 text-center mt-8">
        <p>&copy; 2024 Product Store. All rights reserved.</p>
      </footer>
    </UserProvider>
  );
}

export default App;
