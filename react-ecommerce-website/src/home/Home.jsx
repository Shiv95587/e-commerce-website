import React, { useContext, useEffect, useState } from "react";
import Banner from "./Banner";
import HomeCategory from "./HomeCategory";
import CategoryShowCase from "./CategoryShowCase";
import axios from "axios";
import { LoginContext } from "../Contexts/LoginContext";

export const Home = ({ value }) => {
  console.log("hi");
  console.log(value);

  return (
    <div>
      <Banner />
      <HomeCategory />
      <CategoryShowCase />
      {/* <button onClick={() => setData("Sahil")}>Click me</button> */}
    </div>
  );
};
