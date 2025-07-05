import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const WorkOrder = () => {
  const printRef = useRef(null);
  const today = new Date().toLocaleDateString();

  const handleDownloadPDF = () => {
    const element = printRef.current;
    const opt = {
      margin: [20, 10, 20, 10], // top, left, bottom, right
      filename: 'WorkOrder.pdf',
      image: { type: 'jpeg', quality: 1 },
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

  return (
    <>
      <div className="p-4">
        <div className="flex justify-end mb-4 gap-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Download PDF
          </button>
        </div>

        {/* Printable content */}
        <div ref={printRef} className="text-black print-area">

          {/* ----------- Page 1 ----------- */}
          <div
            className="border border-gray-300 p-8 bg-white text-sm w-[794px] mx-auto"
            style={{ pageBreakAfter: 'always' }}
          >
            <img src="/WorkOrder_Header.png" alt="Header" className="w-full mb-4" />
            <div className="text-right font-semibold mb-4">Date: {today}</div>

            <div className="grid grid-cols-2 gap-4">
              {[
                'PROJECT ID', 'CLIENT ID', 'CLIENT NAME', 'QUOTATION ID',
                'PROJECT NAME', 'PROJECT CATEGORY', 'PROJECT DETAILS',
                'WARRANTY', 'DURATION', 'FREE MAINTENANCE', 'DURATION',
                'DEVELOPMENT COST', 'SERVER & DOMAIN', 'OTHERS',
                'TOTAL', 'START DATE', 'END DATE'
              ].map((label, index) => {
                const isFull = ['PROJECT NAME', 'PROJECT CATEGORY', 'PROJECT DETAILS'].includes(label);
                const isTextArea = label === 'PROJECT DETAILS';
                const isDate = label === 'START DATE' || label === 'END DATE';
                return (
                  <label
                    key={index}
                    className={isFull ? 'col-span-2' : ''}
                  >
                    <strong>{label}:</strong>{' '}
                    {isTextArea ? (
                      <textarea
                        rows={3}
                        className="w-full mt-1 outline-none border-none"
                      />
                    ) : (
                      <input
                        type={isDate ? 'date' : 'text'}
                        className={`outline-none border-none ${isFull ? 'w-full' : ''}`}
                      />
                    )}
                  </label>
                );
              })}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">PAYMENT TERMS:</h3>
              <ul
                className="list-decimal list-inside pl-4"
                contentEditable
                suppressContentEditableWarning
              >
                <li>5,000 ADVANCE.</li>
                <li>5,000 IN MIDDLE</li>
                <li>7,000 FINAL PAYMENT</li>
              </ul>
            </div>

            <img src="/WorkOrder_Footer.png" alt="Footer" className="w-full mt-8" />
          </div>

          {/* ----------- Page 2 ----------- */}
          <div className="border border-gray-300 p-8 bg-white text-sm w-[794px] mx-auto">
            <img src="/WorkOrder_Header.png" alt="Header" className="w-full mb-4" />
            <div className="text-right font-semibold mb-4">Date: {today}</div>

            <div className="mt-4">
              <h3 className="font-semibold">SCOPE OF WORK:</h3>
              <ul
                className="list-decimal list-inside pl-4"
                contentEditable
                suppressContentEditableWarning
              >
                <li>DEMO</li>
                <li>DEMO</li>
                <li>DEMO</li>
                <li>DEMO</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">MATERIALS WE PURCHASE:</h3>
              <ul
                className="list-decimal list-inside pl-4"
                contentEditable
                suppressContentEditableWarning
              >
                <li>SMS GATEWAY</li>
                <li>SERVER</li>
                <li>LOGO</li>
                <li>THEME</li>
                <li>PLAYSTORE</li>
              </ul>
            </div>

            <h3 className="font-semibold underline mt-4">TERM AND CONDITION:</h3>
            <div
              className="mt-2 min-h-[100px] pl-2"
              contentEditable
              suppressContentEditableWarning
            >
              WE WILL ADD TERM AND CONDITION FROM ADMIN FETCH IN THIS PART.
            </div>

            <div className="grid grid-cols-2 mt-20 gap-4">
              <div className="text-center">
                <div className="border-t border-black w-4/5 mx-auto mb-1"></div>
                <p>AUTHORIZED PERSON</p>
              </div>
              <div className="text-center">
                <div className="border-t border-black w-4/5 mx-auto mb-1"></div>
                <p>AUTHORIZED PERSON</p>
              </div>
              <div className="text-center mt-10">
                <div className="border-t border-black w-4/5 mx-auto mb-1"></div>
                <p>CLIENT SIGNATURE</p>
              </div>
              <div className="text-center mt-10">
                <div className="border-t border-black w-4/5 mx-auto mb-1"></div>
                <p>COMPANY SIGNATURE</p>
              </div>
            </div>

            <img src="/WorkOrder_Footer.png" alt="Footer" className="w-full mt-10" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkOrder;



// import { useRef } from 'react';
// import html2pdf from 'html2pdf.js';

// const WorkOrder = () => {
//     const printRef = useRef(null);
//     const today = new Date().toLocaleDateString();

//     const handleDownloadPDF = () => {
//         const element = printRef.current;
//         const opt = {
//             margin: 0,
//             filename: 'WorkOrder.pdf',
//             image: { type: 'jpeg', quality: 0.98 },
//             html2canvas: { scale: 2 },
//             jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
//         };
//         html2pdf().set(opt).from(element).save();
//     };

//     return (
//         <>
//             <div className="p-4">
//                 <div className="flex justify-end mb-4 gap-2">
//                     <button
//                         onClick={handleDownloadPDF}
//                         className="px-4 py-2 bg-blue-600 text-white rounded"
//                     >
//                         Download PDF
//                     </button>
//                 </div>

//                 {/* Printable content */}
//                 <div ref={printRef} className="text-black">

//                     {/* ----------- Page 1 ----------- */}
//                     <div className="border border-gray-300 p-8 bg-white break-after-page text-sm w-[794px] mx-auto">
//                         <img src="/WorkOrder_Header.png" alt="Header" className="w-full mb-4" />
//                         <div className="text-right font-semibold mb-4">Date: {today}</div>
//                         <div className="grid grid-cols-2 gap-4 text-sm">
//                             <label><strong>PROJECT ID:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>CLIENT ID:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>CLIENT NAME:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>QUOTATION ID:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label className="col-span-2"><strong>PROJECT NAME:</strong> <input type="text" className="border-b border-gray-400 ml-2 w-full outline-none" /></label>
//                             <label className="col-span-2"><strong>PROJECT CATEGORY:</strong> <input type="text" className="border-b border-gray-400 ml-2 w-full outline-none" /></label>
//                             <label className="col-span-2">
//                                 <strong>PROJECT DETAILS:</strong><br />
//                                 <textarea rows="3" className="w-full border border-gray-300 mt-1 p-1 outline-none"></textarea>
//                             </label>
//                             <label><strong>WARRANTY:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>DURATION:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>FREE MAINTENANCE:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>DURATION:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>DEVELOPMENT COST:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>SERVER & DOMAIN:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>OTHERS:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>TOTAL:</strong> <input type="text" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>START DATE:</strong> <input type="date" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                             <label><strong>END DATE:</strong> <input type="date" className="border-b border-gray-400 ml-2 outline-none" /></label>
//                         </div>

//                         <div className="mt-4">
//                             <h3 className="font-semibold">PAYMENT TERMS:</h3>
//                             <ul
//                                 className="list-decimal list-inside border border-gray-200 p-2"
//                                 contentEditable={true}
//                                 suppressContentEditableWarning={true}
//                             >
//                                 <li>5,000 ADVANCE.</li>
//                                 <li>5,000 IN MIDDLE</li>
//                                 <li>7,000 FINAL PAYMENT</li>
//                             </ul>
//                         </div>
//                         <img src="/WorkOrder_Footer.png" alt="Footer" className="w-full mt-8" />
//                     </div>

//                     {/* ----------- Page 2 ----------- */}
//                     <div className="border border-gray-300 p-8 bg-white text-sm w-[794px] mx-auto mt-8">
//                         <img src="/WorkOrder_Header.png" alt="Header" className="w-full mb-4" />
//                         <div className="text-right font-semibold mb-4">Date: {today}</div>
//                         <div className="mt-4">
//                             <h3 className="font-semibold">SCOPE OF WORK:</h3>
//                             <ul
//                                 className="list-decimal list-inside border border-gray-200 p-2"
//                                 contentEditable={true}
//                                 suppressContentEditableWarning={true}
//                             >
//                                 <li>DEMO</li>
//                                 <li>DEMO</li>
//                                 <li>DEMO</li>
//                                 <li>DEMO</li>
//                             </ul>
//                         </div>
//                         <div className="mt-4">
//                             <h3 className="font-semibold">MATERIALS WE PURCHASE:</h3>
//                             <ul
//                                 className="list-decimal list-inside border border-gray-200 p-2"
//                                 contentEditable={true}
//                                 suppressContentEditableWarning={true}
//                             >
//                                 <li>SMS GATEWAY</li>
//                                 <li>SERVER</li>
//                                 <li>LOGO</li>
//                                 <li>THEME</li>
//                                 <li>PLAYSTORE</li>
//                             </ul>
//                         </div>
//                         <h3 className="font-semibold underline">TERM AND CONDITION:</h3>
//                         <div
//                             className="mt-2 border border-gray-300 p-2 min-h-[100px]"
//                             contentEditable={true}
//                             suppressContentEditableWarning={true}
//                         >
//                             WE WILL ADD TERM AND CONDITION FROM ADMIN FETCH IN THIS PART.
//                         </div>

//                         {/* <div className="h-20"></div> */}

//                         <div className="grid grid-cols-2 mt-20 gap-4">
//                             <div className="text-center">
//                                 <div className="border-t border-black w-4/5 mx-auto mb-1"></div>
//                                 <p>AUTHORIZED PERSON</p>
//                             </div>
//                             <div className="text-center">
//                                 <div className="border-t border-black w-4/5 mx-auto mb-1"></div>
//                                 <p>AUTHORIZED PERSON</p>
//                             </div>
//                             <div className="text-center mt-10">
//                                 <div className="border-t border-black w-4/5 mx-auto mb-1"></div>
//                                 <p>CLIENT SIGNATURE</p>
//                             </div>
//                             <div className="text-center mt-10">
//                                 <div className="border-t border-black w-4/5 mx-auto mb-1"></div>
//                                 <p>COMPANY SIGNATURE</p>
//                             </div>
//                         </div>

//                         <img src="/WorkOrder_Footer.png" alt="Footer" className="w-full mt-10" />
//                     </div>

//                 </div>
//             </div>
//         </>
//     );
// };

// export default WorkOrder;