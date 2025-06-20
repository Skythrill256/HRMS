import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom'; 
import EmployeeProfile from './EmployeeProfile'; 

const Getallemployee = () => {
    const [ShowaddEmployee, setShowaddEmployee] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
 
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleAddEmployee = () => {
        setShowaddEmployee(!ShowaddEmployee);
        console.log("Add Employee button clicked!");
    };

    const handleMenuToggle = (employeeId) => {
        setOpenMenuId(openMenuId === employeeId ? null : employeeId);
    };

    const handleEdit = (employeeId) => {
        const employeeToEdit = employees.find(emp => emp.id === employeeId);
        if (employeeToEdit) {
            setSelectedEmployee(employeeToEdit); // Set the employee data
            setOpenMenuId(null); // Close the menu
        }
        console.log(`Edit Employee: ${employeeId}`);
    };

   
    const handleViewEmployeeDetails = (employeeId) => {
        const employeeToView = employees.find(emp => emp.id === employeeId);
        if (employeeToView) {
            setSelectedEmployee(employeeToView);
        }
    };

    const handleRestrictLogin = (employeeId) => {
        console.log(`Restrict Login for: ${employeeId}`);
        setOpenMenuId(null);
    };


    const employees = [
        {
            id: 'EMP001',
            firstName: 'Alice',
            lastName: 'Smith',
            email: 'alice.s@example.com',
            phone: '111-222-3333',
            password: '********', // Placeholder
            address: { street: '123 Pine St', city: 'Greenville', state: 'GA', zip: '30303' },
            parentDetails: { fatherName: 'Robert Smith', motherName: 'Laura Smith' },
            bankDetails: { bankName: 'First National', accountNumber: 'XXXX-XXXX-XXXX-1111', ifscCode: 'FNB12345' },
            adharNumber: '1234-5678-9012',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
            id: 'EMP002',
            firstName: 'Bob',
            lastName: 'Johnson',
            email: 'bob.j@example.com',
            phone: '444-555-6666',
            password: '********', // Placeholder
            address: { street: '456 Oak Ave', city: 'Rivertown', state: 'NY', zip: '10101' },
            parentDetails: { fatherName: 'James Johnson', motherName: 'Linda Johnson' },
            bankDetails: { bankName: 'City Bank', accountNumber: 'XXXX-XXXX-XXXX-2222', ifscCode: 'CTY67890' },
            adharNumber: '9876-5432-1098',
            imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        {
            id: 'EMP003',
            firstName: 'Charlie',
            lastName: 'Brown',
            email: 'charlie.b@example.com',
            phone: '777-888-9999',
            password: '********', // Placeholder
            address: { street: '789 Maple Rd', city: 'Hillside', state: 'TX', zip: '75001' },
            parentDetails: { fatherName: 'George Brown', motherName: 'Sally Brown' },
            bankDetails: { bankName: 'Texas Trust', accountNumber: 'XXXX-XXXX-XXXX-3333', ifscCode: 'TXT98765' },
            adharNumber: '1122-3344-5566',
            imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        {
            id: 'EMP004',
            firstName: 'Diana',
            lastName: 'Prince',
            email: 'diana.p@example.com',
            phone: '101-202-3030',
            password: '********', // Placeholder
            address: { street: '555 River View', city: 'Metropolis', state: 'CA', zip: '90210' },
            parentDetails: { fatherName: 'Zeus', motherName: 'Hippolyta' },
            bankDetails: { bankName: 'Amazon Bank', accountNumber: 'XXXX-XXXX-XXXX-4444', ifscCode: 'AMZ00001' },
            adharNumber: '2233-4455-6677',
            imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg'
        },
        {
            id: 'EMP005',
            firstName: 'Eve',
            lastName: 'Adams',
            email: 'eve.a@example.com',
            phone: '333-222-1111',
            password: '********', // Placeholder
            address: { street: '999 Garden Ln', city: 'Eden', state: 'FL', zip: '32801' },
            parentDetails: { fatherName: 'Adam Senior', motherName: 'Eve Senior' },
            bankDetails: { bankName: 'Paradise Trust', accountNumber: 'XXXX-XXXX-XXXX-5555', ifscCode: 'PRD54321' },
            adharNumber: '3344-5566-7788',
            imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg'
        },
        {
            id: 'EMP006',
            firstName: 'Frank',
            lastName: 'White',
            email: 'frank.w@example.com',
            phone: '666-777-8888',
            password: '********', // Placeholder
            address: { street: '111 Ocean Dr', city: 'Seaside', state: 'WA', zip: '98101' },
            parentDetails: { fatherName: 'Michael White', motherName: 'Patricia White' },
            bankDetails: { bankName: 'Pacific Bank', accountNumber: 'XXXX-XXXX-XXXX-6666', ifscCode: 'PAC11223' },
            adharNumber: '4455-6677-8899',
            imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg'
        },
        {
            id: 'EMP007',
            firstName: 'Grace',
            lastName: 'Lee',
            email: 'grace.l@example.com',
            phone: '999-000-1111',
            password: '********', // Placeholder
            address: { street: '222 Forest Way', city: 'Woodland', state: 'OR', zip: '97201' },
            parentDetails: { fatherName: 'David Lee', motherName: 'Susan Lee' },
            bankDetails: { bankName: 'Forest Credit', accountNumber: 'XXXX-XXXX-XXXX-7777', ifscCode: 'FRC44556' },
            adharNumber: '5566-7788-9900',
            imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg'
        },
        {
            id: 'EMP008',
            firstName: 'Henry',
            lastName: 'King',
            email: 'henry.k@example.com',
            phone: '123-123-1234',
            password: '********', // Placeholder
            address: { street: '333 Castle Rd', city: 'Royalty', state: 'TX', zip: '78701' },
            parentDetails: { fatherName: 'Charles King', motherName: 'Elizabeth King' },
            bankDetails: { bankName: 'Royal Bank', accountNumber: 'XXXX-XXXX-XXXX-8888', ifscCode: 'RYL77889' },
            adharNumber: '6677-8899-0011',
            imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg'
        },
        {
            id: 'EMP009',
            firstName: 'Ivy',
            lastName: 'Green',
            email: 'ivy.g@example.com',
            phone: '456-456-4567',
            password: '********', // Placeholder
            address: { street: '444 Vine St', city: 'Garden City', state: 'GA', zip: '30303' },
            parentDetails: { fatherName: 'Peter Green', motherName: 'Helen Green' },
            bankDetails: { bankName: 'Green Valley Bank', accountNumber: 'XXXX-XXXX-XXXX-9999', ifscCode: 'GVC22334' },
            adharNumber: '7788-9900-1122',
            imageUrl: 'https://randomuser.me/api/portraits/women/10.jpg'
        },
        {
            id: 'EMP010',
            firstName: 'Jack',
            lastName: 'Taylor',
            email: 'jack.t@example.com',
            phone: '789-789-7890',
            password: '********', // Placeholder
            address: { street: '555 Bridge St', city: 'Bridgewater', state: 'NJ', zip: '08807' },
            parentDetails: { fatherName: 'Paul Taylor', motherName: 'Nancy Taylor' },
            bankDetails: { bankName: 'Bridge Loans', accountNumber: 'XXXX-XXXX-XXXX-1010', ifscCode: 'BLN55667' },
            adharNumber: '8899-0011-2233',
            imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg'
        },
        {
            id: 'EMP011',
            firstName: 'Karen',
            lastName: 'Hall',
            email: 'karen.h@example.com',
            phone: '100-200-3000',
            password: '********', // Placeholder
            address: { street: '666 Mountain Pass', city: 'High Peak', state: 'CO', zip: '80202' },
            parentDetails: { fatherName: 'Kevin Hall', motherName: 'Doris Hall' },
            bankDetails: { bankName: 'Summit Bank', accountNumber: 'XXXX-XXXX-XXXX-1212', ifscCode: 'SMM88990' },
            adharNumber: '9900-1122-3344',
            imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg'
        },
        {
            id: 'EMP012',
            firstName: 'Liam',
            lastName: 'Scott',
            email: 'liam.s@example.com',
            phone: '300-400-5000',
            password: '********', // Placeholder
            address: { street: '777 Valley Rd', city: 'Lowlands', state: 'AZ', zip: '85001' },
            parentDetails: { fatherName: 'Mark Scott', motherName: 'Carol Scott' },
            bankDetails: { bankName: 'Desert Financial', accountNumber: 'XXXX-XXXX-XXXX-1313', ifscCode: 'DSF11223' },
            adharNumber: '0011-2233-4455',
            imageUrl: 'https://randomuser.me/api/portraits/men/13.jpg'
        },
    ];


    // If an employee is selected, render their profile
    if (selectedEmployee) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 dark:bg-gray-900">
                <div className="flex justify-between items-center mb-6">
                    {/* Back button to return to the employee list */}
                    <button
                        onClick={() => setSelectedEmployee(null)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline transition duration-200"
                    >
                        &larr; Back to Employees
                    </button>
                    {/* The EmployeeProfile component receives the full employee data */}
                    {/* It will manage its own editing state */}
                </div>
                <EmployeeProfile initialEmployeeData={selectedEmployee} />
            </div>
        );
    }

    // Otherwise, render the list of employees
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 dark:bg-gray-900">
            <div className="bg-[#dff4e3] shadow-md rounded-lg dark:bg-gray-800 dark:shadow-xl lg:p-4">

                <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4">
                    <h2 className="font-semibold text-xl sm:text-2xl text-gray-800 dark:text-gray-100">TOTAL EMPLOYEE</h2>
                    <button
                        className="mt-2 sm:mt-0 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                           hover:from-indigo-500 hover:via-indigo-600 hover:to-indigo-700
                           dark:from-purple-600 dark:via-purple-700 dark:to-purple-800
                           dark:hover:from-pink-600 dark:hover:via-pink-700 dark:hover:to-pink-800
                           focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-pink-500
                           font-semibold rounded-xl text-sm px-6 py-2.5 transition-all duration-300 ease-in-out
                           shadow-md hover:shadow-lg transform hover:scale-105 border border-transparent
                           dark:border-pink-500"
                        onClick={handleAddEmployee}
                    >
                        ADD EMPLOYEE
                    </button>

                </div>

                <div className="p-6">
                    {employees.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                            {employees.map((employee) => (
                                <div key={employee.id} className="relative bg-white dark:bg-gray-700 rounded-2xl shadow-md dark:shadow-lg transition-transform duration-300 hover:scale-105 lg:p-4">

                                    {/* Menu Button */}
                                    <div className="absolute top-2 right-2 z-10">
                                        <button
                                            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                            onClick={() => handleMenuToggle(employee.id)}
                                        >
                                            <BsThreeDotsVertical className="text-xl" />
                                        </button>
                                        {openMenuId === employee.id && (
                                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-20 dark:bg-gray-600 dark:text-gray-100">
                                                {/* Modified Edit button to set selectedEmployee for rendering profile */}
                                                <button className="block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 dark:hover:bg-gray-500" onClick={() => handleEdit(employee.id)}>Edit Employee</button>
                                                <button className="block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 dark:hover:bg-gray-500" onClick={() => handleRestrictLogin(employee.id)}>Restrict Login</button>
                                            </div>
                                        )}
                                    </div>

                                    <div
                                        onClick={() => handleViewEmployeeDetails(employee.id)}
                                        className="block cursor-pointer" 
                                    >
                                        <div className="flex flex-col items-center text-center px-4 py-6">
                                            <img src={employee.imageUrl} alt={employee.name} className="w-24 h-24 rounded-full border-2 border-blue-400 mb-3 object-cover" />
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{employee.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">ID: {employee.id}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400 py-4">No employees found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Getallemployee;