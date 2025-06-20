import React from 'react';

const PendingProjects = () => {
  const projects = [
    { name: 'E-Commerce Website', client: 'Amazon', status: 'Pending' },
    { name: 'Banking Portal', client: 'HDFC Bank', status: 'Pending' },
  ];

  const statusStyle = 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100';

  return (
    <div className='max-w-7xl mx-auto p-5 sm:p-6 bg-white dark:bg-gray-900 rounded-lg'>
      <h2 className='text-xl sm:text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-100'>Pending Projects</h2>
      <div className="relative shadow-lg sm:rounded-lg overflow-x-auto md:overflow-hidden group bg-white dark:bg-gray-800">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 peer">
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
                  <tr key={index} className='border-b hover:border-gray-100 cursor-pointer hover:bg-[#6AF2F0] dark:hover:bg-blue-900'>
                    <td className='py-2 px-4 sm:py-4'>{project.name}</td>
                    <td className='py-2 px-4 sm:py-4'>{project.client}</td>
                    <td className='py-2 px-4 sm:py-4'>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle}`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='text-center text-gray-600 dark:text-gray-300 py-4'>No pending projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingProjects;
