import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Account from "./Account";
import FilesDocs from "./FilesDocs";
import Downloads from "./Downloads";
import Uploads from "./Uploads";
import FilesContext from "../../context/FilesContext";
import Folder from "../Folder";
import FolderBin from "./FolderBin";
import Starred from "../../components/pages/Starred";

function Dashboard() {
  const { isAuthenticated } = useContext(FilesContext);
  const [component, setComponent] = useState("dashboard");
   // Initialize the component state from localStorage, or default to "dashboard"
  //  const [component, setComponent] = useState(() => {
  //   return localStorage.getItem("component") || "dashboard";
  // });

  // // Update localStorage whenever the component state changes
  // useEffect(() => {
  //   localStorage.setItem("component", component);
  // }, [component]);

  if(!isAuthenticated){
    return <Navigate to="/" />
  }

  return (
    <div className="flex bg-[#f8f9fc]">
      {/* Sidebar */}
      <div className="fixed h-screen w-1/5">
        <Sidebar setComponent={setComponent} />
      </div>
        <Link to={"/login"}></Link>

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-[20%] p-4 mt-5 overflow-y-auto h-screen">
        <div className="mt-4">
          {/* Render components based on the value of `component` */}
          {component === "dashboard" ? (
            <Account />
          ) : component === "files" ? (
            <FilesDocs />
          ) : component === "downloads" ? (
            <Downloads />
          ) : component === "folders" ? (
            <Folder />
          ) : 
           component === "uploads" ? (
            <Uploads />
          ) : 
           component === "starred" ? (
            <Starred />
          ) : 
           component === "bin" ? (
            <FolderBin />
          ) : (
            <Account />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
