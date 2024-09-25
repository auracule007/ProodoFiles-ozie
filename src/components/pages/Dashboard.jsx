import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Account from "./Account";
import FilesDocs from "./FilesDocs";
import Downloads from "./Downloads";
import Uploads from "./Uploads";

function Dashboard() {
   // Initialize the component state from localStorage, or default to "dashboard"
   const [component, setComponent] = useState(() => {
    return localStorage.getItem("component") || "dashboard";
  });

  // Update localStorage whenever the component state changes
  useEffect(() => {
    localStorage.setItem("component", component);
  }, [component]);

  return (
    <div className="flex bg-[#f8f9fc]">
      {/* Sidebar */}
      <div className="fixed h-screen w-1/5">
        <Sidebar setComponent={setComponent} />
      </div>

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
          ) : 
           component === "uploads" ? (
            <Uploads />
          ) : (
            <Account />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
