import React, { useState, useEffect } from 'react';
import Dashboardsidebar from '../Admin-Dashboard/DashboardSidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  FaExpand,
  FaSun,
  FaMoon,
  FaSearch,
  FaBell,
  FaCommentDots,
} from 'react-icons/fa';
import { MdWatchLater } from "react-icons/md";

import TotalProjects from './TotalProjects';
import CompleteProjects from './CompleteProjects';
import PendingProjects from './PendingProjects';
import Getallemployee from './Getallemployee';
import InitialDashboardContent from './InitialDashboardContain';
import AllClient from './AllClient';
import AddTask from "./AddTask";
import AddProject from '../../Component/AddProject';

const AdminDashboard = ({ section }) => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [todo, setTodo] = useState(false);

  const togglesidehamburger = () => {
    setSidebarOpen(!SidebarOpen);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log('Searching for:', event.target.value);
  };

  const handleTodo = () => {
    setTodo(!todo);
  };

  const renderDashboardContent = () => {
    switch (section) {
      case 'addproject':
        return <AddProject />;
      case 'projects':
        return <TotalProjects />;
      case 'completed':
        return <CompleteProjects />;
      case 'pending':
        return <PendingProjects />;
      case 'TotalEmployee':
        return <Getallemployee />;
      case 'Allclients':
        return <AllClient />;
      case 'add-client':
        return <div className="p-6 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:text-white">Add Client Form goes here...</div>;
      default:
        return <InitialDashboardContent />;
    }
  };

  return (
    <div className={`h-screen w-screen bg-[#e8e8e8] overflow-hidden ${isDarkMode ? 'dark:bg-gray-900' : ''}`}>
      <div className="flex flex-col md:flex-row h-full">
        <Dashboardsidebar
          SidebarOpen={SidebarOpen}
          togglesidehamburger={togglesidehamburger}
        />

        {SidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={togglesidehamburger}
          />
        )}

        {/* Main Section */}
        <div className="flex-1 overflow-y-auto bg-background dark:bg-gray-900">
          {/* Top Navigation Bar */}
          <div className="fixed top-0 left-0 right-0 z-30 bg-nav h-14 dark:bg-gray-800 md:pl-64 px-2 md:px-4">
            <div className="flex justify-between items-center w-full h-full">
              {/* Hamburger for mobile only */}
              <div className="md:hidden flex-shrink-0">
                <button onClick={togglesidehamburger} className="p-2">
                  <GiHamburgerMenu className="text-2xl text-white hover:text-red-500 hover:rounded-md dark:text-gray-300 dark:hover:text-blue-500" />
                </button>
              </div>

              {/* Right-side icons */}
              <div className="flex items-center space-x-2 sm:space-x-5 md:space-x-8 ml-auto pr-1 md:pr-6">
                <FaExpand
                  className="text-xl text-white cursor-pointer hover:text-blue-700 h-10 w-10 border-2 rounded-md p-2 hover:bg-slate-200 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:bg-gray-700"
                  onClick={toggleFullscreen}
                />
                <button onClick={() => setIsDarkMode(!isDarkMode)}>
                  {isDarkMode ? (
                    <FaSun className="text-xl text-yellow-500 cursor-pointer h-10 w-10 border-2 rounded-md p-2 hover:bg-slate-200 dark:hover:bg-gray-700" />
                  ) : (
                    <FaMoon className="text-xl text-white cursor-pointer hover:text-blue-700 h-10 w-10 border-2 rounded-md p-2 hover:bg-slate-200 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:bg-gray-700" />
                  )}
                </button>
                <button onClick={() => setShowSearch(!showSearch)}>
                  <FaSearch className="text-xl text-white cursor-pointer hover:text-blue-700 h-10 w-10 border-2 rounded-md p-2 hover:bg-slate-200 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:bg-gray-700" />
                </button>
                <FaBell className="text-xl text-white cursor-pointer hover:text-blue-700 h-10 w-10 border-2 rounded-md p-2 hover:bg-slate-200 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:bg-gray-700" />
                <MdWatchLater
                  onClick={handleTodo}
                  className="text-xl text-white cursor-pointer hover:text-blue-700 h-10 w-10 border-2 rounded-md p-2 hover:bg-slate-200 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:bg-gray-700"
                />
                <FaCommentDots className="text-xl text-white cursor-pointer hover:text-blue-700 h-10 w-10 border-2 rounded-md p-2 hover:bg-slate-200 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:bg-gray-700" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="fixed top-14 left-0 right-0 z-20 bg-white dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700 md:pl-64">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          )}

          {todo && <AddTask setTodo={setTodo} />}

          {/* Dashboard Content */}
          <div className={`p-4 ${showSearch ? 'pt-28' : 'pt-14'} md:pt-14`}>
            {renderDashboardContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
