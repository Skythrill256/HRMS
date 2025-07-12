import { useRef, useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import html2pdf from "html2pdf.js";

const OffetLetter = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [letterContent, setLetterContent] = useState("");
    const [isUserEdited, setIsUserEdited] = useState(false);
    const textareaRef = useRef();
    const pdfRef = useRef();

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [letterContent]);

    useEffect(() => {
        if (!isUserEdited) {
            setLetterContent(
`Employee ID: ${employeeId}
Full Name: ${employeeName}
Father's/Mother's Name (optional, depending on your company norms)
Address: 
Email ID: 
Contact Number: 
Date of Birth: 
Joining Date: 
Designation: 
Department: 

🔹Offer Details
Salary Details: (CTC, Basic Pay, Allowances, Deductions, etc.)
Employment Type: (Full-time / Part-time / Internship / Contract)
Work Location:
Reporting Manager: 
Probation Period: (if applicable)
Working Hours / Shifts: 
Date of Issue of Offer Letter: 
Validity of Offer: (till which date the candidate can accept)
Responsibility: 
Terms and conditions: 

🔹Company Details
Company Name: Indomitech Group
Company Logo
Address
Contact Email
HR/Authorized Signatory Name & Designation
Download as PDF / Email directly
Digital Signature insertion (optional but professional)
Track status (Offered / Accepted / Rejected)`
            );
        }
    }, [employeeId, employeeName]);

    const handleGeneratePDF = () => {
        const element = pdfRef.current;
        const opt = {
            margin: 0,
            filename: `${employeeName || 'Offer_Letter'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-950 p-2 sm:p-4 rounded-3xl w-full">
            {/* Header */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-blue-400 to-indigo-800 dark:from-blue-700 dark:to-indigo-900 text-white flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center rounded-t-3xl">
                <Link to='/admin-dashboard'>
                    <button className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-base font-medium transition duration-300 ease-in-out flex items-center gap-2">
                        <IoMdArrowRoundBack className='text-xl md:text-2xl' />
                        Back to HR
                    </button>
                </Link>
                <h2 className="text-3xl font-extrabold tracking-tight">Offer Letter</h2>
            </div>

            {/* Inputs */}
            <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                    <div className="flex items-center gap-2 bg-white p-5 rounded w-full shadow-lg flex-wrap">
                        {/* Employee ID */}
                        <div className="flex items-center gap-2 mr-6 mb-2">
                            <label className="whitespace-nowrap text-gray-700 dark:text-white font-bold">
                                Employee ID:
                            </label>
                            <input
                                type="text"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="p-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white w-40"
                                placeholder="ID"
                            />
                        </div>

                        {/* Employee Name */}
                        <div className="flex items-center gap-2 mb-2">
                            <label className="whitespace-nowrap text-gray-700 dark:text-white font-bold">
                                Employee Name:
                            </label>
                            <input
                                type="text"
                                value={employeeName}
                                onChange={(e) => setEmployeeName(e.target.value)}
                                className="p-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white w-60"
                                placeholder="Full Name"
                            />
                        </div>
                    </div>
                </div>

                {/* Textarea */}
                <div className="bg-white p-5 rounded shadow-lg">
                    <label className="block text-gray-700 dark:text-white mb-1 font-bold text-xl">
                        Offer Letter Content
                    </label>
                    <textarea
                        ref={textareaRef}
                        value={letterContent}
                        onChange={(e) => {
                            setLetterContent(e.target.value);
                            setIsUserEdited(true);
                        }}
                        className="focus:outline-none focus:border-blue-500 w-full p-3 border border-gray-300 rounded-md resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200"
                        placeholder="Type termination letter..."
                    />
                </div>

                {/* PDF Preview Section */}
                <div className="bg-gray-200 p-4 rounded shadow-md border">
                    <div
                        ref={pdfRef}
                        className="bg-white relative"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "1122px",
                            width: "794px",
                            boxSizing: "border-box",
                            overflow: "hidden"
                        }}
                    >
                        {/* Watermark Image */}
                        <img
                            src="/public/watermark_logo.png"
                            alt="Watermark"
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                opacity: 0.1,
                                width: "70%",
                                zIndex: 0,
                                pointerEvents: "none"
                            }}
                        />

                        {/* Header Image */}
                        <div style={{ width: '100%' }}>
                            <img
                                src="/WorkOrder_Header.png"
                                alt="Header"
                                style={{
                                    width: '100%',
                                    display: 'block',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>

                        {/* Letter Content */}
                        <div style={{
                            padding: "1in",
                            fontSize: "14px",
                            fontFamily: "serif",
                            whiteSpace: "pre-wrap",
                            flexGrow: 1,
                            position: "relative",
                            zIndex: 1
                        }}>
                            {letterContent}
                        </div>

                        {/* Footer Image */}
                        <div style={{ width: '100%', marginTop: 'auto' }}>
                            <img
                                src="/WorkOrder_Footer.png"
                                alt="Footer"
                                style={{
                                    width: '100%',
                                    display: 'block',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Generate PDF Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleGeneratePDF}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300"
                    >
                        Generate PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OffetLetter;
