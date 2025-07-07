// WorkOrderProfile.jsx
import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js'; // Make sure you have this installed

const WorkOrderProfile = ({ orders, onEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const printRef = useRef(null);
    const today = new Date().toLocaleDateString('en-CA');

    const order = orders.find(o => o.id === id);

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Work Order Not Found</h2>
                    <button
                        onClick={() => navigate('/admin-dashboard/WorkOrder')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        Back to List
                    </button>
                </div>
            </div>
        );
    }

    const handleDownloadPDF = () => {
        const element = printRef.current;
        const opt = {
            margin: [20, 10, 20, 10], // top, left, bottom, right in pt
            filename: `WorkOrder_${order.id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 3,
                useCORS: true,
                logging: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: 1200,
            },
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        };
        html2pdf().set(opt).from(element).save();
    };

    const renderContentAsList = (content) => {
        if (!content) return null;
        return (
            <ul className="list-decimal list-inside pl-4 mb-2">
                {content.split('\n').map((item, index) =>
                    item.trim() ? <li key={index}>{item.trim()}</li> : null
                )}
            </ul>
        );
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Work Order Details: {order.id}</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => onEdit(order.id)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 transition duration-200"
                        >
                            Edit Work Order
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200"
                        >
                            Download PDF
                        </button>
                        <button
                            onClick={() => navigate('/admin-dashboard/WorkOrder')}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 transition duration-200"
                        >
                            Back to List
                        </button>
                    </div>
                </div>

                {/* Printable content */}
                <div ref={printRef} className="text-black print-area">
                    {/* ----------- Page 1 ----------- */}
                    <div
                        className="border border-gray-300 p-8 bg-white text-sm w-[794px] mx-auto mb-8 shadow-lg"
                        style={{ pageBreakAfter: 'always' }}
                    >
                        {/* Replace with your actual header image */}
                        {/* <img src="/WorkOrder_Header.png" alt="Header" className="w-full mb-6" /> */}
                        <div className="text-right font-semibold mb-6 text-gray-700">Date: {order.dateCreated || today}</div>

                        <div className="grid grid-cols-2 gap-4 text-gray-800">
                            <p><strong>PROJECT ID:</strong> {order.projectId}</p>
                            <p><strong>CLIENT ID:</strong> {order.clientId}</p>
                            <p><strong>CLIENT NAME:</strong> {order.clientName}</p>
                            <p><strong>QUOTATION ID:</strong> {order.quotationId}</p>
                            <p className="col-span-2"><strong>PROJECT NAME:</strong> {order.projectName}</p>
                            <p className="col-span-2"><strong>PROJECT CATEGORY:</strong> {order.projectCategory}</p>
                            <p className="col-span-2">
                                <strong>PROJECT DETAILS:</strong> <br />
                                <span className="block mt-1 p-2 border border-gray-200 rounded min-h-[60px]">
                                    {order.projectDetails}
                                </span>
                            </p>
                            <p><strong>WARRANTY:</strong> {order.warranty}</p>
                            <p><strong>DURATION (Warranty):</strong> {order.warrantyDuration}</p>
                            <p><strong>FREE MAINTENANCE:</strong> {order.freeMaintenance}</p>
                            <p><strong>DURATION (Maintenance):</strong> {order.maintenanceDuration}</p>
                            <p><strong>DEVELOPMENT COST:</strong> {order.developmentCost}</p>
                            <p><strong>SERVER & DOMAIN:</strong> {order.serverDomain}</p>
                            <p><strong>OTHERS:</strong> {order.others}</p>
                            <p><strong>TOTAL:</strong> {order.total}</p>
                            <p><strong>START DATE:</strong> {order.startDate}</p>
                            <p><strong>END DATE:</strong> {order.endDate}</p>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-semibold text-gray-700 mb-2">PAYMENT TERMS:</h3>
                            <div className="border border-gray-200 p-3 rounded">
                                {renderContentAsList(order.paymentTerms)}
                            </div>
                        </div>

                        {/* Replace with your actual footer image */}
                        {/* <img src="/WorkOrder_Footer.png" alt="Footer" className="w-full mt-8" /> */}
                    </div>

                    {/* ----------- Page 2 ----------- */}
                    <div className="border border-gray-300 p-8 bg-white text-sm w-[794px] mx-auto shadow-lg">
                        {/* Replace with your actual header image */}
                        {/* <img src="/WorkOrder_Header.png" alt="Header" className="w-full mb-6" /> */}
                        <div className="text-right font-semibold mb-6 text-gray-700">Date: {order.dateCreated || today}</div>

                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-700 mb-2">SCOPE OF WORK:</h3>
                            <div className="border border-gray-200 p-3 rounded">
                                {renderContentAsList(order.scopeOfWork)}
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-700 mb-2">MATERIALS WE PURCHASE:</h3>
                            <div className="border border-gray-200 p-3 rounded">
                                {renderContentAsList(order.materialsPurchased)}
                            </div>
                        </div>

                        <h3 className="font-semibold underline mt-6 text-gray-700 mb-2">TERM AND CONDITION:</h3>
                        <div className="mt-2 min-h-[100px] pl-2 border border-gray-200 p-3 rounded text-gray-800">
                            {order.termsAndConditions}
                        </div>

                        <div className="grid grid-cols-2 mt-20 gap-8 text-gray-700">
                            <div className="text-center">
                                <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
                                <p>AUTHORIZED PERSON</p>
                            </div>
                            <div className="text-center">
                                <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
                                <p>AUTHORIZED PERSON</p>
                            </div>
                            <div className="text-center mt-10">
                                <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
                                <p>CLIENT SIGNATURE</p>
                            </div>
                            <div className="text-center mt-10">
                                <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
                                <p>COMPANY SIGNATURE</p>
                            </div>
                        </div>

                        {/* Replace with your actual footer image */}
                        {/* <img src="/WorkOrder_Footer.png" alt="Footer" className="w-full mt-10" /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkOrderProfile;