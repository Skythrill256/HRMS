import { useState } from "react";
import Client from "../../Component/Client"; // Assuming this is for adding a new client
import ClientProfile from './ClientProfile'; // Import the new ClientProfile component

const AllClient = () => {
    const [showAddClient, setShowAddClient] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    // Enhanced client data with all new details for the profile view
    const clients = [
        {
            id: 'CL001',
            clientName: 'Alice Smith',
            companyName: 'Acme Corp',
            customerType: 'Individual',
            logoUrl: 'https://ui-avatars.com/api/?name=Acme+Corp&background=random',
            email: 'contact@acmecorp.com',
            phoneCountryCode: '+91',
            phoneNumber: '9876543210',
            address: {
                country: 'India',
                state: 'Delhi',
                city: 'New Delhi',
                addressLine1: '123 Anvil Road',
                addressLine2: 'Industrial Area',
                pinCode: '110001'
            },
        },
        {
            id: 'CL002',
            clientName: 'Bob Johnson',
            companyName: 'Globex Inc',
            customerType: 'Vendor',
            logoUrl: 'https://ui-avatars.com/api/?name=Globex+Inc&background=random',
            email: 'info@globex.com',
            phoneCountryCode: '+1',
            phoneNumber: '555-987-6543',
            address: {
                country: 'USA',
                state: 'Illinois',
                city: 'Springfield',
                addressLine1: '789 Business Park',
                addressLine2: 'Suite 200',
                pinCode: '62701'
            },
        },
        {
            id: 'CL003',
            clientName: 'Charlie Brown',
            companyName: 'Initech',
            customerType: 'Individual',
            logoUrl: 'https://ui-avatars.com/api/?name=Initech&background=random',
            email: 'support@initech.com',
            phoneCountryCode: '+44',
            phoneNumber: '2071234567',
            address: {
                country: 'UK',
                state: 'England',
                city: 'London',
                addressLine1: '101 Office Space',
                addressLine2: 'Bloomsbury',
                pinCode: 'WC1B 3DG'
            },
        },
        {
            id: 'CL004',
            clientName: 'Diana Prince',
            companyName: 'Umbrella Co',
            customerType: 'Vendor',
            logoUrl: 'https://ui-avatars.com/api/?name=Umbrella+Co&background=random',
            email: 'hr@umbrellaco.com',
            phoneCountryCode: '+49',
            phoneNumber: '3012345678',
            address: {
                country: 'Germany',
                state: 'Berlin',
                city: 'Berlin',
                addressLine1: '221B Baker Street', // Placeholder, adjust as needed
                addressLine2: 'Tiergarten',
                pinCode: '10785'
            },
        },
        {
            id: 'CL005',
            clientName: 'Eve Adams',
            companyName: 'Hooli',
            customerType: 'Individual',
            logoUrl: 'https://ui-avatars.com/api/?name=Hooli&background=random',
            email: 'press@hooli.com',
            phoneCountryCode: '+81',
            phoneNumber: '0312345678',
            address: {
                country: 'Japan',
                state: 'Tokyo',
                city: 'Shibuya',
                addressLine1: 'Tech Campus',
                addressLine2: 'Hooli Tower',
                pinCode: '150-0043'
            },
        },
        {
            id: 'CL006',
            clientName: 'Frank White',
            companyName: 'Vehement Capital',
            customerType: 'Vendor',
            logoUrl: 'https://ui-avatars.com/api/?name=Vehement+Capital&background=random',
            email: 'invest@vehement.com',
            phoneCountryCode: '+61',
            phoneNumber: '0298765432',
            address: {
                country: 'Australia',
                state: 'New South Wales',
                city: 'Sydney',
                addressLine1: 'Wall Street', // Placeholder, adjust as needed
                addressLine2: 'Financial District',
                pinCode: '2000'
            },
        },
        {
            id: 'CL007',
            clientName: 'Grace Lee',
            companyName: 'Stark Industries',
            customerType: 'Individual',
            logoUrl: 'https://ui-avatars.com/api/?name=Stark+Industries&background=random',
            email: 'tony@starkindustries.com',
            phoneCountryCode: '+1',
            phoneNumber: '555-476-6626', // (IRON MAN)
            address: {
                country: 'USA',
                state: 'New York',
                city: 'New York',
                addressLine1: 'Stark Tower',
                addressLine2: 'Manhattan',
                pinCode: '10001'
            },
        },
        {
            id: 'CL008',
            clientName: 'Henry King',
            companyName: 'Wayne Enterprises',
            customerType: 'Vendor',
            logoUrl: 'https://ui-avatars.com/api/?name=Wayne+Enterprises&background=random',
            email: 'bruce@wayneenterprises.com',
            phoneCountryCode: '+1',
            phoneNumber: '555-228-2283', // (BAT CAVE)
            address: {
                country: 'USA',
                state: 'New Jersey',
                city: 'Gotham City',
                addressLine1: 'Wayne Manor',
                addressLine2: 'Outside City Limits',
                pinCode: '07001'
            },
        },
        {
            id: 'CL009',
            clientName: 'Ivy Green',
            companyName: 'Soylent Corp',
            customerType: 'Individual',
            logoUrl: 'https://ui-avatars.com/api/?name=Soylent+Corp&background=random',
            email: 'sales@soylentcorp.com',
            phoneCountryCode: '+1',
            phoneNumber: '555-366-3669', // (FOOD NOW)
            address: {
                country: 'USA',
                state: 'California',
                city: 'Los Angeles',
                addressLine1: 'Processed Foods HQ',
                addressLine2: 'Industrial Zone',
                pinCode: '90001'
            },
        },
        {
            id: 'CL010',
            clientName: 'Jack Taylor',
            companyName: 'Massive Dynamic',
            customerType: 'Vendor',
            logoUrl: 'https://ui-avatars.com/api/?name=Massive+Dynamic&background=random',
            email: 'research@massivedynamic.com',
            phoneCountryCode: '+1',
            phoneNumber: '555-374-6430', // (FRINGE 00)
            address: {
                country: 'USA',
                state: 'Massachusetts',
                city: 'Boston',
                addressLine1: 'Massive Dynamic Building',
                addressLine2: 'Innovation District',
                pinCode: '02110'
            },
        },
        {
            id: 'CL011',
            clientName: 'Karen Hall',
            companyName: 'Cyberdyne Systems',
            customerType: 'Individual',
            logoUrl: 'https://ui-avatars.com/api/?name=Cyberdyne+Systems&background=random',
            email: 'tech@cyberdyne.com',
            phoneCountryCode: '+1',
            phoneNumber: '555-880-0738', // (T800 REV)
            address: {
                country: 'USA',
                state: 'California',
                city: 'Sunnyvale',
                addressLine1: 'Future Tech Park',
                addressLine2: 'Building A',
                pinCode: '94086'
            },
        },
        {
            id: 'CL012',
            clientName: 'Liam Scott',
            companyName: 'Virtucon',
            customerType: 'Vendor',
            logoUrl: 'https://ui-avatars.com/api/?name=Virtucon&background=random',
            email: 'contact@virtucon.com',
            phoneCountryCode: '+1',
            phoneNumber: '555-847-8826', // (VIRT CON)
            address: {
                country: 'USA',
                state: 'Georgia',
                city: 'Atlanta',
                addressLine1: 'Global HQ',
                addressLine2: 'Peachtree Street',
                pinCode: '30303'
            },
        },
    ];

    const handleViewClientDetails = (clientId) => {
        const clientToView = clients.find(client => client.id === clientId);
        if (clientToView) {
            setSelectedClient(clientToView);
        }
    };

    if (selectedClient) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 dark:bg-gray-900">
                <ClientProfile clientData={selectedClient} onBack={() => setSelectedClient(null)} />
            </div>
        );
    }

    if (showAddClient) {
        return <Client setClient={setShowAddClient} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50
                         dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-black
                         py-12 px-4 sm:px-6 lg:px-8 rounded-lg">
            <div className="max-w-7xl mx-auto bg-[#c3e5fa] rounded-2xl shadow-xl overflow-hidden
                             dark:bg-gray-900 dark:shadow-2xl dark:shadow-cyan-500/20">
                <div className="p-4 sm:p-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center
                               dark:text-white">
                        Our Valued Clients
                    </h2>
                    <button
                        onClick={() => setShowAddClient(true)}
                        className="mt-2 sm:mt-0 text-white bg-[#FF4500]
                                 focus:outline-none
                                 font-semibold rounded-xl text-sm px-4 py-1.5 pt-0 transition-all duration-300 ease-in-out
                                 shadow-md hover:shadow-lg transform hover:scale-105 relative top-[-1rem] left-[1rem] flex justify-center items-center gap-2"
                    >
                        <font className="text-2xl">+</font> <span className="mt-1">Add Client</span>
                    </button>

                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {clients.map((client) => (
                            <div
                                key={client.id}
                                className="relative bg-[#ffffec] dark:bg-gray-700 rounded-2xl shadow-md dark:shadow-lg transition-transform duration-300 hover:scale-105 lg:p-4 cursor-pointer flex flex-col items-center justify-center text-center p-4"
                                onClick={() => handleViewClientDetails(client.id)}
                            >
                                {/* Background overlay for hover effect */}
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-in-out rounded-xl"></div>

                                <img
                                    src={client.logoUrl}
                                    alt={client.companyName || client.clientName}
                                    className="w-24 h-24 rounded-full border-4 shadow-lg mb-4 transform group-hover:scale-105 transition-transform duration-500 ease-in-out
                                    border-white dark:border-gray-700"
                                />
                                <h3 className="text-xl font-bold mb-1 transition-colors duration-500 ease-in-out
                                 group-hover:text-blue-700
                                 dark:group-hover:text-cyan-400 dark:text-white">{client.companyName || client.clientName}</h3>
                                <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-500 ease-in-out dark:text-white">ID: {client.id}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllClient;