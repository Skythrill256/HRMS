import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectAllClients } from '../redux/slices/clientSlice';

const Order = () => {
  const clients = useSelector(selectAllClients);
  const [reasonInputs, setReasonInputs] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState(new Set());
  const [statuses, setStatuses] = useState({});

  // Flatten client orders
  const orders = clients.flatMap(client =>
    client.orders.map(order => ({
      id: order.orderId,
      dateTime: order.date,
      clientName: client.clientName,
      clientId: client.id
    }))
  );

  const toggleDropdown = (orderId) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      newSet.has(orderId) ? newSet.delete(orderId) : newSet.add(orderId);
      return newSet;
    });
    if (reasonInputs[orderId]) handleCancelReasonBox(orderId);
  };

  const handleShowReasonBox = (orderId, type) => {
    setReasonInputs(prev => ({ ...prev, [orderId]: { type, value: '' } }));
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      newSet.delete(orderId);
      return newSet;
    });
  };

  const handleReasonChange = (orderId, value) => {
    setReasonInputs(prev => ({
      ...prev,
      [orderId]: { ...prev[orderId], value }
    }));
  };

  const handleSubmitReason = (orderId) => {
    const { value, type } = reasonInputs[orderId];
    if (value.trim() === '') {
      toast.error('Reason cannot be empty.');
      return;
    }

    if (type === 'cancel') {
      toast.error(`Cancelled Order ${orderId}`);
      setStatuses(prev => ({ ...prev, [orderId]: 'Cancelled' }));
    } else if (type === 'hold') {
      toast.warn(`Hold Order ${orderId}`);
      setStatuses(prev => ({ ...prev, [orderId]: 'On Hold' }));
    }

    setReasonInputs(prev => {
      const updated = { ...prev };
      delete updated[orderId];
      return updated;
    });
  };

  const handleCancelReasonBox = (orderId) => {
    setReasonInputs(prev => {
      const updated = { ...prev };
      delete updated[orderId];
      return updated;
    });
  };

  const handleSuccess = (orderId) => {
    toast.success(`Sent Order ${orderId} to Production`);
    setStatuses(prev => ({ ...prev, [orderId]: 'Production' }));
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      newSet.delete(orderId);
      return newSet;
    });
  };

  const handleComplete = (orderId) => {
    toast.success(`Order ${orderId} marked as Complete`);
    setStatuses(prev => ({ ...prev, [orderId]: 'Complete' }));
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      newSet.delete(orderId);
      return newSet;
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Complete':
        return <span className="badge bg-green-100 text-green-800">✅ Complete</span>;
      case 'On Hold':
        return <span className="badge bg-yellow-100 text-yellow-800">⏸️ On Hold</span>;
      case 'Cancelled':
        return <span className="badge bg-red-100 text-red-800">❌ Cancelled</span>;
      case 'Production':
        return <span className="badge bg-blue-100 text-blue-800">⚙️ Production</span>;
      default:
        return <span className="badge bg-gray-100 text-gray-800">⏳ Pending</span>;
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-gray-800 dark:text-white">Order Management Dashboard</h1>

      <div className="overflow-x-auto  h-full rounded-lg border border-gray-300 dark:border-gray-700">
        <table className=" w-full divide-y divide-gray-300 dark:divide-gray-700 text-sm ">
          <thead className="bg-gray-200 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              {['SL NO', 'DATE & TIME', 'CLIENT NAME', 'CLIENT ID', 'ORDER ID', 'ACTION', 'STATUS'].map(header => (
                <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order, index) => {
              const isLastRow = index >= orders.length - 2;
              return (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{order.dateTime}</td>
                  <td className="px-4 py-3">{order.clientName}</td>
                  <td className="px-4 py-3">{order.clientId}</td>
                  <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400 font-semibold">{order.id}</td>
                  <td className="px-4 py-3 text-right relative">
                    <button
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                      onClick={() => toggleDropdown(order.id)}
                    >
                      Actions <span className="ml-1">▾</span>
                    </button>

                    {openDropdowns.has(order.id) && (
                      <div
                        className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-700 dark:ring-gray-600
      ${isLastRow ? 'bottom-full mb-2 right-0' : 'top-full right-0'}`}
                      >
                        <div className="py-1">
                          <button
                            onClick={() => handleSuccess(order.id)}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 text-left"
                          >
                            Send to Production
                          </button>
                          <button
                            onClick={() => handleComplete(order.id)}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 text-left"
                          >
                            Mark as Complete
                          </button>
                          <button
                            onClick={() => handleShowReasonBox(order.id, 'cancel')}
                            className="block w-full px-4 py-2 text-sm text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-600 text-left"
                          >
                            Cancel with Reason
                          </button>
                          <button
                            onClick={() => handleShowReasonBox(order.id, 'hold')}
                            className="block w-full px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-100 dark:text-yellow-300 dark:hover:bg-yellow-600 text-left"
                          >
                            Hold with Reason
                          </button>
                          <button
                            onClick={() => handleSuccess(order.id)}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 text-left"
                          >
                            Pending
                          </button>
                        </div>
                      </div>
                    )}


                    {reasonInputs[order.id] && (
                      <div className="absolute z-50 mt-3 w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl left-1/2 -translate-x-1/2">
                        <p className="text-sm font-medium text-gray-700 dark:text-white mb-2">
                          Enter {reasonInputs[order.id].type} reason:
                        </p>
                        <input
                          type="text"
                          placeholder="Reason..."
                          className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white"
                          value={reasonInputs[order.id].value}
                          onChange={(e) => handleReasonChange(order.id, e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-3">
                          <button onClick={() => handleCancelReasonBox(order.id)} className="btn-cancel bg-red-500 rounded-md border ">Cancel</button>
                          <button onClick={() => handleSubmitReason(order.id)} className="btn-submit bg-green-500 rounded-md border ">Submit</button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(statuses[order.id])}</td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
