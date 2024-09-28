import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineEditNote } from "react-icons/md";

function FileItems({ files_items_props }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Member</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {files_items_props.map((file) => (
            <tr key={file.id}>
              <td>{file.id}</td>
              <td>{file.title}</td>
              <td className="text-center align-middle">
                <img
                  src={"/img/download.jpeg"}
                  // src={"http://localhost:3000" + file.path}
                  className="w-[50px] h-[50px] object-cover"
                  alt=""
                />
              </td>
              {/* Centering the icons horizontally and vertically */}
              <td className="text-center align-middle">
                <MdOutlineEditNote className="inline-block" />
              </td>
              <td className="text-center align-middle">
                <RiDeleteBin5Fill className="inline-block" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileItems;
