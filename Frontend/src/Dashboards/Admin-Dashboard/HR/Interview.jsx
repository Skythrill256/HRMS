import React, { useState } from 'react';
import { FaUserTie, FaTimes } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { FaTrashCan } from "react-icons/fa6";

const Interview = () => {
    const [showForm, setShowForm] = useState(false);
    const [interviews, setInterviews] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        applyFor: '',
        otherRole: '',
        phone: '',
        email: '',
        datetime: '',
    });
    const [showOtherRoleInput, setShowOtherRoleInput] = useState(false);

    const predefinedRoles = [
        'Software Engineer',
        'Web Development',
        'UX/UI Designer',
        'App Development',
        'MERN Stack Developer',
        'Marketing Specialist',
        'Human Resources',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'applyFor') {
            if (value === 'Other') {
                setShowOtherRoleInput(true);
                setFormData({ ...formData, [name]: '', otherRole: '' });
            } else {
                setShowOtherRoleInput(false);
                setFormData({ ...formData, [name]: value, otherRole: '' });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddInterview = () => {
        const finalApplyFor = showOtherRoleInput ? formData.otherRole : formData.applyFor;

        if (
            formData.name &&
            finalApplyFor &&
            formData.phone &&
            formData.email &&
            formData.datetime
        ) {
            setInterviews([...interviews, { ...formData, applyFor: finalApplyFor }]);
            handleCancel();
        } else {
            alert('Please fill in all required fields to schedule an interview.');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setShowOtherRoleInput(false);
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
        <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md mt-6">
            {/* Header */}
            <div className="flex l flex-row justify-center sm:items-center gap-3 mb-6 border-b pb-4">
                <FaUserTie className="text-indigo-600 text-2xl sm:text-3xl" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 text-center">Interview Management</h2>
            </div>

            {/* Add Interview Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-2 mb-4 gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-700">Upcoming Interviews 🗓️</h3>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out shadow"
                >
                    Schedule New Interview ✨
                </button>
            </div>

            {/* List Section */}
            {interviews.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No interviews scheduled yet. Click "Schedule New Interview" to add one! 🚀</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
                    {interviews.map((interview, idx) => (
                        <div
                            key={idx}
                            className="relative bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow p-4 sm:p-6 flex flex-col justify-between hover:shadow-lg transition-all"
                        >
                            <button
                                onClick={() => handleRemoveInterview(idx)}
                                className="absolute top-3 right-3 text-sm text-red-600 hover:text-red-800 bg-white rounded-full p-1 shadow"
                                title="Remove Interview"
                            >
                                <FaTrashCan />
                            </button>

                            <div>
                                <p className="text-lg font-bold text-indigo-800 mb-1 truncate" title={interview.name}>
                                    {interview.name}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="text-gray-800">Role:</strong> <span className="text-purple-700">{interview.applyFor}</span>
                                </p>
                                <p className="text-gray-700">
                                    <strong className="text-gray-800">Phone:</strong> {interview.phone}
                                </p>
                                <p className="text-gray-700 truncate" title={interview.email}>
                                    <strong className="text-gray-800">Email:</strong> {interview.email}
                                </p>
                            </div>
                            <div className="mt-4 pt-2 border-t text-sm text-gray-600">
                                <p>
                                    <strong className="text-gray-800">Scheduled For:</strong>{' '}
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

            {/* Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative overflow-auto max-h-[95vh]">
                        <button
                            onClick={handleCancel}
                            className="absolute top-5 right-5 text-gray-400 hover:text-red-600 transition"
                            aria-label="Close form"
                        >
                            <FaTimes size={22} />
                        </button>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Schedule New Interview 📝</h3>

                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Candidate Name"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-indigo-500 focus:outline-none"
                            />

                            <div className="relative">
                                <select
                                    name="applyFor"
                                    value={formData.applyFor}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-4 py-2 pr-10 rounded-md bg-white focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option value="">Select Role to Apply For</option>
                                    {predefinedRoles.map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                    <option value="Other">Other (Please Specify)</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            </div>

                            {showOtherRoleInput && (
                                <input
                                    type="text"
                                    name="otherRole"
                                    value={formData.otherRole}
                                    onChange={handleChange}
                                    placeholder="Specify Role"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-purple-500 focus:outline-none"
                                />
                            )}

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-indigo-500 focus:outline-none"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-indigo-500 focus:outline-none"
                            />
                            <input
                                type="datetime-local"
                                name="datetime"
                                value={formData.datetime}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-indigo-500 focus:outline-none"
                            />

                            <button
                                onClick={handleAddInterview}
                                className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-md hover:from-green-600 hover:to-teal-700 transition transform hover:-translate-y-0.5"
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
