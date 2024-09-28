import React, {useContext} from "react";
import { MdFileDownload } from "react-icons/md";
import FilesContext from "../context/FilesContext";

function DocumentItems({ document }) {
  const {downloadFile} = useContext(FilesContext);

  const downloadHandler = () => {
    try {
      downloadFile(document.id); // Pass the document's ID to downloadFile
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <div className="w-full h-full">
      <img
        src={"/img/download.jpeg"}
        // src={document.path}
        className="md:w-[60%] md:h-auto object-cover"
        alt={`${document.name} thumbnail`}
      />
      <div className="md:pt-2">
        <h2 className="text-start flex flex-wrap items-center justify-center text-[10px] gap-2">{document.name} 
          <button type="button" onClick={downloadHandler}>
              <MdFileDownload className="text-[18px]" />
          </button>
          {/* <a href={document.path} download><MdFileDownload className="text-[8px]" /></a> */}
        </h2>
      </div>
    </div>
  );
}

export default DocumentItems;
