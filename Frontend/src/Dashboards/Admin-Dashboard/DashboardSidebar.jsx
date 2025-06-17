import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import {
    FaHourglassHalf,
    FaUsers,
    FaUserTie,
    FaProjectDiagram,
    FaCogs,
    FaCheckCircle,
    FaCog,
} from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const statsData = [
    { label: 'TOTAL EMPLOYEE', icon: <FaUsers className="text-blue-500" />, to: '/admin-dashboard/TotalEmployee' },
    { label: 'TOTAL CLIENT', icon: <FaUserTie className="text-green-500" />, to: '/clients' },
    { label: 'TOTAL PROJECTS', icon: <FaProjectDiagram className="text-purple-500" />, to: '/admin-dashboard/projects' },
    { label: 'TOTAL PRODUCTIONS', icon: <FaCogs className="text-yellow-500" />, to: '/productions' },
    { label: 'TOTAL COMPLETE PROJECTS', icon: <FaCheckCircle className="text-green-600" />, to: '/admin-dashboard/projects/completed' },
    { label: 'TOTAL PENDING PROJECTS', icon: <FaHourglassHalf className="text-red-500" />, to: '/admin-dashboard/projects/pending' },
];


const DashboardSidebar = ({ SidebarOpen, togglesidehamburger }) => {
    const location = useLocation();
    console.log(location.pathname);

    return (
        <div
            className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transition-transform duration-300
        ${SidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:block`}
        >
            {/* Close Button - Only for Mobile */}
            <div className="absolute right-0 top-2 md:hidden flex justify-end p-4">
                <button onClick={togglesidehamburger}>
                    <IoMdClose className="text-2xl text-gray-500 hover:text-red-500" />
                </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex flex-col justify-between h-full p-6 space-y-6 bg-[#f8fefe]">
                {/* Top Section */}
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center space-x-2">
                        <MdDashboard className="text-2xl text-blue-600" />
                        <h2 className="text-xl font-bold text-blue-600">Dashboard</h2>
                    </div>

                    {/* Stats List */}
                    <div className="flex flex-col space-y-6">
                        {statsData.map((item, index) => (
                            <Link
                                key={index}
                                to={item.to}
                                className={`flex items-center space-x-4 text-gray-700 hover:text-blue-800 cursor-pointer font-bold
                                ${location.pathname === item.to ? 'text-blue-800 bg-blue-100 rounded-md py-2 px-3' : ''}`}
                                onClick={togglesidehamburger}
                            >
                                {item.icon}
                                <span className="text-lg font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer Settings Link */}
                <div className="pt-4 border-t border-gray-300">
                    <Link
                        to="/settings"
                        className={`flex items-center space-x-3 text-gray-600 hover:text-blue-600
                        ${location.pathname === '/settings' ? 'text-blue-800 bg-blue-100 rounded-md py-2 px-3' : ''}`} 
                        onClick={togglesidehamburger}>
                    
                        <FaCog className="text-lg" />
                        <span className="text-base font-medium">Settings</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar;