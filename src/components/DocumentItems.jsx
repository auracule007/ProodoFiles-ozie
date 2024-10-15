import React, { useContext, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRecycle } from "react-icons/fa";
import { TbTagStarred } from "react-icons/tb";
import { MdDriveFileRenameOutline, MdFileDownload } from "react-icons/md";
import FilesContext from "../context/FilesContext";

function DocumentItems({ document }) {
  const { deleteDocument, binDocument, starredDocument, renameFile, downloadFile } = useContext(FilesContext);
  const [isRenaming, setIsRenaming] = useState(false); 
  const [newDocumentName, setNewDocumentName] = useState(document?.name);  

  // Handle renaming document
  const handleRenameSubmit = () => {
    if (newDocumentName.trim() && newDocumentName !== document.name) {
      renameFile(document.id, newDocumentName);
      setIsRenaming(false);
    }
  };

  // Trigger download
  const downloadHandler = () => {
    try {
      downloadFile(document.id);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Handle renaming on key press (Enter)
  const handleRenameKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRenameSubmit();
    }
  };

  return (
    <div className="w-full h-full p-2 border rounded-md shadow-md">
      <div className="cursor-pointer">
        <img
          src={"/img/download.jpeg"}
          className="md:w-[60%] md:h-auto object-cover"
          alt={`${document.name} thumbnail`}
        />
  {console.log(document.id)}
        <div className="md:pt-2">
          {!isRenaming ? (
            <h2
              className="text-start text-[12px] cursor-pointer"
              onClick={() => setIsRenaming(true)} // Toggle renaming input
            >
              {document?.name}
            </h2>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newDocumentName}
                onChange={(e) => setNewDocumentName(e.target.value)}
                onKeyPress={handleRenameKeyPress} // Rename on Enter key
                className="border w-full p-1 text-[12px] rounded-md"
              />
              <button
                type="button"
                className="bg-green-500 text-white text-xs px-2 py-1 rounded"
                onClick={handleRenameSubmit}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <button
          type="button"
          onClick={() => starredDocument(document.id)}
          className="bg-blue-500 text-white px-1 py-1 rounded"
          aria-label="Star Document"
          title="Star Document"
        >
          <TbTagStarred />
        </button>

        <button
          type="button"
          onClick={() => setIsRenaming(true)} // Show input to rename
          className="bg-green-500 text-white px-1 py-1 rounded"
          aria-label="Rename Document"
          title="Rename Document"
        >
          <MdDriveFileRenameOutline />
        </button>

        <button
          type="button"
          onClick={() => binDocument(document.id)}
          className="bg-yellow-500 text-white px-1 py-1 rounded"
          aria-label="Move to Bin"
          title="Move to Bin"
        >
          <FaRecycle />
        </button>

        {/* <button
          type="button"
          onClick={() => deleteDocument(document.id)}
          className="bg-red-500 text-white px-1 py-1 rounded"
          aria-label="Delete Document"
          title="Delete Document"
        >
          <AiOutlineDelete />
        </button> */}

        <button
          type="button"
          onClick={downloadHandler}
          className="bg-purple-500 text-white px-1 py-1 rounded"
          aria-label="Download Document"
          title="Download Document"
        >
          {/* <a href={document.file} download>
          <MdFileDownload />
          </a> */}
          <MdFileDownload />
          
        </button>
      </div>
    </div>
  );
}

export default DocumentItems;





// import React, { useContext, useState } from "react";
// import { MdFileDownload } from "react-icons/md";
// import FilesContext from "../context/FilesContext";
// import { MdDriveFileRenameOutline } from "react-icons/md";

// function DocumentItems({ document }) {
//   const { downloadFile, renameFile } = useContext(FilesContext);
//   const [isRenaming, setIsRenaming] = useState(false); 
//   const [newdocumentName, setNewDocumentName] = useState(document?.name);  

//   const handleRenameSubmit = () => {
//     renameFile(document.id, newdocumentName);
//     setIsRenaming(false);
//   };

//   const downloadHandler = () => {
//     try {
//       downloadFile(document.id);
//     } catch (error) {
//       console.error("Download failed:", error);
//     }
//   };
//   return (
//     <div className="w-full h-full">
//       <img
//         // src={document.thumbnail}
//         src={"/img/download.jpeg"}
//         // src={document.path}
//         className="md:w-[60%] md:h-auto object-cover"
//         alt={`${document.name} thumbnail`}
//       />

//       <div className="md:pt-2">
//         {!isRenaming ? (
//           <h2 className="text-start flex flex-wrap items-center text-[10px] justify-center gap-2">
//             {/* {document?.name} */}
//           </h2>
//         ) : (
//           <div className="flex items-center justify-center gap-2">
//             <input
//               type="text"
//               value={newdocumentName}
//               onChange={(e) => setNewDocumentName(e.target.value)}
//               className="border w-full p-1 text-[10px] rounded-md"
//               style={{
//                 width: "100%",
//                 maxWidth: "120px", // Ensures the input fits within the parent
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             />
//             <button
//               type="button"
//               className="bg-green-500 text-white text-[10px] px-2 py-1 rounded"
//               onClick={handleRenameSubmit}
//             >
//               Save
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="md:pt-2">
//         <h2 className="text-start flex flex-wrap items-center justify-center text-[10px] gap-2">
//           {document.name}
//           <button
//             type="button"
//             onClick={() => setIsRenaming(true)} // Show input to rename
//             className="bg-green-500 text-white px-1 py-1 rounded"
//             aria-label="Rename Folder"
//           >
//             <MdDriveFileRenameOutline />
//           </button>

//           <button type="button" onClick={downloadHandler}>
//             <MdFileDownload className="text-[18px]" />
//           </button>
//           {/* <a href={document.path} download><MdFileDownload className="text-[8px]" /></a> */}
//         </h2>
//       </div>
//     </div>
//   );
// }

// export default DocumentItems;

// import React, {useContext} from "react";
// import { MdFileDownload } from "react-icons/md";
// import FilesContext from "../context/FilesContext";

// function DocumentItems({ document }) {
//   const {downloadFile} = useContext(FilesContext);

//   const downloadHandler = () => {
//     try {
//       downloadFile(document.id); // Pass the document's ID to downloadFile
//     } catch (error) {
//       console.error("Download failed:", error);
//     }
//   };
//   return (
//     <div className="w-full h-full">
//       <img
//         src={"/img/download.jpeg"}
//         // src={document.path}
//         className="md:w-[60%] md:h-auto object-cover"
//         alt={`${document.name} thumbnail`}
//       />
//       <div className="md:pt-2">
//         <h2 className="text-start flex flex-wrap items-center justify-center text-[10px] gap-2">{document.name}
//           <button type="button" onClick={downloadHandler}>
//               <MdFileDownload className="text-[18px]" />
//           </button>
//           {/* <a href={document.path} download><MdFileDownload className="text-[8px]" /></a> */}
//         </h2>
//       </div>
//     </div>
//   );
// }

// export default DocumentItems;
