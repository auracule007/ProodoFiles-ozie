import React, { useContext } from "react";
import FilesContext from "../../context/FilesContext";
import FolderItems from "../FolderItems";
import DocumentItems from "../DocumentItems";

function Starred() {
  const { starred, deleteFolder } = useContext(FilesContext);

  const handleDelete = (folderId) => {
    deleteFolder(folderId);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
      {starred?.my_starred_folders?.map((star) => (
        <FolderItems
          key={star.id}
          folder={star}
          handledelete={() => handleDelete(star.id)}
          // isFolderBin={true} // In FolderBin
        />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
      {starred?.my_starred_files?.map((star) => (
        <DocumentItems 
          key={star.id}
          document={star}
          // handledelete={() => handleDelete(star.id)}
          // isFolderBin={true} // In FolderBin
        />
      ))}
    </div>

    </>


  );
}

export default Starred;
