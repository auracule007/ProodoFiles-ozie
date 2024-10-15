import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { HiXMark } from "react-icons/hi2";
import { FaCircleUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { PiFilesBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import FilesContext from "../context/FilesContext";
import AuthContext from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { IoFolderSharp } from "react-icons/io5";
import { FaStarOfLife } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

function Sidebar({ setComponent }) {
  const [isOpen, setIsOpen] = useState(false);
  const {} = useContext(FilesContext);
  const [state, dispatch] = useContext(AuthContext);
  const { deleteItem } = useLocalStorage("token");
  const redirect = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  function logout(e) {
    e.preventDefault();
    deleteItem("token");
    localStorage.removeItem("full_name");
    dispatch({ type: "setToken", payload: null });
    redirect("/");
  }

  return (
    <div className="relative z-50 h-screen">
      {/* Sidebar */}
      <div
        className={`h-full w-64 bg-[#fff] text-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:relative z-20`}
      >
        <div className="p-4 pt-12 text-[#000]">
          <h1 className="text-2xl flex justify-center items-center gap-2 font-bold">
            ProodosFiles
          </h1>
          <ul className="mt-6 space-y-4">
            <li
              className="py-2 px-4 hover:bg-[#D9E5D6] capitalize hover:text-[#fff] cursor-pointer"
              onClick={() => setComponent("dashboard")}
            >
              <div className="flex justify-start items-center gap-2">
                <FaHome /> Dashboard
              </div>
            </li>
            {/* <li
              className="py-2 px-4 hover:bg-[#D9E5D6] capitalize hover:text-[#fff] cursor-pointer"
              onClick={() => setComponent("files")}
            >
              <div className="flex justify-start items-center gap-2">
                <PiFilesBold /> Files
              </div>
            </li> */}
            <li
              className="py-2 px-4 hover:bg-[#D9E5D6] capitalize hover:text-[#fff] cursor-pointer"
              onClick={() => setComponent("folders")}
            >
              <div className="flex justify-start items-center gap-2">
              <IoFolderSharp /> Folders
              </div>
            </li>
            {/* <li
              className="py-2 px-4 hover:bg-[#D9E5D6] capitalize hover:text-[#fff] cursor-pointer"
              onClick={() => setComponent("downloads")}
            >
              <div className="flex justify-start items-center gap-2">
                <IoMdDownload /> Downloads
              </div>
            </li> */}
            <li
              className="py-2 px-4 hover:bg-[#D9E5D6] capitalize hover:text-[#fff] cursor-pointer"
              onClick={() => setComponent("starred")}
            >
              <div className="flex justify-start items-center gap-2">
              <FaStarOfLife /> Starred 
              </div>
            </li>
            <li
              className="py-2 px-4 hover:bg-[#D9E5D6] capitalize hover:text-[#fff] cursor-pointer"
              onClick={() => setComponent("bin")}
            >
              <div className="flex justify-start items-center gap-2">
              <RiDeleteBinLine /> Recycle Bin 
              </div>
            </li>
            <li
              className="py-2 px-4 hover:bg-[#D9E5D6] capitalize hover:text-[#fff] cursor-pointer"
              onClick={() => setComponent("uploads")}
            >
              <div className="flex justify-start items-center gap-2">
                <IoMdAdd /> Create
              </div>
            </li>
            <li className="py-2 px-4 hover:bg-[#D9E5D6] capitalize hover:text-[#fff] cursor-pointer">
              <div className="flex justify-start items-center gap-2" onClick={logout}>
                <CiLogout /> Logout
              </div>
            </li>
            {/* <li className="py-2 px-4 hover:bg-[#D9E5D6] capitalize hover:text-[#fff] cursor-pointer">
              <div className="flex justify-start items-center gap-2">
                <Link to="/login" className="flex justify-start items-center gap-2"><CiLogout /> Login</Link>
              </div>
            </li> */}
          </ul>
        </div>
      </div>

      {/* Toggle button for mobile */}
      <div className="lg:hidden p-4 z-30 relative">
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={toggleSidebar}
        >
          {isOpen ? <HiXMark /> : <RiMenu3Fill />}
        </button>
      </div>

      {/* Overlay for mobile screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
