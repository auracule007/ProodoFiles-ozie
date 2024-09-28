import React, { useContext, useState } from "react";
import Card from "../components/shared/Card";
import FilesContext from "../context/FilesContext";
import FolderItems from "./FolderItems";
import FolderFiles from "./FolderFiles";

const Folder = () => {
  const { folder, createFolder, getFolderItems, deleteFolder, binFolder, starredFolder } = useContext(FilesContext);
  const [folderName, setFolderName] = useState("");
  const [parentFolderId, setParentFolderId] = useState(null);  // Tracks the current folder for subfolders

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      createFolder(folderName, parentFolderId);  // Pass the parentFolderId if we're inside a folder
      setFolderName("");
    }
  };

  // When a folder is clicked, set it as the parent folder for subfolder creation
  const handleFolderClick = (folderId) => {
    setParentFolderId(folderId);  // Store the folder's id as the parent_folder_id
    getFolderItems(folderId);     // Fetch and display items inside the clicked folder
  };

  const handleDelete = (folderId) => {
    deleteFolder(folderId);
  };

  const handleBinned = (folderId) => {
    binFolder(folderId);
  };

  const handleStarred = (folderId) => {
    starredFolder(folderId);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 md:gap-4 justify-center items-center">
        <form onSubmit={handleCreateFolder}>
          <h1>{parentFolderId ? "Create Subfolder" : "Create Root-Level Folder"}</h1>
          <Card className="flex flex-1 space-x-1">
            <input
              type="text"
              className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
              placeholder="New folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <input
              type="hidden"
              className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
              placeholder="New folder name"
              value={parentFolderId}
              onChange={(e) => setParentFolderId(e.target.value)}
            />
            <button type="submit">Create</button>
          </Card>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 justify-center items-center mt-4">
        {Array.isArray(folder) && folder.length > 0 ? (
          folder.map((file) => (
            <Card
              key={file.id}
              className="md:p-2 cursor-pointer"
              onClick={() => handleFolderClick(file.id)}  // Set this folder as the parent for subfolders
            >
              <FolderItems
                folder={file}
                handleBinned={handleBinned}
                handleStarred={handleStarred}
                handledelete={handleDelete}
              />
            </Card>
          ))
        ) : (
          <p>No folders available</p>
        )}
      </div>

      <div>
        <FolderFiles />
      </div>
    </>
  );
};


export default Folder;












// function Folder({ selectedFormat }) {
//   const { folder, createFolder } = useContext(FilesContext); // Assuming you can fetch folder items by folder ID
//   const [folderName, setFolderName] = useState("");

//   const handleCreateFolder = async (e) => {
//     e.preventDefault();
//     if (folderName.trim()) {
//       createFolder(folderName);
//       setFolderName("");
//     }
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-1 md:gap-4 justify-center items-center">
//         <form onSubmit={handleCreateFolder}>
//           <h1>My folder</h1>
//           <Card className={"flex flex-1 space-x-1"}>
//             <input
//               type="text"
//               className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
//               placeholder="New folder name"
//               value={folderName}
//               onChange={(e) => setFolderName(e.target.value)}
//             />
//             <button type="submit">Create</button>
//           </Card>
//         </form>
//       </div>

//       {/* Display folders */}
//       <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 justify-center items-center mt-4">
//         {folder.map((file) => (
//           <Card
//             key={file.id}
//             className="md:p-2 cursor-pointer"
//           >
//             <FolderItems folder={file} />
//           </Card>
//         ))}
//       </div>

//       <div>
//         <FolderFiles />
//       </div>
//     </>
//   );
// }

// export default Folder;