import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllProjects } from '../../redux/slices/projectSlice';
import { IoMdArrowDropdown } from "react-icons/io";

const TotalProjects = () => {
  const allProjects = useSelector(selectAllProjects);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const filter = filterStatus === 'All'
      ? allProjects
      : allProjects.filter(p => p.status === filterStatus);
    setFilteredProjects(filter);
  }, [filterStatus, allProjects]);

  const getStatusStyles = (status) => {
    return status === 'Complete'
      ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 mt-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        All Projects
      </h2>

      {/* Filter Dropdown - Fully Responsive */}
      <div className="flex justify-center mb-8 px-4">
        <div className="relative w-full max-w-xs">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 appearance-none focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm "
          >
            <option value="All">All Projects</option>
            <option value="Pending">Pending Projects</option>
            <option value="Complete">Completed Projects</option>
          </select>

          {/* Dropdown Icon */}
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500 dark:text-gray-300">
            <IoMdArrowDropdown className="text-xl" />
          </div>
        </div>
      </div>





      {/* Projects Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            const placeholder = project.projectName?.[0]?.toUpperCase() || '?';
            const logoUrl = `https://placehold.co/100x100/A78BFA/fff?text=${placeholder}`;
            return (
              <div
                key={project.id}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-purple-200 dark:bg-purple-700 border-4 border-purple-400 dark:border-purple-600 flex items-center justify-center">
                  <img
                    src={logoUrl}
                    alt={project.projectName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = logoUrl;
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{project.projectName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">ID: {project.projectId}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(project.status)}`}>
                  {project.status}
                </span>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-300 py-10">
            No projects found for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default TotalProjects;
