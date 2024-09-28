import React, { useContext, useState } from "react";
import Card from "../shared/Card";
import FilesContext from "../../context/FilesContext";

function Uploads() {
  const { isAuthenticated, folder, createFolder, uploadFiles } = useContext(FilesContext);
  const [folderName, setFolderName] = useState(""); // State for new folder name
  const [selectedFiles, setSelectedFiles] = useState([]); // State for selected files
  const [selectedFolder, setSelectedFolder] = useState(""); // State for selected folder ID

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      createFolder(folderName); // Call createFolder with the folder name
      setFolderName(""); // Reset input field
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length && selectedFolder) {
      const filesArray = Array.from(selectedFiles); // Convert FileList to array
      await uploadFiles(filesArray, selectedFolder); // Pass array instead of FileList
      setSelectedFiles([]); // Reset after upload
      setSelectedFolder(""); // Reset selected folder
    }
  };
  

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 justify-center items-center gap-3">
        <div>

          <form onSubmit={handleCreateFolder}>
            <h1 className="text-3xl font-bold">My folder</h1>
            <Card className={"flex flex-1 space-x-1"}>
              <input
                type="text"
                className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
                placeholder="New folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)} // Handle input change
              />
              <button type="submit">Create</button>
            </Card>
          </form>

          <Card>
            <h1 className="text-3xl font-bold">Upload Document</h1>
            <form onSubmit={handleUpload}>
              <div className="mb-6">
                <label htmlFor="folder" className="capitalize">
                  Select Folder
                </label>
                <select
                  className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)} // Handle folder selection
                >
                  <option value="">Select a folder</option>
                  {folder.map((items) => (
                    <option key={items.id} value={items.id}>
                      {items.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="file" className="capitalize">
                  Select Files
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange} // Handle file selection
                  className="w-full bg-[#ccc4] rounded-lg p-1 border-none outline-none"
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-[#0F8B8D] w-24 p-2 text-white"
                >
                  Upload
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Uploads;
