import { Outlet, useParams } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { LoginContext } from "./Contexts/LoginContext";

function App() {
  const [data, setData] = useState("Shiv");
  const [email, setEmail] = useState("");

  function updateEmail(email) {
    setEmail(email);
  }
  const [password, setPassword] = useState("");
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/data")
  //     .then((response) => setData(response.data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const someprops = "hi";
  return (
    <div>
      <LoginContext.Provider value={{ data, setData }}>
        <NavBar />
        <div className="min-vh-100">
          <Outlet someprops={someprops} />
        </div>
        {/* <Footer /> */}
      </LoginContext.Provider>
    </div>
  );
}

export default App;
