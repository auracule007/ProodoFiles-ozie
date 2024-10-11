import React, { useContext, useState } from "react";
import FilesContext from "../context/FilesContext";
import { FaRecycle } from "react-icons/fa";
import { TbTagStarred } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdFolderZip } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";

function FolderItems({
  folder,
  handledelete,
  handleFolderClick,
  handleBinned,
  handleStarred,
  handleRename, // New handler for renaming
  isFolderBin = false,
}) {
  const { getFolderItems, zipFolder, sharedFolder, getFolders, getAllFolders } =
    useContext(FilesContext);
  const [isFolderRename, setFolderRenaming] = useState(false); // To track renaming state
  const [newFolderName, setNewFolderName] = useState(folder?.name); // For renaming input

  // Track whether the input is in edit mode
  const handleRenameSubmit = () => {
    if (newFolderName.trim() && newFolderName !== folder.name) {
      handleRename(folder.id, newFolderName); // Pass new folder name to handler
      setFolderRenaming(false); // Close the renaming input after saving
    }
  };

  const handleRenameKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRenameSubmit(); // Handle rename on pressing Enter key
    }
  };

  const handleZipFolder = () => {
    zipFolder(folder.id);
    getAllFolders();
  };

  const handleSharedFolder = () => {
    sharedFolder(folder.id);
    getFolders();
  };

  return (
    <div className="w-full h-full p-2 border rounded-md shadow-md z-10">
      <div className="cursor-pointer z-10 relative">
        <img
          src="/img/folder5.png"
          className="md:w-full relative z-0 md:h-48 object-cover"
          alt={`${folder?.name} thumbnail`}
        />
        <button
          className="absolute top-0 left-[85%] z-10"
          onClick={handleZipFolder}
          type="button"
          title="Zip Folder"
        >
          <MdFolderZip className="text-xl" />
        </button>
        <button
          className="absolute top-0 left-[60%] z-10"
          onClick={handleSharedFolder}
          type="button"
          title="Share Folder"
        >
          <CiShare1 className="text-xl" />
        </button>
        <div className="md:pt-2">
          {!isFolderRename ? (
            <h2
              className="text-start flex flex-wrap items-center text-[10px] justify-center gap-2 cursor-pointer"
              onClick={() => setFolderRenaming(true)} // Switch to renaming input on click
            >
              {folder?.name}
            </h2>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={handleRenameKeyPress} // Submit on "Enter"
                className="border w-full p-1 text-[10px] rounded-md"
                style={{
                  width: "100%",
                  maxWidth: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              />
              <button
                type="button"
                className="bg-green-500 text-white text-[10px] px-2 py-1 rounded"
                onClick={handleRenameSubmit}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
      {!isFolderBin && (
        <div className="flex justify-between mt-2">
          <button
            type="button"
            onClick={() => handleBinned(folder.id)}
            className="bg-yellow-500 text-white px-1 py-1 rounded"
            aria-label="Move to Bin"
            title="Move to Bin"
          >
            <FaRecycle />
          </button>
          <button
            type="button"
            onClick={() => handledelete(folder.id)}
            className="bg-red-500 text-white px-1 py-1 rounded"
            aria-label="Delete Folder"
            title="Delete Folder"
          >
            <AiOutlineDelete />
          </button>

          <button
            type="button"
            onClick={() => handleStarred(folder.id)}
            className="bg-blue-500 text-white px-1 py-1 rounded"
            aria-label="Star Folder"
            title="Star Folder"
          >
            <TbTagStarred />
          </button>

          <button
            type="button"
            onClick={() => setFolderRenaming(true)} // Show input to rename
            className="bg-green-500 text-white px-1 py-1 rounded"
            aria-label="Rename Folder"
            title="Rename Folder"
          >
            <MdDriveFileRenameOutline />
          </button>
        </div>
      )}
    </div>
  );
}

export default FolderItems;



// import React, { useContext, useState } from "react";
// import FilesContext from "../context/FilesContext";
// import { FaRecycle } from "react-icons/fa";
// import { TbTagStarred } from "react-icons/tb";
// import { AiOutlineDelete } from "react-icons/ai";
// import { MdDriveFileRenameOutline } from "react-icons/md";
// import { MdFolderZip } from "react-icons/md";
// import { CiShare1 } from "react-icons/ci";

// function FolderItems({
//   folder,
//   handledelete,
//   handleFolderClick,
//   handleBinned,
//   handleStarred,
//   handleRename, // New handler for renaming
//   isFolderBin = false,
// }) {
//   const { getFolderItems, zipFolder, sharedFolder, getFolders, getAllFolders } =
//     useContext(FilesContext);
//   const [isFolderRename, setFolderRenaming] = useState(false); // To track renaming state
//   const [newFolderName, setNewFolderName] = useState(folder?.name); // For renaming input
//   {console.log(folder.id)}
//   const handleClick = () => {
//     getFolderItems(folder.id);
//   };
//   const handleSubfolderClick = () => {
//     // getFolderItems(folder.id);
//     // handleFolderClick(folder.id);
//     handleFolderClick(folder.id);
//   };


//   const handleRenameSubmit = () => {
//     // if (newFolderName.trim() && newFolderName !== folder.name) {
//     handleRename(folder.id, newFolderName); // Pass new folder name to handler
//     setFolderRenaming(false); // Close the renaming input
//     // }
//   };

//   const handleZipFolder = () => {
//     // console.log("zipped")
//     zipFolder(folder.id);
//     getAllFolders();
//   };
//   const handleSharedFolder = () => {
//     // console.log("zipped")
//     sharedFolder(folder.id);
//     getFolders();
//   };

//   return (
//     <div className="w-full h-full p-2 border rounded-md shadow-md z-10">
//       <div className="cursor-pointer z-10 relative">
//         <img
//           src="/img/folder5.png"
//           className="md:w-full relative z-0 md:h-48 object-cover"
//           alt={`${folder?.name} thumbnail`}
//         />
//         <button
//           className="absolute top-0 left-[85%] z-10"
//           onClick={handleZipFolder}
//           type="button"
//           title="Zip Folder"
//         >
//           <MdFolderZip className="text-xl" />
//         </button>
//         <button
//           className="absolute top-0 left-[60%] z-10"
//           onClick={handleSharedFolder}
//           type="button"
//           title="Share Folder"
//         >
//           <CiShare1 className="text-xl" />
//         </button>
//         <div className="md:pt-2">
//           {!isFolderRename ? (
//             <h2 className="text-start flex flex-wrap items-center text-[10px] justify-center gap-2">
//               {folder?.name}
//             </h2>
//           ) : (
//             <div className="flex items-center justify-center gap-2">
//               <input
//                 type="text"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 className="border w-full p-1 text-[10px] rounded-md"
//                 style={{
//                   width: "100%",
//                   maxWidth: "120px",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               />
//               <button
//                 type="button"
//                 className="bg-green-500 text-white text-[10px] px-2 py-1 rounded"
//                 onClick={handleRenameSubmit}
//               >
//                 Save
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       {!isFolderBin && (
//         <div className="flex justify-between mt-2">
//           <button
//             type="button"
//             onClick={() => handleBinned(folder.id)}
//             className="bg-yellow-500 text-white px-1 py-1 rounded"
//             aria-label="Move to Bin"
//             title="Move to Bin"
//           >
//             <FaRecycle />
//           </button>
//           <button
//             type="button"
//             onClick={() => handledelete(folder.id)}
//             className="bg-red-500 text-white px-1 py-1 rounded"
//             aria-label="Delete Folder"
//             title="Delete Folder"
//           >
//             <AiOutlineDelete />
//           </button>

//           <button
//             type="button"
//             onClick={() => handleStarred(folder.id)}
//             className="bg-blue-500 text-white px-1 py-1 rounded"
//             aria-label="Star Folder"
//             title="Star Folder"
//           >
//             <TbTagStarred />
//           </button>

//           <button
//             type="button"
//             onClick={() => setFolderRenaming(true)} // Show input to rename
//             className="bg-green-500 text-white px-1 py-1 rounded"
//             aria-label="Rename Folder"
//             title="Rename Folder"
//           >
//             <MdDriveFileRenameOutline />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FolderItems;

// function FolderItems({
//   folder,
//   handledelete,
//   handleFolderClick,
//   handleBinned,
//   handleStarred,
//   handleRename, // New handler for renaming
//   isFolderBin = false
// }) {
//   const { getFolderItems, zipFolder, sharedFolder } = useContext(FilesContext);
//   const [isRenaming, setIsRenaming] = useState(false);  // To track renaming state
//   const [newFolderName, setNewFolderName] = useState(folder?.name);  // For renaming input

//   const handleClick = () => {
//     getFolderItems(folder.id);
//     handleFolderClick(folder.id);
//   };

//   const handleRenameSubmit = () => {
//     handleRename(folder.id, newFolderName);  // Pass new folder name to handler
//     setIsRenaming(false);  // Close the renaming input
//   };

//   const handleZipFolder =  () => {
//     // console.log("zipped")
//     zipFolder(folder.id)
//   }
//   const handleSharedFolder =  () => {
//     // console.log("zipped")
//     sharedFolder(folder.id)
//   }

//   return (
//     <div className="w-full h-full p-2 border rounded-md shadow-md z-10">
//       <div onClick={handleClick} className="cursor-pointer z-10 relative">
//         <img
//           src="/img/folder5.png"
//           className="md:w-full relative z-0 md:h-48 object-cover"
//           alt={`${folder?.name} thumbnail`}
//         />
//         <button className="absolute top-0 left-[85%] z-10" onClick={handleZipFolder} type="button">
//             <MdFolderZip className="text-xl"  />
//         </button>
//         <button className="absolute top-0 left-[60%] z-10" onClick={handleSharedFolder} type="button">
//         <CiShare1 className="text-xl"  />
//         </button>
//         <div className="md:pt-2">
//           {!isRenaming ? (
//             <h2 className="text-start flex flex-wrap items-center text-[10px] justify-center gap-2">
//               {folder?.name}
//             </h2>
//           ) : (
//             <div className="flex items-center justify-center gap-2">
//               <input
//                 type="text"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 className="border w-full p-1 text-[10px] rounded-md"
//                 style={{
//                   width: "100%",
//                   maxWidth: "120px", // Ensures the input fits within the parent
//                   overflow: "hidden",
//                   textOverflow: "ellipsis"
//                 }}
//               />
//               <button
//                 type="button"
//                 className="bg-green-500 text-white text-[10px] px-2 py-1 rounded"
//                 onClick={handleRenameSubmit}
//               >
//                 Save
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {!isFolderBin && (
//         <div className="flex justify-between mt-2">
//           <button
//             type="button"
//             onClick={() => handledelete(folder.id)}
//             className="bg-red-500 text-white px-1 py-1 rounded"
//             aria-label="Delete Folder"
//           >
//             <AiOutlineDelete />
//           </button>

//           <button
//             type="button"
//             onClick={() => handleBinned(folder.id)}
//             className="bg-yellow-500 text-white px-1 py-1 rounded"
//             aria-label="Move to Bin"
//           >
//             <FaRecycle />
//           </button>

//           <button
//             type="button"
//             onClick={() => handleStarred(folder.id)}
//             className="bg-blue-500 text-white px-1 py-1 rounded"
//             aria-label="Star Folder"
//           >
//             <TbTagStarred />
//           </button>

//           <button
//             type="button"
//             onClick={() => setIsRenaming(true)}  // Show input to rename
//             className="bg-green-500 text-white px-1 py-1 rounded"
//             aria-label="Rename Folder"
//           >
//             <MdDriveFileRenameOutline />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FolderItems;

// import React, { useContext } from "react";
// import FilesContext from "../context/FilesContext";
// import { FaRecycle } from "react-icons/fa";
// import { TbTagStarred } from "react-icons/tb";
// import { AiOutlineDelete } from "react-icons/ai";
// import { MdDriveFileRenameOutline } from "react-icons/md";

// function FolderItems({
//   folder,
//   handledelete,
//   handleFolderClick,
//   handleBinned,
//   handleStarred,
//   isFolderBin = false // New prop to determine if in FolderBin
// }) {
//   const { getFolderItems } = useContext(FilesContext);

//   const handleClick = () => {
//     console.log("folderitem", folder.id);
//     getFolderItems(folder.id); // Load contents when folder is clicked
//     handleFolderClick(folder.id);
//   };

//   return (
//     <div className="w-full h-full p-2 border rounded-md shadow-md">
//       <div onClick={handleClick} className="cursor-pointer">
//         <img
//           src="/img/folder5.png"
//           className="md:w-full md:h-48 object-cover"
//           alt={`${folder?.name} thumbnail`}
//         />
//         <div className="md:pt-2">
//           <h2 className="text-start flex flex-wrap items-center text-[10px] justify-center gap-2">
//             {folder?.name}
//           </h2>
//         </div>
//       </div>

//       {/* Render buttons only if not in FolderBin */}
//       {!isFolderBin && (
//         <div className="flex justify-between mt-2">
//           {/* Delete button */}
//           <button
//             type="button"
//             onClick={() => handledelete(folder.id)}
//             className="bg-red-500 text-white px-1 py-1 rounded"
//             aria-label="Delete Folder"
//           >
//            <AiOutlineDelete />
//           </button>

//           {/* Bin button */}
//           <button
//             type="button"
//             onClick={() => handleBinned(folder.id)}
//             className="bg-yellow-500 text-white px-1 py-1 rounded"
//             aria-label="Move to Bin"
//           >
//             <FaRecycle />
//           </button>

//           {/* Starred button */}
//           <button
//             type="button"
//             onClick={() => handleStarred(folder.id)}
//             className="bg-blue-500 text-white px-1 py-1 rounded"
//             aria-label="Star Folder"
//           >
//              <TbTagStarred />
//           </button>

//           {/* Edit button */}
//           <button
//             type="button"
//             onClick={() => handleStarred(folder.id)}
//             className="bg-green-500 text-white px-1 py-1 rounded"
//             aria-label="Edit Folder"
//           >
//              <MdDriveFileRenameOutline />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FolderItems;

// import React, { useContext } from "react";
// import FilesContext from "../context/FilesContext";
// import { FaRecycle } from "react-icons/fa";
// import { TbTagStarred } from "react-icons/tb";
// import { AiOutlineDelete } from "react-icons/ai";

// function FolderItems({ folder, handledelete, handleFolderClick, handleBinned, handleStarred }) {
//   const { getFolderItems } = useContext(FilesContext);

//   const handleClick = () => {
//     {console.log("folderitem",folder.id)}

//     getFolderItems(folder.id);  // Load contents when folder is clicked
//     handleFolderClick(folder.id);
//   };

//   return (
//     <div className="w-full h-full p-2 border rounded-md shadow-md">
//       <div onClick={handleClick} className="cursor-pointer">
//         <img
//           src="/img/folder5.png"
//           className="md:w-full md:h-48 object-cover"
//           alt={`${folder?.name} thumbnail`}
//         />
//         <div className="md:pt-2">
//           <h2 className="text-start flex flex-wrap items-center text-[10px] justify-center gap-2">
//             {folder?.name}
//           </h2>
//         </div>
//       </div>
//       <div className="flex justify-between mt-2">
//         {/* Delete button */}
//         <button
//           type="button"
//           onClick={() => handledelete(folder.id)}
//           className="bg-red-500 text-white px-2 py-1 rounded"
//           aria-label="Delete Folder"
//         >
//           <AiOutlineDelete />
//         </button>

//         {/* Binned button */}
//         <button
//           type="button"
//           onClick={() => handleBinned(folder.id)}
//           className="bg-yellow-500 text-white px-2 py-1 rounded"
//           aria-label="Move to Bin"
//         >
//          <FaRecycle />
//         </button>

//         {/* Starred button */}
//         <button
//           type="button"
//           onClick={() => handleStarred(folder.id)}
//           className="bg-blue-500 text-white px-2 py-1 rounded"
//           aria-label="Star Folder"
//         >
//           <TbTagStarred />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FolderItems;

// import React, { useContext } from "react";
// import FilesContext from "../context/FilesContext";

// function FolderItems({ folder, handledelete, handleBinned, handleStarred }) {
//   const { getFolderItems } = useContext(FilesContext);

//   const handleClick = () => {
//     getFolderItems(folder.id);  // Load contents when folder is clicked
//   };

//   return (
//     <button type="button" onClick={handleClick}>
//       <div className="w-full h-full">
//         <img
//           src="/img/folder5.png"
//           className="md:w-full md:h-48 object-cover"
//           alt={`${folder?.name} thumbnail`}
//         />
//         <div className="md:pt-2">
//           <h2 className="text-start flex flex-wrap items-center text-[10px] justify-center gap-2">
//             {folder?.name}
//           </h2>
//           {/* Delete button for folder */}
//           <button type="submit" onClick={() => handledelete(folder?.id)}>
//             Delete
//           </button>
//           <button type="submit" onClick={() => handleBinned(folder?.id)}>
//             Binned
//           </button>
//           <button type="submit" onClick={() => handleStarred(folder?.id)}>
//             Starred
//           </button>
//         </div>
//       </div>
//     </button>
//   );
// }

// export default FolderItems;

// function FolderItems({ folder }) {
//   const { getFolderItems } = useContext(FilesContext);

//   const handleClick = () => {
//     getFolderItems(folder.id);
//   };

//   return (
//     <button type="button" onClick={handleClick}>
//       <div className="w-full h-full">
//         <img
//           src="/img/folder5.png"
//           className="md:w-full md:h-48 object-cover"
//           alt={`${folder?.name} thumbnail`}
//         />
//         <div className="md:pt-2">
//           <h2 className="text-start flex flex-wrap items-center text-[10px] justify-center gap-2">
//             {folder?.name}
//           </h2>
//         </div>
//       </div>
//     </button>
//   );
// }

// export default FolderItems;
