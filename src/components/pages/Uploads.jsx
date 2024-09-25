import React from "react";
import Card from "../shared/Card";

function Uploads() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 justify-center items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold">Upload Document</h1>

          <Card>
            <form action="">
              <div className="mb-6">
                <label htmlFor="" className="capitalize">
                  Title
                </label>
                <input
                  type="text"
                  // onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#ccc4] rounded-lg p-1 border-none outline-none"
                  name=""
                  id="text"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="" className="capitalize">
                  FileType
                </label>
                <input
                  type="text"
                  // onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#ccc4] rounded-lg p-1 border-none outline-none"
                  name=""
                  id="text"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="" className="capitalize">
                  Add
                </label>
                <input
                  type="file"
                  // onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#ccc4] rounded-lg p-1 border-none outline-none"
                  name=""
                  id="file"
                />
              </div>
              <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-[#0F8B8D] w-24 p-2 text-white"
                    // className="bg-[#D9E5D6] w-24 p-2 text-white"
                  >
                    Upload
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
