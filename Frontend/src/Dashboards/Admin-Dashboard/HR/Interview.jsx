import React, { useState } from 'react';
import { FaUserTie, FaTimes } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { FaTrashCan } from "react-icons/fa6";


const Interview = () => {
    const [showForm, setShowForm] = useState(false);
    const [interviews, setInterviews] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        applyFor: '', // This will hold the selected role or custom input
        otherRole: '', // New state for 'Other' role input
        phone: '',
        email: '',
        datetime: '',
    });
    const [showOtherRoleInput, setShowOtherRoleInput] = useState(false); // State to control visibility of 'Other' input

    const predefinedRoles = [
        'Software Engineer',
        'web Development',
        'UX/UI Designer',
        'App Development',
        'MERN stack developmen',
        'Marketing Specialist',
        'Human Resources',

    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'applyFor') {
            if (value === 'Other') {
                setShowOtherRoleInput(true);
                setFormData({ ...formData, [name]: '', otherRole: '' }); // Clear applyFor and otherRole when 'Other' is selected
            } else {
                setShowOtherRoleInput(false);
                setFormData({ ...formData, [name]: value, otherRole: '' }); // Clear otherRole if a predefined role is chosen
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddInterview = () => {
        const finalApplyFor = showOtherRoleInput ? formData.otherRole : formData.applyFor;

        if (
            formData.name &&
            (finalApplyFor) && // Ensure either selected role or custom 'otherRole' is present
            formData.phone &&
            formData.email &&
            formData.datetime
        ) {
            setInterviews([...interviews, { ...formData, applyFor: finalApplyFor }]); // Use finalApplyFor
            handleCancel(); // Reset form and close modal
        } else {
            alert('Please fill in all required fields to schedule an interview.');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setShowOtherRoleInput(false); // Reset this state too
        setFormData({
            name: '',
            applyFor: '',
            otherRole: '',
            phone: '',
            email: '',
            datetime: '',
        });
    };

    const handleRemoveInterview = (index) => {
        const updatedList = [...interviews];
        updatedList.splice(index, 1);
        setInterviews(updatedList);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-xl mt-6">
            {/* Header Section */}
            <div className="flex justify-center items-center gap-3 mb-6 border-b pb-4">
                <FaUserTie className="text-indigo-600" size={28} />
                <h2 className="text-2xl font-extrabold text-gray-800">Interview Management</h2>
            </div>

            {/* Interview List Header and Add Button */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h3 className="text-xl font-bold text-gray-700">Upcoming Interviews 🗓️</h3>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md"

                >
                    Schedule New Interview ✨
                </button>
            </div>

            {/* Interview List Section */}
            {interviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                    No interviews scheduled yet. Click "Schedule New Interview" to add one! 🚀
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {interviews.map((interview, idx) => (
                        <div
                            key={idx}
                            className="relative bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-lg p-6 transform hover:scale-102 hover:shadow-xl transition duration-300 ease-in-out flex flex-col justify-between"
                        >

                            <button
                                onClick={() => handleRemoveInterview(idx)}
                                className="absolute top-3 right-3 text-sm text-red-600 hover:text-red-800 bg-white rounded-full p-1 shadow"
                                title="Remove Interview"
                            >
                                <FaTrashCan />
                            </button>

                            <div>
                                <p className="text-lg font-bold text-indigo-800 mb-2 truncate" title={interview.name}>
                                    {interview.name}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <span className="font-semibold text-gray-800">Role:</span>{' '}
                                    <span className="text-purple-700">{interview.applyFor}</span>
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <span className="font-semibold text-gray-800">Phone:</span> {interview.phone}
                                </p>
                                <p className="text-gray-700 mb-1 truncate" title={interview.email}>
                                    <span className="font-semibold text-gray-800">Email:</span> {interview.email}
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-indigo-100 text-sm text-gray-600">
                                <p>
                                    <span className="font-semibold text-gray-800">Scheduled For:</span>{' '}
                                    <span className="text-blue-700">
                                        {new Date(interview.datetime).toLocaleString('en-IN', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            )}

            {/* Interview Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-slide-up">
                        <button
                            onClick={handleCancel}
                            className="absolute top-6 right-6 text-gray-400 hover:text-red-600 transition-colors duration-200"
                            aria-label="Close form"
                        >
                            <FaTimes size={24} />
                        </button>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Schedule New Interview 📝</h3>
                        <div className="space-y-5">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Candidate Name"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                required
                            />
                            <div className="relative">
                                <select
                                    name="applyFor"
                                    value={formData.applyFor}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm appearance-none"
                                    required
                                >
                                    <option value="">Select Role to Apply For</option>
                                    {predefinedRoles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                    <option value="Other">Other (Please Specify)</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                            </div>


                            {showOtherRoleInput && (
                                <input
                                    type="text"
                                    name="otherRole"
                                    value={formData.otherRole}
                                    onChange={handleChange}
                                    placeholder="Specify Role"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm mt-2"
                                    required
                                />
                            )}

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number (e.g., +91 98765 43210)"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address (e.g., candidate@example.com)"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                required
                            />
                            <input
                                type="datetime-local"
                                name="datetime"
                                value={formData.datetime}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                required
                            />
                            <button
                                onClick={handleAddInterview}
                                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-700 transition duration-300 ease-in-out shadow-lg transform hover:-translate-y-0.5"
                            >
                                Schedule Interview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Interview;