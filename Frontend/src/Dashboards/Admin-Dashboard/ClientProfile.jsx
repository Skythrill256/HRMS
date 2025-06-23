import React from 'react';

const ClientProfile = ({ clientData, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl mt-10">
      {/* Header with Back Button and Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <button
          onClick={onBack}
          className="bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
        >
          &larr; Back to Clients
        </button>
        <h2 className="text-3xl font-bold text-[#FF4500] dark:text-white">Client Profile</h2>
      </div>

      {/* Profile Image and Name */}
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src={clientData.logoUrl}
          alt={clientData.companyName || clientData.clientName}
          className="w-32 h-32 rounded-full border-4 border-blue-400 mb-4 object-cover shadow-lg"
        />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {clientData.companyName || clientData.clientName}
        </h3>
        <p className="text-md text-gray-600 dark:text-gray-400">Client ID: {clientData.id}</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 dark:text-gray-200">
        <InfoCard title="Client Name" value={clientData.clientName} />
        <InfoCard title="Company Name" value={clientData.companyName} />
        <InfoCard title="Customer Type" value={clientData.customerType} />
        <InfoCard title="Email" value={clientData.email} />
        <InfoCard title="Phone" value={`${clientData.phoneCountryCode || ''} ${clientData.phoneNumber || ''}`} />

        <div className="col-span-1 md:col-span-2">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-2">Address Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard title="Country" value={clientData.address?.country} />
            <InfoCard title="State" value={clientData.address?.state} />
            <InfoCard title="City" value={clientData.address?.city} />
            <InfoCard title="Address Line 1" value={clientData.address?.addressLine1} />
            <InfoCard title="Address Line 2" value={clientData.address?.addressLine2} />
            <InfoCard title="Pin Code" value={clientData.address?.pinCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, span }) => (
  <div
    className={`bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-md ${
      span ? 'col-span-1 md:col-span-2' : ''
    }`}
  >
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
    <p className="text-lg font-semibold text-gray-900 dark:text-white">{value || 'N/A'}</p>
  </div>
);

export default ClientProfile;