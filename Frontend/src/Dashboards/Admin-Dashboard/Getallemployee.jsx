import React, { useState } from 'react';

const Getallemployee = () => {

    const [ShowaddEmploee,setShowaddEmploee] = useState(false);

    const handleaddemploee = ()=>{
        setShowaddEmploee(!ShowaddEmploee)
    }

    // Dummy employee data
    const employees = [
        { id: 'EMP001', name: 'Alice Smith', email: 'alice.s@example.com', assignedProject: 'HR Management App' },
        { id: 'EMP002', name: 'Bob Johnson', email: 'bob.j@example.com', assignedProject: 'E-Commerce Website' },
        { id: 'EMP003', name: 'Charlie Brown', email: 'charlie.b@example.com', assignedProject: 'Inventory System' },
        { id: 'EMP004', name: 'Diana Prince', email: 'diana.p@example.com', assignedProject: 'Banking Portal' },
        { id: 'EMP005', name: 'Eve Adams', email: 'eve.a@example.com', assignedProject: 'CRM System' },
        { id: 'EMP006', name: 'Frank White', email: 'frank.w@example.com', assignedProject: 'Mobile Banking App' },
    ];

    return (
        <div className='max-w-7xl mx-auto p-5 sm:p-6'> 
            <div className='flex flex-col bg-white shadow-md rounded-lg'> 
                <div className='flex flex-row justify-between items-center p-6'>
                    <h2 className='py-2.5 font-semibold text-xl sm:text-2xl'>TOTAL EMPLOYEE</h2>
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleaddemploee}>ADD EMPLOYEE</button>
                </div>

                {/* Table Section */}
                <div className="relative overflow-x-auto md:overflow-hidden group">
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 peer sm:overflow-y-auto">
                        {employees.length > 0 ? (
                            <table className='w-full min-w-max text-left text-gray-600 '>
                                <thead className='bg-blue-300 text-xs text-gray-700 uppercase'>
                                    <tr>
                                        <th className='py-2 px-4 sm:py-4'>Employee ID</th>
                                        <th className='py-2 px-4 sm:py-4'>Name</th>
                                        <th className='py-2 px-4 sm:py-4'>Email</th>
                                        <th className='py-2 px-4 sm:py-4'>Assigned Project</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee, index) => (
                                        <tr key={employee.id} className='border-b hover:border-gray-100 cursor-pointer hover:bg-[#6AF2F0]'>
                                            <td className='py-2 px-4 sm:py-4'>{employee.id}</td>
                                            <td className='py-2 px-4 sm:py-4'>{employee.name}</td>
                                            <td className='py-2 px-4 sm:py-4'>{employee.email}</td>
                                            <td className='py-2 px-4 sm:py-4'>{employee.assignedProject}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className='text-center text-gray-600 py-4'>No employees found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Getallemployee;