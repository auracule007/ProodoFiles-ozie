import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useAlert from "../hooks/useAlert";
import FilesData from "../data/FilesData";
import AuthContext from "../context/AuthContext";

const FilesContext = createContext();

export const FilesProvider = ({ children }) => {
  const { setItem, getItem } = useLocalStorage();
  const { alertInfo, showHide } = useAlert();
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState([]);
  const [subfolder, setSubFolder] = useState([]);
  const [subfiles, setSubFiles] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [binned, setBinned] = useState([]);
  const [starred, setStarred] = useState([]);
  const [state, dispatch] = useContext(AuthContext);
  const isAuthenticated = state.accessToken !== null;

  useEffect(() => {
    getFiles()
    getFolders()
  // }, []);
  }, [folder, files]);

  const getFiles = async () => {
    try {
      const res = await fetch("https://proodoosfiles.onrender.com/api/user-files/", {
      // const res = await fetch("https://proodoosfiles.onrender.com/api/user-files/", {
        method: "GET",
        headers: {
          "Authorization": `Token ${getItem("token")}`,
          "Content-Type": "applications/json",
        },
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        showHide("error", "Unable to get File data");
      } else {
        setFiles(data);
        // showHide("success", "File data successfully fetched");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createFolder = async (folder_name, parent_folder_id = null) => {
    try {
      const body = parent_folder_id
        ? { folder_name, parent_folder_id }  // Include parent_folder_id only for subfolders
        : { folder_name };                   // Exclude parent_folder_id for root-level folders
  
      const res = await fetch("https://proodoosfiles.onrender.com/api/create-f/", {
      // const res = await fetch("https://proodoosfiles.onrender.com/api/create-f/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const data = await res.json();
      if (!res.ok) {
        showHide("error", "Failed to create a folder");
      } else {
        setFolder(prevFolders => [...prevFolders, data]); // Update folder list
        showHide("success", "Folder created successfully");
      }
    } catch (error) {
      console.error(error);
      // showHide("error", "An error occurred while creating the folder");
    }
  };
  

  // const createFolder = async (folder_name, parent_folder_id) => {
  //   try {
  //     const res = await fetch("https://proodoosfiles.onrender.com/api/create-f/", {
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Token ${getItem("token")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ folder_name, parent_folder_id }), // Pass folder name in the request body
  //     });
  //     console.log("parent_folder_id",parent_folder_id);
      
  //     console.log(res)
  //     const data = await res.json();
  //     console.log(data)
  //     if (!res.ok) {
  //       showHide("error", "Failed to create a folder");
  //     } else {
  //       setFolder(prevFolders => [...prevFolders, data]); // Add new folder to the state
  //       showHide("success", "Folder created successfully");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     showHide("error", "An error occurred while creating the folder");
  //   }
  // };
  
  const getFolders = async () => {
    try {
      const res = await fetch("https://proodoosfiles.onrender.com/api/get-folders/", {
        method: "GET",
        headers: {
          "Authorization": `Token ${getItem("token")}`,
          "Content-Type": "application/json",
        }
      });
  
      console.log(res)
      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        showHide("error", "Failed to create a folder");
      } else {
        setFolder(data); // Add new folder to the state
        // showHide("success", "Folder created successfully");
      }
    } catch (error) {
      console.error(error);
      // showHide("error", "An error occurred while creating the folder");
    }
  };

  const uploadFiles = async (files, folder_id) => {
    try {
      const formData = new FormData();
      formData.append("folder_id", folder_id);
      files.forEach(file => formData.append("files", file)); // This will now work
      
      const res = await fetch("https://proodoosfiles.onrender.com/api/upload_file/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${getItem("token")}`,
          // No need for 'Content-Type' header, since FormData sets the boundary automatically.
        },
        body: formData,
      });
  
      console.log(res)
      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        showHide("error", "Failed to upload files.");
      } else {
        showHide("success", "Files uploaded successfully.");
        setUploads([...uploads, data]);
      }
    } catch (error) {
      console.log(error);
      // showHide("error", "An error occurred while uploading files.");
    }
  };
  
  
  const getFolderItems = async (folderId) => {
    try {
      const res = await fetch(`https://proodoosfiles.onrender.com/api/view_fo/?folder_id=${folderId}`, {
        method: "GET",
        headers: {
          "Authorization": `Token ${getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log("folder single",res);
      const data = await res.json();
      console.log("folder single", data);
      if (!res.ok) {
        showHide("error", "Unable to fetch folder items");
      } else {
        setSubFiles(data.files)
        setSubFolder(data.subfolders)
        console.log(data.files)
        console.log(data.subfolders)
        // return data; // Return the folder items
      }
    } catch (error) {
      console.error(error);
      // showHide("error", "An error occurred while fetching folder items");
      return [];
    }
  };
  
  const downloadFile = async (file_id) => {
    try {
      const res = await fetch(`https://proodoosfiles.onrender.com/api/download_file/?file_id=${file_id}`, {
        method: "GET",
        headers: {
          "Authorization": `Token ${getItem("token")}`,
        },
      });
  
      if (!res.ok) {
        const errorData = await res.json(); // This is for error response
        showHide("error", errorData.responseText || "Download failed");
        return;
      }
  
      // Handle the redirect
      if (res.redirected) {
        window.location.href = res.url; // Follow the redirect to the file download
      } else {
        // If no redirect, it's likely a direct response with file content (depending on your backend)
        console.log("No redirect occurred, check the response body or status");
      }
  
      showHide("success", "File is downloading");
    } catch (error) {
      console.error("Download error:", error);
      // showHide("error", "An error occurred during download");
    }
  };


  const deleteFolder = async (folder_id) => {
    if(window.confirm("Are you sure you want to delete?..")){
      try {
        const res = await fetch("https://proodoosfiles.onrender.com/api/fo/del/", {
          method: "POST",
          headers:{
            "Authorization": `Token ${getItem("token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ folder_id })
        })
        const data = await res.json();
        console.log(data)
        console.log(folder_id)
        console.log(res)
        if(!res.ok){
          showHide("error", data.responseText)
        }else{
          setFolder(data)
          showHide("success", data.responseText)
        }
      } catch (error) {
        console.log(error)
      }
      }
    }


    const binFolder = async (folderId) => {
      try {
        const res = await fetch('https://proodoosfiles.onrender.com/api/fo/bin/', {
          method: 'POST',
          headers: {
            "Authorization": `Token ${getItem("token")}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ folder_id: folderId })
        });
    
        const data = await response.json();
        if(!res.ok){
          showHide("errpr", data.responseText)
        }else{
          setBinned(data);
          showHide("success", data.responseText)
        }
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const starredFolder = async (folderId) => {
      try {
        const response = await fetch("https://proodoosfiles.onrender.com/api/fo/star/", {
          method: 'POST',
          headers: {
            "Authorization": `Token ${getItem("token")}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ folder_id: folderId })
        });
    
        const data = await response.json();
        console.log(data);
        console.log(response);
        
        if(!response.ok){
          showHide("error", data.responseText)
        }else{
          setStarred(data)
          showHide("success", data.responseText)
        }
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    
  

  // const downloadFile = async (file_id) => {
  //   try {
  //     const res = await fetch(`https://proodoosfiles.onrender.com/api/download_file/?file_id=${file_id}`, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Token ${getItem('token')}`, // Assuming you are using token-based authentication
  //       },
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       // Automatically trigger the download by redirecting to the download URL
  //       window.location.href = data.download_url;
  //     } else {
  //       console.error('Download failed:', data.responseText);
  //     }
  //   } catch (error) {
  //     console.error('Error downloading the file:', error);
  //   }
  // };

  return (
    <FilesContext.Provider
      value={{
        alertInfo,
        showHide,
        files,
        isAuthenticated,
        createFolder,
        folder,
        uploadFiles,
        getFolderItems,
        uploads,
        subfolder,
        subfiles,
        downloadFile,
        deleteFolder,
        binFolder,
        starredFolder,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesContext;
