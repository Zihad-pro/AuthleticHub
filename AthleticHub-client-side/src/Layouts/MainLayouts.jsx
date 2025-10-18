import React from "react";
import Navber from "../Pages/Shared/Navber";
import Footer from "../Pages/Shared/Footer";
import { Outlet } from "react-router";

const MainLayouts = () => {
  return (
    // dark mode add
    <div className="font-Primary bg-gray-100 dark:bg-black dark:text-white ">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navber />
      </div>
      <div className="pt-16">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default MainLayouts;
