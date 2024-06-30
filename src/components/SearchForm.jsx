import React, { useState } from "react";
import PriceSlider from "./PriceSlider";

const SearchForm = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Parameters:", { name, minPrice, maxPrice });

    onSearch({ name, minPrice, maxPrice });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-4 bg-white shadow-md rounded-lg flex gap-8 justify-around items-center"
    >
      <div className="mb-2 w-80 ">
        <label htmlFor="name" className="block text-gray-700">
          Product name
        </label>
        <input
          placeholder="Search for product"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" border border-solid  mt-4 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <PriceSlider
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <div className="mt-3">
        <button
          type="submit"
          className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
        >
          <svg
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
