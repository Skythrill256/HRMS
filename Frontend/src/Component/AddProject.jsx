import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { addProject } from '../redux/slices/projectSlice.js';
import { selectAllClients } from '../redux/slices/clientSlice.js';

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: state.theme === 'dark' ? '#1f2937' : '#f9fafb',
    borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : null,
    '&:hover': {
      borderColor: '#6366f1',
    },
  }),
  menu: base => ({
    ...base,
    backgroundColor: '#1f2937',
    color: '#fff',
    zIndex: 100,
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
    color: '#111827',
  }),
  input: base => ({
    ...base,
    color: '#111827',
  }),
};

const AddProject = () => {
  const dispatch = useDispatch();
  const clients = useSelector(selectAllClients);

  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    phone: '',
    email: '',
    companyName: '',
    projectName: '',
    quotationId: '',
    projectType: '',
    otherProjectType: '',
    projectDocumentation: null,
    server: 'NO',
    serverType: '',
    developmentCost: '',
    serverCost: '',
    otherAccessories: 'NO',
    otherAccessoriesCost: '',
  });

  const [isOtherProjectTypeVisible, setIsOtherProjectTypeVisible] = useState(false);
  const [isServerTypeVisible, setIsServerTypeVisible] = useState(false);
  const [isOtherAccessoriesCostVisible, setIsOtherAccessoriesCostVisible] = useState(false);

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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (type === 'checkbox') {
      const newValue = checked ? 'YES' : 'NO';
      setFormData(prev => ({ ...prev, [name]: newValue }));

      if (name === 'server') {
        setIsServerTypeVisible(newValue === 'YES');
        if (newValue === 'NO') setFormData(prev => ({ ...prev, serverType: '' }));
      } else if (name === 'otherAccessories') {
        setIsOtherAccessoriesCostVisible(newValue === 'YES');
        if (newValue === 'NO') setFormData(prev => ({ ...prev, otherAccessoriesCost: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));

      if (name === 'projectType') {
        setIsOtherProjectTypeVisible(value === 'OTHER');
        if (value !== 'OTHER') setFormData(prev => ({ ...prev, otherProjectType: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.clientId || !formData.projectName.trim() || !formData.quotationId.trim() || !formData.projectType ||
      (formData.projectType === 'OTHER' && !formData.otherProjectType.trim())) {
      toast.error('Please fill in all required fields.', { position: 'top-center', theme: 'colored' });
      return;
    }

    if (formData.server === 'YES' && !formData.serverType.trim()) {
      toast.error('Please specify Server Type.', { position: 'top-center', theme: 'colored' });
      return;
    }

    if (formData.otherAccessories === 'YES' && (formData.otherAccessoriesCost === '' || isNaN(parseFloat(formData.otherAccessoriesCost)))) {
      toast.error('Please specify Other Accessories Cost (a number).', { position: 'top-right', theme: 'colored' });
      return;
    }

    dispatch(addProject(formData));
    toast.success('Project added successfully!', { position: 'top-center', theme: 'colored' });

    setFormData({
      clientId: '',
      clientName: '',
      phone: '',
      email: '',
      companyName: '',
      projectName: '',
      quotationId: '',
      projectType: '',
      otherProjectType: '',
      projectDocumentation: null,
      server: 'NO',
      serverType: '',
      developmentCost: '',
      serverCost: '',
      otherAccessories: 'NO',
      otherAccessoriesCost: '',
    });
    setIsOtherProjectTypeVisible(false);
    setIsServerTypeVisible(false);
    setIsOtherAccessoriesCostVisible(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:text-white my-4 md:my-8 mx-3 md:mx-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client ID */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Project Name and Quotation ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="e.g., E-commerce Redesign"
              required
            />
          </div>
          <div>
            <label htmlFor="quotationId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Quotation ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="quotationId"
              name="quotationId"
              value={formData.quotationId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="e.g., QID-2024-001"
              required
            />
          </div>
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Type <span className="text-red-500">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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

          {isOtherProjectTypeVisible && (
            <input
              type="text"
              name="otherProjectType"
              value={formData.otherProjectType}
              onChange={handleChange}
              className="mt-3 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Specify other project type"
              required // Make this required when visible
            />
          )}
        </div>

        {/* Project Documentation (File Upload) */}
        <div>
          <label htmlFor="projectDocumentation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Documentation (Optional)
          </label>
          <input
            type="file"
            id="projectDocumentation"
            name="projectDocumentation"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all duration-200"
          />
          {formData.projectDocumentation && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Selected file: {formData.projectDocumentation.name}
            </p>
          )}
        </div>

        {/* Server Required? and Server Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Server Required?
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="server"
                  checked={formData.server === 'YES'}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="server"
                  checked={formData.server === 'NO'}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
              </label>
            </div>
          </div>
          {isServerTypeVisible && (
            <div>
              <label htmlFor="serverType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Server Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="serverType"
                name="serverType"
                value={formData.serverType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="e.g., AWS EC2, DigitalOcean, Shared Hosting"
                required
              />
            </div>
          )}
        </div>

        {/* Development Cost and Server Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="developmentCost" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Development Cost
            </label>
            <input
              type="number"
              id="developmentCost"
              name="developmentCost"
              value={formData.developmentCost}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="e.g., 50000"
              min="0"
            />
          </div>
          <div>
            <label htmlFor="serverCost" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Server Cost
            </label>
            <input
              type="number"
              id="serverCost"
              name="serverCost"
              value={formData.serverCost}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="e.g., 12000"
              min="0"
            />
          </div>
        </div>

        {/* Other Accessories Required? and Other Accessories Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Other Accessories Required?
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="otherAccessories"
                  checked={formData.otherAccessories === 'YES'}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="otherAccessories"
                  checked={formData.otherAccessories === 'NO'}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
              </label>
            </div>
          </div>
          {isOtherAccessoriesCostVisible && (
            <div>
              <label htmlFor="otherAccessoriesCost" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Other Accessories Cost <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="otherAccessoriesCost"
                name="otherAccessoriesCost"
                value={formData.otherAccessoriesCost}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Cost for other accessories (e.g., SSL certificate, domain)"
                required
                min="0"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-md shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;