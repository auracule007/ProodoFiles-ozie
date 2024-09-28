import React, { useContext, useState } from "react";
import FilesContext from "../../context/FilesContext";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const { devurl, showHide, produrl, clientdevurl, clientProdurl } = useContext(FilesContext);
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState(`${clientdevurl}/verify`); // Ensure clientdevurl is correctly defined in context
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Using navigate for programmatic routing

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${devurl}/api/resender/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, url }), // Send email and url as JSON body
      });
      const data = await res.json();

      if (!res.ok) {
        // Backend returned an error status
        showHide("error", data.responseText); // Show error toast/message
        setMessage("Invalid Link or Email doesn't exist.");
      } else {
        showHide("success", data.responseText); // Show success toast/message
        setMessage("Verification email sent!");
        navigate("/login"); // Redirect user to login page after success
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-full">
      <div className="m-auto mt-16 max-w-lg w-full rounded shadow-lg">
        <div className="grid grid-cols-1 items-center justify-center">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-3 text-center">
              Verify Email
            </h1>
            <form onSubmit={handleVerifyEmail}>
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
                  Verify Account
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

export default VerifyEmail;
