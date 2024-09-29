import React, { useContext } from "react";
import FilesContext from "../context/FilesContext";
import { FaRecycle } from "react-icons/fa";
import { TbTagStarred } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";

function FolderItems({ folder, handledelete, handleBinned, handleStarred }) {
  const { getFolderItems } = useContext(FilesContext);

  const handleClick = () => {
    getFolderItems(folder.id);  // Load contents when folder is clicked
  };

  return (
    <div className="w-full h-full p-2 border rounded-md shadow-md">
      <div onClick={handleClick} className="cursor-pointer">
        <img
          src="/img/folder5.png"
          className="md:w-full md:h-48 object-cover"
          alt={`${folder?.name} thumbnail`}
        />
        <div className="md:pt-2">
          <h2 className="text-start flex flex-wrap items-center text-[10px] justify-center gap-2">
            {folder?.name}
          </h2>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        {/* Delete button */}
        <button 
          type="button" 
          onClick={() => handledelete(folder?.id)} 
          className="bg-red-500 text-white px-2 py-1 rounded"
          aria-label="Delete Folder"
        >
          <AiOutlineDelete />
        </button>

        {/* Binned button */}
        <button 
          type="button" 
          onClick={() => handleBinned(folder.id)} 
          className="bg-yellow-500 text-white px-2 py-1 rounded"
          aria-label="Move to Bin"
        >
         <FaRecycle />
        </button>

        {/* Starred button */}
        <button 
          type="button" 
          onClick={() => handleStarred(folder.id)} 
          className="bg-blue-500 text-white px-2 py-1 rounded"
          aria-label="Star Folder"
        >
          <TbTagStarred />
        </button>
      </div>
    </div>
  );
}

export default FolderItems;

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
