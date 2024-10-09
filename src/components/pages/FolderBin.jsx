import React, { useContext, useEffect, useState } from "react";
import FilesContext from "../../context/FilesContext";
import FolderItems from "../FolderItems";
import DocumentItems from "../DocumentItems";
import Loaders from "../shared/Loaders";

function FolderBin() {
  const { binned, deleteFolder, viewBin } = useContext(FilesContext); // Assuming viewBin exists
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch the binned folders and files when the component mounts
  useEffect(() => {
    const fetchBinnedItems = async () => {
      setIsLoading(true); // Start loading
      try {
        await viewBin(); // Assuming this function fetches binned items
      } catch (error) {
        console.error("Error fetching binned items:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetch completes
      }
    };

    fetchBinnedItems(); // Call the fetch function on component mount
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  const handleDelete = (folderId) => {
    deleteFolder(folderId); // Function to handle permanent folder deletion
  };

  return (
    <div>
      <>
        <h1>My Bin</h1>
        {isLoading ? ( // Show loading state while fetching data
          // <p>Loading bin items...</p>
          <Loaders />
        ) : (
          <>
            {/* Render binned folders */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
              {binned?.binned_folders?.map((bin) => (
                <FolderItems
                  key={bin.id}
                  folder={bin}
                  handledelete={() => handleDelete(bin.id)}
                  isFolderBin={true} // Indicate this is inside the bin
                />
              ))}
            </div>

            {/* Render binned files */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
              {binned?.binned_files?.map((bin) => (
                <DocumentItems
                  key={bin.id}
                  document={bin}
                  isFolderBin={true} // Indicate this is inside the bin
                />
              ))}
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default FolderBin;







// import React, { useContext } from "react";
// import FilesContext from "../../context/FilesContext";
// import FolderItems from "../FolderItems";
// import DocumentItems from "../DocumentItems";

// function FolderBin() {
//   const { binned, setBinned, deleteFolder } = useContext(FilesContext);
//   const handleDelete = (folderId) => {
//     deleteFolder(folderId);
//   };


//   // Function to handle folder deletion
//   // const handleDelete = (folderId) => {
//   //   const updatedBinnedFolders = binned.binned_folders.filter((folder) => folder.id !== folderId);
//   //   setBinned({
//   //     ...binned,
//   //     binned_folders: updatedBinnedFolders,
//   //   });
//   // };

//   return (
//     <div>
//       <>
//       <h1>My Bin</h1>
//         <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
//           {binned?.binned_folders?.map((bin) => (
//             <FolderItems 
//             key={bin.id}
//             folder={bin} 
//             handledelete={() => handleDelete(bin.id)} 
//             // handleFolderClick={handleFolderClick} 
//             // handleBinned={handleRestore} 
//             // handleStarred={handleStarred} 
//             isFolderBin={true} // In FolderBin
//           />
//           ))}
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
//           {binned?.binned_files?.map((bin) => (
//             <DocumentItems 
//             key={bin.id}
//             document={bin} 
//             // handledelete={() => handleDelete(bin.id)} 
//             // handleFolderClick={handleFolderClick} 
//             // handleBinned={handleRestore} 
//             // handleStarred={handleStarred} 
//             isFolderBin={true} // In FolderBin
//           />
//           ))}
//         </div>

        
//       </>
//     </div>
//   );
// }

// export default FolderBin;









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
