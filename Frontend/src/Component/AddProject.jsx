import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { addProject } from '../redux/slices/projectSlice.js';
import { selectAllClients } from '../redux/slices/clientSlice.js';

// Custom styles for the react-select component to match the dark theme
const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: state.theme === 'dark' ? '#1f2937' : '#f9fafb',
    borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : null,
    '&:hover': {
      borderColor: '#6366f1',
    },
    borderRadius: '0.375rem', // rounded-md
    minHeight: '42px', // Ensure consistent height with other inputs
  }),
  menu: base => ({
    ...base,
    backgroundColor: '#1f2937',
    color: '#fff',
    zIndex: 100,
    borderRadius: '0.375rem', // rounded-md
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#4f46e5'
      : state.isFocused
        ? '#374151'
        : '#1f2937',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#374151',
    },
  }),
  singleValue: base => ({
    ...base,
    color: '#111827', // Text color for selected value in light mode
    '.dark &': { // Apply dark mode specific styles
      color: '#fff',
    },
  }),
  input: base => ({
    ...base,
    color: '#111827', // Text color for input in light mode
    '.dark &': { // Apply dark mode specific styles
      color: '#fff',
    },
  }),
  placeholder: base => ({
    ...base,
    color: '#9ca3af', // Placeholder color
    '.dark &': { // Apply dark mode specific styles
      color: '#9ca3af',
    },
  }),
};

const ProjectInputSection = ({ project, index, onProjectChange, onRemoveProject, clientName }) => {
  // Local state to control visibility of 'other project type' input
  const [isOtherProjectTypeVisible, setIsOtherProjectTypeVisible] = useState(project.projectType === 'OTHER');
  // Local state to control visibility of 'server type' input
  const [isServerTypeVisible, setIsServerTypeVisible] = useState(project.server === 'YES');
  // Local state to control visibility of 'other accessories cost' and 'accessories description' input
  const [isOtherAccessoriesVisible, setIsOtherAccessoriesVisible] = useState(project.otherAccessories === 'YES');

  // Effect to update visibility when project.projectType changes
  useEffect(() => {
    setIsOtherProjectTypeVisible(project.projectType === 'OTHER');
  }, [project.projectType]);

  // Effect to update visibility when project.server changes
  useEffect(() => {
    setIsServerTypeVisible(project.server === 'YES');
  }, [project.server]);

  // Effect to update visibility when project.otherAccessories changes
  useEffect(() => {
    setIsOtherAccessoriesVisible(project.otherAccessories === 'YES');
  }, [project.otherAccessories]);

  // Effect to generate quotation ID when clientName or project.localId changes (for uniqueness)
  useEffect(() => {
    if (clientName) {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-indexed, so add 1
      const day = String(date.getDate()).padStart(2, "0");
      const firstName = clientName.split(" ")[0].toUpperCase();
      // Use project.localId (timestamp) for unique counter for quotation ID
      const uniqueCounter = String(project.localId).slice(-3); // Last 3 digits of timestamp for brevity
      const baseId = `${firstName}OTY${day}${month}${year}`;
      const fullId = `${baseId}${uniqueCounter}`;

      // Only update if the ID is different to prevent unnecessary re-renders/updates
      if (project.quotationId !== fullId) {
        onProjectChange(project.localId, { target: { name: 'quotationId', value: fullId } });
      }
    } else {
      // Clear quotationId if no client is selected
      if (project.quotationId !== '') {
        onProjectChange(project.localId, { target: { name: 'quotationId', value: '' } });
      }
    }
  }, [clientName, project.localId, project.quotationId, onProjectChange]);


  // Handles changes to input fields within this project section
  const handleInternalChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue = value;

    // Special handling for checkboxes (toggle YES/NO)
    if (type === 'checkbox') {
      newValue = checked ? 'YES' : 'NO';
      // If server checkbox is unchecked, clear serverType
      if (name === 'server' && newValue === 'NO') {
        onProjectChange(project.localId, { target: { name: 'serverType', value: '' } });
      }
      // If otherAccessories checkbox is unchecked, clear otherAccessoriesCost and accessoriesDescription
      if (name === 'otherAccessories' && newValue === 'NO') {
        onProjectChange(project.localId, { target: { name: 'otherAccessoriesCost', value: '' } });
        onProjectChange(project.localId, { target: { name: 'accessoriesDescription', value: '' } });
      }
    }

    // Pass the change up to the parent component
    onProjectChange(project.localId, {
      target: {
        name: name,
        value: type === 'file' ? files[0] : newValue,
        type: type,
        checked: checked // Include checked for checkbox handling in parent if needed
      }
    });
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-6 relative shadow-sm">
      {/* Remove button for project section (hidden for the first project) */}
      {index > 0 && (
        <button
          type="button"
          onClick={() => onRemoveProject(project.localId)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 focus:outline-none rounded-full p-1 transition-colors duration-200"
          title="Remove Project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}

      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Project {index + 1} Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Project ID (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project ID</label>
          <input
            type="text"
            value={project.projectID}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Quotation ID (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quotation ID</label>
          <input
            type="text"
            value={project.quotationId}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Project Name input field */}
        <div>
          <label htmlFor={`projectName-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id={`projectName-${project.localId}`}
            name="projectName"
            value={project.projectName}
            onChange={handleInternalChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="e.g., E-commerce Redesign"
            required
          />
        </div>

        {/* Project Type dropdown */}
        <div>
          <label htmlFor={`projectType-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Type <span className="text-red-500">*</span>
          </label>
          <select
            id={`projectType-${project.localId}`}
            name="projectType"
            value={project.projectType}
            onChange={handleInternalChange}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            required
          >
            <option value="">Select Project Type</option>
            <option value="STATIC WEBSITE">Static Website</option>
            <option value="DYNAMIC WEBSITE">Dynamic Website</option>
            <option value="ADMIN + ANDROID APP">Admin + Android App</option>
            <option value="ADMIN + IOS APP">Admin + iOS App</option>
            <option value="WEBSITE + APP (IOS+APK)">Website + App (iOS+APK)</option>
            <option value="LOGO DESIGN">Logo Design</option>
            <option value="BANNER DESIGN">Banner Design</option>
            <option value="SEO">SEO</option>
            <option value="OTHER">Other</option>
          </select>
          {/* Conditional input for 'Other' project type */}
          {isOtherProjectTypeVisible && (
            <input
              type="text"
              name="otherProjectType"
              value={project.otherProjectType}
              onChange={handleInternalChange}
              className="mt-3 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Specify other project type"
              required
            />
          )}
        </div>

        {/* Project Documentation file upload */}
        <div>
          <label htmlFor={`projectDocumentation-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Documentation (Optional)
          </label>
          <input
            type="file"
            id={`projectDocumentation-${project.localId}`}
            name="projectDocumentation"
            onChange={handleInternalChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all duration-200"
          />
          {project.projectDocumentation && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 truncate">
              Selected file: {project.projectDocumentation.name}
            </p>
          )}
        </div>

        {/* Server Required? (Single Checkbox) */}
        <div className="flex items-center pt-6 md:pt-0"> {/* Adjusted padding for alignment */}
          <input
            type="checkbox"
            id={`server-${project.localId}`}
            name="server"
            checked={project.server === 'YES'}
            onChange={handleInternalChange}
            className="form-checkbox h-5 w-5 text-indigo-600 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500"
          />
          <label htmlFor={`server-${project.localId}`} className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Server Required?
          </label>
        </div>

        {/* Server Type (Conditional) */}
        {isServerTypeVisible && (
          <div>
            <label htmlFor={`serverType-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Server Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`serverType-${project.localId}`}
              name="serverType"
              value={project.serverType}
              onChange={handleInternalChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="e.g., AWS EC2, DigitalOcean"
              required
            />
          </div>
        )}

        {/* Development Cost and Server Cost */}
        <div>
          <label htmlFor={`developmentCost-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Development Cost
          </label>
          <input
            type="number"
            id={`developmentCost-${project.localId}`}
            name="developmentCost"
            value={project.developmentCost}
            onChange={handleInternalChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="e.g., 50000"
            min="0"
          />
        </div>
        <div>
          <label htmlFor={`serverCost-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Server Cost
          </label>
          <input
            type="number"
            id={`serverCost-${project.localId}`}
            name="serverCost"
            value={project.serverCost}
            onChange={handleInternalChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="e.g., 12000"
            min="0"
          />
        </div>

        {/* Other Accessories Required? (Single Checkbox) */}
        <div className="flex items-center pt-6 md:pt-0"> {/* Adjusted padding for alignment */}
          <input
            type="checkbox"
            id={`otherAccessories-${project.localId}`}
            name="otherAccessories"
            checked={project.otherAccessories === 'YES'}
            onChange={handleInternalChange}
            className="form-checkbox h-5 w-5 text-indigo-600 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500"
          />
          <label htmlFor={`otherAccessories-${project.localId}`} className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Other Accessories Required?
          </label>
        </div>
        {isOtherAccessoriesVisible && (
          <>
            <div>
              <label htmlFor={`otherAccessoriesCost-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Other Accessories Cost <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id={`otherAccessoriesCost-${project.localId}`}
                name="otherAccessoriesCost"
                value={project.otherAccessoriesCost}
                onChange={handleInternalChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Cost (e.g., SSL certificate, domain)"
                required
                min="0"
              />
            </div>
            <div>
              <label htmlFor={`accessoriesDescription-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Accessory Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`accessoriesDescription-${project.localId}`}
                name="accessoriesDescription"
                value={project.accessoriesDescription}
                onChange={handleInternalChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="e.g., SSL certificate, Domain Name"
                required
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};



const AddProject = () => {
  const dispatch = useDispatch();
  const clients = useSelector(selectAllClients);

  // State for overall form data (client details)
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    phone: '',
    email: '',
    companyName: '',
  });

  // State for managing multiple projects
  const [projects, setProjects] = useState([]);
  // Counter for generating unique project IDs within this form session
  const [projectCounter, setProjectCounter] = useState(1);

  // Effect to add the first project section when the component mounts
  useEffect(() => {
    if (projects.length === 0) {
      handleAddProject();
    }
  }, []); // Runs only once on initial mount

  // Effect to update client details when a client is selected
  useEffect(() => {
    const selectedClient = clients.find(client => client.id === formData.clientId);
    if (selectedClient) {
      setFormData(prev => ({
        ...prev,
        clientName: selectedClient.clientName,
        phone: selectedClient.phone,
        email: selectedClient.email,
        companyName: selectedClient.companyName,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        clientName: '',
        phone: '',
        email: '',
        companyName: '',
      }));
    }
  }, [formData.clientId, clients]);

  // Function to generate a unique project ID
  const generateProjectId = (counter) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const baseId = `IGPRO${month}${year}${day}`;
    return `${baseId}${String(counter).padStart(3, "0")}`;
  };

  // Handles adding a new project section
  const handleAddProject = () => {
    const newProjectId = generateProjectId(projectCounter);
    setProjects(prevProjects => [
      ...prevProjects,
      {
        localId: Date.now(),
        projectName: '',
        projectType: '',
        otherProjectType: '',
        projectID: newProjectId, // Auto-generated ID
        quotationId: '', // Will be generated in ProjectInputSection
        projectDocumentation: null,
        server: 'NO', // Default for new project
        serverType: '', // Default for new project
        developmentCost: '', // Default for new project
        serverCost: '', // Default for new project
        otherAccessories: 'NO', // Default for new project
        otherAccessoriesCost: '', // Default for new project
        accessoriesDescription: '', // New field for accessories description
      }
    ]);
    setProjectCounter(prevCounter => prevCounter + 1); // Increment counter for the next project
  };

  // Handles removing a project section
  const handleRemoveProject = (localIdToRemove) => {
    setProjects(prevProjects => prevProjects.filter(project => project.localId !== localIdToRemove));
  };

  // Handles changes for the main form data (only client details now)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handles changes for individual project data
  const handleProjectChange = (localId, updatedField) => {
    setProjects(prevProjects =>
      prevProjects.map(project => {
        if (project.localId === localId) {
          let updatedProject = { ...project, [updatedField.target.name]: updatedField.target.value };

          // Clear otherProjectType if projectType is not 'OTHER'
          if (updatedField.target.name === 'projectType' && updatedField.target.value !== 'OTHER') {
            updatedProject.otherProjectType = '';
          }
          // Clear serverType if server is 'NO'
          if (updatedField.target.name === 'server' && updatedField.target.value === 'NO') {
            updatedProject.serverType = '';
          }
          // Clear otherAccessoriesCost and accessoriesDescription if otherAccessories is 'NO'
          if (updatedField.target.name === 'otherAccessories' && updatedField.target.value === 'NO') {
            updatedProject.otherAccessoriesCost = '';
            updatedProject.accessoriesDescription = '';
          }

          return updatedProject;
        }
        return project;
      })
    );
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate main form fields (only client selection now)
    if (!formData.clientId) {
      toast.error('Please select a client.', { position: 'top-center', theme: 'colored' });
      return;
    }

    // Validate each project
    for (const project of projects) {
      if (!project.projectName.trim() || !project.projectType) {
        toast.error(`Please fill in all required fields for Project ${projects.indexOf(project) + 1} (Name and Type).`, { position: 'top-center', theme: 'colored' });
        return;
      }
      if (project.projectType === 'OTHER' && !project.otherProjectType.trim()) {
        toast.error(`Please specify the 'Other Project Type' for Project ${projects.indexOf(project) + 1}.`, { position: 'top-center', theme: 'colored' });
        return;
      }
      if (project.server === 'YES' && !project.serverType.trim()) {
        toast.error(`Please specify Server Type for Project ${projects.indexOf(project) + 1}.`, { position: 'top-center', theme: 'colored' });
        return;
      }
      if (project.otherAccessories === 'YES' && (project.otherAccessoriesCost === '' || isNaN(parseFloat(project.otherAccessoriesCost)))) {
        toast.error(`Please specify Other Accessories Cost (a number) for Project ${projects.indexOf(project) + 1}.`, { position: 'top-right', theme: 'colored' });
        return;
      }
      if (project.otherAccessories === 'YES' && !project.accessoriesDescription.trim()) {
        toast.error(`Please specify the Accessory Description for Project ${projects.indexOf(project) + 1}.`, { position: 'top-right', theme: 'colored' });
        return;
      }
    }

    // Dispatch addProject for each project
    projects.forEach(project => {
      const projectDataToDispatch = {
        ...formData, // Include overall client details
        projectName: project.projectName,
        quotationId: project.quotationId, 
        projectType: project.projectType,
        otherProjectType: project.otherProjectType,
        projectDocumentation: project.projectDocumentation,
        projectID: project.projectID, // Include the generated project ID
        server: project.server,
        serverType: project.serverType,
        developmentCost: project.developmentCost,
        serverCost: project.serverCost,
        otherAccessories: project.otherAccessories,
        otherAccessoriesCost: project.otherAccessoriesCost,
        accessoriesDescription: project.accessoriesDescription,
      };
      dispatch(addProject(projectDataToDispatch));
    });

    toast.success('Project(s) added successfully!', { position: 'top-center', theme: 'colored' });

    // Reset form after submission
    setFormData({
      clientId: '',
      clientName: '',
      phone: '',
      email: '',
      companyName: '',
    });
    setProjects([]); // Clear projects
    setProjectCounter(1); // Reset project ID counter

    // Add the first project section again for a fresh form
    handleAddProject();
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:text-white my-4 md:my-8 mx-2 sm:mx-4 md:mx-6 font-inter">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Add New Project(s)</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Client Select */}
          <div>
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Client <span className="text-red-500">*</span>
            </label>
            <Select
              id="clientId"
              name="clientId"
              options={clients.map(client => ({
                value: client.id,
                label: `${client.id} - ${client.clientName} (${client.companyName})`
              }))}
              value={clients
                .map(client => ({
                  value: client.id,
                  label: `${client.id} - ${client.clientName} (${client.companyName})`
                }))
                .find(option => option.value === formData.clientId)}
              onChange={(selectedOption) =>
                setFormData(prev => ({ ...prev, clientId: selectedOption?.value || '' }))
              }
              isClearable
              styles={customSelectStyles}
              placeholder="Select a client"
            />
          </div>
          {/* Auto-filled Client Details (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
            <input type="text" value={formData.clientName} readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input type="text" value={formData.phone} readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" value={formData.email} readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
            <input type="text" value={formData.companyName} readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed" />
          </div>
        </div>

        {/* Dynamic Project Sections */}
        <div className="space-y-6"> {/* Increased space between project sections */}
          {projects.map((project, index) => (
            <ProjectInputSection
              key={project.localId} // Use localId for unique key
              project={project}
              index={index}
              onProjectChange={handleProjectChange}
              onRemoveProject={handleRemoveProject}
              clientName={formData.clientName} 
            />
          ))}
        </div>

        {/* Add Project Button */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleAddProject}
            className="flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          >
            
            Add Another Project
          </button>
        </div>

        {/* Submit Button */}
        <center className="mt-8">
          <button
            type="submit"
            className="w-full sm:w-[180px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-md shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base sm:text-lg"
          >
            Add Project(s)
          </button>
        </center>
      </form>
    </div>
  );
};

export default AddProject;
