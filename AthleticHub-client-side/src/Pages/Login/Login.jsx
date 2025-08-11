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
    <div>
      <div className="mt-15">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="/logo.png"
              className="mx-auto w-20 rounded-full "
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Login in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} className="space-y-6">
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
                {/* password */}
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-bold hover:underline text-blue-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary2 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-BtnPrimary1 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-BtnPrimary2 cursor-pointer"
                >
                  LogIn
                </button>
              </div>
            </form>
            <SocalLogin></SocalLogin>
            <p className="mt-10 text-center text-sm/6 ">
              Don't Have An account?{" "}
              <Link
                to="/auth/register"
                className="font-bold hover:underline text-blue-700"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
