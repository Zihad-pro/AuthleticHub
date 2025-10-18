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
    <div className="font-Primary bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 dark:text-white min-h-screen">
      <div className="pt-20">
        <div className="flex min-h-[80vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          {/* Register Card */}
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              {/* Logo Section */}
              <div className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-BtnPrimary2 p-1 shadow-lg">
                  <img
                    alt="AthleticHub"
                    src="/logo.png"
                    className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800"
                  />
                </div>
                <h2 className="mt-6 text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                  Join AthleticHub
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Create your account and start your journey
                </p>
              </div>

              {/* Register Form */}
              <div className="mt-8">
                <form onSubmit={handleRegister} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        name="displayName"
                        type="text"
                        placeholder="Enter your full name"
                        required
                        autoComplete="name"
                        className="block w-full rounded-xl bg-gray-50 dark:bg-gray-700 px-4 py-3.5 text-gray-900 dark:text-white outline-none border border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Photo URL Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profile Photo URL
                    </label>
                    <div className="relative">
                      <input
                        name="photoURL"
                        type="url"
                        placeholder="Enter your photo URL"
                        required
                        autoComplete="photo"
                        className="block w-full rounded-xl bg-gray-50 dark:bg-gray-700 px-4 py-3.5 text-gray-900 dark:text-white outline-none border border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-xl bg-gray-50 dark:bg-gray-700 px-4 py-3.5 text-gray-900 dark:text-white outline-none border border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Min. 6 characters
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        pattern=".{6,}"
                        title="Must be more than 6 characters, include lowercase and uppercase letters"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        autoComplete="new-password"
                        className="block w-full rounded-xl bg-gray-50 dark:bg-gray-700 px-4 py-3.5 text-gray-900 dark:text-white outline-none border border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    </div>
                   
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center items-center gap-2 rounded-md bg-BtnPrimary2 cursor-pointer px-4 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Create Account
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        Or sign up with
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Login */}
                <div className="mt-6">
                  <SocalLogin />
                </div>

                {/* Login Link */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/auth/login"
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200 underline-offset-2 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-8 text-center">
            <div className="flex justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
              <a
                href="#"
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
