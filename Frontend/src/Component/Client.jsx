import { useEffect, useState } from "react";

const ClientForm = ({setClient}) => {
    const [empId, setEmpId] = useState("");

    const customerTypes = ["Individual", "Vendor"];
    const countries = [
        "Argentina", "Australia", "Bangladesh", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia",
        "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "Hungary", "India",
        "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico", "Nepal", "Netherlands",
        "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Romania",
        "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden",
        "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Vietnam"
    ].sort();
    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh",
        "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ].sort();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted successfully!");
        // Here you can collect and process values from refs or state
    };
    //cancel button
    const handleCancel=()=>{
        setClient(false);
        console.log("cancel")
    }

    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 p-6">
            <div className="dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-6xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Client Information</h2>

                <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
                    {/* Client ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Client ID</label>
                        <input
                            type="text"
                            value={empId}
                            disabled
                            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Client Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Client Name</label>
                        <input type="text" placeholder="Client Name" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800" />
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Company Name</label>
                        <input type="text" placeholder="Company Name" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800" />
                    </div>

                    {/* Customer Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Customer Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white">
                            <option>Select Type</option>
                            {customerTypes.map((type, idx) => (
                                <option key={idx}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Email</label>
                        <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800" />
                    </div>

                    {/* Phone No */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Phone No (+Country Code)</label>
                        <input type="tel" placeholder="+91 9876543210" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800" />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Country</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-800">
                            <option>Select Country</option>
                            {countries.map((c, idx) => (
                                <option key={idx}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">State</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-800">
                            <option>Select State</option>
                            {states.map((s, idx) => (
                                <option key={idx}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">City</label>
                        <input type="text" placeholder="City" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800" />
                    </div>

                    {/* Address Line 1 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Address Line-1</label>
                        <input type="text" placeholder="Address Line 1" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800" />
                    </div>

                    {/* Address Line 2 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Address Line-2</label>
                        <input type="text" placeholder="Address Line 2" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800" />
                    </div>

                    {/* Pin Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Pin Code</label>
                        <input type="text" placeholder="Pin Code" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800" />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-3 flex justify-end mt-4 space-x-4">
                        <button
                            type="button"
                            className="bg-red-600 text-white px-6 py-2 rounded-md shadow hover:bg-red-700"
                            onClick={handleCancel} // Replace with custom logic if needed
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700"
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ClientForm;
