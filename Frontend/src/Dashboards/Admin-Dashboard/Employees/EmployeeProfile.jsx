import { useState, useEffect } from 'react';

import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegUser, FaPhoneAlt,FaBusinessTime  } from "react-icons/fa";
import { MdEmail, MdDateRange, MdWork, MdAccountBalance, MdSchool } from "react-icons/md";

const EmployeeProfile = ({ employeeData: initialEmployeeData, handleBackToEmployeeList }) => {
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
            accountHolderName: '',
            adharCardNo: '',
            pancardNo: '',
        },
        companyInfo: {
            joinDate: '',
            employeeStatus: '',
            shift: '',
            department: '',
            designation: '',
            basicSalary: '',
            allowance: '',
            grossPay: '',
            increment: '',
            resignationdate: '',
            resignationtype: ''
        },
        adharFrontImage: '',
        adharBackImage: '',
        panFrontImage: '',
        lastQualificationImage: '',
        employeeImage: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Image',
        cancelChequeImage: '',
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
            companyInfo: { // Ensure companyInfo is merged correctly
                ...defaultEmployeeStructure.companyInfo,
                ...(initialEmployeeData?.companyInfo || {})
            },
            employeeImage: initialEmployeeData?.employeeImage || defaultEmployeeStructure.employeeImage
        };
        return mergedData;
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState(() => ({ ...employeeData }));
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Renamed 'box' for clarity
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);



    // Effect to handle initial employee data and dark mode preference
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
            companyInfo: {
                ...defaultEmployeeStructure.companyInfo,
                ...(initialEmployeeData?.companyInfo || {})
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
        setShowConfirmModal(true);
    };

    const handleConfirmSave = () => {
        setEmployeeData(editableData);
        setIsEditing(false);
        setShowConfirmModal(false);
        // In a real application, you'd send `editableData` to a backend here.

    }

    const handleCancelEdit = () => {
        setEditableData(employeeData); // Revert changes
        setIsEditing(false);
        setShowConfirmModal(false);

    };

    const renderField = (label, value, name, type = 'text', isTextArea = false, icon = null) => (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {label}
            </label>
            <div className="flex items-center gap-2">
                {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
                {isEditing ? (
                    isTextArea ? (
                        <textarea
                            name={name}
                            value={value}
                            onChange={handleChange}
                            className="w-full text-sm font-medium text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 py-1"
                            rows="2"
                        />
                    ) : (
                        <input
                            type={type}
                            name={name}
                            value={value}
                            onChange={handleChange}
                            className="w-full text-sm font-medium text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 py-1"
                        />
                    )
                ) : (
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 overflow-hidden text-ellipsis whitespace-nowrap">
                        {value || 'N/A'}
                    </p>
                )}
            </div>
        </div>
    );

    const renderImageField = (label, imageUrl, name) => (
        <div className="flex flex-col items-center mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-3 text-center">
                {label}
            </label>
            <div className="w-full max-w-[220px] h-36 md:h-52 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center border border-gray-300 dark:border-gray-600 shadow-inner">
                {imageUrl ? (
                    <img src={imageUrl} alt={label} className="object-cover w-full h-full" />
                ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-xs text-center p-2">No Image Available</span>
                )}
            </div>
            {isEditing && (
                <div className="mt-4 text-center">
                    <label className="block text-blue-600 dark:text-blue-400 cursor-pointer bg-blue-100 dark:bg-blue-800 px-5 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-700 transition text-sm font-semibold">
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
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                <p className="text-lg">No employee selected or data available. Please go back to the employee list.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans antialiased">
            {/* Image show Modal */}
            {isImageModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[999] p-4"
                    onClick={() => setIsImageModalOpen(false)}
                >
                    <img
                        src={editableData.employeeImage}
                        alt="Enlarged Employee"
                        className=" h-[13rem] w-[13rem] md:h-[18rem] md:w-[18rem] rounded-2xl shadow-2xl border-2 border-blue-400 object-contain cursor-pointer"
                    />
                </div>
            )}

            {/* Confirm Edit Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm text-center transform transition-all scale-100 duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Confirm Changes?</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">Are you sure you want to save these changes?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out"
                                onClick={handleConfirmSave}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="w-full max-w-7xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#009ffd] to-[#2a2a72] text-white py-4 px-4 sm:py-5 sm:px-6 md:py-6 md:px-8 flex justify-between items-center shadow-md">
                    {/* Back button */}
                    <button
                        onClick={handleBackToEmployeeList}
                        className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-3 sm:py-2.5 sm:px-5 rounded-lg shadow-md transition duration-200 flex items-center gap-2 text-sm sm:text-base"
                        aria-label="Back to Employees List"
                    >
                        <IoMdArrowRoundBack className="text-lg sm:text-xl" />
                        <span className="hidden sm:inline">Back to Employees</span>
                    </button>

                    {/* Title */}
                    <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold flex-grow text-center mx-2 sm:mx-4">Employee Profile</h1>


                    {/* Edit/Save/Cancel buttons */}
                    <div className="ml-4">
                        {!isEditing ? (
                            <button
                                onClick={handleEditClick}
                                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg shadow-md transition duration-200 text-sm sm:text-base"
                            >
                                Edit
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSaveClick}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg shadow-md transition duration-200 text-sm sm:text-base"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg shadow-md transition duration-200 text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Sections */}
                <div className="p-4 sm:p-6 md:p-8">
                    {/* Employee Overview */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">Employee Overview</h2>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-6">
                            {/* Profile Image & Name Block */}
                            <div className="flex flex-col items-center gap-4 text-center">
                                <img
                                    src={editableData.employeeImage}
                                    alt={`${editableData.firstName} ${editableData.lastName}`}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-lg flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-105"
                                    onClick={() => setIsImageModalOpen(true)}
                                />
                                {isEditing && (
                                    <label className="block text-blue-600 dark:text-blue-400 cursor-pointer bg-blue-100 dark:bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-700 transition text-sm font-semibold mt-2">
                                        Upload New Pic
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleImageFileChange(e, 'employeeImage')}
                                        />
                                    </label>
                                )}
                                <div className="mt-2">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{editableData.firstName} {editableData.lastName}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Employee ID: <span className="font-semibold text-blue-600 dark:text-blue-400">{employeeData.id || 'N/A'}</span></p>
                                </div>
                            </div>

                            {/* Key Info Blocks */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                {renderField('First Name', editableData.firstName, 'firstName', 'text', false, <FaRegUser />)}
                                {renderField('Last Name', editableData.lastName, 'lastName', 'text', false, <FaRegUser />)}
                                {renderField('Email', editableData.email, 'email', 'email', false, <MdEmail />)}
                                {renderField('Primary Phone', editableData.phone, 'phone', 'tel', false, <FaPhoneAlt />)}
                                {renderField('Alternate Phone', editableData.alternativePhone, 'alternativePhone', 'tel', false, <FaPhoneAlt />)}
                                {renderField('Date of Birth', editableData.dateOfBirth, 'dateOfBirth', 'date', false, <MdDateRange />)}
                                {renderField('Age', editableData.age, 'age', 'number', false, <MdDateRange />)}
                                {renderField('Gender', editableData.gender, 'gender', 'text', false, <FaRegUser />)}
                            </div>
                        </div>
                    </section>

                    {/* Address & Guardian Contact */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Employee's Address */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                            <h4 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Current Address</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {renderField('Country', editableData.country, 'country')}
                                {renderField('State', editableData.state, 'state')}
                                {renderField('City', editableData.city, 'city')}
                                {renderField('Zip Code', editableData.zip, 'zip')}
                                <div className="col-span-1 sm:col-span-2">
                                    {renderField('Full Address', editableData.fullAddress, 'fullAddress', 'text', true)}
                                </div>
                            </div>
                        </div>

                        {/* Guardian Contact Info */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                            <h4 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Guardian Contact</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {renderField('Guardian Name', editableData.guardianName, 'guardianName')}
                                {renderField('Guardian Phone', editableData.guardianPhone, 'guardianPhone', 'tel')}
                                <div className="col-span-1 sm:col-span-2">
                                    {renderField('Guardian Email', editableData.guardianEmail, 'guardianEmail', 'email')}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Company Info Section */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Company Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                            {renderField('Join Date', editableData.companyInfo?.joinDate, 'companyInfo.joinDate', 'date', false, <MdDateRange />)}
                            {renderField('Employee Status', editableData.companyInfo?.employeeStatus, 'companyInfo.employeeStatus', 'text', false, <MdWork />)}

                            {renderField('Employee Shift', editableData.companyInfo?.shift, 'companyInfo.shift', 'text', false, <FaBusinessTime />)}

                            {renderField('Department', editableData.companyInfo?.department, 'companyInfo.department', 'text', false, <MdWork />)}
                            {renderField('Designation', editableData.companyInfo?.designation, 'companyInfo.designation', 'text', false, <MdWork />)}
                            {renderField('Basic Salary', editableData.companyInfo?.basicSalary, 'companyInfo.basicSalary', 'text', false, <MdAccountBalance />)}
                            {renderField('Allowance', editableData.companyInfo?.allowance, 'companyInfo.allowance', 'text', false, <MdAccountBalance />)}
                            {renderField('Gross Pay', editableData.companyInfo?.grossPay, 'companyInfo.grossPay', 'text', false, <MdAccountBalance />)}
                            {renderField('Increment', editableData.companyInfo?.increment, 'companyInfo.increment', 'text', false, <MdAccountBalance />)}
                            {renderField('Resignation Date', editableData.companyInfo?.resignationdate, 'companyInfo.resignationdate', 'date', false, <MdDateRange />)}
                            {renderField('Resignation Type', editableData.companyInfo?.resignationtype, 'companyInfo.resignationtype', 'text', false, <MdWork />)}
                        </div>
                    </section>

                    {/* Family Details */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Family Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                            {renderField("Father's Name", editableData.fatherName, 'fatherName', 'text', false, <FaRegUser />)}
                            {renderField("Mother's Name", editableData.motherName, 'motherName', 'text', false, <FaRegUser />)}
                        </div>
                    </section>

                    {/* Educational Background */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Educational Background</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                            {renderField('School/College', editableData.educationalInfo?.school, 'educationalInfo.school', 'text', false, <MdSchool />)}
                            {renderField('Graduation', editableData.educationalInfo?.graduation, 'educationalInfo.graduation', 'text', false, <MdSchool />)}
                            {renderField('Post Graduation', editableData.educationalInfo?.postGraduation, 'educationalInfo.postGraduation', 'text', false, <MdSchool />)}
                        </div>
                    </section>

                    {/* Bank Information */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Bank Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                            {renderField('Bank Name', editableData.bankInfo?.bankName, 'bankInfo.bankName', 'text', false, <MdAccountBalance />)}
                            {renderField('Account Number', editableData.bankInfo?.accountNumber, 'bankInfo.accountNumber', 'text', false, <MdAccountBalance />)}
                            {renderField('IFSC Code', editableData.bankInfo?.ifsc, 'bankInfo.ifsc', 'text', false, <MdAccountBalance />)}
                            {renderField('Account Holder', editableData.bankInfo?.accountHolderName, 'bankInfo.accountHolderName', 'text', false, <FaRegUser />)}
                            {renderField('Aadhar Card No', editableData.bankInfo?.adharCardNo, 'bankInfo.adharCardNo', 'text', false, <FaRegUser />)}
                            {renderField('PAN Number', editableData.bankInfo?.pancardNo, 'bankInfo.pancardNo', 'text', false, <FaRegUser />)}
                        </div>
                    </section>

                    {/* Documents Section */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Documents</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {renderImageField('Aadhar Front', editableData.adharFrontImage, 'adharFrontImage')}
                            {renderImageField('Aadhar Back', editableData.adharBackImage, 'adharBackImage')}
                            {renderImageField('PAN Front', editableData.panFrontImage, 'panFrontImage')}
                            {renderImageField('Cancelled Cheque', editableData.cancelChequeImage, 'cancelChequeImage')}
                            {renderImageField('Last Qualification', editableData.lastQualificationImage, 'lastQualificationImage')}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;






