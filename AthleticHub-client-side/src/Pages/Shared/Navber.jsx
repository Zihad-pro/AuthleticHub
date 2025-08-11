import Lottie from "lottie-react";
import React, { use } from "react";
import runing from "../../../src/assets/Animation - 1749661817684.json";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
const Navber = () => {
  const { user, signOutUser } = use(AuthContext);
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Logout Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li className="text-white hover:lg:scale-120 ">
        <NavLink to="/">
          {({ isActive }) => (
            <p className={isActive ? "underline" : ""}> Home</p>
          )}
        </NavLink>
      </li>

      <li className="text-white hover:lg:scale-120 ">
        <NavLink to="/events">
          {({ isActive }) => (
            <p className={isActive ? "underline" : ""}>Events</p>
          )}
        </NavLink>
      </li>
      <li>
        <details className="dropdown">
          <summary className="text-white ">My Profile</summary>
          <ul className="menu dropdown-content bg-Primary1 text-white rounded-box z-1 w-52 p-2 shadow-sm ">
            <Link to="/createevents">
              <li className="hover:bg-BtnPrimary1">
                <p>Book Events</p>
              </li>
            </Link>
            <Link to="/mybooking">
              <li className="hover:bg-BtnPrimary1">
                <p>My Booking</p>
              </li>
            </Link>
            <Link to="manageevents">
              <li className="hover:bg-BtnPrimary1">
                <p>Manage Event</p>
              </li>
            </Link>
          </ul>
        </details>
      </li>
    </>
  );
  return (
    <div className=" bg-[#1C1C1C] shadow-sm">
      <div className="max-w-7xl mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-Primary1 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              {links}
            </ul>
          </div>
          <div className="lg:pl-5">
            <Lottie
              style={{ width: 50 }}
              loop={true}
              animationData={runing}
            ></Lottie>
          </div>
          <Link to="/">
            <div className="font-mono lg:text-3xl text-white text-xl">
              AthleticHub
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base">{links}</ul>
        </div>
        <div className="navbar-end lg:gap-8 md:gap-4 gap-1">
          <div>
            {user?.photoURL ? (
              <>
                <img
                  className="rounded-full md:w-10 w-7 md:h-10 h-7 cursor-pointer"
                  src={user.photoURL}
                  alt="User"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName || "User"}
                />
                <Tooltip
                  id="user-tooltip"
                  place="bottom"
                  className="!bg-primary1 !text-white !text-sm !rounded"
                />
              </>
            ) : (
              ""
            )}
          </div>
          {user ? (
            <button
              className="btn bg-BtnPrimary2 text-white hover:bg-BtnPrimary1 md:px-8"
              onClick={handleLogOut}
            >
              SignOut
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="btn bg-BtnPrimary2 text-white hover:bg-BtnPrimary1 md:px-8"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
