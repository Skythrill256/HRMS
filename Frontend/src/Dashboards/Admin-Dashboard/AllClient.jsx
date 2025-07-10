import { useState } from "react";
import { useSelector } from "react-redux";
import Client from "../../Component/Client";
import ClientProfile from "./ClientProfile";
import { selectAllClients } from "../../redux/slices/clientSlice.js";

const AllClient = () => {
  const [showAddClient, setShowAddClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

 
  const clients = useSelector(selectAllClients) || [];

  const filteredClients = clients.filter((client) =>
    client.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewClientDetails = (clientId) => {
    const clientToView = clients.find((client) => client.id === clientId);
    if (clientToView) {
      setSelectedClient(clientToView);
    }
  };

  if (selectedClient) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 dark:bg-gray-900">
        <ClientProfile
          clientData={selectedClient}
          onBack={() => setSelectedClient(null)}
        />
      </div>
    );
  }

  if (showAddClient) {
    return <Client setClient={setShowAddClient} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-background
    dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-black
    py-12 px-4 sm:px-6 lg:px-8 rounded-lg">
      <div className="max-w-7xl mx-auto bg-background rounded-2xl shadow-xl overflow-hidden
      dark:bg-gray-900 dark:shadow-2xl dark:shadow-cyan-500/20">
        <div className="p-4 sm:p-10">
          <h2 className="text-3xl font-extrabold text-[#FF4500] mb-8 text-center
          dark:text-white">
            TOTAL CLIENTS
          </h2>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <input
              type="text"
              placeholder="Search clients..."
              className="border border-nav dark:border-gray-600 rounded-xl px-4 py-2 w-full sm:w-64
              text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              onClick={() => setShowAddClient(true)}
              className="text-white bg-[#FF4500]
              focus:outline-none font-semibold rounded-xl text-sm px-4 py-1.5 pt-0 transition-all
              duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105
              flex justify-center items-center gap-2"
            >
              <span className="text-2xl">+</span>
              <span className="mt-1">Add Client</span>
            </button>          
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="relative bg-card dark:bg-gray-700 rounded-2xl
                dark:shadow-lg transition-transform duration-400 shadow-lg hover:scale-105 lg:p-4
                cursor-pointer flex flex-col items-center justify-center text-center p-4 w-[230px] h-[240px]"
                onClick={() => handleViewClientDetails(client.id)}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10
                transition-opacity duration-500 ease-in-out rounded-xl"></div>

                <img
                  src={client.logoUrl}
                  alt={client.companyName || client.clientName}
                  className="w-24 h-24 rounded-full border-4 shadow-lg mb-4 transform
                  group-hover:scale-105 transition-transform duration-500 ease-in-out
                  border-white dark:border-gray-700"
                />
                <h3 className="text-xl font-bold mb-1 transition-colors duration-500 ease-in-out
                group-hover:text-blue-700 dark:group-hover:text-cyan-400 dark:text-white">
                  {client.companyName || client.clientName}
                </h3>
                <p className="text-sm opacity-90 group-hover:opacity-100
                transition-opacity duration-500 ease-in-out dark:text-white">
                  ID: {client.id}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClient;
