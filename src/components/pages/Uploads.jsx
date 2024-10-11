import React, { useContext, useState } from "react";
import Card from "../shared/Card";
import FilesContext from "../../context/FilesContext";
import ButtonLoader from "../shared/ButtonLoader"; // Keep your ButtonLoader component

function Uploads() {
  const { isAuthenticated, folder, allfolder, createFolder, uploadFiles } =
    useContext(FilesContext);
  const [loading, setLoading] = useState(false); 
  const [newloading, setNewLoading] = useState(false); 
  const [folderName, setFolderName] = useState(""); // State for new folder name
  const [selectedFiles, setSelectedFiles] = useState([]); // State for selected files
  const [selectedFolder, setSelectedFolder] = useState(""); // State for selected folder ID
  const [parentFolder, setParentFolder] = useState(""); // State for parent folder (for subfolder creation)

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleCreateFolder = (e) => {
    e.preventDefault();
    setNewLoading(true); // Show loading spinner on Create Folder button
    try {
      if (folderName.trim()) {
        createFolder(folderName, parentFolder); // Pass folder name and parent folder ID (if any)
        setFolderName(""); // Reset input field
        setParentFolder(""); // Reset parent folder field
      }
    } catch (error) {
      console.error(error);
    } finally {
      setNewLoading(false); // Hide loading spinner when done
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner on Upload button
    try {
      if (selectedFiles.length && selectedFolder) {
        const filesArray = Array.from(selectedFiles); // Convert FileList to array
        await uploadFiles(filesArray, selectedFolder); // Pass array instead of FileList
        setSelectedFiles([]); // Reset after upload
        setSelectedFolder(""); // Reset selected folder
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Hide loading spinner when done
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
                 // Disable input when loading
                onChange={(e) => setFolderName(e.target.value)} // Handle input change
              />
              <button type="submit" disabled={newloading} className="bg-[#0F8B8D] w-24 p-2 text-white">
                {newloading ? <ButtonLoader /> : "create"} {/* Show loader on button */}
              </button>
            </Card>

            {/* Parent Folder Selection for Subfolder Creation */}
			<Card>
            <div className="mt-3">
              <label htmlFor="parentFolder" className="capitalize">
                Select Parent Folder (Optional)
              </label>
              <select
                className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
                value={parentFolder}
                onChange={(e) => setParentFolder(e.target.value)} // Handle parent folder selection
              >
                <option value="">No parent (create a root folder)</option>
                {allfolder.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
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
                  {allfolder.map((items) => (
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
                  disabled={loading} // Disable button when loading
                  className="bg-[#0F8B8D] w-24 p-2 text-white"
                >
                  {loading ? <ButtonLoader /> : "upload"} {/* Show loader on button */}
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






// import React, { useContext, useState } from "react";
// import Card from "../shared/Card";
// import FilesContext from "../../context/FilesContext";
// import ButtonLoader from "../shared/ButtonLoader";

// function Uploads() {
// 	const { isAuthenticated, folder, allfolder, createFolder, uploadFiles } =
// 		useContext(FilesContext);
// 	const [loading, setLoading] = useState(false); 
// 	const [newloading, setNewLoading] = useState(false); 
// 	const [folderName, setFolderName] = useState(""); // State for new folder name
// 	const [selectedFiles, setSelectedFiles] = useState([]); // State for selected files
// 	const [selectedFolder, setSelectedFolder] = useState(""); // State for selected folder ID

// 	if (!isAuthenticated) {
// 		return <Navigate to="/" />;
// 	}

// 	const handleCreateFolder = (e) => {
// 		e.preventDefault();
// 		setNewLoading(true);
// 		try{
// 			if (folderName.trim()) {
// 				createFolder(folderName); // Call createFolder with the folder name
// 				setFolderName(""); // Reset input field
// 			}
// 		}catch(error){
// 			console.error(error)
// 		}finally {
// 			setNewLoading(false); // Set loading to false when the request finishes
// 		}
// 	};

// 	const handleFileChange = (e) => {
// 		e.preventDefault();
// 		setSelectedFiles(e.target.files);
// 	};

// 	const handleUpload = async (e) => {
// 		e.preventDefault();
// 		setLoading(true)
// 		try {
// 			if (selectedFiles.length && selectedFolder) {
// 				const filesArray = Array.from(selectedFiles); // Convert FileList to array
// 				await uploadFiles(filesArray, selectedFolder); // Pass array instead of FileList
// 				setSelectedFiles([]); // Reset after upload
// 				setSelectedFolder(""); // Reset selected folder
// 			}
// 		} catch (error) {
// 			console.error(error);
// 		}finally{
// 			setLoading(false)
// 		}
// 	};

// 	return (
// 		<div>
// 			<div className="grid grid-cols-1 md:grid-cols-1 justify-center items-center gap-3">
// 				<div>
// 					<form onSubmit={handleCreateFolder}>
// 						<h1 className="text-3xl font-bold">My folder</h1>
// 						<Card className={"flex flex-1 space-x-1"}>
// 							<input
// 								type="text"
// 								className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
// 								placeholder="New folder name"
// 								value={folderName}
// 								disabled={newloading} 
// 								onChange={(e) => setFolderName(e.target.value)} // Handle input change
// 							/>
// 							<button type="submit" className="bg-[#0F8B8D] w-24 p-2 text-white">
// 							{newloading ? <ButtonLoader /> : "create"}
// 							</button>
// 						</Card>
// 					</form>

// 					<Card>
// 						<h1 className="text-3xl font-bold">Upload Document</h1>
// 						<form onSubmit={handleUpload}>
// 							<div className="mb-6">
// 								<label htmlFor="folder" className="capitalize">
// 									Select Folder
// 								</label>
// 								<select
// 									className="w-full bg-[#ccc4] p-2 rounded-xl h-auto border-0 outline-none"
// 									value={selectedFolder}
// 									onChange={(e) => setSelectedFolder(e.target.value)} // Handle folder selection
// 								>
// 									<option value="">Select a folder</option>
// 									{allfolder.map((items) => (
// 										<option key={items.id} value={items.id}>
// 											{items.name}
// 										</option>
// 									))}
// 								</select>
// 							</div>
// 							<div className="mb-6">
// 								<label htmlFor="file" className="capitalize">
// 									Select Files
// 								</label>
// 								<input
// 									type="file"
// 									multiple
// 									onChange={handleFileChange} // Handle file selection
// 									className="w-full bg-[#ccc4] rounded-lg p-1 border-none outline-none"
// 								/>
// 							</div>
// 							<div className="mb-4">
// 								<button
// 									type="submit"
// 									disabled={loading} 
// 									className="bg-[#0F8B8D] w-24 p-2 text-white">
// 										{loading ? <ButtonLoader /> : "upload"}
// 								</button>
// 							</div>
// 						</form>
// 					</Card>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Uploads;
