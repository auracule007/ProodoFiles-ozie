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
// import Index from "./components/pages/Index";

function App() {
  const { getItem } = useLocalStorage("auth-token");
  const token = getItem("auth-token");
  const authInitalToken = { accessToken: token ?? null };
  return (
    <>
      <AuthProvider defaultState={authInitalToken}>
        <FilesProvider>
          <Router>
            <Alert />
            <Routes>
              {/* <Route path="/" element={<Login />} /> */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </FilesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
