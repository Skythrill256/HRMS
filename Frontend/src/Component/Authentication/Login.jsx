import { useState } from "react"

const Login = () => {

  const [hide, setHide] = useState(true);
  const [id, setId] = useState();
  const [pass, setPass] = useState();

  let handleSubmit = () => {
    if (id.trim() !== "" && pass.trim() !== "") {
      setInterval(() => {
        setHide(false);
      }, 2000);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-xl rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-indigo-500">Login</h1>
        <form action="/" onSubmit={(e) => e.preventDefault()}>

          <div className={`mb-1 ${hide ? "block" : "hidden"} `}>
            <div className="mb-2">
              <label className=" text-sm font-medium text-gray-700 mb-1">User ID</label>
              <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="my-0 shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter user ID" required />
            </div>
            <div className="mb-4">
              <label className=" text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
              <a href="/"
                className="text-xs text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
                Password?</a>
              <button type="submit" className="w-full flex justify-center py-1.5 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit}>Get OTP</button>
            </div>
          </div>

          <div className={`mb-2 ${hide ? "hidden" : "block"}`}>
            <label className="text-sm font-medium text-gray-700 mb-1 mt-2">OTP</label>
            <input type="text" id="otp" className="my-0 shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter OTP" required/>
            <button type="submit" className="w-full flex justify-center py-1.5 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
          </div>

        </form>
      </div>
    </div>
  )
}
export default Login