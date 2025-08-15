import React from 'react';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';

const EmployeeDashboard = ({ changeUser, data }) => {
  // If data is not loaded yet, show a loading state
  if (!data) {
    return (
      <div className="p-10 text-white bg-[#1C1C1C] h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10 bg-[#1C1C1C] min-h-screen">
      <Header changeUser={changeUser} data={data} />
      <TaskListNumbers data={data} />
      <TaskList data={data} />
    </div>
  );
};

export default EmployeeDashboard;
