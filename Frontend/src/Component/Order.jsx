import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectAllClients } from '../redux/slices/clientSlice';
import { selectAllProjects, updateProject } from '../redux/slices/projectSlice';
import { FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa';

const Order = () => {
  const dispatch = useDispatch();
  const clients = useSelector(selectAllClients);
  const projects = useSelector(selectAllProjects);

  const [openDropdowns, setOpenDropdowns] = useState(new Set());
  const [reasonInputs, setReasonInputs] = useState({});
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showReasonPopover, setShowReasonPopover] = useState({ visible: false, content: '', position: { top: 0, left: 0 } });

  const orders = clients.flatMap(client =>
    client.orders.map(order => {
      const matchingProject = projects.find(p => p.orderId === order.orderId);
      return {
        ...order,
        clientName: client.clientName,
        clientId: client.id,
        status: matchingProject?.status || 'Pending',
        projectId: matchingProject?.id,
        reason: matchingProject?.reason || null
      };
    })
  );

  const sortedOrders = [...orders].sort((a, b) => {
    const orderIdA = parseInt(a.orderId.replace('ORD', ''), 10);
    const orderIdB = parseInt(b.orderId.replace('ORD', ''), 10);
    return sortOrder === 'asc' ? orderIdA - orderIdB : orderIdB - orderIdA;
  });

  const filteredOrders = sortedOrders.filter(order =>
    order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleCancelReasonBox = (orderId) => {
    setReasonInputs(prev => {
      const updated = { ...prev };
      delete updated[orderId];
      return updated;
    });
  };

  const handleSubmitReason = (orderId, projectId) => {
    const { value, type } = reasonInputs[orderId];
    if (value.trim() === '') {
      toast.error('Reason cannot be empty.');
      return;
    }
    const status = type === 'cancel' ? 'Cancelled' : 'On Hold';
    toast[type === 'cancel' ? 'error' : 'warn'](`${status} Order ${orderId}`);
    dispatch(updateProject({ id: projectId, updates: { status, reason: value.trim() } }));
    handleCancelReasonBox(orderId);
  };

  const handleSendToProduction = (orderId, projectId) => {
    toast.success(`Sent Order ${orderId} to Production`);
    dispatch(updateProject({ id: projectId, updates: { status: 'Production', reason: null } }));
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      newSet.delete(orderId);
      return newSet;
    });
  };

  const handleMarkAsPending = (orderId, projectId) => {
    toast.info(`Order ${orderId} marked as Pending`);
    dispatch(updateProject({ id: projectId, updates: { status: 'Pending', reason: null } }));
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      newSet.delete(orderId);
      return newSet;
    });
  };

  const handleShowFullReason = (e, reason) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setShowReasonPopover({
      visible: true,
      content: reason,
      position: {
        top: rect.top + window.scrollY + rect.height + 5,
        left: rect.left + window.scrollX
      }
    });
  };

  const handleHideFullReason = () => {
    setShowReasonPopover({ visible: false, content: '', position: { top: 0, left: 0 } });
  };


  const getStatusBadge = (status, reason) => {
    let badge;
    switch (status) {
      case 'Complete':
        badge = <span className="badge bg-green-100 text-green-800">✅ Complete</span>;
        break;
      case 'On Hold':
        badge = <span className="badge bg-yellow-100 text-yellow-800">⏸️ On Hold</span>;
        break;
      case 'Cancelled':
        badge = <span className="badge bg-red-100 text-red-800">❌ Cancelled</span>;
        break;
      case 'Production':
        badge = <span className="badge bg-blue-100 text-blue-800">⚙️ Production</span>;
        break;
      default:
        badge = <span className="badge bg-gray-100 text-gray-800">⏳ Pending</span>;
    }

    const truncatedReason = reason && reason.length > 6 ? `${reason.substring(0, 6)}...` : reason;

    return (
      <div className="flex flex-col items-start">
        {badge}
        {(status === 'On Hold' || status === 'Cancelled') && reason && (
          <span
            className="text-xs text-gray-500 dark:text-gray-400 mt-1 cursor-pointer hover:underline"
            onClick={(e) => handleShowFullReason(e, reason)}
          >
            Reason: <span className="font-medium italic">{truncatedReason}</span>
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
          Manage & Control Your Orders
        </h1>
        <input
          type="text"
          placeholder="Search by Client/Project Name..."
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-white focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto h-full rounded-lg border border-gray-300 dark:border-gray-700">
        <table className="w-full divide-y divide-gray-300 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-200 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              {/* Added text-left to all th for consistent alignment */}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">
                <div
                  className="flex items-center gap-1 cursor-pointer w-fit"
                  onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                >
                  SL NO
                  <span className={sortOrder === 'desc' ? 'text-red-500' : ''}>
                    {sortOrder === 'asc' ? <FaSortAmountDownAlt /> : <FaSortAmountUp />}
                  </span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">PROJECT NAME</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">CLIENT NAME</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">CLIENT ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">ORDER ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">ACTION</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">STATUS</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredOrders.map((order, index) => {
              const slNo = sortOrder === 'asc' ? index + 1 : filteredOrders.length - index;
              return (
                <tr key={order.orderId} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  {/* Added text-left to all td for consistent alignment */}
                  <td className="px-4 py-3 text-left">{slNo}</td>
                  <td className="px-4 py-3 text-left">{order.projectName}</td>
                  <td className="px-4 py-3 text-left">{order.clientName}</td>
                  <td className="px-4 py-3 text-left">{order.clientId}</td>
                  <td className="px-4 py-3 text-left text-indigo-600 dark:text-indigo-400 font-semibold">{order.orderId}</td>
                  <td className="px-4 py-3 text-left relative">
                    <button
                      onClick={() => {
                        const newSet = new Set(openDropdowns);
                        newSet.has(order.orderId) ? newSet.delete(order.orderId) : newSet.add(order.orderId);
                        setOpenDropdowns(newSet);
                      }}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
                    >
                      Actions ▾
                    </button>
                    {openDropdowns.has(order.orderId) && (
                      <div className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-md mt-2 z-10 w-48">
                        <button onClick={() => handleSendToProduction(order.orderId, order.projectId)} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Send to Production</button>
                        <button onClick={() => handleShowReasonBox(order.orderId, 'cancel')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel with Reason</button>
                        <button onClick={() => handleShowReasonBox(order.orderId, 'hold')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Hold with Reason</button>
                        <button onClick={() => handleMarkAsPending(order.orderId, order.projectId)} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Mark as Pending</button>
                      </div>
                    )}
                    {reasonInputs[order.orderId] && (
                      <div className="absolute bg-white dark:bg-gray-700 p-3 rounded-md shadow-xl mt-2 z-20 w-64">
                        <p className="text-sm mb-2">Enter reason:</p>
                        <input
                          type="text"
                          className="w-full border border-gray-300 dark:border-gray-600 px-2 py-1 rounded"
                          value={reasonInputs[order.orderId].value}
                          onChange={(e) => handleReasonChange(order.orderId, e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button onClick={() => handleCancelReasonBox(order.orderId)} className="text-red-600 text-sm">Cancel</button>
                          <button onClick={() => handleSubmitReason(order.orderId, order.projectId)} className="text-green-600 text-sm">Submit</button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-left">{getStatusBadge(order.status, order.reason)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Reason Popover Component */}
      {showReasonPopover.visible && (
        <div
          className="fixed bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 p-3 rounded-md shadow-lg z-50 text-sm max-w-xs break-words"
          style={{ top: showReasonPopover.position.top, left: showReasonPopover.position.left }}
          onClick={handleHideFullReason}
        >
          <p className="font-bold mb-1">Full Reason:</p>
          {showReasonPopover.content}
        </div>
      )}
    </div>
  );
};

export default Order;