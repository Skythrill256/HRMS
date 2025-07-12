import { useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

const OffetLetter = () => {
    const [formData, setFormData] = useState({
        employeeId: "",
        employeeName: "",
        address: "",
        email: "",
        contactNumber: "",
        dob: "",
        joiningDate: "",
        designation: "",
        department: "",
        salary: "",
        employmentType: "",
        workLocation: "",
        reportingManager: "",
        probationPeriod: "",
        workingHours: "",
        offerIssueDate: "",
        offerValidityDate: "",
        responsibility: "",
        terms: "",
        companyName: "",
        hrName: "",
        hrDesignation: "",
    });

    const pdfRef = useRef();

    const handleGeneratePDF = () => {
        const element = pdfRef.current;
        const opt = {
            margin: 0,
            filename: `${formData.employeeName || "Offer_Letter"}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };
        html2pdf().set(opt).from(element).save();
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const fields = [
        { label: "Employee ID", key: "employeeId" },
        { label: "Employee Name", key: "employeeName" },
        { label: "Address", key: "address" },
        { label: "Email ID", key: "email" },
        { label: "Contact Number", key: "contactNumber" },
        { label: "Date of Birth", key: "dob", type: "date" },
        { label: "Joining Date", key: "joiningDate", type: "date" },
        { label: "Designation", key: "designation" },
        { label: "Department", key: "department" },
        { label: "Salary", key: "salary" },
        {
            label: "Employment Type",
            key: "employmentType",
            type: "select",
            options: ["Full-time", "Part-time", "Internship", "Contract"],
        },
        {
            label: "Work Location",
            key: "workLocation",
            type: "select",
            options: ["Home", "Office", "Remote"],
        },
        { label: "Reporting Manager", key: "reportingManager" },
        { label: "Probation Period", key: "probationPeriod" },
        { label: "Working Hours / Shifts", key: "workingHours" },
        { label: "Date of Issue of Offer Letter", key: "offerIssueDate", type: "date" },
        { label: "Validity of Offer", key: "offerValidityDate", type: "date" },
        { label: "Responsibility", key: "responsibility" },
        { label: "Terms and conditions", key: "terms" },
        { label: "Company Name", key: "companyName" },
        { label: "HR/Authorized Signatory Name", key: "hrName" },
        { label: "HR/Authorized Signatory Designation", key: "hrDesignation" },
    ];

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-950 p-4 rounded-3xl w-full">
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-br from-blue-400 to-indigo-800 dark:from-blue-700 dark:to-indigo-900 text-white flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center rounded-t-3xl">
                <Link to="/admin-dashboard">
                    <button className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-base font-medium transition duration-300 ease-in-out flex items-center gap-2">
                        <IoMdArrowRoundBack className="text-xl" />
                        Back to HR
                    </button>
                </Link>
                <h2 className="text-3xl font-extrabold tracking-tight">Offer Letter</h2>
            </div>

            {/* Form Fields */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-b-3xl shadow-lg mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fields.map((field, idx) => (
                    <div key={idx} className="flex flex-col">
                        <label className="text-gray-700 dark:text-white font-semibold mb-1">
                            {field.label}:
                        </label>
                        {field.type === "select" ? (
                            <select
                                className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData[field.key]}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                            >
                                <option value="">Select</option>
                                {field.options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type || "text"}
                                value={formData[field.key]}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder={field.label}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* PDF Preview Section */}
            <div className="bg-white p-4 mt-6 border rounded shadow-lg">
                <h1 className="font-bold p-4 text-2xl text-blue-500">Generated PDF</h1>
                <div
                    ref={pdfRef}
                    className="bg-white relative shadow-2xl"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "1122px",
                        width: "794px",
                        boxSizing: "border-box",
                        overflow: "hidden",
                    }}
                >
                    {/* Watermark */}
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
                            pointerEvents: "none",
                        }}
                    />

                    {/* Header Image */}
                    <div style={{ width: "100%" }}>
                        <img
                            src="/WorkOrder_Header.png"
                            alt="Header"
                            style={{
                                width: "100%",
                                display: "block",
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    {/* PDF Content */}
                    <div
                        style={{
                            padding: "1in",
                            fontSize: "14px",
                            fontFamily: "serif",
                            whiteSpace: "pre-wrap",
                            flexGrow: 1,
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        {fields.map((f) => {
                            const isEmployeeDetailsStart = f.key === "employeeId";
                            const isOfferDetailsStart = f.key === "salary";
                            const isCompanyDetailsStart = f.key === "companyName";

                            return (
                                <div key={f.key}>
                                    {isEmployeeDetailsStart && (
                                        <div style={{ margin: "1em 0", fontWeight: "bold", fontSize: "16px" }}>
                                            🔹 Employee Details
                                        </div>
                                    )}
                                    {isOfferDetailsStart && (
                                        <div style={{ margin: "1em 0", fontWeight: "bold", fontSize: "16px" }}>
                                            🔹 Offer Details
                                        </div>
                                    )}
                                    {isCompanyDetailsStart && (
                                        <div style={{ margin: "1em 0", fontWeight: "bold", fontSize: "16px" }}>
                                            🔹 Company Details
                                        </div>
                                    )}
                                    {f.label}: {formData[f.key]}
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer Image */}
                    <div style={{ width: "100%", marginTop: "auto" }}>
                        <img
                            src="/WorkOrder_Footer.png"
                            alt="Footer"
                            style={{
                                width: "100%",
                                display: "block",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Generate PDF Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleGeneratePDF}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default OffetLetter;
