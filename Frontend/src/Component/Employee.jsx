import { useEffect, useState } from "react";

const Employee = ({ showEmp }) => {
    const [empId, setEmpId] = useState("");
    const [showForm, setShowForm] = useState(true); // new state for form visibility

    const staticCounter = 1;

    useEffect(() => {
        const generateEmpId = () => {
            const date = new Date();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            const baseId = `IGEMP0${month}${year}`;
            const fullId = `${baseId}${String(staticCounter).padStart(5, "0")}`;
            setEmpId(fullId);
        };

        generateEmpId();
    }, []);

    if (!showForm) return null; // don't render if hidden

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-[20rem] md:w-[36rem] absolute top-9 z-50 dark:bg-gray-900 dark:text-white">
            {/* Cross Button */}
            <button
                onClick={() => {
                    setShowForm(false);
                    showEmp(false);
                }}

                className="absolute top-1 right-2 text-gray-500 hover:text-red-600 text-3xl font-bold"
            >
                &times;
            </button>

            <form className="w-full p-6 space-y-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">Employee</h1>

                {/* Row 1: EMP ID & Formal Situation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">EMP ID</label>
                        <input
                            type="text"
                            value={empId}
                            disabled
                            className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Formal Situation</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Enter formal situation"
                            required
                        />
                    </div>
                </div>

                {/* Row 2: First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">First Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
                            placeholder="Enter first name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
                            placeholder="Enter last name"
                            required
                        />
                    </div>
                </div>

                {/* Row 3: Email & Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Phone No</label>
                        <input
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
                            placeholder="Enter phone number"
                            required
                        />
                    </div>
                </div>

                {/* Row 4: Password & Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
                            placeholder="Confirm password"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Add Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Employee;
