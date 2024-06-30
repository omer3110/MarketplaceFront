import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url('https://source.unsplash.com/random/1600x900')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto p-6 text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to Our Product Store
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Discover the best products at unbeatable prices
          </p>
          <Link
            to="/product"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600"
          >
            Shop Now
          </Link>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <section className="my-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Why Shop With Us?</h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            We offer a wide variety of products at the best prices. Our mission
            is to provide high-quality items and exceptional customer service.
            Explore our collection and find everything you need in one place.
          </p>
        </section>
        <section className="my-12">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Featured Products
          </h2>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
