import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = async (fullName, email, password) => {
    const words = fullName.split(" ");
    const firstName = words[0];
    const lastName = words[1];

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/customers/add-customer`,
        {
          email,
          password,
          firstName,
          lastName,
        }
      );

      console.log("Data: ", res.data);
      if (res.data.success) {
        console.log("Registration successful", res.data.message);
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
      return 0;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      // Extract token from response
      const token = res.data.token;
      if (token) {
        setAuthToken(token);
        setEmail(email);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userEmail", email);
        return 1;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return 0;
    }
  };

  // Logout function to clear user session
  const logOut = () => {
    setAuthToken(null);
    setEmail("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
  };

  // Check if user is already logged in on app start
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedEmail = localStorage.getItem("userEmail");
    if (token && storedEmail) {
      setAuthToken(token);
      setEmail(storedEmail);
    }
    setLoading(false);
  }, []);

  const authInfo = {
    email,
    authToken,
    loading,
    login,
    logOut,
    createUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
