import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Getallemployee = () => {
  const [ShowaddEmployee, setShowaddEmployee] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleAddEmployee = () => {
    setShowaddEmployee(!ShowaddEmployee);
    console.log("Add Employee button clicked!");
  };

  const handleMenuToggle = (employeeId) => {
    setOpenMenuId(openMenuId === employeeId ? null : employeeId);
  };

  const handleEdit = (employeeId) => {
    console.log(`Edit Employee: ${employeeId}`);
    setOpenMenuId(null);
  };



  const handleRestrictLogin = (employeeId) => {
    console.log(`Restrict Login for: ${employeeId}`);
    setOpenMenuId(null);
  };

  const employees = [
    { id: 'EMP001', name: 'Alice Smith', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 'EMP002', name: 'Bob Johnson', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 'EMP003', name: 'Charlie Brown', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 'EMP004', name: 'Diana Prince', imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { id: 'EMP005', name: 'Eve Adams', imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg' },
    { id: 'EMP006', name: 'Frank White', imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 'EMP007', name: 'Grace Lee', imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg' },
    { id: 'EMP008', name: 'Henry King', imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg' },
    { id: 'EMP009', name: 'Ivy Green', imageUrl: 'https://randomuser.me/api/portraits/women/10.jpg' },
    { id: 'EMP010', name: 'Jack Taylor', imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { id: 'EMP011', name: 'Karen Hall', imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { id: 'EMP012', name: 'Liam Scott', imageUrl: 'https://randomuser.me/api/portraits/men/13.jpg' },
  ];

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
                        <button className="block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 dark:hover:bg-gray-500" onClick={() => handleEdit(employee.id)}>Edit Employee</button>
                        
                        <button className="block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 dark:hover:bg-gray-500" onClick={() => handleRestrictLogin(employee.id)}>Restrict Login</button>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <Link to={`/admin-dashboard/employee-profile/${employee.id}`} className="block">
                    <div className="flex flex-col items-center text-center px-4 py-6">
                      <img src={employee.imageUrl} alt={employee.name} className="w-24 h-24 rounded-full border-2 border-blue-400 mb-3 object-cover" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{employee.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">ID: {employee.id}</p>

                    </div>
                  </Link>
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
