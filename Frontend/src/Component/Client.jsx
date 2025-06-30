import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'; // Import useDispatch
import { nanoid } from '@reduxjs/toolkit'; // For generating unique IDs
import { toast } from 'react-toastify';
import { addClient } from '../../src/redux/slices/clientSlice.js'; // Adjust the path as needed

/**
 * ClientForm component for adding new client information to the Redux store.
 * It auto-generates a Client ID and handles all form input states and submission.
 *
 * @param {object} props - The component props.
 * @param {function} props.setClient - Function to control the visibility of this form (e.g., set to false on close/submit).
 */
const ClientForm = ({ setClient }) => {
    const dispatch = useDispatch(); // Initialize useDispatch hook

    // State to hold all form data
    const [formData, setFormData] = useState({
        id: '',
        clientName: '',
        companyName: '',
        customerType: '', 
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        fullAddress: '',
        addressLine1: '', 
        addressLine2: '', 
        zip: '',
        logoUrl: '', // Auto-generated based on client/company name
    });

    const customerTypes = ["Individual", "Business", "Vendor"]; // Added "Business" as it appeared in mock data
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

    // Generate Client ID and initial logoUrl on component mount
    useEffect(() => {
        // Generate a unique client ID using nanoid, prefixed with 'CL-'
        // This will create IDs like "CL-XYZ123ABC"
        const generatedId = `CL-${nanoid(8).toUpperCase()}`;
        setFormData(prev => ({
            ...prev,
            id: generatedId,
            logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(generatedId)}&background=random&size=128`,
        }));
    }, []);

    // Generic handler for all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Update logoUrl dynamically if clientName or companyName changes
        if (name === 'clientName' || name === 'companyName') {
            const nameForAvatar = value || formData.id; // Use clientName/companyName if available, otherwise ID
            setFormData(prev => ({
                ...prev,
                logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}&background=random&size=128`,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Combine address lines into fullAddress for the client object
        const fullAddress = `${formData.addressLine1}${formData.addressLine2 ? ', ' + formData.addressLine2 : ''}`;

        // Basic validation (add more as needed)
        if (!formData.clientName.trim() || !formData.companyName.trim() || !formData.customerType ||
            !formData.email.trim() || !formData.phone.trim() || !formData.country ||
            !formData.state || !formData.city.trim() || !formData.addressLine1.trim() || !formData.zip.trim()) {
            toast.error('Please fill in all required fields.', { position: 'top-center', theme: "colored" });
            return;
        }

        // Prepare the client object to dispatch
        const newClient = {
            id: formData.id, // Use the generated ID
            clientName: formData.clientName.trim(),
            companyName: formData.companyName.trim(),
            customerType: formData.customerType,
            logoUrl: formData.logoUrl, // Use the generated/updated logo URL
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            altPhone: '', // Not in form, setting as empty for now
            contactPersons: [], // Not in form, setting as empty for now
            address: {
                country: formData.country,
                state: formData.state,
                city: formData.city.trim(),
                fullAddress: fullAddress.trim(),
                zip: formData.zip.trim(),
            },
            shippingAddress: { // Defaulting as same as main address if not separate fields
                headline: 'Primary Address',
                country: formData.country,
                state: formData.state,
                city: formData.city.trim(),
                fullAddress: fullAddress.trim(),
                zip: formData.zip.trim(),
            },
            billing: { // Defaulting to zero for new clients
                totalBilled: 0,
                totalReceived: 0,
                totalDue: 0
            },
            orders: [], // Empty for new clients
            transactions: [], // Empty for new clients
        };

        // Dispatch the addClient action
        dispatch(addClient(newClient));

        toast.success('Client added successfully!', { position: 'top-center', theme: "colored" });

        // Reset form data and close the form
        setFormData({
            id: `CL-${nanoid(8).toUpperCase()}`, // Generate new ID for next form
            clientName: '',
            companyName: '',
            customerType: '',
            email: '',
            phone: '',
            country: '',
            state: '',
            city: '',
            fullAddress: '',
            addressLine1: '',
            addressLine2: '',
            zip: '',
            logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(`CL-${nanoid(8).toUpperCase()}`)}&background=random&size=128`, // New default logo URL
        });
        setClient(false); // Close the form
    };

    // Cancel button handler
    const handleCancel = () => {
        setClient(false);
        console.log("Form cancelled");
    };

    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 p-6">
            <div className="dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-6xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Client Information</h2>

                <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
                    {/* Client ID (Display only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Client ID</label>
                        <input
                            type="text"
                            value={formData.id} // Display the generated ID
                            disabled
                            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Client Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Client Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            placeholder="Client Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            required
                        />
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Company Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            required
                        />
                    </div>

                    {/* Customer Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Customer Type <span className="text-red-500">*</span></label>
                        <select
                            name="customerType"
                            value={formData.customerType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-800"
                            required
                        >
                            <option value="">Select Type</option>
                            {customerTypes.map((type, idx) => (
                                <option key={idx} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            required
                        />
                    </div>

                    {/* Phone No */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Phone No (+Country Code) <span className="text-red-500">*</span></label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 9876543210"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            required
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Country <span className="text-red-500">*</span></label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-800"
                            required
                        >
                            <option value="">Select Country</option>
                            {countries.map((c, idx) => (
                                <option key={idx} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">State <span className="text-red-500">*</span></label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-800"
                            required
                        >
                            <option value="">Select State</option>
                            {states.map((s, idx) => (
                                <option key={idx} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">City <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            required
                        />
                    </div>

                    {/* Address Line 1 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Address Line-1 <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            placeholder="Address Line 1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            required
                        />
                    </div>

                    {/* Address Line 2 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Address Line-2</label>
                        <input
                            type="text"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            placeholder="Address Line 2 (Optional)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Pin Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Pin Code <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            placeholder="Pin Code"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            required
                        />
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="md:col-span-3 flex justify-end mt-4 space-x-4">
                        <button
                            type="button"
                            className="bg-red-600 text-white px-6 py-2 rounded-md shadow hover:bg-red-700 transition-colors duration-200"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition-colors duration-200"
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
