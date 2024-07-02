import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import SearchForm from "../components/SearchForm";
import Button from "../components/Button";
import { UserContext } from "../contexts/LoggedInUser.context";
import Pagination from "../components/Pagination";

function ProductsPage() {
  const URL = "http://localhost:3000/api/product";

  const { loggedInUser } = useContext(UserContext); // Use the UserContext
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
      <Button variant="create" disabled={!loggedInUser || !loggedInUser._id}>
        <Link
          to="/product/create"
          className={
            !loggedInUser || !loggedInUser._id ? "pointer-events-none" : ""
          }
        >
          Add product
        </Link>
      </Button>
      <Pagination
        currentPage={parseInt(searchParams.get("page")) || 1}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
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
