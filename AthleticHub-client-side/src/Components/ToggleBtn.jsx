import React from "react";
import { FaRegMoon } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { useDarkMode } from "../Contexts/ThemeContext";
import { Tooltip } from "react-tooltip";

const ToggleBtn = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="md:text-3xl text-xl text-white hover:cursor-pointer"
        data-tooltip-id="theme-toggle"
        data-tooltip-content={
          darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
        }
      >
        {darkMode ? <FaRegMoon /> : <CiLight />}
      </button>

      <Tooltip
        id="theme-toggle"
        place="bottom"
        effect="solid"
        className="!bg-gray-800 !text-white !text-xs !rounded-md !px-2 !py-1"
      />
    </>
  );
};

export default ToggleBtn;
