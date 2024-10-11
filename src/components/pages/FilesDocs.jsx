import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Files from "../Files";
import Documents from "../Documents";
import { FaSearch } from "react-icons/fa";
import Card from "../shared/Card";
import FilesContext from "../../context/FilesContext";
import Loaders from "../shared/Loaders";

function FilesDocs() {
  const [selectedFormat, setSelectedFormat] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { isAuthenticated, getFiles } = useContext(FilesContext);
  
  // if(isAuthenticated){
  //   return <Navigate to="/dashboard" />
  // }

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        // Fetch the files using the getFiles method and the selected format
        await getFiles(selectedFormat); 

      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false); // Turn off loader once files are fetched
      }
    };

    fetchFiles();
  }, []); // Re-fetch files when selectedFormat changes

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 md:gap-4 justify-center items-center">
        <form action="">
          <h1>My Files</h1>
          <Card className={"flex flex-1 space-x-1"}>
            <input
              type="text"
              className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
            />
            <button type="submit">
              <FaSearch />
            </button>
          </Card>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 md:gap-4 justify-center items-center">
        <Card className={"flex flex-1 space-x-1"}>
          <select
            onChange={handleFormatChange}
            className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
            value={selectedFormat}
          >
            <option value="">All Formats</option>
            <option value="pdf">PDF</option>
            <option value="mp3">MP3</option>
            <option value="mp4">MP4</option>
          </select>
        </Card>
      </div>

      {/* Show a loader when files are being fetched */}
      {isLoading ? (
        // <div>Loading Files...</div>
        <Loaders />
      ) : (
        <>
          {/* Pass the selectedFormat as a prop to the Documents component */}
          <Documents selectedFormat={selectedFormat} />
        </>
      )}
    </div>
  );
}

export default FilesDocs;





// import React, { useContext, useState } from "react";
// import { Navigate } from "react-router-dom";
// import Files from "../Files";
// import Documents from "../Documents";
// import { FaSearch } from "react-icons/fa";
// import Card from "../shared/Card";
// import FilesContext from "../../context/FilesContext";

// function FilesDocs() {
//   const [selectedFormat, setSelectedFormat] = useState("");
//   const { isAuthenticated} = useContext(FilesContext);

//   if(!isAuthenticated){
//     return <Navigate to="/" />
//   }

//   const handleFormatChange = (e) => {
//     setSelectedFormat(e.target.value);
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-1 md:gap-4 justify-center items-center">
//         <form action="">
//           <h1>My Files</h1>
//           <Card className={"flex flex-1 space-x-1"}>
//             <input
//               type="text"
//               className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
//             />
//             <button type="submit">
//               <FaSearch />
//             </button>
//           </Card>
//         </form>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-1 md:gap-4 justify-center items-center">
//         <Card className={"flex flex-1 space-x-1"}>
//           <select
//             onChange={handleFormatChange}
//             className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
//             value={selectedFormat}
//           >
//             <option value="">All Formats</option>
//             <option value="pdf">PDF</option>
//             <option value="mp3">MP3</option>
//             <option value="mp4">MP4</option>
//           </select>
//         </Card>
//       </div>

//       {/* Pass the selectedFormat as a prop */}
//       <Documents selectedFormat={selectedFormat} />
//     </div>
//   );
// }
// export default FilesDocs;

  //   return (
  //     <div>
  //         <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
  //             <form action="">
  //                 <h1>My Files</h1>
  //                 <Card className={"flex flex-1 space-x-1"}>
  //                     <input type="text" name="" id="" className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none" />
  //                     <button type="submit"><FaSearch /></button>
  //                 </Card>
  //             </form>
  //         </div>
  //         <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 justify-center items-center">
  //             <Card className={"flex flex-1 space-x-1"}>
  //                 <select name="" id="" className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none">
  //                     <option value="">Pdf</option>
  //                     <option value="">mp3</option>
  //                     <option value="">mp4</option>
  //                 </select>
  //             </Card>
  //         </div>
  //         <Documents />
  //     </div>
  //   )

