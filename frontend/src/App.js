import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import React, { createContext, useState } from "react";
import ProviderDashboard from "./components/ProviderDashboard/ProviderDashboard";
import Home from "./components/Home/Home";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard";
import NavBar from "./components/NavBar/NavBar";
import Account from "./components/Account/Account";
export const LoginContext = createContext();
function App() {
  const [role, setRole] = useState(
    useState(localStorage.getItem("role") || "")
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [resFromBack, setResFromBack] = useState("");
  return (
    <LoginContext.Provider
      value={{
        setIsLoggedIn,
        setToken,
        token,
        isLoggedIn,
        resFromBack,
        setResFromBack,
        userId,
        setUserId,
        role,
        setRole,
        userName,
        setUserName,
      }}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="providerDashboard/*" element={<ProviderDashboard />} />
        <Route path="account" element={<Account />} />
        <Route path="clientDashboard" element={<ClientDashboard />} />
      </Routes>
    </LoginContext.Provider>
  );
}

export default App;
