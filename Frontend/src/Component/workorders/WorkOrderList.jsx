import React, { useState } from 'react';
import { useNavigate, Routes, Route,useParams } from 'react-router-dom';
import WorkOrderForm from './workOrderForm'; // Ensure this path is correct
import WorkOrderProfile from './WorkOrderProfile'; // Ensure this path is correct

const initialMockOrders = [
  {
    id: 'WO-001',
    projectId: 'PROJ-101',
    clientId: 'CLI-001',
    clientName: 'ABC Corp',
    quotationId: 'Q-2023-001',
    projectName: 'E-Commerce Website Development',
    projectCategory: 'Web Development',
    projectDetails: 'Full-stack e-commerce solution with payment gateway integration and admin panel.',
    warranty: '1 Year',
    warrantyDuration: '12 Months',
    freeMaintenance: '6 Months',
    maintenanceDuration: '6 Months',
    developmentCost: '₹50,000',
    serverDomain: 'Included',
    others: 'SEO Optimization',
    total: '₹50,000',
    startDate: '2023-10-26',
    endDate: '2023-12-26',
    paymentTerms: `5,000 ADVANCE.\n20,000 MILESTONE 1.\n15,000 MILESTONE 2.\n10,000 FINAL PAYMENT.`,
    scopeOfWork: `Phase 1: Requirements Gathering\nPhase 2: UI/UX Design\nPhase 3: Backend Development\nPhase 4: Frontend Development\nPhase 5: Testing & Deployment`,
    materialsPurchased: `Domain Name\nHosting Server\nSSL Certificate\nPremium Theme License`,
    termsAndConditions: `All content and assets must be provided by the client.\nPayment milestones must be met for project progression.\nAny changes outside the agreed scope will incur additional charges.\nFinal project delivery is subject to full payment.`,
    status: 'Pending',
    dateCreated: '2023-10-26',
    dueDate: '2023-12-26',
    priority: 'High',
  },
  {
    id: 'WO-002',
    projectId: 'PROJ-102',
    clientId: 'CLI-002',
    clientName: 'Jane Doe',
    quotationId: 'Q-2023-002',
    projectName: 'Personal Portfolio Website',
    projectCategory: 'Web Design',
    projectDetails: 'Creation of a responsive personal portfolio website to showcase graphic design work.',
    warranty: '6 Months',
    warrantyDuration: '6 Months',
    freeMaintenance: '3 Months',
    maintenanceDuration: '3 Months',
    developmentCost: '₹15,000',
    serverDomain: 'Client Provided',
    others: 'Basic SEO',
    total: '₹15,000',
    startDate: '2023-10-20',
    endDate: '2023-11-30',
    paymentTerms: `5,000 ADVANCE.\n10,000 FINAL PAYMENT.`,
    scopeOfWork: `Homepage design\nAbout Me section\nPortfolio showcase with 5 projects\nContact form integration`,
    materialsPurchased: `N/A`,
    termsAndConditions: `Client to provide all text content and images.\nRevisions limited to 2 rounds per section.\nProject completion within 4 weeks.`,
    status: 'In Progress',
    dateCreated: '2023-10-20',
    dueDate: '2023-11-30',
    priority: 'Medium',
  },
  {
    id: 'WO-003',
    projectId: 'PROJ-103',
    clientId: 'CLI-003',
    clientName: 'Tech Innovations Ltd.',
    quotationId: 'Q-2023-003',
    projectName: 'Mobile App UI/UX Redesign',
    projectCategory: 'UI/UX Design',
    projectDetails: 'Redesign of existing mobile application user interface for improved user experience.',
    warranty: '3 Months',
    warrantyDuration: '3 Months',
    freeMaintenance: '1 Month',
    maintenanceDuration: '1 Month',
    developmentCost: '₹35,000',
    serverDomain: 'N/A',
    others: 'User Testing',
    total: '₹35,000',
    startDate: '2023-11-01',
    endDate: '2023-12-15',
    paymentTerms: `10,000 ADVANCE.\n15,000 MID-PROJECT.\n10,000 FINAL PAYMENT.`,
    scopeOfWork: `User flow analysis\nWireframing (5 key screens)\nHigh-fidelity mockups (5 key screens)\nPrototype creation`,
    materialsPurchased: `Figma/Sketch License`,
    termsAndConditions: `Client feedback required within 48 hours for each phase.\nScope creep will result in re-negotiation of terms and cost.\nDesign assets will be delivered upon final payment.`,
    status: 'Completed',
    dateCreated: '2023-11-01',
    dueDate: '2023-12-15',
    priority: 'Low',
  },
];


export default function WorkOrderList() {
  const [orders, setOrders] = useState(initialMockOrders);
  const navigate = useNavigate();

  const statusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 font-bold';
      case 'Medium': return 'text-orange-500';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-500';
    }
  };


  const addOrUpdateWorkOrder = (newOrder) => {
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(order => order.id === newOrder.id);
      if (existingOrderIndex > -1) {
        // Update existing order
        const updatedOrders = [...prevOrders];
        updatedOrders[existingOrderIndex] = newOrder;
        return updatedOrders;
      } else {
        // Add new order
        return [...prevOrders, newOrder];
      }
    });
  };

  const handleEditWorkOrder = (id) => {
    navigate(`/admin-dashboard/WorkOrder/${id}/edit`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen p-6 bg-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">Work Orders Dashboard</h1>
              <button
                onClick={() => navigate('/admin-dashboard/WorkOrder/new')}
                className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Work Order
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {orders.length === 0 ? (
                <p className="text-gray-600 text-lg col-span-full text-center py-10">No work orders found. Click "Add New Work Order" to get started!</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => navigate(`/admin-dashboard/WorkOrder/${order.id}`)}
                    className="group cursor-pointer p-6 bg-white shadow-md rounded-xl hover:shadow-xl hover:ring-2 hover:ring-blue-500 transform hover:-translate-y-1 transition duration-200 ease-in-out border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-700">{order.projectName}</h2>
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${statusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong className="text-gray-700">Order ID:</strong> {order.id}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong className="text-gray-700">Client:</strong> {order.clientName}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong className="text-gray-700">Created:</strong> {order.dateCreated}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong className="text-gray-700">Due:</strong> {order.dueDate}
                    </p>
                    <p className={`text-sm ${priorityColor(order.priority)}`}>
                      <strong className="text-gray-700">Priority:</strong> {order.priority}
                    </p>
                    <div className="mt-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigating to profile when clicking edit
                          handleEditWorkOrder(order.id);
                        }}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium transition duration-200"
                      >
                        Edit Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        }
      />
      <Route path="new" element={<WorkOrderForm onSave={addOrUpdateWorkOrder} />} />
      <Route
        path=":id"
        element={<WorkOrderProfile orders={orders} onEdit={handleEditWorkOrder} />}
      />
      <Route
        path=":id/edit"
        element={<WorkOrderForm onSave={addOrUpdateWorkOrder} initialData={orders.find(o => o.id === useParams().id)} />}
      />
    </Routes>
  );
}