import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AllTask = () => {
  const [userData] = useContext(AuthContext);

  // Guard in case userData is not loaded yet
  if (!userData || userData.length === 0) {
    return (
      <div className="bg-[#1c1c1c] p-5 rounded mt-5 text-gray-400">
        No employee data available.
      </div>
    );
  }

  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-5">
      {/* Header */}
      <div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded font-medium text-lg">
        {['Employee Name', 'New Task', 'Active Task', 'Completed', 'Failed'].map((title, index) => (
          <div key={index} className="w-1/5">{title}</div>
        ))}
      </div>

      {/* Data Rows */}
      {userData.map((elem) => (
        <div
          key={elem.id || elem.email || elem.firstName}
          className="border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded"
        >
          <div className="w-1/5">{elem.firstName}</div>
          <div className="w-1/5 text-blue-400">{elem.taskCounts.newTask}</div>
          <div className="w-1/5 text-yellow-400">{elem.taskCounts.active}</div>
          <div className="w-1/5 text-white">{elem.taskCounts.completed}</div>
          <div className="w-1/5 text-red-600">{elem.taskCounts.failed}</div>
        </div>
      ))}
    </div>
  );
};

export default AllTask;
