import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const createUser = async (fullName, email, password) => {
    const words = fullName.split(" ");
    const firstName = words[0];
    const lastName = words[1];
    const res = await axios.post(
      "http://localhost:5000/api/customers/add-customer",
      {
        email,
        password,
        firstName,
        lastName,
      }
    );

    // setLoading(true);
  };

  const login = async (email, password) => {
    const res = await axios.get(`http://localhost:5000/api/customers/${email}`);
    console.log("R" + res);

    if (res.data.length === 0) {
      return -1;
    } else if (res.data[0].PASSWORD === password) {
      setEmail(email);
      return 1;
    } else {
      return 0;
    }
    // setLoading(true);
  };

  const logOut = () => {
    setEmail("");
  };
  const authInfo = {
    email,
    loading,
    createUser,
    login,
    logOut,
  };

  // user is available or not
  useEffect(() => {
    // const unsubscribe = OnAuthSta();
  });

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
}

export default AuthProvider;
