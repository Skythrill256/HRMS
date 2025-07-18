import { useState } from 'react';
import { useSelector } from "react-redux";
import { FaBan, FaUserEdit, FaCheckCircle } from 'react-icons/fa';
import Employee from "./Employee";
import EmployeeProfile from './EmployeeProfile';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Getallemployee = () => {
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Employee data from redux
    const initialEmployees = useSelector(((state) => state.employees.employees));


    const [employees, setEmployees] = useState(initialEmployees);

    const handleAddEmployeeClick = () => {
        setSelectedEmployee(null);
        setShowAddEmployeeModal(true);
        setShowEmployeeProfile(false);
    };

    const handleEditClick = (employeeId) => {
        const employeeToEdit = employees.find(emp => emp.id === employeeId);
        if (employeeToEdit) {
            setSelectedEmployee(employeeToEdit);
            setShowEmployeeProfile(true);
            setShowAddEmployeeModal(false);
        }
    };

    const handleViewEmployeeDetails = (employeeId) => {
        const employeeToView = employees.find(emp => emp.id === employeeId);
        if (employeeToView) {
            setSelectedEmployee(employeeToView);
            setShowEmployeeProfile(true);
            setShowAddEmployeeModal(false);
        }
    };

    const handleCloseModal = () => {
        setShowAddEmployeeModal(false);
    };

    const handleEmployeeFormSave = (newEmployeeData) => {
        const newId = `EMP${String(employees.length + 1).padStart(3, '0')}`;
        setEmployees(prevEmployees => [...prevEmployees, { ...newEmployeeData, id: newId }]);
        alert('New employee added successfully!');
        handleCloseModal();
    };

    const handleBackToEmployeeList = () => {
        setSelectedEmployee(null);
        setShowEmployeeProfile(false);
    };

    const handleRestrictLogin = (employeeId) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(employee =>
                employee.id === employeeId
                    ? { ...employee, loginRestricted: !employee.loginRestricted }
                    : employee
            )
        );
    };

    if (showEmployeeProfile && selectedEmployee) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 dark:bg-gray-900">

                <EmployeeProfile employeeData={selectedEmployee} handleBackToEmployeeList={handleBackToEmployeeList} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 dark:bg-gray-900 relative">
            <div className="shadow-md rounded-lg dark:bg-gray-800 dark:shadow-xl lg:p-4">

                {/* Center Aligned Header */}
                <div className="flex justify-center py-4">
                    <h2 className="text-3xl font-extrabold text-[#FF4500] mb-8 text-center
          dark:text-white">
                        TOTAL EMPLOYEE
                    </h2>
                </div>

                {/* Search Box and Add Button in Same Row */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 pb-4">
                    <input
                        type="text"
                        placeholder="Search by name or ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-nav dark:border-gray-600 rounded-xl px-4 py-2 w-full sm:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    />
                    <button
                        onClick={handleAddEmployeeClick}
                        className="text-white bg-[#FF4500]
              focus:outline-none font-semibold rounded-xl text-sm px-4 py-1.5 pt-0 transition-all
              duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105
              flex justify-center items-center gap-2"
                    >
                        <span className="text-2xl">+</span>
                        <span className="mt-1">Add Employee</span>
                    </button>
                </div>

                <div className="p-4">
                    {employees.filter(emp =>
                        `${emp.firstName} ${emp.lastName} ${emp.id}`
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                    ).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {employees
                                .filter(emp =>
                                    `${emp.firstName} ${emp.lastName} ${emp.id}`
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase())
                                )
                                .map((employee) => (
                                    <div key={employee.id} className="relative bg-card dark:bg-gray-700 rounded-2xl shadow-lg hover:cursor-pointer hover:scale-105 transition-transform duration-400 w-[230px]">
                                        <div onClick={() => handleViewEmployeeDetails(employee.id)} className="block cursor-pointer p-4">
                                            <div className="flex flex-col items-center text-center">
                                                <img src={employee.employeeImage} alt={employee.firstName} className="w-24 h-24 rounded-full border-2 border-blue-400 mb-3 object-cover" />
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{employee.firstName} {employee.lastName}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">ID: {employee.id}</p>
                                            </div>
                                        </div>

                                        <div className='flex justify-center items-center gap-4 py-3 border-t border-gray-200 dark:border-gray-600'>
                                            <FaUserEdit
                                                data-tooltip-id="tooltip"
                                                data-tooltip-content="Edit Employee"
                                                className="text-blue-600 hover:text-blue-800 cursor-pointer text-xl"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(employee.id);
                                                }}
                                            />

                                            {employee.loginRestricted ? (
                                                <FaCheckCircle
                                                    data-tooltip-id="tooltip"
                                                    data-tooltip-content="Allow Login"
                                                    className="text-green-600 hover:text-green-800 cursor-pointer text-xl"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRestrictLogin(employee.id);
                                                        toast.warn(`Restrict Employee ${employee.firstName}`);
                                                    }}
                                                />
                                            ) : (
                                                <FaBan
                                                    data-tooltip-id="tooltip"
                                                    data-tooltip-content="Restrict Login"
                                                    className="text-red-600 hover:text-red-800 cursor-pointer text-xl"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRestrictLogin(employee.id);
                                                        toast.success(`Allow Employee ${employee.firstName}`);
                                                    }}
                                                />
                                            )}

                                            <Tooltip id="tooltip" place="top" className="z-50" />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400 py-4">No employees found.</p>
                    )}
                </div>
            </div>

            {showAddEmployeeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <Employee initialData={null} onSave={handleEmployeeFormSave} onCancel={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>

    );
};

export default Getallemployee;