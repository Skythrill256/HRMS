import { useState } from "react"

const ForgetPass = ({section}) => {

    //state for hide or unhide
    const [email, setEmail] = useState("block");
    const [otp, setOtp] = useState("hidden");
    const [pass, setPass] = useState("hidden");

    //satate for track field
    const [emailValue, setEmailValue] = useState("");
    const [otplValue, setOtpValue] = useState("");
    const [passValue1, setPassValue1] = useState("");
    const [passValue2, setPassValue2] = useState("");

    let emailClick = () => {
        if (emailValue.trim() !== "") {
            setEmail("hidden");
            setOtp("block");
        }
    }
    let otpClick = () => {
        if (otplValue.trim() !== ""){
        setOtp("hidden");
        setPass("block");
        }
    }
    let passClick = () => {
        if(passValue1.trim() === passValue2.trim()){
            console.log(passValue1);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white shadow-xl rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 text-indigo-500">Forget Password</h1>
                <form action="/" onSubmit={(e) => e.preventDefault()}>


                    <div className="mb-1">
                        <div className={`mb-2 ${email}`}>
                            <label className=" text-sm font-medium text-gray-700 mb-1">Email ID</label>
                            <input type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} className="my-0 shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="name@gmail.com" required />
                            <button type="submit" className="w-full flex justify-center py-1.5 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={emailClick}>Get OTP</button>
                        </div>


                        <div className={`mb-2 ${otp}`}>
                            <label className="text-sm font-medium text-gray-700 mb-1 mt-2">OTP</label>
                            <input type="text" value={otplValue} onChange={(e) => setOtpValue(e.target.value)} id="otp" className="my-0 shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter OTP" required />
                            <button type="submit" className="w-full flex justify-center py-1.5 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={otpClick}>Submit</button>
                        </div>

                        <div className={`mb-4 ${pass}`}>
                            <label className=" text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input type="password" value={passValue1} onChange={(e) => setPassValue1(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
                            <label className=" text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input type="password" value={passValue2} onChange={(e) => setPassValue2(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Re-enter your password" required />
                            <button type="submit" className="w-full flex justify-center py-1.5 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={passClick}>Reset Password</button>
                        </div>
                    </div>



                </form>
            </div>
        </div>
    )
}
export default ForgetPass;