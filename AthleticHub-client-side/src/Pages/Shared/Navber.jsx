import Lottie from "lottie-react";
import React, { useState, useEffect, useContext, useRef } from "react";
import runing from "../../../src/assets/Animation - 1749661817684.json";
import { Link, NavLink } from "react-router";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiUser,
  FiCalendar,
  FiClipboard,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import ToggleBtn from "../../Components/ToggleBtn";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsMobileMenuOpen(false);
      })
      .catch((error) => console.log(error));
  };

  // Common nav links
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white transition-colors duration-200 px-4 py-2 rounded-lg ${
              isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
            } sm:hover:bg-blue-600 md:hover:bg-blue-600 lg:hover:bg-transparent`
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <IoHomeOutline className="inline mr-1" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `text-white transition-colors duration-200 px-4 py-2 rounded-lg ${
              isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
            } sm:hover:bg-blue-600 md:hover:bg-blue-600 lg:hover:bg-transparent`
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FiCalendar className="inline mr-1" /> Events
        </NavLink>
      </li>
    </>
  );

  // Profile links for mobile menu
  const profileLinksMobile = (
    <div className="flex flex-col gap-2">
      <Link
        to="/createevents"
        className="flex items-center text-white hover:bg-blue-600 transition-colors duration-200 py-3 px-4 rounded-lg"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <FiCalendar className="mr-2" /> Create Events
      </Link>
      <Link
        to="/mybooking"
        className="flex items-center text-white hover:bg-blue-600 transition-colors duration-200 py-3 px-4 rounded-lg"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <FiClipboard className="mr-2" /> My Booking
      </Link>
      <Link
        to="/manageevents"
        className="flex items-center text-white hover:bg-blue-600 transition-colors duration-200 py-3 px-4 rounded-lg"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <FiSettings className="mr-2" /> Manage Events
      </Link>
      <button
        onClick={handleLogOut}
        className="w-full text-left text-red-400 hover:bg-red-600 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg flex items-center"
      >
        <FiLogOut className="mr-2" /> Logout
      </button>
      <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user?.displayName || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <FiUser className="w-10 h-10 text-white rounded-full bg-gray-700 p-2" />
        )}
        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm">
            {user?.displayName || "User"}
          </span>
          <span className="text-gray-400 text-xs truncate">{user?.email}</span>
        </div>
      </div>
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800"
          : "bg-[#1C1C1C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>

            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Lottie style={{ width: 40 }} loop animationData={runing} />
              <span className="text-white font-bold text-xl font-mono">
                AthleticHub
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <ul className="hidden lg:flex items-center space-x-8 ">{navLinks}</ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <ToggleBtn />

            {/* Desktop Auth */}
            <div className="md:flex items-center gap-4">
              {!user && (
                <Link
                  to="/auth/login"
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Login
                </Link>
              )}
              {user && (
                <button
                  onClick={handleLogOut}
                  className="btn bg-BtnPrimary2 hover:bg-BtnPrimary1 text-white px-6"
                >
                  Sign Out
                </button>
              )}
            </div>

            {/* Desktop profile */}
            {user && (
              <div className="hidden lg:flex dropdown dropdown-end">
                <div
                  tabIndex={0}
                  className="btn btn-ghost flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user?.displayName || "User"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-8 h-8 text-white p-1 bg-gray-700 rounded-full" />
                  )}
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow-xl bg-gray-800 border border-gray-700 rounded-box w-52"
                >
                  <Link
                    to="/createevents"
                    className="flex items-center text-white hover:bg-blue-600 transition-colors duration-200 py-2 px-3 rounded"
                  >
                    <FiCalendar className="mr-2" /> Create Events
                  </Link>
                  <Link
                    to="/mybooking"
                    className="flex items-center text-white hover:bg-blue-600 transition-colors duration-200 py-2 px-3 rounded"
                  >
                    <FiClipboard className="mr-2" /> My Booking
                  </Link>
                  <Link
                    to="/manageevents"
                    className="flex items-center text-white hover:bg-blue-600 transition-colors duration-200 py-2 px-3 rounded"
                  >
                    <FiSettings className="mr-2" /> Manage Events
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-xl z-40"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <ul className="flex flex-col gap-8 border-b-1 border-white/80 pb-6 pt-2">
                {navLinks}
              </ul>

              {user ? (
                profileLinksMobile
              ) : (
                <Link
                  to="/auth/login"
                  className="btn bg-blue-600 hover:bg-blue-700 text-white w-full justify-center mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
