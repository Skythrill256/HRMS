import React, { useState } from "react";

const Leave = () => {
    const [showForm, setShowForm] = useState(false);
    const [salaryType, setSalaryType] = useState("");

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 relative">
            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-[#FF4500] dark:text-white">Leaves</h1>
            </div>

            {/* Search + Button Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                {/* Search Bar */}
                <div className="w-full sm:w-1/2">
                    <input
                        type="text"
                        placeholder="Search Leaves..."
                        className="border border-nav dark:border-gray-600 rounded-xl px-4 py-2 w-full sm:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* Create Leave Button */}
                <div>
                    <button
                        className="px-6 py-2 bg-[#FF4500] text-white font-semibold rounded-lg shadow transition-all"
                        onClick={() => setShowForm(true)}
                    >
                        + Create Leave
                    </button>
                </div>
            </div>

            {/* Conditional Modal Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-lg relative">
                        <h2 className="text-2xl font-bold text-center mb-4 text-[#FF4500]">Create Leave</h2>

                        <form className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1 dark:text-white">Employee ID:</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1 dark:text-white">Employee Name:</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1 dark:text-white">Leave Days:</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1 dark:text-white">Salary:</label>
                                <select
                                    value={salaryType}
                                    onChange={(e) => setSalaryType(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Select</option>
                                    <option value="PAID">PAID</option>
                                    <option value="UNPAID">UNPAID</option>
                                    <option value="BOTH">BOTH</option>
                                </select>
                            </div>

                            {/* Conditional Inputs Based on Salary Type */}
                            {salaryType === "PAID" && (
                                <div>
                                    <label className="block font-medium mb-1 dark:text-white">Paid Days:</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            )}
                            {salaryType === "UNPAID" && (
                                <div>
                                    <label className="block font-medium mb-1 dark:text-white">Unpaid Days:</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            )}
                            {salaryType === "BOTH" && (
                                <div>
                                    <label className="block font-medium mb-1 dark:text-white">Duration (e.g. 2 Paid, 3 Unpaid):</label>
                                    <input
                                        type="text"
                                        placeholder="Example: 2 Paid, 3 Unpaid"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setSalaryType("");
                                    }}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leave;
