import React from "react";
import Card from "../shared/Card";
import Documents from "../Documents";

function Downloads() {
  return (
    <div>
      <div>
        <div className="grid grid-cols-5 justify-center items-center gap-3">
          <div className="col-span-5">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <Card>
              <div className="flex justify-between items-center p-4">
                <div>
                  <h1 className="text-2xl font-semibold pb-2">
                    Welcome, Debby!
                  </h1>
                  <p className="text-gray-600">You have 123 files</p>
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
          

          <div className="col-span-5">
            <Documents />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Downloads;
