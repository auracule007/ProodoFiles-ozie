import React, { useState } from "react";
import Files from "../Files";
import Documents from "../Documents";
import { FaSearch } from "react-icons/fa";
import Card from "../shared/Card";

function FilesDocs() {
  const [selectedFormat, setSelectedFormat] = useState("");

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

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

      {/* Pass the selectedFormat as a prop */}
      <Documents selectedFormat={selectedFormat} />
    </div>
  );
}
export default FilesDocs;

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

