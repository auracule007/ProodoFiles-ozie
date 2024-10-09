import React, { useContext, useEffect, useState } from "react";
import FilesContext from "../../context/FilesContext";
import FolderItems from "../FolderItems";
import DocumentItems from "../DocumentItems";
import Loaders from "../shared/Loaders";

function Starred() {
  const { starred, deleteFolder, viewStarredFolders } = useContext(FilesContext);
  const [isLoading, setIsLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const fetchStarredItems = async () => {
      setIsLoading(true);
      try {
        // Fetch the starred folders and files
        await viewStarredFolders();  // Assuming this method exists in the context
      } catch (error) {
        console.error("Error fetching starred items:", error);
      } finally {
        setIsLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchStarredItems(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs once on mount

  const handleDelete = (folderId) => {
    deleteFolder(folderId);
  };

  return (
    <>
      <h1>Starred Folder</h1>

      {isLoading ? ( // Show loading while data is being fetched
        // <p>Loading starred items...</p>
        <Loaders />
      ) : (
        <>
          {/* Render starred folders */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
            {starred?.my_starred_folders?.map((star) => (
              <FolderItems
                key={star.id}
                folder={star}
                handledelete={() => handleDelete(star.id)}
              />
            ))}
          </div>

          {/* Render starred documents */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
            {starred?.my_starred_files?.map((star) => (
              <DocumentItems 
                key={star.id}
                document={star}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Starred;

// import React, { useContext } from "react";
// import FilesContext from "../../context/FilesContext";
// import FolderItems from "../FolderItems";
// import DocumentItems from "../DocumentItems";

// function Starred() {
//   const { starred, deleteFolder } = useContext(FilesContext);

//   const handleDelete = (folderId) => {
//     deleteFolder(folderId);
//   };
//   {console.log(starred)}
//   return (
//     <>
//       <h1>Starred Folder</h1>
//       <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
//       {starred?.my_starred_folders?.map((star) => (
//         <FolderItems
//           key={star.id}
//           folder={star}
//           handledelete={() => handleDelete(star.id)}
//           // isFolderBin={true} // In FolderBin
//         />
//       ))}
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
//       {starred?.my_starred_files?.map((star) => (
//         <DocumentItems 
//           key={star.id}
//           document={star}
//           // handledelete={() => handleDelete(star.id)}
//           // isFolderBin={true} // In FolderBin
//         />
//       ))}
//     </div>

//     </>


//   );
// }

// export default Starred;
