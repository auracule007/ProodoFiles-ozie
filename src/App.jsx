import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import Alert from "./components/Alert";
import { FilesProvider } from "./context/FilesContext";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";
import Verify from "./components/pages/Verify";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import FolderFiles from "./components/FolderFiles";
import VerifyEmail from "./components/pages/VerifyEmail";
// import Index from "./components/pages/Index";

function App() {
  const { getItem } = useLocalStorage("token");
  const token = getItem("token");
  const authInitalToken = { accessToken: token ?? null };
  return (
    <>
      <AuthProvider defaultState={authInitalToken}>
        <FilesProvider>
          <Router>
            <Alert />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/verify" element={<Verify />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="/resend-verify" element={<VerifyEmail />} /> 
              {/* <Route path="/folders/:folderId" element={<FolderFiles />} />  */}
            </Routes>
          </Router>
        </FilesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
