import React, { useState, useEffect } from 'react';

const EmployeeProfile = ({ initialEmployeeData }) => {
    const defaultEmployeeStructure = {
        id: '', firstName: '', lastName: '', email: '', phone: '', password: '',
        address: { street: '', city: '', state: '', zip: '' },
        parentDetails: { fatherName: '', motherName: '' },
        bankDetails: { bankName: '', accountNumber: '', ifscCode: '' },
        adharNumber: '',
        imageUrl: 'https://via.placeholder.com/150' // Default placeholder image
    };

    const [employeeData, setEmployeeData] = useState(() => ({
        ...defaultEmployeeStructure,
        ...initialEmployeeData,
        address: { ...defaultEmployeeStructure.address, ...(initialEmployeeData?.address || {}) },
        parentDetails: { ...defaultEmployeeStructure.parentDetails, ...(initialEmployeeData?.parentDetails || {}) },
        bankDetails: { ...defaultEmployeeStructure.bankDetails, ...(initialEmployeeData?.bankDetails || {}) },
        // Ensure imageUrl is merged or uses default
        imageUrl: initialEmployeeData?.imageUrl || defaultEmployeeStructure.imageUrl
    }));

    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState(() => ({ ...employeeData }));

    useEffect(() => {
        setEmployeeData(() => ({
            ...defaultEmployeeStructure,
            ...initialEmployeeData,
            address: { ...defaultEmployeeStructure.address, ...(initialEmployeeData?.address || {}) },
            parentDetails: { ...defaultEmployeeStructure.parentDetails, ...(initialEmployeeData?.parentDetails || {}) },
            bankDetails: { ...defaultEmployeeStructure.bankDetails, ...(initialEmployeeData?.bankDetails || {}) },
            imageUrl: initialEmployeeData?.imageUrl || defaultEmployeeStructure.imageUrl
        }));
        setEditableData(() => ({
            ...defaultEmployeeStructure,
            ...initialEmployeeData,
            address: { ...defaultEmployeeStructure.address, ...(initialEmployeeData?.address || {}) },
            parentDetails: { ...defaultEmployeeStructure.parentDetails, ...(initialEmployeeData?.parentDetails || {}) },
            bankDetails: { ...defaultEmployeeStructure.bankDetails, ...(initialEmployeeData?.bankDetails || {}) },
            imageUrl: initialEmployeeData?.imageUrl || defaultEmployeeStructure.imageUrl
        }));
    }, [initialEmployeeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditableData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setEditableData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // New handler for image change
    const handleImageChange = (e) => {
        // In a real application, you would handle file uploads here.
        // For now, we'll just log and maybe set a dummy new URL.
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // For demonstration, set the image preview to a base64 URL
                setEditableData(prev => ({
                    ...prev,
                    imageUrl: reader.result
                }));
                console.log("File selected for upload:", file.name);
                // In a real app: upload 'file' to your storage service
                // and then set 'imageUrl' to the returned public URL.
            };
            reader.readAsDataURL(file);
        }
    };


    const handleEditClick = () => setIsEditing(true);
    const handleSaveClick = () => {
        setEmployeeData(editableData);
        setIsEditing(false);
        alert('Employee details updated successfully!');
    };
    const handleCancelClick = () => {
        setEditableData(employeeData);
        setIsEditing(false);
        alert('Changes cancelled.');
    };

    const renderField = (label, value, name, type = 'text', readOnly = false) => (
        <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">
                {label}:
            </label>
            {isEditing && !readOnly ? (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
            ) : (
                <p className="text-gray-800 dark:text-gray-100 text-base">{value}</p>
            )}
        </div>
    );

    if (!employeeData || !employeeData.id) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 py-12">
                No employee selected or data available.
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-[#F8FAFD] dark:bg-gray-900 min-h-screen rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Employee Profile: {employeeData.firstName} {employeeData.lastName}
                </h1>
                {!isEditing ? (
                    <button
                        onClick={handleEditClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition duration-200"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="space-x-2">
                        <button
                            onClick={handleSaveClick}
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition duration-200"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelClick}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Profile Sections */}
            <div className="grid gap-8">
                {/* Employee Image Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center">
                    <img
                        src={editableData.imageUrl} // Use editableData for preview during editing
                        alt={`${employeeData.firstName} ${employeeData.lastName}`}
                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 dark:border-blue-600 mb-4"
                    />
                    {isEditing && (
                        <div className="mt-2">
                            <label className="block text-blue-600 dark:text-blue-400 cursor-pointer bg-blue-100 dark:bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-700 transition">
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                {/* Display current image URL in edit mode for context */}
                                Current: {editableData.imageUrl.length > 50 ? editableData.imageUrl.substring(0, 47) + '...' : editableData.imageUrl}
                            </p>
                        </div>
                    )}
                </div>

                {/* Personal Details */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h2 className="text-xl md:text-2xl font-semibold md:font-bold text-blue-700 dark:text-blue-400 mb-4 border-b pb-2">Personal Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        {renderField ('EMP ID', employeeData.id, 'id', 'text', true) }
                        {renderField('First Name', editableData.firstName, 'firstName')}
                        {renderField('Last Name', editableData.lastName, 'lastName')}
                        {renderField('Email', editableData.email, 'email', 'email')}
                        {renderField('Phone', editableData.phone, 'phone', 'tel')}
                        {renderField('Password', editableData.password, 'password', 'password')}
                    </div>
                </div>

                {/* Address */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h2 className="text-xl md:text-2xl font-semibold md:font-bold text-blue-700 dark:text-blue-400 mb-4 border-b pb-2">Address Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderField('Street', editableData.address?.street, 'address.street')}
                        {renderField('City', editableData.address?.city, 'address.city')}
                        {renderField('State', editableData.address?.state, 'address.state')}
                        {renderField('Zip Code', editableData.address?.zip, 'address.zip')}
                    </div>
                </div>

                {/* Parent */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h2 className="text-xl md:text-2xl font-semibold md:font-bold text-blue-700 dark:text-blue-400 mb-4 border-b pb-2">Parent Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderField("Father's Name", editableData.parentDetails?.fatherName, 'parentDetails.fatherName')}
                        {renderField("Mother's Name", editableData.parentDetails?.motherName, 'parentDetails.motherName')}
                    </div>
                </div>

                {/* Other */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h2 className="text-xl md:text-2xl font-semibold md:font-bold text-blue-700 dark:text-blue-400 mb-4 border-b pb-2">Other Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderField('Bank Name', editableData.bankDetails?.bankName, 'bankDetails.bankName')}
                        {renderField('Account Number', editableData.bankDetails?.accountNumber, 'bankDetails.accountNumber')}
                        {renderField('IFSC Code', editableData.bankDetails?.ifscCode, 'bankDetails.ifscCode')}
                        {renderField('Aadhar Number', editableData.adharNumber, 'adharNumber')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;