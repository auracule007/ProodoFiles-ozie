import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useAlert from "../hooks/useAlert";
import FilesData from "../data/FilesData";

const FilesContext = createContext();

export const FilesProvider = ({ children }) => {
  const { setItem } = useLocalStorage();
  const { alertInfo, showHide } = useAlert();
  const [files, setFiles] = useState([]);
  // const [files, setFiles] = useState(FilesData);

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    try {
      const res = await fetch("http://localhost:3000/files", {
        method: "GET",
        headers: {
          "Content-Type": "applications/json",
        },
      });
      const data = await res.json();
      console.log(data);
      
      if (!res.ok) {
        showHide("error", "Unable to get File data");
      } else {
        setFiles(data);
        showHide("success", "File data successfully fetched");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <FilesContext.Provider value={{ 
        alertInfo, 
        showHide, 
        files
    }}>
      {children}
    </FilesContext.Provider>
  );
};

export default FilesContext;
