import React, { useContext } from "react";
import FilesContext from "../../context/FilesContext";
import FolderItems from "../FolderItems";
import DocumentItems from "../DocumentItems";

function FolderBin() {
  const { binned, setBinned, deleteFolder } = useContext(FilesContext);
  const handleDelete = (folderId) => {
    deleteFolder(folderId);
  };


  // Function to handle folder deletion
  // const handleDelete = (folderId) => {
  //   const updatedBinnedFolders = binned.binned_folders.filter((folder) => folder.id !== folderId);
  //   setBinned({
  //     ...binned,
  //     binned_folders: updatedBinnedFolders,
  //   });
  // };

  return (
    <div>
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
          {binned?.binned_folders?.map((bin) => (
            <FolderItems 
            key={bin.id}
            folder={bin} 
            handledelete={() => handleDelete(bin.id)} 
            // handleFolderClick={handleFolderClick} 
            // handleBinned={handleRestore} 
            // handleStarred={handleStarred} 
            isFolderBin={true} // In FolderBin
          />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
          {binned?.binned_files?.map((bin) => (
            <DocumentItems 
            key={bin.id}
            document={bin} 
            // handledelete={() => handleDelete(bin.id)} 
            // handleFolderClick={handleFolderClick} 
            // handleBinned={handleRestore} 
            // handleStarred={handleStarred} 
            isFolderBin={true} // In FolderBin
          />
          ))}
        </div>

        
      </>
    </div>
  );
}

export default FolderBin;









// import React, { useContext } from "react";
// import FilesContext from "../../context/FilesContext";
// import FolderItems from "../FolderItems";

// function FolderBin() {
//   const { binned } = useContext(FilesContext);
//   return (
//     <div>
//       {/* {binned.length > 0 ? ( */}
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
//             {binned.binned_folders.map((bin) => (
//               <FolderItems folder={bin} />
//             ))}
//           </div>
//         </>
//       {/* ) : (
//         <h1>No folders in trash can</h1>
//       )} */}
//     </div>
//   );
// }

// export default FolderBin;
