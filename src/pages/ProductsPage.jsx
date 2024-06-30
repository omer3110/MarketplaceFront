import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import SearchForm from "../components/SearchForm";
import Button from "../components/Button";

function ProductsPage() {
  const URL = "http://localhost:3000/api/product";

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(8);

  function onSearch({ name, minPrice, maxPrice }) {
    const params = { page: 1 };
    if (name) params.name = name;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    setSearchParams(params);
    console.log(searchParams);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = Object.fromEntries([...searchParams]);
        const response = await axios.get(URL, {
          params: { ...params, limit },
        });
        console.log(response.data);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };
    fetchData();
  }, [searchParams, limit]);

  const handlePreviousPage = () => {
    const currentPage = parseInt(searchParams.get("page")) || 1;
    if (currentPage > 1) {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: currentPage - 1,
      });
    }
  };

  const handleNextPage = () => {
    const currentPage = parseInt(searchParams.get("page")) || 1;
    if (currentPage < totalPages) {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: currentPage + 1,
      });
    }
  };

  function handleItemsPerPageChange(event) {
    console.log(totalPages);
    if (searchParams.get("page") < totalPages) {
    }

    setLimit(event.target.value);
  }

  return (
    <div className="w-4/5 m-auto">
      <SearchForm onSearch={onSearch} />
      <Button variant="create">
        <Link to="/product/create">Add product</Link>
      </Button>
      <div className="flex justify-between items-center my-4">
        <p>
          Page {searchParams.get("page") || 1} of {totalPages}
        </p>
        <div className="flex gap-4">
          <select
            className=" border border-solid "
            onChange={handleItemsPerPageChange}
            name="numberPerPage"
            id="numberPerPage"
          >
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="24">24</option>
            <option value="32">32</option>
          </select>
          <button
            onClick={handlePreviousPage}
            disabled={(searchParams.get("page") || 1) <= 1}
          >
            <svg
              class="h-6 w-6 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <button
            onClick={handleNextPage}
            disabled={(searchParams.get("page") || 1) >= totalPages}
          >
            <svg
              class="h-6 w-6 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
      {error && <div className="text-red-500">{error.message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
