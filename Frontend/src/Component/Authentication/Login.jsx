import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [hide, setHide] = useState(true);
  const [id, setId] = useState();
  const [pass, setPass] = useState();

  const otpRefs = useRef([]); // For OTP auto-focus

  let handleSubmit = () => {
    if (id.trim() !== "" && pass.trim() !== "") {
      setInterval(() => {
        setHide(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50">
      <div className="flex bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={`${hide ? "login.jpg" : "otp.avif"}`}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 px-8 py-6">
          <h1 className="text-2xl font-bold text-center mb-4 pt-5 text-indigo-500">Sign In</h1>
          <form action="/" onSubmit={(e) => e.preventDefault()}>
            {/* Login Section */}
            <div className={`mb-1 ${hide ? "block" : "hidden"}`}>
              <div className="mb-2">
                <label className=" text-sm font-medium text-gray-700 mb-1">User ID</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="my-0 shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter user ID"
                  required
                />
              </div>
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                <Link
                  to="/login/forgetpass"
                  className="text-xs text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline hover:indigo-800"
                >
                  Forgot Password?
                </Link>
                <button
                  type="submit"
                  className="w-full flex justify-center py-1.5 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSubmit}
                >
                  Get OTP
                </button>
              </div>
            </div>

            {/* OTP Section */}
            <div className={`mb-2 ${hide ? "hidden" : "block"}`}>
              <label className="text-sm font-medium text-gray-700 mb-1 mt-2">OTP</label>

              <div className="flex justify-center gap-4 mt-2">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    ref={(el) => (otpRefs.current[i] = el)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length === 1 && i < 3) {
                        otpRefs.current[i + 1].focus(); // go to next box
                      } else if (value.length === 1 && i === 3) {
                        otpRefs.current[i].blur(); // blur last box
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !e.target.value && i > 0) {
                        otpRefs.current[i - 1].focus(); // go back
                      }
                    }}
                    className="w-12 h-12 text-center text-xl shadow-sm rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="-"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-1.5 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;