import React, {useState, useEffect, useContext} from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import FilesContext from "../../context/FilesContext";

// Utility to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const { showHide, devurl, clientdevurl, isAuthenticated } = useContext(FilesContext);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [uidb64, setUidb64] = useState("");
  const [token, setToken] = useState("");

  const query = useQuery();
  const navigate = useNavigate();

  // if(isAuthenticated) {
  //   return <Navigate to="/dashboard" />
  // }

  useEffect(() => {
    const u_info = query.get("u_info");
    if (u_info) {
      try {
        const parsedInfo = JSON.parse(atob(u_info));
        setUidb64(parsedInfo.u_id);
        setToken(parsedInfo.token);
      } catch (error) {
        setMessage("Invalid reset link.");
      }
    } else {
      setMessage("Reset link is missing.");
    }
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${devurl}/api/rest-pswd/{uidb64}/{token}/`, {
      // const response = await fetch(`http://127.0.0.1:8000/api/rest-pswd/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password1, password2 }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.responseText || "Error resetting password.");
      } else {
        setMessage("Password has been reset successfully. Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="h-full">
      <div className="m-auto mt-16 max-w-lg w-full rounded shadow-lg">
        <div className="grid grid-cols-1 items-center justify-center">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-3 text-center">Reset Password</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="password1" className="capitalize">
                  New Password
                </label>
                <input
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  className="w-full bg-[#ccc] p-2 border-none outline-none"
                  id="password1"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password2" className="capitalize">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="w-full bg-[#ccc] p-2 border-none outline-none"
                  id="password2"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <div className="mb-4">
                <button type="submit" className="bg-[#0F8B8D] w-full p-2 text-white">
                  Reset Password
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

export default ResetPassword;
