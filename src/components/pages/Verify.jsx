import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import FilesContext from "../../context/FilesContext";

function Verify() {
    const [verificationStatus, setVerificationStatus] = useState(null);
    const { showHide, produrl, clientProurl, devurl, clientdevurl, isAuthenticated } = useContext(FilesContext);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    if(isAuthenticated) {
      return <Navigate to="/dashboard" />
    }

  // Function to decode base64 encoded u_info
  const decodeUserInfo = (u_info) => {
    try {
      // Decode the base64 u_info string
      const decodedInfo = atob(u_info); // base64 decode
      
      // Replace single quotes with double quotes to make it valid JSON format
      const jsonFormattedInfo = decodedInfo.replace(/'/g, '"'); 
      
      console.log("Decoded and formatted info:", jsonFormattedInfo);  // Debugging
      
      // Now safely parse the formatted JSON string
      return JSON.parse(jsonFormattedInfo);
    } catch (error) {
      console.error("Error decoding u_info:", error);
      return null;
    }
  };

  useEffect(() => {
    // Extract u_info from the query parameters in the URL
    const params = new URLSearchParams(location.search);
    const u_info = params.get("u_info");

    if (u_info) {
      // Decode the u_info parameter to extract the token and user ID (uidb64)
      const userInfo = decodeUserInfo(u_info);

      if (userInfo) {
        const { token, u_id: uidb64 } = userInfo;

        if (token && uidb64) {
          // Make a POST request to the backend for email verification
          const verifyEmail = async () => {
            try {
              const res = await fetch(`${devurl}/api/verify/`, {
              // const res = await fetch("http://127.0.0.1:8000/api/verify/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, uidb64 }),  // Send token and user ID (uidb64)
              });

              const data = await res.json();

              if (res.ok) {
                setVerificationStatus("success");
                // Redirect user to the login page after 3 seconds
                setTimeout(() => navigate("/login", { replace: true }), 3000);
              } else {
                setVerificationStatus("error");
              }
            } catch (error) {
              console.error("Verification error:", error);
              setVerificationStatus("error");
            } finally {
              setLoading(false);
            }
          };

          verifyEmail();
        } else {
          setVerificationStatus("error");
          setLoading(false);
        }
      } else {
        setVerificationStatus("error");
        setLoading(false);
      }
    } else {
      setVerificationStatus("error");
      setLoading(false);
    }
  }, [location, navigate]);

  return (
    <div className="h-full">
      <div className="m-auto mt-16 max-w-lg w-full rounded shadow-lg">
        <div className="p-5 text-center">
          <h1 className="text-2xl font-bold mb-3">
            {loading
              ? "Verifying your email..."
              : verificationStatus === "success"
              ? "Email Verified!"
              : "Verification Failed"}
          </h1>
          {verificationStatus === "success" && (
            <p>Your email has been successfully verified. You will be redirected to the login page shortly.</p>
          )}
          {verificationStatus === "error" && (
            <p>Sorry, the verification link is invalid or has expired. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Verify;
