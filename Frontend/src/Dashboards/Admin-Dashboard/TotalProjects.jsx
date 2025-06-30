import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProjects } from '../../redux/slices/projectSlice';

const TotalProjects = () => {
  // const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);

  // useEffect(() => {
  //   console.log('Loaded Projects:', projects);
  // }, [projects]);

  return (
    <div className='max-w-7xl mx-auto p-5 mt-6 sm:p-6 bg-background dark:bg-gray-900 rounded-lg'>
      <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-text dark:text-gray-100">
        All Projects 
      </h2>
      <div className="relative shadow-lg sm:rounded-lg overflow-x-auto md:overflow-hidden group bg-white dark:bg-gray-800">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 peer sm:overflow-y-auto">
          {projects && projects.length > 0 ? (
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
                    key={project.id || index}
                    className='border-b hover:border-gray-100 cursor-pointer hover:bg-card dark:hover:bg-blue-900'
                  >
                    <td className='py-2 px-4 sm:py-4'>{project.projectName}</td>
                    <td className='py-2 px-4 sm:py-4'>{project.clientName}</td>
                    <td className='py-2 px-4 sm:py-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'Complete'
                            ? 'bg-green-300 text-green-700 dark:bg-green-800 dark:text-green-100'
                            : 'bg-yellow-300 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100'
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