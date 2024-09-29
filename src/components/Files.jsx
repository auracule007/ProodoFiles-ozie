import React, { useContext, useState, useEffect } from "react";
import FileItems from "./FileItems";
import FilesContext from "../context/FilesContext";

function Files() {
  const { files } = useContext(FilesContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate total pages
  const totalPages = Math.ceil(files.length / itemsPerPage);

  // Get current items to display
  const currentItems = files.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>File List</h1>
      <FileItems files_items_props={currentItems} />

      {/* Pagination controls */}
      <div className="pagination-controls flex flex-wrap items-center gap-2 justify-center">
        <button
          onClick={prevPage}
          className="bg-red-300 w-[10%] p-1 text-xs rounded-lg"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="bg-green-300 w-[10%] p-1 text-xs rounded-lg"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Files;
