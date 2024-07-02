import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/LoggedInUser.context";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import Button from "../components/Button";
import Pagination from "../components/Pagination";

const UserProfilePage = () => {
  const { loggedInUser } = useContext(UserContext);
  const [userProducts, setUserProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    async function fetchUserProducts() {
      try {
        const productIds = loggedInUser.products;
        const productPromises = productIds.map((id) =>
          axios.get(`http://localhost:3000/api/product/${id}`)
        );
        const productResponses = await Promise.all(productPromises);
        const products = productResponses.map((response) => response.data);
        setUserProducts(products);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    }

    if (loggedInUser.products && loggedInUser.products.length > 0) {
      fetchUserProducts();
    }
  }, [loggedInUser.products]);

  function handleLogout() {
    localStorage.removeItem("token");
  }
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  function handleItemsPerPageChange(event) {
    setLimit(event.target.value);
  }

  function handleLogout() {
    localStorage.removeItem("token");
  }

  const paginatedProducts = userProducts.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
        <div className="flex flex-col lg:flex-row justify-between mb-8">
          <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Username:</label>
              <span className="text-gray-900">{loggedInUser.username}</span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">
                First Name:
              </label>
              <span className="text-gray-900">{loggedInUser.firstName}</span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">
                Last Name:
              </label>
              <span className="text-gray-900">{loggedInUser.lastName}</span>
            </div>
            <Button variant="delete" onClick={handleLogout}>
              <Link to="/" className="text-white">
                Logout
              </Link>
            </Button>
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">My Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
