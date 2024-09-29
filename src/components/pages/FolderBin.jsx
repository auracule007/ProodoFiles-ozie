import React from 'react'
import FilesContext from '../../context/FilesContext';

function FolderBin() {
  const { bins } = useContext(FilesContext);
  return (
    <div>
      FOlder bin
    </div>
  )
}

export default FolderBin;

