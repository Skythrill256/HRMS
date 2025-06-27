import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa'; // Import FaTimes for the cross icon

// Receive onCancel and onSave props
const Employee = ({ initialData, onSave, onCancel }) => {
    const [empId, setEmpId] = useState("");
    const [formData, setFormData] = useState(initialData || {
        // Initialize form data with default values or initialData if editing
        formalSituation: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    // Static counter for ID generation (for demonstration, in real app, this would come from backend)
    const staticCounter = 25;

    useEffect(() => {
        // Only generate ID if it's a new employee (initialData is null)
        if (!initialData) {
            const generateEmpId = () => {
                const date = new Date();
                const year = date.getFullYear();
                const baseId = `IGEMP${year}`;
                // Use a dynamic counter or actual backend ID logic here
                const fullId = `${baseId}${String(staticCounter).padStart(4, "0")}`;
                setEmpId(fullId);
            };
            generateEmpId();
        } else {
            // If editing, use existing employee ID
            setEmpId(initialData.id);
            setFormData(initialData); // Pre-fill form for editing
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send formData to your backend
        // For this example, we'll call the onSave prop
        if (onSave) {
            onSave({ ...formData, id: empId }); // Pass all form data including the generated ID
        }
        // No need to hide the form here, onSave in parent will handle closing modal
    };

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-auto dark:bg-gray-900 dark:text-white relative">
            {/* Cross Button - now uses FaTimes and calls onCancel prop */}
            <button
                onClick={onCancel} // This closes the modal in the parent component
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                aria-label="Close"
            >
                <FaTimes className="text-2xl" />
            </button>

            <form className="w-full p-6 space-y-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">
                    {initialData ? 'Edit Employee' : 'Add New Employee'}
                </h1>

                {/* Row 1: EMP ID & Formal Situation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">EMP ID</label>
                        <input
                            type="text"
                            value={empId}
                            disabled
                            className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Formal Situation</label>
                        <input
                            type="text"
                            name="formalSituation"
                            value={formData.formalSituation}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="Enter first name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Phone No</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
                        {initialData ? 'Update Employee' : 'Add Now'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Employee;