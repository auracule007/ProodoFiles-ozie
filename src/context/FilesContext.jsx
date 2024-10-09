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
	const [allfolder, setAllFolder] = useState([]);
	const [subfolder, setSubFolder] = useState([]);
	const [subfiles, setSubFiles] = useState([]);
	const [uploads, setUploads] = useState([]);
	const [binned, setBinned] = useState([]);
	const [zipped, setZipped] = useState([]);
	const [renamed, setRename] = useState("");
	const [shared, setShared] = useState([]);
	const [starred, setStarred] = useState([]);
	const [state, dispatch] = useContext(AuthContext);
	const isAuthenticated = state.accessToken !== null;

	const devurl = "https://proodoosfiles.onrender.com";
	// const clientdevurl = "https://proodo-files-ozie.vercel.app"
	// const devurl = "http://127.0.0.1:8000";
	const clientdevurl = "http://localhost:5173";

	// setTimeout(() =>{
	useEffect(() => {
		if (isAuthenticated) {
			getFiles();
			getFolders();
			getAllFolders();
			viewBin();
			viewStarredFolders();
		}
		// }, [folder, files])
	}, []);
	// }, 2000)

	const getFiles = async () => {
		try {
			const res = await fetch(`${devurl}/api/user-files/`, {
				// const res = await fetch("https://proodoosfiles.onrender.com/api/user-files/", {
				method: "GET",
				headers: {
					Authorization: `Token ${getItem("token")}`,
					"Content-Type": "applications/json",
				},
			});
			const data = await res.json();
			if (!res.ok) {
				showHide("error", "Unable to get File data");
			} else {
				setFiles(data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const createFolder = async (folder_name, parent_folder_id = null) => {
		try {
			const res = await fetch(`${devurl}/api/create-f/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					folder_name,
					parent_folder_id: parent_folder_id || null, // Pass null if root-level
				}),
			});

			// console.log(res);
			const data = await res.json();
			// console.log(data);

			if (!res.ok) {
				showHide("error", "Failed to create folder");
			} else {
				setFolder([...folder, { ...data, name: folder_name }]);
				showHide("success", "Folder created successfully");
				getFolders();
				getAllFolders();
			}
		} catch (error) {
			console.error(error);
			// showHide("error", "An error occurred while creating the folder");
		}
	};

	const getFolders = async () => {
		try {
			const res = await fetch(`${devurl}/api/get-folders/`, {
				method: "GET",
				headers: {
					Authorization: `Token ${getItem("token")}`,
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			// console.log(data);
			if (!res.ok) {
				showHide("error", "Failed to create a folder");
			} else {
				setFolder(data); // Add new folder to the state
			}
		} catch (error) {
			console.error(error);
			// showHide("error", "An error occurred while creating the folder");
		}
	};
	const getAllFolders = async () => {
		try {
			const res = await fetch(`${devurl}/api/all-folders/`, {
				method: "GET",
				headers: {
					Authorization: `Token ${getItem("token")}`,
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			console.log(data);
			if (!res.ok) {
				showHide("error", "Failed to create a folder");
			} else {
				setAllFolder(data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const uploadFiles = async (files, folder_id) => {
		try {
			const formData = new FormData();
			formData.append("folder_id", folder_id);
			files.forEach((file) => formData.append("files", file)); // This will now work

			const res = await fetch(`${devurl}/api/upload_file/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${getItem("token")}`,
				},
				body: formData,
			});

			// console.log(res)
			const data = await res.json();
			if (!res.ok) {
				showHide("error", "Failed to upload files.");
			} else {
				showHide("success", "Files uploaded successfully.");
				setUploads(uploads);
				getFiles();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getFolderItems = async (folderId) => {
		try {
			const res = await fetch(`${devurl}/api/view_fo/?folder_id=${folderId}`, {
				method: "GET",
				headers: {
					Authorization: `Token ${getItem("token")}`,
					"Content-Type": "application/json",
				},
			});
			// console.log("folder single", res);
			const data = await res.json();
			// console.log("folder single", data);
			if (!res.ok) {
				showHide("error", "Unable to fetch folder items");
			} else {
				setSubFiles(data.files);
				setSubFolder(data.subfolders);
				setFolder([data, ...folder]);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const downloadFile = async (file_id) => {
		try {
			const res = await fetch(
				`${devurl}/api/download_file/?file_id=${file_id}`,
				{
					method: "GET",
					headers: {
						Authorization: `Token ${getItem("token")}`,
					},
				}
			);

			if (!res.ok) {
				const errorData = await res.json();
				showHide("error", errorData.responseText || "Download failed");
				return;
			}
			if (res.redirected) {
				window.location.href = res.url;
			} else {
				return showHide(
					"error",
					"No redirect occurred, check the response body or status"
				);
			}

			showHide("success", "File is downloading");
		} catch (error) {
			console.error(error);
		}
	};

	const deleteFolder = async (folder_id) => {
		if (window.confirm("Are you sure you want to delete?..")) {
			try {
				const res = await fetch(`${devurl}/api/fo/del/`, {
					method: "POST",
					headers: {
						Authorization: `Token ${getItem("token")}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ folder_id }),
				});
				const data = await res.json();
				if (!res.ok) {
					showHide("error", data.responseText);
				} else {
					setFolder(data);
					showHide("success", data.responseText);
					getAllFolders();
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const binFolder = async (folderId) => {
		try {
			const res = await fetch(`${devurl}/api/fo/bin/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ folder_id: folderId }),
			});

			const data = await res.json();
			if (!res.ok) {
				showHide("errpr", data.responseText);
			} else {
				setBinned([data, ...binned]);
				showHide("success", data.responseText);
				getAllFolders();
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const starredFolder = async (folderId) => {
		try {
			const response = await fetch(`${devurl}/api/fo/star/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ folder_id: folderId }),
			});

			const data = await response.json();
			if (!response.ok) {
				showHide("error", data.responseText);
			} else {
				setStarred(data);
				showHide("success", data.responseText);
				getAllFolders();
			}
			// console.log(data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const viewBin = async () => {
		try {
			const res = await fetch(`${devurl}/api/binned-f/`, {
				method: "GET",
				headers: {
					Authorization: `Token ${getItem("token")}`,
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();
			// console.log(data);
			if (!res.ok) {
				showHide("error", data.details);
			} else {
				setBinned(data);
				getAllFolders();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const renameFolder = async (folder_id, new_name) => {
		try {
			const res = await fetch(`http://127.0.0.1:8000/api/fo/rename/`, {
				// const res = await fetch(`https://proodoosfiles.onrender.com/api/fo/rename/`, {  // Replace with your actual API endpoint
				method: "POST",
				headers: {
					Authorization: `Token ${getItem("token")}`, // Replace getItem with your token retrieval function
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ folder_id, new_name }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				showHide("error", errorData.detail || "Failed to rename folder");
				return;
			}

			const data = await res.json();
			setFolder((prev) =>
				prev.map((f) => (f.id === folder_id ? { ...f, name: new_name } : f))
			);
			// setFolder(data)
			// await getFolders()
			showHide("success", data.detail || "Folder renamed successfully");
		} catch (error) {
			// console.error(error);
			console.error(error);
		}
	};

	const renameFile = async (file_id, new_name) => {
		try {
			const res = await fetch(`http://127.0.0.1:8000/api/fi/rename/`, {
				// const res = await fetch(`https://proodoosfiles.onrender.com/api/fo/rename/`, {  // Replace with your actual API endpoint
				method: "POST",
				headers: {
					Authorization: `Token ${getItem("token")}`, // Replace getItem with your token retrieval function
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ file_id, new_name }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				showHide("error", errorData.detail || "Failed to rename folder");
				return;
			}

			const data = await res.json();
			setFiles((prev) =>
				prev.map((f) => (f.id === file_id ? { ...f, name: new_name } : f))
			);
			showHide("success", data.detail || "Folder renamed successfully");
			getFiles();
		} catch (error) {
			console.error(error);
			// showHide("error", "An unexpected error occurred.");
		}
	};

	const viewStarredFolders = async () => {
		try {
			const res = await fetch(`${devurl}/api/starred-f/`, {
				method: "GET",
				headers: {
					Authorization: `Token ${getItem("token")}`, // Replace getItem with your token retrieval function
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			console.log(data);
			if (!res.ok) {
				showHide("error", data.responseText);
			} else {
				setStarred(data);
				getAllFolders();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const zipFolder = async (folder_id) => {
		try {
			const res = await fetch(`${devurl}/api/fo/zip/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${getItem("token")}`, // Replace getItem with your token retrieval function
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ folder_id }),
			});
			const data = await res.json();
			if (!res.ok) {
				showHide("error", data.responseText);
			} else {
				setZipped(data);
				getAllFolders();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const sharedFolder = async (folder_id) => {
		try {
			const res = await fetch(`${devurl}/api/fo/sharing/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${getItem("token")}`, // Replace getItem with your token retrieval function
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ folder_id }),
			});
			const data = await res.json();
			if (!res.ok) {
				showHide("error", data.responseText);
			} else {
				setShared(data);
				getAllFolders();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<FilesContext.Provider
			value={{
				alertInfo,
				files,
				isAuthenticated,
				folder,
				showHide,
				createFolder,
				uploadFiles,
				getFolderItems,
				uploads,
				subfolder,
				subfiles,
				starred,
				devurl,
				downloadFile,
				deleteFolder,
				starredFolder,
				binFolder,
				allfolder,
				clientdevurl,
				binned,
				shared,
				zipped,
				viewBin,
				setBinned,
				renameFolder,
				renameFile,
				zipFolder,
				sharedFolder,

				getFiles,
				getFolders,
			}}>
			{children}
		</FilesContext.Provider>
	);
};

export default FilesContext;

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
