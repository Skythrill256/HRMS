import React from 'react';

const TotalProjects = () => { 
  const projects = [
    { name: 'HR Management App', client: 'TCS', status: 'Complete' },
    { name: 'E-Commerce Website', client: 'Amazon', status: 'Pending' },
    { name: 'Inventory System', client: 'Reliance', status: 'Complete' },
    { name: 'Banking Portal', client: 'HDFC Bank', status: 'Pending' },
    { name: 'CRM System', client: 'Infosys', status: 'Complete' },
    { name: 'Mobile Banking App', client: 'ICICI Bank', status: 'Pending' },
  ];

  return (
    <div className='max-w-7xl mx-auto p-5 mt-6 sm:p-6 bg-[#ffffff] dark:bg-gray-900 rounded-lg'>
      <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
        All Projects 
      </h2>
      <div className="relative shadow-lg sm:rounded-lg overflow-x-auto md:overflow-hidden group bg-white dark:bg-gray-800">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 peer sm:overflow-y-auto">
          {projects.length > 0 ? (
            <table className='w-full min-w-max text-left text-gray-600 dark:text-gray-200'>
              <thead className='bg-blue-300 text-xs text-gray-700 uppercase dark:bg-blue-700 dark:text-gray-100'>
                <tr>
                  <th className='py-2 px-4 sm:py-4'>Project Name</th>
                  <th className='py-2 px-4 sm:py-4'>Client Name</th>
                  <th className='py-2 px-4 sm:py-4'>Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr
                    key={index}
                    className='border-b hover:border-gray-100 cursor-pointer hover:bg-[#6AF2F0] dark:hover:bg-blue-900'
                  >
                    <td className='py-2 px-4 sm:py-4'>{project.name}</td>
                    <td className='py-2 px-4 sm:py-4'>{project.client}</td>
                    <td className='py-2 px-4 sm:py-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'Complete'
                            ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='text-center text-gray-600 dark:text-gray-300 py-4'>No projects found.</p> 
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalProjects;
