import React from "react";
import Navber from "../Pages/Shared/Navber";
import Footer from "../Pages/Shared/Footer";
import Slider from "../Pages/Home/Slider";
import { Outlet } from "react-router";

const MainLayouts = () => {
  return (
    <div className="font-Primary ">
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;
