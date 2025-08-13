import React from "react";
import { FaRegMoon } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { useDarkMode } from "../Contexts/ThemeContext";

const ToggleBtn = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="md:text-3xl text-xl text-white hover:cursor-pointer"
    >
      {darkMode ? <FaRegMoon /> : <CiLight />}
    </button>
  );
};

export default ToggleBtn;
