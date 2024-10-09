import React, { useContext } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineEditNote } from "react-icons/md";
import FilesContext from "../context/FilesContext";
import { MdFolderZip } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";

function FileItems({ files_items_props }) {
  const { zipFolder, sharedFolder, getFolders } = useContext(FilesContext);
  const handleZipFolder = () => {
    // console.log("zipped")
    zipFolder(files_items_props.id);
    getFolders();
  };
  const handleSharedFolder = () => {
    // console.log("zipped")
    sharedFolder(files_items_props.id);
    getFolders();
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Member</th>
            {/* <th>Edit</th>
            <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {files_items_props.map((file) => (
            <tr key={file.id}>
              {/* <td>{file.id}</td> */}
              <td>{file.name}</td>
              <td className="text-center align-middle">
                <img
                  src={"/img/download.jpeg"}
                  // src={"http://localhost:3000" + file.path}
                  className="w-[50px] h-[50px] object-cover"
                  alt=""
                />
              </td>
              {/* Centering the icons horizontally and vertically */}
              {/* <td className="text-center align-middle">
                <button
                  className=""
                  onClick={handleSharedFolder}
                  type="button"
                >
                  <CiShare1 className="text-xl" />
                </button>
              </td>
              <td className="text-center align-middle">
                <button
                  className=""
                  onClick={handleZipFolder}
                  type="button"
                >
                  <MdFolderZip className="text-xl" />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileItems;
