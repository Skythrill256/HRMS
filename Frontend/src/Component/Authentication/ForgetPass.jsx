import { useState, useRef } from "react";
import img_forget from "../../../public/forget.avif";
import img_otp from "../../../public/otp.avif";

const ForgetPass = () => {
  const [email, setEmail] = useState("block");
  const [otp, setOtp] = useState("hidden");
  const [pass, setPass] = useState("hidden");

  const [emailValue, setEmailValue] = useState("");
  const [passValue1, setPassValue1] = useState("");
  const [passValue2, setPassValue2] = useState("");

  const [image, setImage] = useState(true);

  const otpRefs = useRef([]);

  const emailClick = () => {
    setTimeout(() => {
      if (emailValue.trim() !== "") {
        setEmail("hidden");
        setOtp("block");
        setImage(false);
      }
    }, 1500);
  };

  const otpClick = () => {
    const otpValue = otpRefs.current.map((ref) => ref.value).join("");
    if (otpValue.length === 4) {
      setOtp("hidden");
      setPass("block");
    }
  };

  const passClick = () => {
    if (passValue1.trim() === passValue2.trim()) {
      console.log(passValue1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Left-side image */}
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img
            src={image ? img_forget : img_otp}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right-side form */}
        <div className="w-full md:w-1/2 px-8 py-6">
          <h1 className="text-2xl font-bold text-center mb-4 pt-6 text-indigo-500">
            Forget Password
          </h1>
          <form action="/" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-1">
              {/* Email input */}
              <div className={`mb-2 ${email}`}>
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="my-0 shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="name@gmail.com"
                  required
                />
                <button
                  type="submit"
                  className="w-full flex justify-center py-1.5 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={emailClick}
                >
                  Get OTP
                </button>
              </div>

              {/* OTP input */}
              <div className={`mb-2 ${otp}`}>
                <label className="text-sm font-medium text-gray-700 mb-1 mt-2">
                  OTP
                </label>
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
                          otpRefs.current[i + 1]?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !e.target.value && i > 0) {
                          otpRefs.current[i - 1]?.focus();
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
                  onClick={otpClick}
                >
                  Submit
                </button>
              </div>

              {/* Password input */}
              <div className={`mb-4 ${pass}`}>
                <label className="text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passValue1}
                  onChange={(e) => setPassValue1(e.target.value)}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={passValue2}
                  onChange={(e) => setPassValue2(e.target.value)}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Re-enter your password"
                  required
                />
                <button
                  type="submit"
                  className="w-full flex justify-center py-1.5 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={passClick}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
