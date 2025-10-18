import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocalLogin from "../../Components/Socallogin/SocalLogin";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { logIn } = use(AuthContext);
  const navigate=useNavigate();
  const location=useLocation();
  console.log(navigate);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const { email, password } = data;
    logIn(email, password)
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login Succesfully",
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
          title: "email address and password give correctly",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="font-Primary bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 dark:text-white min-h-screen">
      <div>
        <div className="flex min-h-[80vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          {/* Login Card */}
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
                  Welcome Back
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Sign in to your AthleticHub account
                </p>
              </div>

              {/* Login Form */}
              <div className="mt-8">
                <form onSubmit={handleLogin} className="space-y-6">
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
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        required
                        autoComplete="current-password"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remember me
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
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign In
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
                        Or continue with
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Login */}
                <div className="mt-6">
                  <SocalLogin />
                </div>

                {/* Register Link */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      to="/auth/register"
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200 underline-offset-2 hover:underline"
                    >
                      Create account
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

export default Login;
