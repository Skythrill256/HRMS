import {Link} from 'react-router-dom';
import { FaPhoneVolume, FaIndianRupeeSign } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

const ClientProfile = ({ clientData, onBack }) => {
  const {
    id,
    clientName,
    companyName,
    customerType,
    logoUrl,
    email,
    phone,
    altPhone,
    contactPersons = [],
    address = {},
    shippingAddress = {},
    billing = {},
    orders = [],
    transactions = []
  } = clientData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 rounded-3xl">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden mt-8">

        {/* Header Section */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-blue-400 to-indigo-600 dark:from-blue-700 dark:to-indigo-900 text-white flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center rounded-t-3xl">
          <button
            onClick={onBack}
            className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-base font-medium transition duration-300 ease-in-out flex items-center gap-2"
          >
            <IoMdArrowRoundBack className='text-xl md:text-2xl' />
            Back to Clients
          </button>
          <h2 className="text-3xl font-extrabold tracking-tight">Client Profile</h2>
        </div>

        {/* Client Details Section */}
        <div className="p-4 sm:p-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Client Details</h3>
            <div className="flex flex-wrap justify-end gap-2 sm:flex-nowrap">
              <Link to='/admin-dashboard/projects/addproject'><button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600">Add Project</button></Link>
              <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600">Invoice</button>
              <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600">Quotation</button>
            </div>
          </div>

          {/* Profile Overview */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
            <img
              src={logoUrl}
              alt={companyName || clientName}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-blue-400 object-cover shadow-md flex-shrink-0"
            />
            <div className="text-center md:text-left flex-grow">
              <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                {companyName || clientName}
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-400">Client ID: <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">{id}</span></p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <InfoPill title="Client Name" value={clientName} />
                <InfoPill title="Customer Type" value={customerType} />
                <InfoPill title="Email" value={email} icon="📧" />
                <InfoPill title="Primary Phone" value={phone} icon="📞" />
                {altPhone && <InfoPill title="Alternate Phone" value={altPhone} icon="📞" />}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Main Address</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailCard title="Country" value={address.country} />
                <DetailCard title="State" value={address.state} />
                <DetailCard title="City" value={address.city} />
                <DetailCard title="Zip Code" value={address.zip} />
                <DetailCard title="Full Address" value={address.fullAddress} span={true} />
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailCard title="Headline" value={shippingAddress.headline} />
                <DetailCard title="Country" value={shippingAddress.country} />
                <DetailCard title="State" value={shippingAddress.state} />
                <DetailCard title="City" value={shippingAddress.city} />
                <DetailCard title="Zip Code" value={shippingAddress.zip} span={true} />
              </div>
            </div>
          </div>

          {/* Contact Persons */}
          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Persons</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {contactPersons.length > 0 ? (
                contactPersons.map((person, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                    <p className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-1">{person.name || 'N/A'}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
                      <FaPhoneVolume />
                      {person.phone || 'N/A'}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 col-span-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">No contact persons specified.</p>
              )}
            </div>
          </div>
        </div>

        {/* Financial Overview Section */}
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial Overview</h3>

          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-xl shadow-inner border border-blue-100 dark:border-blue-800">
            <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Billing Summary</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <BillingMetric title="Total Billed" amount={billing.totalBilled} />
              <BillingMetric title="Total Received" amount={billing.totalReceived} />
              <BillingMetric title="Total Due" amount={billing.totalDue} isDue={true} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Orders */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h4>
              {orders.length > 0 ? (
                <div className="overflow-x-auto scrollbar-thin max-w-full">
                  <table className="min-w-full w-full max-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {orders.map((order) => (
                        <tr key={order.orderId} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150 ease-in-out">
                          <td className="px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">{order.orderId}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.date}</td>
                          <td className="px-6 py-4 text-sm text-right font-semibold text-green-700 dark:text-green-400">${order.amount?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">No recent orders found.</p>
              )}
            </div>

            {/* Transactions */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h4>
              {transactions.length > 0 ? (
                <div className="overflow-x-auto scrollbar-thin max-w-full">
                  <table className="min-w-full w-full max-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {transactions.map((txn) => (
                        <tr key={txn.txnId} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150 ease-in-out">
                          <td className="px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">{txn.txnId}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{txn.date}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${txn.type === 'Credit' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                              {txn.type}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-sm text-right font-semibold ${txn.type === 'Credit' ? 'text-green-800 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                            ${txn.amount?.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">No recent transactions found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ title, value, span }) => (
  <div className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${span ? 'sm:col-span-2' : ''}`}>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
    <p className="text-lg font-semibold text-gray-900 dark:text-white">{value || 'N/A'}</p>
  </div>
);

const InfoPill = ({ title, value, icon }) => (
  <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 shadow-sm border border-blue-100 dark:border-blue-800 break-words max-w-full">
    {icon && <span className="text-base flex-shrink-0">{icon}</span>}
    <span className="font-semibold">{title}:</span> <span className="break-words min-w-0">{value || 'N/A'}</span>
  </div>
);

const BillingMetric = ({ title, amount, isDue = false }) => (
  <div className={`p-5 rounded-lg shadow-md transition-transform hover:scale-105 duration-200 border ${isDue ? 'bg-red-50 dark:bg-red-900 border-red-100 dark:border-red-800' : 'bg-green-50 dark:bg-green-900 border-green-100 dark:border-green-800'}`}>
    <p className={`text-md font-medium ${isDue ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'} mb-1`}>{title}</p>
    <p className={`text-sm md:text-3xl font-extrabold ${isDue ? 'text-orange-700 dark:text-red-100' : 'text-green-900 dark:text-green-100'} flex justify-center items-center`}>
      <FaIndianRupeeSign /><span>{amount?.toLocaleString() || '0'}</span>
    </p>
  </div>
);

export default ClientProfile;