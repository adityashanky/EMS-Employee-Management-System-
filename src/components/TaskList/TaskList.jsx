import React from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = ({ data }) => {
  const tasks = Array.isArray(data.tasks) ? data.tasks : [];

  return (
    <div
      id='tasklist'
      className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'
    >
      {tasks.map((task) => {
        const key = `${task.taskTitle?.trim().toLowerCase() || 'untitled'}-${task.taskDate || 'no-date'}`;

        if (task.active) {
          return <AcceptTask key={key} data={task} assignedTo={data.firstName} />;
        }
        if (task.newTask) {
          return <NewTask key={key} data={task} assignedTo={data.firstName} />;
        }
        if (task.completed) {
          return <CompleteTask key={key} data={task} assignedTo={data.firstName} />;
        }
        if (task.failed) {
          return <FailedTask key={key} data={task} assignedTo={data.firstName} />;
        }
        return null;
      })}
    </div>
  );
};

export default TaskList;
