import { useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

const Holidays = () => {
  const pdfRef = useRef();
  const [rows, setRows] = useState([
    { type: "Today", date: "", fromDate: "", toDate: "", description: "", day: "" },
  ]);


  const handleGeneratePDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0,
      filename: "Holidays.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      { type: "Today", date: "", fromDate: "", toDate: "", description: "", day: "" },
    ]);
  };


  const handleDeleteRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    if (field === "date" && value) {
      const day = new Date(value).toLocaleDateString("en-US", { weekday: "long" });
      updated[index].day = day;
    }
    setRows(updated);
  };
  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

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
        <h2 className="text-3xl font-extrabold tracking-tight">Holidays</h2>
      </div>

      {/* Input Table */}
      <div className="bg-white dark:bg-gray-800 p-6 mt-6 rounded-2xl shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-900 dark:text-white">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="p-2">Type</th>
                <th className="p-2">Date / From</th>
                <th className="p-2">To</th>
                <th className="p-2">Description</th>
                <th className="p-2">Day</th>
                <th className="p-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-t dark:border-gray-700">
                  {/* Type Selector */}
                  <td className="p-2">
                    <select
                      className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700"
                      value={row.type}
                      onChange={(e) => {
                        const updated = [...rows];
                        updated[index].type = e.target.value;
                        updated[index].date = "";
                        updated[index].fromDate = "";
                        updated[index].toDate = "";
                        updated[index].day = "";
                        setRows(updated);
                      }}
                    >
                      <option value="Today">One Day</option>
                      <option value="More">More</option>
                    </select>
                  </td>

                  {/* Date / From Date */}
                  <td className="p-2">
                    <input
                      type="date"
                      className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700"
                      value={row.type === "More" ? row.fromDate : row.date}
                      onChange={(e) => {
                        if (row.type === "More") {
                          handleChange(index, "fromDate", e.target.value);
                          const day = new Date(e.target.value).toLocaleDateString("en-US", { weekday: "long" });
                          const updated = [...rows];
                          updated[index].day = day;
                          setRows(updated);
                        } else {
                          handleChange(index, "date", e.target.value);
                        }
                      }}
                    />
                  </td>

                  {/* To Date */}
                  <td className="p-2">
                    {row.type === "More" ? (
                      <input
                        type="date"
                        className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700"
                        value={row.toDate}
                        onChange={(e) => handleChange(index, "toDate", e.target.value)}
                      />
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">—</span>
                    )}
                  </td>

                  {/* Description */}
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700"
                      value={row.description}
                      onChange={(e) => handleChange(index, "description", e.target.value)}
                    />
                  </td>

                  {/* Day */}
                  <td className="p-2">{row.day || "-"}</td>

                  {/* Delete Button */}
                  <td className="p-2 text-right">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteRow(index)}
                    >
                      <IoMdClose size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>


          </table>
        </div>

        {/* Add New Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddRow}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold"
          >
            <FaPlus /> Add New
          </button>
        </div>
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
            <h1 className="text-cyan-500 font-bold mb-2 text-lg">Holiday List</h1>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #000", padding: "6px" }}><strong>Date</strong></th>
                  <th style={{ border: "1px solid #000", padding: "6px" }}><strong>Description</strong></th>
                  <th style={{ border: "1px solid #000", padding: "6px" }}><strong>Day</strong></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const dateText =
                    row.type === "More" ? (
                      <>
                        {formatDate(row.fromDate)} <strong>To</strong> {formatDate(row.toDate)}
                      </>
                    ) : (
                      formatDate(row.date)
                    );

                  return (
                    <tr key={index}>
                      <td style={{ border: "1px solid #000", padding: "6px" }}>{dateText}</td>
                      <td style={{ border: "1px solid #000", padding: "6px" }}>{row.description || "-"}</td>
                      <td style={{ border: "1px solid #000", padding: "6px" }}>{row.day || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

export default Holidays;
