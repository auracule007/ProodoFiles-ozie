import React, { useContext } from 'react';
import DocumentItems from './DocumentItems';
import FilesContext from '../context/FilesContext';
import FolderItems from './FolderItems';

function FolderFiles({ handleFolderClick }) {
  const { files, subfolder, subfiles } = useContext(FilesContext);
  // const { files, subfolder, subfiles } = useContext(FilesContext);

  return (
    <div>
      {/* Subfolders Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 justify-center items-center">
        {subfolder.length > 0 ? (
          subfolder.map((folder, index) => (
            <FolderItems key={index} folder={folder} />
          ))
        ) : (
          <h1>No Folders in this folder</h1>
        )}
      </div>
      
      {/* Files Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 justify-center items-center">
        {files.length > 0 ? (
          subfiles.map((file, index) => (
            <DocumentItems key={index} document={file} />
          ))
        ) : (
          <h1>No Files in this folder</h1>
        )}
      </div>
    </div>
  );
}

export default FolderFiles;
