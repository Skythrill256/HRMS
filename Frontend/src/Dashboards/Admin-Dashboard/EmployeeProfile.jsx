import { useState, useEffect } from 'react';

const EmployeeProfile = ({ employeeData: initialEmployeeData }) => {
    const defaultEmployeeStructure = {
        id: '',
        firstName: '',
        lastName: '',
        phone: '',
        alternativePhone: '',
        email: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        country: '',
        state: '',
        city: '',
        fullAddress: '',
        zip: '',
        fatherName: '',
        motherName: '',
        guardianName: '',
        guardianPhone: '',
        guardianEmail: '',
        educationalInfo: {
            school: '',
            graduation: '',
            postGraduation: ''
        },
        bankInfo: {
            accountNumber: '',
            ifsc: '',
            bankName: '',
            accountHolderName: ''
        },
        adharFrontImage: ' ',
        adharBackImage: ' ',
        panFrontImage: ' ',
        lastQualificationImage: ' ',
        employeeImage: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Image',
        cancelChequeImage: ' ',
    };

    const [employeeData, setEmployeeData] = useState(() => {
        const mergedData = {
            ...defaultEmployeeStructure,
            ...initialEmployeeData,
            educationalInfo: {
                ...defaultEmployeeStructure.educationalInfo,
                ...(initialEmployeeData?.educationalInfo || {})
            },
            bankInfo: {
                ...defaultEmployeeStructure.bankInfo,
                ...(initialEmployeeData?.bankInfo || {})
            },
            employeeImage: initialEmployeeData?.employeeImage || defaultEmployeeStructure.employeeImage
        };
        return mergedData;
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState(() => ({ ...employeeData }));
    const [box, setBox] = useState("hidden"); // Confirm edit

    useEffect(() => {
        const mergedData = {
            ...defaultEmployeeStructure,
            ...initialEmployeeData,
            educationalInfo: {
                ...defaultEmployeeStructure.educationalInfo,
                ...(initialEmployeeData?.educationalInfo || {})
            },
            bankInfo: {
                ...defaultEmployeeStructure.bankInfo,
                ...(initialEmployeeData?.bankInfo || {})
            },
            employeeImage: initialEmployeeData?.employeeImage || defaultEmployeeStructure.employeeImage
        };
        setEmployeeData(mergedData);
        setEditableData(mergedData);
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

    const handleImageFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditableData(prev => ({
                    ...prev,
                    [fieldName]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => setIsEditing(true);
    const handleSaveClick = () => {
        setBox("flex");
    };
    const handleSaveChabge = () => {
        setEmployeeData(editableData);
        setIsEditing(false);
        setBox("hidden");
        // In a real application, you'd send `editableData` to a backend here.
    }
    const handleCancelChange = () => {
        setEditableData(employeeData);
        setIsEditing(false);
        setBox("hidden");
    }

    const handleCancelClick = () => {
        setEditableData(employeeData);
        setIsEditing(false);
        setBox("hidden");
        // alert('Changes cancelled.');
    };

    // Refined renderField for better responsiveness and less overflow
    const renderField = (label, value, name, type = 'text', readOnly = false, isTextArea = false) => (
        <div className="mb-3 flex flex-col sm:flex-row sm:items-baseline sm:gap-2 w-full">
            <label className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base whitespace-nowrap min-w-[100px] sm:min-w-[120px] lg:min-w-[150px] text-left flex-shrink-0">
                {label}:
            </label>
            {isEditing && !readOnly ? (
                isTextArea ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className="shadow-sm border border-gray-300 dark:border-gray-600 rounded-lg w-full py-1.5 px-3 text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-y text-sm sm:text-base flex-grow"
                        rows="2"
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className="shadow-sm border border-gray-300 dark:border-gray-600 rounded-lg w-full py-1.5 px-3 text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base flex-grow"
                    />
                )
            ) : (
                <p className="text-gray-800 dark:text-gray-100 text-sm sm:text-base break-words flex-grow text-left">{value || 'N/A'}</p>
            )}
        </div>
    );

    const renderImageField = (label, imageUrl, name) => (
        <div className="flex flex-col items-center mb-4">
            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-2 text-center">
                {label}:
            </label>
            <div className="w-full max-w-[200px] h-32 md:h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center border border-gray-300 dark:border-gray-600 shadow-sm">
                {imageUrl ? (
                    <img src={imageUrl} alt={label} className="object-cover w-full h-full" />
                ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-xs text-center p-2">No Image Available</span>
                )}
            </div>
            {isEditing && (
                <div className="mt-3 text-center">
                    <label className="block text-blue-600 dark:text-blue-400 cursor-pointer bg-blue-100 dark:bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-700 transition text-sm">
                        Upload {label}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageFileChange(e, name)}
                        />
                    </label>
                </div>
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
        <>
            {/* Alert Box save changes */}
            <div className={`fixed inset-0 ${box} items-center justify-center bg-black bg-opacity-50 z-50`}>
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-[320px] max-w-sm text-center">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Edit changes?</h2>

                    <div class="flex justify-center gap-4">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded" onClick={handleCancelChange}>
                            Cancel
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded" onClick={handleSaveChabge}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>



            <div className="p-4 sm:p-6 md:p-8 bg-background dark:bg-gray-900 min-h-screen rounded-lg shadow-lg">
                {/* Header and Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 sm:gap-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
                        Employee Profile: <span className="text-blue-700 dark:text-blue-400">{employeeData.firstName} {employeeData.lastName}</span>
                    </h1>
                    {!isEditing ? (
                        <button
                            onClick={handleEditClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 w-full sm:w-auto"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                onClick={handleSaveClick}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-200"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelClick}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Section: All Employee Information (Consolidated) */}
                <div className="bg-card dark:bg-gray-800 p-6 rounded-xl shadow-xl mb-8">
                    {/* Profile Overview (Image + Basic Personal Details) - remains at the top of this consolidated section */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                        {/* Employee Image */}
                        <div className="flex-shrink-0 flex flex-col items-center">
                            <img
                                src={editableData.employeeImage}
                                alt={`${employeeData.firstName} ${employeeData.lastName}`}
                                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-blue-400 dark:border-blue-600 shadow-lg"
                            />
                            {isEditing && (
                                <div className="mt-4 text-center">
                                    <label className="block text-blue-600 dark:text-blue-400 cursor-pointer bg-blue-100 dark:bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-700 transition text-sm">
                                        Upload New Profile Pic
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleImageFileChange(e, 'employeeImage')}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Basic Personal Info */}
                        <div className="flex-grow text-center md:text-left w-full">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                {editableData.firstName} {editableData.lastName}
                            </h2>
                            {/* Adjusted grid for basic info to better handle tablet/mobile widths */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm md:text-base">
                                {renderField('Employee ID', employeeData.id, 'id', 'text', true)}
                                {renderField('Email', editableData.email, 'email', 'email')}
                                {renderField('Phone', editableData.phone, 'phone', 'tel')}
                                {renderField('Alt. Phone', editableData.alternativePhone, 'alternativePhone', 'tel')}
                                {renderField('Date of Birth', editableData.dateOfBirth, 'dateOfBirth', 'date')}
                                {renderField('Age', editableData.age, 'age', 'number')}
                                {renderField('Gender', editableData.gender, 'gender')}
                            </div>
                        </div>
                    </div>

                    {/* Sub-section: Contact Information */}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                        {renderField('Country', editableData.country, 'country')}
                        {renderField('State', editableData.state, 'state')}
                        {renderField('City', editableData.city, 'city')}
                        {renderField('Zip Code', editableData.zip, 'zip')}
                        <div className="md:col-span-2 lg:col-span-3">
                            {renderField('Full Address', editableData.fullAddress, 'fullAddress', 'text', false, true)}
                        </div>
                    </div>

                    {/* Sub-section: Family & Guardian Details */}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Family & Guardian Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {renderField("Father's Name", editableData.fatherName, 'fatherName')}
                        {renderField("Mother's Name", editableData.motherName, 'motherName')}
                        {renderField('Guardian Name', editableData.guardianName, 'guardianName')}
                        {renderField('Guardian Phone', editableData.guardianPhone, 'guardianPhone', 'tel')}
                        {renderField('Guardian Email', editableData.guardianEmail, 'guardianEmail', 'email')}
                    </div>

                    {/* Sub-section: Educational Background */}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Educational Background
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {renderField('School/College', editableData.educationalInfo?.school, 'educationalInfo.school')}
                        {renderField('Graduation', editableData.educationalInfo?.graduation, 'educationalInfo.graduation')}
                        {renderField('Post Graduation', editableData.educationalInfo?.postGraduation, 'educationalInfo.postGraduation')}
                    </div>

                    {/* Sub-section: Bank Information */}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Bank Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {renderField('Bank Name', editableData.bankInfo?.bankName, 'bankInfo.bankName')}
                        {renderField('Account Number', editableData.bankInfo?.accountNumber, 'bankInfo.accountNumber')}
                        {renderField('IFSC Code', editableData.bankInfo?.ifsc, 'bankInfo.ifsc')}
                        {renderField('Account Holder', editableData.bankInfo?.accountHolderName, 'bankInfo.accountHolderName')}
                    </div>
                </div>

                {/* Separate Section: Documents */}
                <div className="bg-card dark:bg-gray-800 p-6 rounded-xl shadow-xl">
                    <h2 className="text-xl md:text-2xl font-semibold md:font-bold text-blue-700 dark:text-blue-400 mb-4 border-b pb-2">
                        Documents
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        {renderImageField('Aadhar Front', editableData.adharFrontImage, 'adharFrontImage')}
                        {renderImageField('Aadhar Back', editableData.adharBackImage, 'adharBackImage')}
                        {renderImageField('PAN Front', editableData.panFrontImage, 'panFrontImage')}
                        {renderImageField('Cancelled Cheque / Passbook First Page', editableData.cancelChequeImage, 'cancelChequeImage')}
                        {renderImageField('Last Qualification', editableData.lastQualificationImage, 'lastQualification')}
                    </div>
                </div>
            </div>
        </>

    );
};

export default EmployeeProfile;