import { useState } from "react";
import Client from "../../Component/Client";

const AllClient = () => {
    const clients = [
        { id: 'CL001', name: 'Acme Corp', logoUrl: 'https://ui-avatars.com/api/?name=Acme+Corp&background=random' },
        { id: 'CL002', name: 'Globex Inc', logoUrl: 'https://ui-avatars.com/api/?name=Globex+Inc&background=random' },
        { id: 'CL003', name: 'Initech', logoUrl: 'https://ui-avatars.com/api/?name=Initech&background=random' },
        { id: 'CL004', name: 'Umbrella Co', logoUrl: 'https://ui-avatars.com/api/?name=Umbrella+Co&background=random' },
        { id: 'CL005', name: 'Hooli', logoUrl: 'https://ui-avatars.com/api/?name=Hooli&background=random' },
        { id: 'CL006', name: 'Vehement Capital', logoUrl: 'https://ui-avatars.com/api/?name=Vehement+Capital&background=random' },
        { id: 'CL007', name: 'Stark Industries', logoUrl: 'https://ui-avatars.com/api/?name=Stark+Industries&background=random' },
        { id: 'CL008', name: 'Wayne Enterprises', logoUrl: 'https://ui-avatars.com/api/?name=Wayne+Enterprises&background=random' },
        { id: 'CL009', name: 'Soylent Corp', logoUrl: 'https://ui-avatars.com/api/?name=Soylent+Corp&background=random' },
        { id: 'CL010', name: 'Massive Dynamic', logoUrl: 'https://ui-avatars.com/api/?name=Massive+Dynamic&background=random' },
        { id: 'CL011', name: 'Cyberdyne Systems', logoUrl: 'https://ui-avatars.com/api/?name=Cyberdyne+Systems&background=random' },
        { id: 'CL012', name: 'Virtucon', logoUrl: 'https://ui-avatars.com/api/?name=Virtucon&background=random' },
    ];

    const [client, setClient] = useState(false);

    if (client == true) {
        return <Client setClient={setClient} />
    }
    else {
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
                        onClick={()=>setClient(true)}
                            className="mt-2 sm:mt-0 text-white bg-[#FF4500]
                           focus:outline-none
                           font-semibold rounded-xl text-sm px-4 py-1.5 pt-0 transition-all duration-300 ease-in-out
                           shadow-md hover:shadow-lg transform hover:scale-105 relative top-[-1rem] left-[1rem]"
                        >
                            <font className="text-2xl">+</font> Add Client
                        </button>

                        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-col-4">
                            {clients.map((client) => (
                                <div
                                    key={client.id}
                                    className="relative bg-[#ffffec] dark:bg-gray-700 rounded-2xl shadow-md dark:shadow-lg transition-transform duration-300 hover:scale-105 lg:p-4"
                                >
                                    {/* Background overlay for hover effect */}
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-in-out rounded-xl"></div>

                                    <img
                                        src={client.logoUrl}
                                        alt={client.name}
                                        className="w-24 h-24 rounded-full border-4 shadow-lg mb-4 transform group-hover:scale-105 transition-transform duration-500 ease-in-out
                             border-white dark:border-gray-700"
                                    />
                                    <h3 className="text-xl font-bold mb-1 transition-colors duration-500 ease-in-out
                           group-hover:text-blue-700
                           dark:group-hover:text-cyan-400 dark:text-white">{client.name}</h3>
                                    <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-500 ease-in-out dark:text-white">ID: {client.id}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AllClient;