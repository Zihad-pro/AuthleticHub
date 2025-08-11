import React, { use } from "react";
import SocalLogin from "../../Components/Socallogin/SocalLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const navigate=useNavigate();
  const location=useLocation();
  console.log(location);
  const { createUser, updateUser } = use(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const { email, password } = data;
    // create user
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        // update user
        updateUser({
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
        
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Register Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Already account register",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-15">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/logo.png"
            className="mx-auto   w-20 rounded-full"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* name */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="displayName"
                  type="text"
                  placeholder="Enter your name"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary2 sm:text-sm/6"
                />
              </div>
            </div>
            {/* photourl */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-900">
                  PhotoURL
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="photoURL"
                  type="URL"
                  placeholder="Enter your photo URL"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary2 sm:text-sm/6"
                />
              </div>
            </div>
            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary2 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must be more than 6 characters, lowercase letter, uppercase letter"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="block w-full
              rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
              -outline-offset-1 outline-gray-300 placeholder:text-gray-400
              focus:outline-2 focus:-outline-offset-2 focus:outline-primary2
              sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full cursor-pointer justify-center rounded-md bg-BtnPrimary2 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-BtnPrimary1 "
              >
                Register
              </button>
            </div>
          </form>
          <div className="my-5">
            <SocalLogin></SocalLogin>
          </div>
          <p className="mt-10 text-center text-sm/6 ">
            If you have an account?{" "}
            <Link
              to="/auth/login"
              className="font-bold hover:underline text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
