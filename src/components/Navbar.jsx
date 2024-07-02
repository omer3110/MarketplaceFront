import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/LoggedInUser.context";

const USERICON = (
  <svg
    class="h-8 w-8 text-white"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="7" r="4" />{" "}
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </svg>
);

function Navbar() {
  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);
  return (
    <nav className="text-white mb-4 flex justify-between items-center bg-blue-500 px-14 py-4">
      <div className="flex gap-8">
        <Link className=" font-bold text-lg" to="/">
          Home
        </Link>
        <Link className=" font-bold text-lg" to="/product">
          Products
        </Link>
      </div>
      <div className="flex gap-4 ">
        {loggedInUser && Object.keys(loggedInUser).length > 0 ? (
          <Link to="/profile">
            <div className=" flex flex-col items-center">
              {USERICON} Hello, {loggedInUser.firstName}
            </div>
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
