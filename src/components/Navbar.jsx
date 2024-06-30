import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="mb-4 flex justify-between bg-blue-500 px-8 py-4">
      <div className=" flex gap-4">
        <Link className="text-white" to="/">
          Home
        </Link>
        <Link className="text-white" to="/product">
          Products
        </Link>
      </div>
      <Link className="text-white" to="/product/login">
        Login
      </Link>
    </nav>
  );
}

export default Navbar;
