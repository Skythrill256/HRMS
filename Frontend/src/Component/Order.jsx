import { useState } from 'react';
import { toast } from 'react-toastify';
const orders = [
  {
    id: 'ORD001',
    dateTime: '2025-07-04 14:30',
    clientName: 'Mohan Mal',
  },
  {
    id: 'ORD002',
    dateTime: '2025-07-04 15:15',
    clientName: 'Amit Roy',
  },
  {
    id: 'ORD003',
    dateTime: '2025-07-04 14:30',
    clientName: 'Rohit Jain',
  },
  {
    id: 'ORD004',
    dateTime: '2025-07-04 15:15',
    clientName: 'Jenny Rk',
  }
];

const Order = () => {
  const [reasonInputs, setReasonInputs] = useState({});

  const handleShowReasonBox = (orderId, type) => {
    setReasonInputs((prev) => ({
      ...prev,
      [orderId]: { type, value: '' },
    }));
  };

  const handleReasonChange = (orderId, value) => {
    setReasonInputs((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], value },
    }));
  };
  const handleProduction = () => {
    toast.success(`Success Order ${orderId}`);
  }
  const handleSubmitReason = (orderId) => {
    const reason = reasonInputs[orderId]?.value;
    const actionType = reasonInputs[orderId]?.type;

    if (reason.trim() === '') {
      // alert('Please enter a reason.');
      return;
    }

    if (actionType === 'cancel') {
      toast.error(`Cancelled Order ${orderId}`);
    }
    if (actionType === 'hold') {
      toast.warn(`Hold Order ${orderId}`);
    }
    setReasonInputs((prev) => {
      const updated = { ...prev };
      delete updated[orderId];
      return updated;
    });
  };
  const handleSuccess = (orderId) => {
    toast.success(`Success Order ${orderId}`);
  }
  // toast.error(`${actionType === 'cancel' ? 'Cancelled' : 'Held'} Order ${orderId} with reason: ${reason}`);

  const handleCancelReasonBox = (orderId) => {
    setReasonInputs((prev) => {
      const updated = { ...prev };
      delete updated[orderId];
      return updated;
    });
  };

  return (
    <div className="p-6 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">ORDER SECTION</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 dark:border-gray-700 text-sm">
          <thead className="bg-nav text-primary">
            <tr>
              <th className="border px-4 py-2 dark:border-gray-700">SL NO</th>
              <th className="border px-4 py-2 dark:border-gray-700">DATE & TIME</th>
              <th className="border px-4 py-2 dark:border-gray-700">ORD ID</th>
              <th className="border px-4 py-2 dark:border-gray-700">CLIENT NAME</th>
              <th className="border px-4 py-2 dark:border-gray-700">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="text-center align-top dark:bg-gray-900">
                <td className="border px-4 py-2 dark:border-gray-700">{index + 1}</td>
                <td className="border px-4 py-2 dark:border-gray-700">{order.dateTime}</td>
                <td className="border px-4 py-2 dark:border-gray-700">{order.id}</td>
                <td className="border px-4 py-2 dark:border-gray-700">{order.clientName}</td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  <div className="flex justify-center gap-2 flex-wrap mb-2">
                    <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs" onClick={() => handleSuccess(order.id)}>
                      Send to Production
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                      onClick={() => handleShowReasonBox(order.id, 'cancel')}
                    >
                      Cancel with Reason
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs"
                      onClick={() => handleShowReasonBox(order.id, 'hold')}
                    >
                      Hold with Reason
                    </button>
                  </div>

                  {reasonInputs[order.id] && (
                    <div className="mt-2 space-y-2">
                      <input
                        type="text"
                        placeholder={`Enter ${reasonInputs[order.id].type} reason...`}
                        className="border rounded px-2 py-1 text-xs w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        value={reasonInputs[order.id].value}
                        onChange={(e) => handleReasonChange(order.id, e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          className="bg-gray-400 text-white px-2 py-1 rounded text-xs hover:bg-gray-500"
                          onClick={() => handleCancelReasonBox(order.id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                          onClick={() => handleSubmitReason(order.id)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
