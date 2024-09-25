import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu3Fill } from "react-icons/ri";
import { HiXMark } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";
import useLocalStorage from '../hooks/useLocalStorage';
import AuthContext from '../context/AuthContext';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#502274] text-[#fff] sticky top-0 z-[20] flex lg:flex-row flex-col lg:items-center py-[15px] px-[30px]">
      <div className="flex justify-between w-full lg:hidden">
        <h1 className="text-left text-[#fff] font-bold">StoresByScores</h1>
        <button
          type="button"
          className="lg:hidden flex items-center w-[35px] h-[35px]"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiXMark /> : <RiMenu3Fill />}
        </button>
      </div>

      {/* Sidebar for large screens */}
      <div
        className={`fixed lg:relative lg:flex flex-col lg:flex-row gap-5 bg-[#502274] lg:bg-transparent lg:w-auto lg:h-auto h-screen w-[250px] top-0 left-0 z-[30] lg:translate-x-0 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="lg:hidden text-white text-2xl font-bold p-5">StoresByScores</h1>
        <nav className="lg:flex lg:gap-5 lg:items-center flex flex-col text-[16px] lg:text-white text-black lg:text-lg mt-5 lg:mt-0 px-5 lg:px-0">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/product">Products</Link>
          {/* {isAuthenticated ? ( */}
            <Link to="">Logout</Link>
          {/* ) : ( */}
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          {/* )} */}
          <Link to="/cart" className="relative">
            <FiShoppingCart />
            <div className="absolute bottom-4 left-4 text-white bg-blue-950 text-center rounded-full h-6 w-6 text-[15px]">
              500
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;
