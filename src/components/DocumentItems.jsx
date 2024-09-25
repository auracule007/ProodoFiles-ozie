import React from "react";
import { MdFileDownload } from "react-icons/md";

function DocumentItems({ document }) {
  return (
    <div className="w-full h-full">
      <img
        src={document.path}
        className="md:w-full md:h-48 object-cover"
        alt={`${document.title} thumbnail`}
      />
      <div className="md:pt-2">
        <h2 className="text-start flex flex-wrap items-center justify-center gap-2">{document.title} 
          <a href={document.path} download><MdFileDownload className="text-xl" /></a>
        </h2>
      </div>
    </div>
  );
}

export default DocumentItems;
