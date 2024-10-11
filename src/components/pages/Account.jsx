import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Card from "../shared/Card";
import Files from "../Files";
import Documents from "../Documents";
import FilesContext from "../../context/FilesContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import DocumentItems from "../DocumentItems";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import Loaders from "../shared/Loaders";
// import { Navigate } from "react-router-dom";

function Account() {
  const { files, isAuthenticated, getFiles } = useContext(FilesContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state


  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true); // Start loading
      try {
        await getFiles(); // Assuming this function fetches binned items
      } catch (error) {
        console.error("Error fetching binned items:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetch completes
      }
    };

    fetchFiles(); // Call the fetch function on component mount
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  const handleNext = () => {
    if (currentIndex < files.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  // const { getItem } = useLocalStorage("token");
  const fullName = localStorage.getItem("full_name");
  return (
    <div>
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-3">
        <div className="md:col-span-3">
          <Card>
            <div className="flex flex-wrap justify-between items-center p-4">
              <div>
                <h1 className="text-2xl font-semibold pb-2">
                  Welcome, {fullName}!
                </h1>
                <p className="text-gray-600">
                  You have {files.length ?? 0} files
                </p>
              </div>
              <div>
                <img
                  src="/img/background.png"
                  className="w-32 h-auto"
                  alt="Background"
                />
              </div>
            </div>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <div className="p-1">
              <h1 className="text-xl font-semibold pb-2">Quick start</h1>
              <div className="flex items-center justify-center">
                <form action="">
                  <button type="submit" className="w-full h-auto">
                    <img
                      src="/img/folder1.png"
                      className="w-36"
                      alt="Background"
                    />
                  </button>
                </form>
              </div>
            </div>
          </Card>
        </div>


        <div className="md:col-span-5">
        {isLoading ? (
          // <p>Loading Files items...</p>
          <Loaders />
        ) : (
          <div className="p-3">
          <div className="grid grid-cols-4 items-center justify-center gap-2">
            {files.slice(currentIndex, currentIndex + 4).map((item, index) => (
              <DocumentItems
                className="transform transition-transform duration-500 ease-in-out translate-x-full"
                key={item.id}
                document={item}
              />
            ))}
          </div>
          <div className="flex justify-between mt-5">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-gray-200 disabled:opacity-50"
            >
              <FaAnglesLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= files.length - 3}
              className="px-4 py-2 bg-gray-200 disabled:opacity-50"
            >
              <FaAnglesRight />
            </button>
          </div>

          {/* <Documents /> */}
          <Card>
            <Files />
          </Card>
        </div>
    )}
      </div>
      </div>
    </div>
  );
}

export default Account;
