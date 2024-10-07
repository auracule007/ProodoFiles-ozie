import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import AuthContext from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FilesContext from "../../context/FilesContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setItem } = useLocalStorage("token");
  const [state, dispatch] = useContext(AuthContext);
  const redirect = useNavigate();
  const { showHide, produrl, devurl } = useContext(FilesContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showHide("error", "Email and Passowrd is required");
      return;
    }
    try {
      const res = await fetch(`${devurl}/api/login/`, {
        // const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        showHide("error", data.responseText);
      } else {
        dispatch({ type: "setToken", payload: data.token });
        setItem(data.token);
        // Storing token and full name in localStorage
        // localStorage.setItem("token", data.token);
        localStorage.setItem("full_name", data.full_name);
        redirect("/dashboard");
        showHide("success", "you are now logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className="h-full">
          <div className="m-auto mt-16 max-w-lg w-full rounded shadow-lg">
            <div className="grid grid-cols-1 items-center justify-center">
              <div className="p-5">
                <h1 className="text-2xl font-bold mb-3 text-center">Signin</h1>
                <form onSubmit={loginHandler}>
                  <div className="mb-6 ">
                    <label htmlFor="" className="capitalize">
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#ccc] p-2 border-none outline-none"
                      name=""
                      id="email"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="password" className="pb-2 capitalize">
                      Password
                    </label>
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
                      // className="bg-[#D9E5D6] w-24 p-2 text-white"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="mb-3 flex justify-between items-center">
                  <div className="space-y-3 block">
                    <p>
                      <Link to="/resend-verify">Verify Account..</Link>
                    </p>
                    <p>
                      <Link to="/register">Don't have an account?..</Link>
                    </p>
                  </div>
                  <div>
                    <p></p>
                  <p><Link to="/forgot-password">Forgot password?..</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
