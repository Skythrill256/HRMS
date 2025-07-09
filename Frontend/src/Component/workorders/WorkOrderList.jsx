import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WorkOrderForm from './workOrderForm';
import WorkOrderProfile from './WorkOrderProfile';

export default function WorkOrderList() {
  const reduxOrders = useSelector((state) => state.workOrders.workOrders || []); 
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    setOrders(reduxOrders);
  }, [reduxOrders]);

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
      const existingIndex = prevOrders.findIndex(order => order.id === newOrder.id);
      if (existingIndex > -1) {
        const updated = [...prevOrders];
        updated[existingIndex] = newOrder;
        return updated;
      } else {
        return [newOrder,...prevOrders];
      }
    });
  };

  const handleEditWorkOrder = (id) => {
    navigate(`/admin-dashboard/WorkOrder/${id}/edit`);
  };

  const params = useParams(); // useParams inside component
  const selectedOrder = orders.find(o => o.id === params.id);

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
                    <p className="text-sm text-gray-600 mb-1"><strong className="text-gray-700">Order ID:</strong> {order.id}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong className="text-gray-700">Client:</strong> {order.clientName}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong className="text-gray-700">Created:</strong> {order.dateCreated}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong className="text-gray-700">Due:</strong> {order.dueDate}</p>
                    <p className={`text-sm ${priorityColor(order.priority)}`}><strong className="text-gray-700">Priority:</strong> {order.priority}</p>
                    <div className="mt-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
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
      <Route path=":id" element={<WorkOrderProfile orders={orders} onEdit={handleEditWorkOrder} />} />
      <Route path=":id/edit" element={<WorkOrderForm onSave={addOrUpdateWorkOrder} initialData={selectedOrder} />} />
    </Routes>
  );
}
