import React, { useState } from 'react';
import { FaBan, FaUserEdit, FaCheckCircle } from 'react-icons/fa';
import Employee from "../../Component/Employee";
import EmployeeProfile from './EmployeeProfile';
import { toast } from 'react-toastify';

const Getallemployee = () => {
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const initialEmployees = [
        {
            id: 'EMP001',
            firstName: 'Alice',
            lastName: 'Smith',
            phone: '111-222-3333',
            alternativePhone: '111-222-3334',
            email: 'alice.s@example.com',
            dateOfBirth: '1990-05-15',
            age: 35,
            gender: 'Female',
            country: 'India',
            state: 'Karnataka',
            city: 'Bengaluru',
            fullAddress: '123 Pine St, Jayanagar, Bengaluru, Karnataka, India, 560011',
            zip: '560011',
            fatherName: 'Robert Smith',
            motherName: 'Laura Smith',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Springfield High School',
                graduation: 'Bangalore University (B.Tech)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                accountNumber: 'XXXX-XXXX-XXXX-1111',
                ifsc: 'FNB12345',
                bankName: 'First National Bank',
                accountHolderName: 'Alice Smith'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'ABCDE1234F',
            employeeImage: 'https://randomuser.me/api/portraits/men/1.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP002',
            firstName: 'Bob',
            lastName: 'Johnson',
            phone: '444-555-6666',
            alternativePhone: '444-555-6667',
            email: 'bob.j@example.com',
            dateOfBirth: '1988-11-22',
            age: 36,
            gender: 'Male',
            country: 'India',
            state: 'Maharashtra',
            city: 'Mumbai',
            fullAddress: '456 Oak Ave, Bandra, Mumbai, Maharashtra, India, 400050',
            zip: '400050',
            fatherName: 'James Johnson',
            motherName: 'Linda Johnson',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Mumbai Public School',
                graduation: 'IIT Bombay (B.E.)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                accountNumber: 'XXXX-XXXX-XXXX-2222',
                ifsc: 'CTY67890',
                bankName: 'City Bank',
                accountHolderName: 'Bob Johnson'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'FGHIJ5678K',
            employeeImage: 'https://randomuser.me/api/portraits/women/2.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: true
        },
        {
            id: 'EMP003',
            firstName: 'Charlie',
            lastName: 'Brown',
            phone: '777-888-9999',
            alternativePhone: 'N/A',
            email: 'charlie.b@example.com',
            dateOfBirth: '1995-03-10',
            age: 29,
            gender: 'Male',
            country: 'India',
            state: 'Delhi',
            city: 'New Delhi',
            fullAddress: '789 Maple Rd, Karol Bagh, New Delhi, Delhi, India, 110005',
            zip: '110005',
            fatherName: 'George Brown',
            motherName: 'Sally Brown',
            guardianName: 'Aunt May',
            guardianPhone: '987-654-3210',
            guardianEmail: 'aunt.may@example.com',
            educationalInfo: {
                school: 'Delhi Public School',
                graduation: 'Delhi University (B.Com)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                accountNumber: 'XXXX-XXXX-XXXX-3333',
                ifsc: 'TXT98765',
                bankName: 'Axis Bank',
                accountHolderName: 'Charlie Brown'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'LMNOP9012Q',
            employeeImage: 'https://randomuser.me/api/portraits/men/3.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP004',
            firstName: 'Diana',
            lastName: 'Prince',
            email: 'diana.p@example.com',
            phone: '101-202-3030',
            alternativePhone: 'N/A',
            dateOfBirth: '1984-06-21',
            age: 40,
            gender: 'Female',
            country: 'India',
            state: 'Tamil Nadu',
            city: 'Chennai',
            fullAddress: '555 River View, Adyar, Chennai, Tamil Nadu, India, 600020',
            zip: '600020',
            fatherName: 'Zeus',
            motherName: 'Hippolyta',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Chennai International School',
                graduation: 'Anna University (B.Arch)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                bankName: 'ICICI Bank',
                accountNumber: 'XXXX-XXXX-XXXX-4444',
                ifsc: 'AMZ00001',
                accountHolderName: 'Diana Prince'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'RSTUV3456W',
            employeeImage: 'https://randomuser.me/api/portraits/women/6.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP005',
            firstName: 'Eve',
            lastName: 'Adams',
            email: 'eve.a@example.com',
            phone: '333-222-1111',
            alternativePhone: 'N/A',
            dateOfBirth: '1992-08-01',
            age: 32,
            gender: 'Female',
            country: 'India',
            state: 'Uttar Pradesh',
            city: 'Lucknow',
            fullAddress: '999 Garden Ln, Hazratganj, Lucknow, Uttar Pradesh, India, 226001',
            zip: '226001',
            fatherName: 'Adam Senior',
            motherName: 'Eve Senior',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Lucknow Public School',
                graduation: 'Lucknow University (B.Sc)',
                postGraduation: 'M.Sc (Biotech)'
            },
            bankInfo: {
                bankName: 'HDFC Bank',
                accountNumber: 'XXXX-XXXX-XXXX-5555',
                ifsc: 'PRD54321',
                accountHolderName: 'Eve Adams'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'XYZAB7890C',
            employeeImage: 'https://randomuser.me/api/portraits/men/8.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP006',
            firstName: 'Frank',
            lastName: 'White',
            email: 'frank.w@example.com',
            phone: '666-777-8888',
            alternativePhone: 'N/A',
            dateOfBirth: '1987-01-20',
            age: 37,
            gender: 'Male',
            country: 'India',
            state: 'West Bengal',
            city: 'Kolkata',
            fullAddress: '111 Ocean Dr, Salt Lake City, Kolkata, West Bengal, India, 700091',
            zip: '700091',
            fatherName: 'Michael White',
            motherName: 'Patricia White',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Don Bosco School, Park Circus',
                graduation: 'Jadavpur University (B.E. Civil)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                bankName: 'State Bank of India',
                accountNumber: 'XXXX-XXXX-XXXX-6666',
                ifsc: 'PAC11223',
                accountHolderName: 'Frank White'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'CDEFG2345H',
            employeeImage: 'https://randomuser.me/api/portraits/men/4.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP007',
            firstName: 'Grace',
            lastName: 'Lee',
            email: 'grace.l@example.com',
            phone: '999-000-1111',
            alternativePhone: 'N/A',
            dateOfBirth: '1998-09-03',
            age: 26,
            gender: 'Female',
            country: 'India',
            state: 'Rajasthan',
            city: 'Jaipur',
            fullAddress: '222 Forest Way, C Scheme, Jaipur, Rajasthan, India, 302001',
            zip: '302001',
            fatherName: 'David Lee',
            motherName: 'Susan Lee',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Maharani Gayatri Devi Girls’ School',
                graduation: 'University of Rajasthan (B.A. Hons.)',
                postGraduation: 'M.A. (History)'
            },
            bankInfo: {
                bankName: 'Punjab National Bank',
                accountNumber: 'XXXX-XXXX-XXXX-7777',
                ifsc: 'FRC44556',
                accountHolderName: 'Grace Lee'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'HIJKL6789M',
            employeeImage: 'https://randomuser.me/api/portraits/women/7.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP008',
            firstName: 'Henry',
            lastName: 'King',
            email: 'henry.k@example.com',
            phone: '123-123-1234',
            alternativePhone: 'N/A',
            dateOfBirth: '1980-02-29',
            age: 44,
            gender: 'Male',
            country: 'India',
            state: 'Gujarat',
            city: 'Ahmedabad',
            fullAddress: '333 Castle Rd, Satellite, Ahmedabad, Gujarat, India, 380015',
            zip: '380015',
            fatherName: 'Charles King',
            motherName: 'Elizabeth King',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'DPS Bopal',
                graduation: 'Gujarat University (B.E. Mech)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                bankName: 'Bank of Baroda',
                accountNumber: 'XXXX-XXXX-XXXX-8888',
                ifsc: 'RYL77889',
                accountHolderName: 'Henry King'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'NOPQR0123S',
            employeeImage: 'https://randomuser.me/api/portraits/men/9.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP009',
            firstName: 'Ivy',
            lastName: 'Green',
            email: 'ivy.g@example.com',
            phone: '456-456-4567',
            alternativePhone: 'N/A',
            dateOfBirth: '1993-07-07',
            age: 31,
            gender: 'Female',
            country: 'India',
            state: 'Kerala',
            city: 'Kochi',
            fullAddress: '444 Vine St, Kakkanad, Kochi, Kerala, India, 682030',
            zip: '682030',
            fatherName: 'Peter Green',
            motherName: 'Helen Green',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Choice School',
                graduation: 'Cochin University of Science and Technology (B.Tech IT)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                bankName: 'Federal Bank',
                accountNumber: 'XXXX-XXXX-XXXX-9999',
                ifsc: 'GVC22334',
                accountHolderName: 'Ivy Green'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'TUVWX4567Y',
            employeeImage: 'https://randomuser.me/api/portraits/women/10.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP010',
            firstName: 'Jack',
            lastName: 'Taylor',
            email: 'jack.t@example.com',
            phone: '789-789-7890',
            alternativePhone: 'N/A',
            dateOfBirth: '1989-12-12',
            age: 35,
            gender: 'Male',
            country: 'India',
            state: 'Punjab',
            city: 'Chandigarh',
            fullAddress: '555 Bridge St, Sector 17, Chandigarh, Punjab, India, 160017',
            zip: '160017',
            fatherName: 'Paul Taylor',
            motherName: 'Nancy Taylor',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'St. John\'s High School',
                graduation: 'Panjab University (B.E. CSE)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                bankName: 'Canara Bank',
                accountNumber: 'XXXX-XXXX-XXXX-1010',
                ifsc: 'BLN55667',
                accountHolderName: 'Jack Taylor'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'ZABCD8901E',
            employeeImage: 'https://randomuser.me/api/portraits/men/11.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP011',
            firstName: 'Karen',
            lastName: 'Hall',
            email: 'karen.h@example.com',
            phone: '100-200-3000',
            alternativePhone: 'N/A',
            dateOfBirth: '1991-04-25',
            age: 33,
            gender: 'Female',
            country: 'India',
            state: 'Madhya Pradesh',
            city: 'Bhopal',
            fullAddress: '666 Mountain Pass, Arera Colony, Bhopal, Madhya Pradesh, India, 462016',
            zip: '462016',
            fatherName: 'Kevin Hall',
            motherName: 'Doris Hall',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Campion School',
                graduation: 'Maulana Azad National Institute of Technology (B.Arch)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                bankName: 'Union Bank of India',
                accountNumber: 'XXXX-XXXX-XXXX-1212',
                ifsc: 'SMM88990',
                accountHolderName: 'Karen Hall'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'FGHIJ2345K',
            employeeImage: 'https://randomuser.me/api/portraits/women/12.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP012',
            firstName: 'Liam',
            lastName: 'Scott',
            email: 'liam.s@example.com',
            phone: '300-400-5000',
            alternativePhone: 'N/A',
            dateOfBirth: '1986-10-08',
            age: 38,
            gender: 'Male',
            country: 'India',
            state: 'Andhra Pradesh',
            city: 'Visakhapatnam',
            fullAddress: '777 Valley Rd, Gajuwaka, Visakhapatnam, Andhra Pradesh, India, 530026',
            zip: '530026',
            fatherName: 'Mark Scott',
            motherName: 'Carol Scott',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Visakha Valley School',
                graduation: 'Andhra University (B.Tech ECE)',
                postGraduation: 'M.Tech (VLSI)'
            },
            bankInfo: {
                bankName: 'Indian Bank',
                accountNumber: 'XXXX-XXXX-XXXX-1313',
                ifsc: 'DSF11223',
                accountHolderName: 'Liam Scott'
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panNumber: 'LMNOP6789Q',
            employeeImage: 'https://randomuser.me/api/portraits/men/13.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
    ];

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
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={handleBackToEmployeeList}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl"
                    >
                        &larr; Back to Employees
                    </button>
                </div>
                <EmployeeProfile employeeData={selectedEmployee} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 dark:bg-gray-900 relative">
            <div className="shadow-md rounded-lg dark:bg-gray-800 dark:shadow-xl lg:p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4">
                    <h2 className="font-bold text-xl sm:text-2xl text-[#FF4500] dark:text-gray-100">TOTAL EMPLOYEE</h2>
                    <button
                        className="mt-2 sm:mt-0 text-white bg-[#FF4500] rounded-xl text-sm px-4 py-1.5 pt-0"
                        onClick={handleAddEmployeeClick}
                    >
                        <span className="text-2xl">+</span> Add Employee
                    </button>
                </div>

                {/* Search Box */}
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-nav dark:border-gray-600 rounded-xl px-4 py-2 w-full sm:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    />
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
                                    <div key={employee.id} className="relative bg-card dark:bg-gray-700 rounded-2xl shadow-md">
                                        <div onClick={() => handleViewEmployeeDetails(employee.id)} className="block cursor-pointer p-4">
                                            <div className="flex flex-col items-center text-center">
                                                <img src={employee.employeeImage} alt={employee.firstName} className="w-24 h-24 rounded-full border-2 border-blue-400 mb-3 object-cover" />
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{employee.firstName} {employee.lastName}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">ID: {employee.id}</p>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center gap-4 py-3 border-t border-gray-200 dark:border-gray-600'>
                                            <FaUserEdit className="text-blue-600 hover:text-blue-800 cursor-pointer text-xl" onClick={(e) => { e.stopPropagation(); handleEditClick(employee.id);}} />
                                            {employee.loginRestricted ? (
                                                <FaCheckCircle className="text-green-600 hover:text-green-800 cursor-pointer text-xl" onClick={(e) => { e.stopPropagation(); handleRestrictLogin(employee.id); toast.warn(`Restrict Employee ${employee.firstName}`)}} />
                                            ) : (
                                                <FaBan className="text-red-600 hover:text-red-800 cursor-pointer text-xl" onClick={(e) => { e.stopPropagation(); handleRestrictLogin(employee.id); toast.success(`Allow Employee ${employee.firstName}`)}} />
                                            )}
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