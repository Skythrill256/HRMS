import { useEffect, useState } from "react";

const ClientForm = () => {
    const [empId, setEmpId] = useState("");

    const customerTypes = ["Individual", "Vendor"];
    const countries = [/* same countries */];
    const states = [/* same states */];

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Client Information</h2>

                <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
                    {/* Client ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                        <input
                            type="text"
                            value={empId}
                            disabled
                            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Client Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                        <input type="text" placeholder="Client Name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input type="text" placeholder="Company Name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    {/* Customer Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option>Select Type</option>
                            {customerTypes.map((type, idx) => (
                                <option key={idx}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    {/* Phone No */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone No (+Country Code)</label>
                        <input type="tel" placeholder="+91 9876543210" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option>Select Country</option>
                            {countries.map((c, idx) => (
                                <option key={idx}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option>Select State</option>
                            {states.map((s, idx) => (
                                <option key={idx}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input type="text" placeholder="City" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    {/* Address Line 1 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line-1</label>
                        <input type="text" placeholder="Address Line 1" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    {/* Address Line 2 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line-2</label>
                        <input type="text" placeholder="Address Line 2" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    {/* Pin Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code</label>
                        <input type="text" placeholder="Pin Code" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-3 text-right mt-4">
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
