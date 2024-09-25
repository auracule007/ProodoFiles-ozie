import React, { useContext } from "react";
import Card from "../shared/Card";
import Files from "../Files";
import Documents from "../Documents";
import FilesContext from "../../context/FilesContext";

function Account() {
  const { files } = useContext(FilesContext);
  return (
    <div>
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-3">
        <div className="md:col-span-3">
          <Card>
            <div className="flex flex-wrap justify-between items-center p-4">
              <div>
                <h1 className="text-2xl font-semibold pb-2">Welcome, Ozie!</h1>
                <p className="text-gray-600">
                  You have {files.length ?? 0} files
                </p>
              </div>
              <div>
                <img
                  src="/img/background.png"
                  className="w-32 h-auto"
                  alt="Background"
                />
              </div>
            </div>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <div className="p-1">
              <h1 className="text-xl font-semibold pb-2">Quick start</h1>
              <div className="flex items-center justify-center">
                <img src="/img/folder1.png" className="w-36" alt="Background" />
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-5">
          <Documents />
          <Card>
            <Files />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Account;
