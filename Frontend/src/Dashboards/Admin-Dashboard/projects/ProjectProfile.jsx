// src/components/ProjectProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { useSelector } from 'react-redux'; // Assuming Redux for project data
import { selectAllProjects } from '../../redux/slices/projectSlice'; // Adjust path as needed

// Import icons for a professional touch
import { FaLaptopCode, FaDollarSign, FaServer, FaUserTie, FaUsers, FaClipboardList, FaCalendarAlt, FaCheckCircle, FaTools, FaFileAlt } from 'react-icons/fa';
import { MdOutlineDateRange, MdAccessTimeFilled, MdCorporateFare } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";


const ProjectProfile = () => {
    const { projectId } = useParams(); // Get the projectId from the URL
    const allProjects = useSelector(selectAllProjects); // Get all projects from Redux store
    const [project, setProject] = useState(null); // State to hold the specific project data

    useEffect(() => {
        // Find the project that matches the projectId from the URL
        const foundProject = allProjects.find(p => p.projectId === projectId);
        setProject(foundProject);
    }, [projectId, allProjects]); // Re-run effect if projectId or allProjects changes

    if (!project) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading project details or Project not found...</p>
            </div>
        );
    }

    // Destructure project data for easier access
    const {
        projectName,
        quotationId,
        projectType,
        projectDocumentation,
        server,
        serverType,
        developmentCost,
        serverCost,
        otherAccessories,
        otherAccessoriesCost,
        total,
        status,
        generateWorkOrder,
        clientId,
        clientName,
        source,
        projectStartDate,
        expectedEndDate,
        actualEndDate,
        projectManager,
        teamLead,
        technologiesUsed,
        milestones,
        notes,
    } = project; // Now destructuring from the 'project' state variable

    // Helper function to format currency
    const formatCurrency = (amount) => {
        if (typeof amount !== 'number') return 'N/A';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    // Helper to render a field with a label and value (for consistency)
    const renderInfoField = (label, value, icon = null) => (
        <div className="flex flex-col">
            <span className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-1">
                {icon} {label}:
            </span>
            <p className="text-gray-800 text-base font-semibold">{value || 'N/A'}</p>
        </div>
    );

    // Helper to render a cost field
    const renderCostField = (label, cost) => (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-blue-700 dark:text-blue-300 text-sm font-semibold mb-1">{label}</span>
            <p className="text-blue-800 dark:text-blue-200 text-xl font-bold">{formatCurrency(cost)}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-8">
            <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">

                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight">{projectName}</h1>
                        <p className="text-blue-200 text-sm sm:text-base">Project ID: <span className="font-semibold">{projectId}</span></p>
                        <p className="text-blue-200 text-sm sm:text-base">Quotation ID: <span className="font-semibold">{quotationId}</span></p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md
                            ${status === 'Complete' ? 'bg-green-500' :
                              status === 'In Progress' ? 'bg-yellow-500' :
                              'bg-red-500'}
                        `}>
                            {status}
                        </span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-6 sm:p-8">

                    {/* Overview Section */}
                    <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Project Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderInfoField('Project Type', projectType, <FaLaptopCode className="text-blue-500" />)}
                            {renderInfoField('Client Name', clientName, <MdCorporateFare className="text-blue-500" />)}
                            {renderInfoField('Client ID', clientId, <FaUserTie className="text-blue-500" />)}
                            {renderInfoField('Source', source.charAt(0).toUpperCase() + source.slice(1), <FaClipboardList className="text-blue-500" />)}
                            {renderInfoField('Project Manager', projectManager, <FaUserTie className="text-blue-500" />)}
                            {renderInfoField('Team Lead', teamLead, <FaUsers className="text-blue-500" />)}
                            {renderInfoField('Project Start Date', projectStartDate, <MdOutlineDateRange className="text-blue-500" />)}
                            {renderInfoField('Expected End Date', expectedEndDate, <MdAccessTimeFilled className="text-blue-500" />)}
                            {renderInfoField('Actual End Date', actualEndDate || 'N/A', <FaCheckCircle className="text-blue-500" />)}
                            {renderInfoField('Work Order Generated', generateWorkOrder ? 'Yes' : 'No', <HiOutlineDocumentText className="text-blue-500" />)}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
                                <span className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-1">
                                    <FaTools className="text-blue-500" /> Technologies Used:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {technologiesUsed.length > 0 ? (
                                        technologiesUsed.map((tech, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-full">
                                                {tech}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-800 text-base font-semibold">N/A</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <span className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-1">
                                    <FaFileAlt className="text-blue-500" /> Project Documentation:
                                </span>
                                {projectDocumentation ? (
                                    <a
                                        href={projectDocumentation}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline text-base font-semibold transition-colors duration-200"
                                    >
                                        View Documentation Link
                                    </a>
                                ) : (
                                    <p className="text-gray-800 text-base font-semibold">Not available</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Server Details Section */}
                    <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Server Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {renderInfoField('Server Provided', server === 'YES' ? 'Yes' : 'No', <FaServer className="text-blue-500" />)}
                            {server === 'YES' && renderInfoField('Server Type', serverType, <FaServer className="text-blue-500" />)}
                        </div>
                    </section>

                    {/* Costing Details Section */}
                    <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Cost Breakdown</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {renderCostField('Development Cost', developmentCost)}
                            {renderCostField('Server Cost', serverCost)}
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                                <span className="text-blue-700 dark:text-blue-300 text-sm font-semibold mb-1">Other Accessories</span>
                                <p className="text-lg text-blue-800 dark:text-blue-200 font-semibold">{otherAccessories ? 'Included' : 'Not Included'}</p>
                                {otherAccessories && (
                                    <p className="text-xl text-blue-800 dark:text-blue-200 font-bold mt-1">{formatCurrency(otherAccessoriesCost)}</p>
                                )}
                            </div>
                            <div className="bg-blue-600 dark:bg-blue-700 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-md">
                                <span className="text-blue-100 text-lg font-semibold mb-1">Total Project Cost</span>
                                <p className="text-3xl font-extrabold">{formatCurrency(total)}</p>
                            </div>
                        </div>
                    </section>

                    {/* Milestones Section */}
                    <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Milestones</h2>
                        {milestones && milestones.length > 0 ? (
                            <div className="space-y-4">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                                        <div className="flex-shrink-0">
                                            {milestone.status === 'Completed' ? (
                                                <FaCheckCircle className="text-green-500 text-2xl" />
                                            ) : milestone.status === 'In Progress' ? (
                                                <MdAccessTimeFilled className="text-yellow-500 text-2xl" />
                                            ) : (
                                                <FaCalendarAlt className="text-gray-400 text-2xl" />
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{milestone.name}</h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">Due: {milestone.dueDate}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                              milestone.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                              'bg-gray-100 text-gray-800'}
                                        `}>
                                            {milestone.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300">No milestones defined.</p>
                        )}
                    </section>

                    {/* Notes Section */}
                    <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Additional Notes</h2>
                        {notes ? (
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{notes}</p>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300">No additional notes.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProjectProfile;