import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkOrderForm = ({ onSave, initialData }) => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-CA'); // 'en-CA' for YYYY-MM-DD format for date input

  const [formData, setFormData] = useState(
    initialData || {
      projectId: '',
      clientId: '',
      clientName: '',
      quotationId: '',
      projectName: '',
      projectCategory: '',
      projectDetails: '',
      warranty: '',
      warrantyDuration: '', // Added based on the parent component's structure
      freeMaintenance: '',
      maintenanceDuration: '', // Added based on the parent component's structure
      developmentCost: '',
      serverDomain: '',
      others: '',
      total: '',
      startDate: '',
      endDate: '',
      paymentTerms: `5,000 ADVANCE.\n5,000 IN MIDDLE\n7,000 FINAL PAYMENT`,
      scopeOfWork: `DEMO\nDEMO\nDEMO\nDEMO`,
      materialsPurchased: `SMS GATEWAY\nSERVER\nLOGO\nTHEME\nPLAYSTORE`,
      termsAndConditions: `WE WILL ADD TERM AND CONDITION FROM ADMIN FETCH IN THIS PART.`,
    }
  );

  // Update form data if initialData prop changes (for editing existing orders)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a simple ID for new orders (for demonstration)
    const newId = formData.id || `WO-${Math.floor(Math.random() * 10000) + 1}`;
    const dateCreated = formData.dateCreated || new Date().toISOString().split('T')[0]; // Current date for new orders

    const savedData = {
      ...formData,
      id: newId,
      dateCreated: dateCreated,
      status: formData.status || 'Pending', // Default status for new orders
      priority: formData.priority || 'Medium', // Default priority for new orders
    };

    onSave(savedData); // Call the onSave function passed from the parent
    alert('Work order saved!');
    navigate('/admin-dashboard/WorkOrder'); // Navigate back to the list
  };

  const renderListContent = (content, fieldName) => {
    return (
      <textarea
        name={fieldName}
        value={content}
        onChange={handleChange}
        rows="3"
        className="w-full mt-2 input-field border border-gray-300 rounded p-2"
      ></textarea>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        {initialData ? 'Edit Work Order' : 'Create New Work Order'}
      </h2>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl space-y-6">

        {/* Header and Date (Visual only, consider adding image if available) */}
        <div className="flex justify-end mb-4">
          <p className="text-sm font-semibold text-gray-600">Date: {today}</p>
        </div>

        {/* Project Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <label className="block">
            <strong className="text-gray-700">PROJECT ID:</strong>{' '}
            <input
              type="text"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              className="input-field w-full mt-1"
              required
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">CLIENT ID:</strong>{' '}
            <input
              type="text"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              className="input-field w-full mt-1"
              required
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">CLIENT NAME:</strong>{' '}
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="input-field w-full mt-1"
              required
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">QUOTATION ID:</strong>{' '}
            <input
              type="text"
              name="quotationId"
              value={formData.quotationId}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
          <label className="block md:col-span-2">
            <strong className="text-gray-700">PROJECT NAME:</strong>{' '}
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="input-field w-full mt-1"
              required
            />
          </label>
          <label className="block md:col-span-2">
            <strong className="text-gray-700">PROJECT CATEGORY:</strong>{' '}
            <input
              type="text"
              name="projectCategory"
              value={formData.projectCategory}
              onChange={handleChange}
              className="input-field w-full mt-1"
              required
            />
          </label>
          <label className="block md:col-span-2">
            <strong className="text-gray-700">PROJECT DETAILS:</strong>
            <textarea
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              rows="4"
              className="input-field w-full mt-1 border border-gray-300 rounded p-2"
              required
            ></textarea>
          </label>
        </div>

        {/* Cost and Date Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <label className="block">
            <strong className="text-gray-700">WARRANTY:</strong>{' '}
            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">DURATION (Warranty):</strong>{' '}
            <input
              type="text"
              name="warrantyDuration"
              value={formData.warrantyDuration}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">FREE MAINTENANCE:</strong>{' '}
            <input
              type="text"
              name="freeMaintenance"
              value={formData.freeMaintenance}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">DURATION (Maintenance):</strong>{' '}
            <input
              type="text"
              name="maintenanceDuration"
              value={formData.maintenanceDuration}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">DEVELOPMENT COST:</strong>{' '}
            <input
              type="text"
              name="developmentCost"
              value={formData.developmentCost}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">SERVER & DOMAIN:</strong>{' '}
            <input
              type="text"
              name="serverDomain"
              value={formData.serverDomain}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">OTHERS:</strong>{' '}
            <input
              type="text"
              name="others"
              value={formData.others}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">TOTAL:</strong>{' '}
            <input
              type="text"
              name="total"
              value={formData.total}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">START DATE:</strong>{' '}
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
          <label className="block">
            <strong className="text-gray-700">END DATE:</strong>{' '}
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="input-field w-full mt-1"
            />
          </label>
        </div>

        {/* Dynamic Lists */}
        <div>
          <h3 className="font-semibold text-sm text-gray-700 mb-2">PAYMENT TERMS:</h3>
          {renderListContent(formData.paymentTerms, "paymentTerms")}
        </div>

        <div>
          <h3 className="font-semibold text-sm text-gray-700 mb-2">SCOPE OF WORK:</h3>
          {renderListContent(formData.scopeOfWork, "scopeOfWork")}
        </div>

        <div>
          <h3 className="font-semibold text-sm text-gray-700 mb-2">MATERIALS WE PURCHASE:</h3>
          {renderListContent(formData.materialsPurchased, "materialsPurchased")}
        </div>

        {/* Terms and Conditions */}
        <div>
          <h3 className="font-semibold underline mt-4 text-sm text-gray-700 mb-2">TERM AND CONDITION:</h3>
          <textarea
            name="termsAndConditions"
            value={formData.termsAndConditions}
            onChange={handleChange}
            rows="5"
            className="w-full h-full input-field border border-gray-300 rounded p-2"
          ></textarea>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-12 gap-8 text-sm text-gray-700">
          <div className="text-center">
            <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
            <p>AUTHORIZED PERSON</p>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
            <p>AUTHORIZED PERSON</p>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
            <p>CLIENT SIGNATURE</p>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
            <p>COMPANY SIGNATURE</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin-dashboard/WorkOrder')}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-700 transition duration-200"
          >
            Save Work Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkOrderForm;