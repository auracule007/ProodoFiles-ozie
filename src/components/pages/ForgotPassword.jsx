import React, { useContext, useState } from "react";
import FilesContext from "../../context/FilesContext";

function ForgotPassword() {
    const { showHide, clientdevurl, devurl } = useContext(FilesContext);
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState(`${clientdevurl}/reset-password`);
    const [message, setMessage] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch(`${devurl}/api/forgot-pass/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, url }),
        });
        
        // console.log(response)
        const data = await response.json();
        // console.log(data)
        
        if (!response.ok) {
          showHide("error", data.responseText);
        } else {
          showHide("success", data.responseText);
        }
        setMessage(data.responseText);
      } catch (error) {
        // showHide("error", "Error sending password reset link.");
      }
    };
  
    return (
      <div className="h-full">
        <div className="m-auto mt-16 max-w-lg w-full rounded shadow-lg">
          <div className="grid grid-cols-1 items-center justify-center">
            <div className="p-5">
              <h1 className="text-2xl font-bold mb-3 text-center">Forgot Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="capitalize">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#ccc] p-2 border-none outline-none"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
  
                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-[#0F8B8D] w-full p-2 text-white"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
              {message && <p className="mt-4 text-center">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    );
}

export default ForgotPassword;
