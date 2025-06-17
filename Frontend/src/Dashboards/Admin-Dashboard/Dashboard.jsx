import React, { useState } from 'react';
import Dashboardsidebar from '../Admin-Dashboard/DashboardSidebar'; 
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaPlus } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import TotalProjects from './TotalProjects';
import CompleteProjects from './CompleteProjects';
import PendingProjects from './PendingProjects'; 
import Getallemployee from './Getallemployee';

const AdminDashboard = ({ section }) => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const togglesidehamburger = () => {
    setSidebarOpen(!SidebarOpen);
  };

  const renderDashboardContent = () => {
    switch (section) {
      case 'projects':
        return <TotalProjects />;
      case 'completed':
        return <CompleteProjects />; 
      case 'pending':
        return <PendingProjects />;
      case 'TotalEmployee':
        return <Getallemployee/>;
      default:
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome to Your Admin Dashboard</h2>
            <p className="text-gray-600">Please select a category from the sidebar to view detailed information.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-screen bg-[#f5f7fb] overflow-hidden">
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
        <div className="flex-1 overflow-y-auto p-4">

          {/* Mobile Top Bar */}
          <div className="flex justify-between items-center md:hidden mb-4">
            <button onClick={togglesidehamburger} className="p-2">
              <GiHamburgerMenu className="text-2xl text-gray-700" />
            </button>
            <div className="flex items-center gap-4">
              <Link to="/profile" className="p-2">
                <CgProfile className="text-2xl text-gray-700" />
              </Link>
            </div>
          </div>

          {/* Desktop Top Bar */}
          <div className="hidden md:flex justify-end items-center mb-1">
              <Link to="/profile" className="p-2">
                <CgProfile className="text-3xl text-gray-700" />
              </Link>
          </div>

{/* 
          <h1 className="text-2xl font-semibold mb-4 text-gray-600">Hi, User</h1> */}
          
          {renderDashboardContent()}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;