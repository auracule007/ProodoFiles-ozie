import React, { useContext, useState } from "react";
import { Link, replace, useNavigate, Navigate } from "react-router-dom"; // No need to import `redirect`
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FilesContext from "../../context/FilesContext";

function Register() {
  const { showHide, devurl, clientdevurl } = useContext(FilesContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [full_name, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState(`${clientdevurl}/verify`);
  // const [url, setUrl] = useState("http://localhost:5173/verify");
  const navigate = useNavigate(); // Use 'navigate' instead of 'redirect'

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log("Submitted");

    // Create form data using URLSearchParams
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("full_name", full_name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("url", url);

    try {
      const res = await fetch(`${devurl}/api/sign-up/`, {
      // const res = await fetch("http://127.0.0.1:8000/api/sign-up/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(), // URL encoded form data
      });

      const data = await res.json();
      // console.log(data);
      if (!res.ok) {
        showHide("error", data.responseText[0]);
      } else {
        showHide("success", data.responseText);
        navigate("/login", {replace: true}); // Use navigate for redirection
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };
  

  return (
    <div className="h-full">
      <div className="m-auto mt-16 max-w-lg w-full rounded shadow-lg">
        <div className="grid grid-cols-1 items-center justify-center">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-3 text-center">Signup</h1>
            <form onSubmit={registerHandler}>
              <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2">
                <div className="mb-6">
                  <label htmlFor="" className="capitalize">Username</label>
                  <input
                    type="text"
                    className="w-full bg-[#ccc] p-2 border-none outline-none"
                    id="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="" className="capitalize">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-[#ccc] p-2 border-none outline-none"
                    id="Full Name"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="" className="capitalize">Email</label>
                <input
                  type="email"
                  className="w-full bg-[#ccc] p-2 border-none outline-none"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="pb-2 capitalize">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-[#ccc] p-2 border-none outline-none"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-[#0F8B8D] w-24 p-2 text-white"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="mb-3 text-end">
              <Link to="/login">Already Have an account?...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
