import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import {
    FaUsers,
    FaUserTie,
    FaProjectDiagram,
    FaCogs,
    FaClipboardList,
    FaCheckCircle,
    FaHourglassHalf,
    FaCog,
    FaChevronDown,
    FaChevronUp,
} from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { MdDashboard, MdOutlinePlaylistAdd } from 'react-icons/md';

const DashboardSidebar = ({ SidebarOpen, togglesidehamburger }) => {
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (label) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    const mainNavigation = [
        {
            label: 'Employee',
            icon: <FaUsers className="text-blue-500" />,
            subItems: [
                { label: 'All Employees', icon: <FaClipboardList className="text-blue-500" />, to: '/admin-dashboard/TotalEmployee' },
            ],
        },
        {
            label: 'Client',
            icon: <FaUserTie className="text-green-500" />,
            subItems: [
                { label: 'All Clients', icon: <FaClipboardList className="text-green-500" />, to: '/admin-dashboard/Allclients' },
            ],
        },
        {
            label: 'Projects',
            icon: <FaProjectDiagram className="text-purple-500" />,
            subItems: [
                {
                    label: 'Add Project', icon: <MdOutlinePlaylistAdd className='text-green-400 text-xl'
                    />, to: `/admin-dashboard/projects/addproject/${1}`
                },

                { label: 'All Projects', icon: <FaClipboardList className="text-purple-500" />, to: '/admin-dashboard/projects' },
                // { label: 'Complete Projects', icon: <FaCheckCircle className="text-green-600" />, to: '/admin-dashboard/projects/completed' },
                // { label: 'Pending Projects', icon: <FaHourglassHalf className="text-red-500" />, to: '/admin-dashboard/projects/pending' },
            ],
        },
        {
            label: 'Production',
            icon: <FaCogs className="text-yellow-500" />,
            to: '/productions',
        },
    ];

    return (
        <div
            className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transition-transform duration-300
            ${SidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:static md:block`}
        >
            <div className="absolute right-0 top-2 md:hidden flex justify-end p-4">
                <button onClick={togglesidehamburger}>
                    <IoMdClose className="text-2xl text-gray-200 hover:text-red-500" />
                </button>
            </div>

            <div className="flex flex-col justify-between h-full p-6 space-y-6 bg-sidebar dark:bg-[#121212]">
                <div className="space-y-8">
                    <Link to={"/admin-dashboard"} className="flex items-center space-x-2">
                        <MdDashboard className="text-2xl text-primary dark:text-blue-600" />
                        <h2 className="text-xl font-bold text-primary dark:text-blue-800">Dashboard</h2>
                    </Link>

                    <div className='flex flex-col'>
                        <nav className="flex flex-col space-y-2">
                            {mainNavigation.map((item, index) => (
                                <div key={index}>
                                    {item.subItems ? (
                                        // Logic for parent items with sub-items (like Employee, Client, Projects)
                                        <div
                                            className={`
                                                flex items-center justify-between w-full space-x-4
                                                font-bold py-2 px-3 rounded-md cursor-pointer
                                                ${openDropdown === item.label
                                                    ? 'text-red-700 bg-blue-100' // Apply red-700 when dropdown is OPEN
                                                    : 'text-secondary hover:bg-slate-200 hover:text-blue-800' // Default & hover styles when dropdown is CLOSED
                                                }
                                            `}
                                            onClick={() => toggleDropdown(item.label)}
                                        >
                                            <div className="flex items-center space-x-4">
                                                {item.icon}
                                                <span className="text-lg font-medium">{item.label}</span>
                                            </div>
                                            {openDropdown === item.label ? <FaChevronUp className="text-gray-400 text-sm" /> : <FaChevronDown className="text-gray-400 text-sm" />}
                                        </div>
                                    ) : (
                                        // Logic for direct Link items (like Production, Profile, Settings)
                                        <Link
                                            to={item.to}
                                            className={`
                                                flex items-center space-x-4 font-bold py-2 px-3 rounded-md cursor-pointer
                                                ${location.pathname === item.to
                                                    ? 'text-blue-800 bg-blue-100' // Apply blue-800 when route is ACTIVE
                                                    : 'text-secondary hover:bg-slate-200 hover:text-blue-800' // Default & hover styles when route is INACTIVE
                                                }
                                            `}
                                            onClick={togglesidehamburger}
                                        >
                                            {item.icon}
                                            <span className="text-lg font-medium">{item.label}</span>
                                        </Link>
                                    )}

                                    {item.subItems && openDropdown === item.label && (
                                        <div className="bg-sidebar dark:bg-[#121212] pt-1 pb-2 transition-all duration-300 ease-in-out overflow-hidden">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subItem.to}
                                                    className={`
                                                        flex items-center space-x-3 pl-10 pr-3 py-2 text-sm
                                                        ${location.pathname === subItem.to
                                                            ? 'bg-blue-900 text-blue-100'
                                                            : 'text-secondary hover:bg-secondary hover:text-gray-800 dark:text-gray-200 dark:hover:bg-gray-800'
                                                        }
                                                    `}
                                                    onClick={togglesidehamburger}
                                                >
                                                    {subItem.icon}
                                                    <span>{subItem.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h2 className='text-xl font-semibold text-blue-400 hover:text-blue-700 hover:font-bold'>Profile</h2>
                        <Link
                            to="/profile"
                            className='flex items-center gap-3 ml-2 mt-4 h-10 rounded-md group hover:bg-slate-200'
                        >
                            <CgProfile className='text-2xl text-blue-600 pl-2 group-hover:text-blue-800' />
                            <span className='text-lg font-semibold text-secondary group-hover:text-blue-800'>Profile</span>
                        </Link>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-300">
                    <h2 className='text-xl font-semibold text-blue-400 hover:text-blue-700 hover:font-bold'>Footer</h2>
                    <Link
                        to="/settings"
                        className={`flex items-center space-x-3 text-gray-600 hover:text-blue-600 py-2 px-3
                        ${location.pathname === '/settings' ? 'text-blue-500 bg-blue-100 rounded-md' : ''}`}
                        onClick={togglesidehamburger}
                    >
                        <FaCog className="text-lg text-white" />
                        <span className="text-base font-medium text-secondary">Settings</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar;