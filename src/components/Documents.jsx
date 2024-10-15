import React, { useContext } from "react";
import DocumentItems from "./DocumentItems";
import Card from "./shared/Card";
import FilesContext from "../context/FilesContext";

function Documents({ folderId }) {
  const { files } = useContext(FilesContext);

  // Filter files based on folder ID only
  const filteredFiles = folderId ? files.filter(file => file.folder_id === folderId) : files;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 justify-center items-center">
      {filteredFiles.length > 0 ? (
        filteredFiles.map((file, index) => (
          <Card key={index} className="md:p-2">
            <DocumentItems document={file} />
          </Card>
        ))
      ) : (
        <p>No documents available for this folder.</p>
      )}
    </div>
  );
}

export default Documents;




// import React, { useContext } from "react";
// import DocumentItems from "./DocumentItems";
// import Card from "./shared/Card";
// import FilesContext from "../context/FilesContext";

// function Documents({ folderId }) {
//   const { files } = useContext(FilesContext);

//   // Filter files based on folder ID only
//   const filteredFiles = folderId ? files.filter(file => file.folder_id === folderId) : files;

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 justify-center items-center">
//       {filteredFiles.length > 0 ? (
//         filteredFiles.map((file, index) => (
//           <Card key={index} className="md:p-2">
//             <DocumentItems document={file} />
//           </Card>
//         ))
//       ) : (
//         <p>No documents available for this folder.</p>
//       )}
//     </div>
//   );
// }

// export default Documents;




// import React, { useContext } from "react";
// import DocumentItems from "./DocumentItems";
// import Card from "./shared/Card";
// import FilesContext from "../context/FilesContext";

// function Documents({ selectedFormat }) {
//   const { files } = useContext(FilesContext);

//   // Filter files based on the selected format
//   const filteredFiles = selectedFormat 
//     ? files.filter(file => file.fileType === selectedFormat)
//     : files;

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 justify-center items-center">
//       {filteredFiles.map((file, index) => (
//         <Card key={index} className="md:p-2">
//           <DocumentItems document={file} />
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default Documents;