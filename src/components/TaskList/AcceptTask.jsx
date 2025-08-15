import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AcceptTask = ({ data, assignedTo }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const updateTaskStatus = (status) => {
    const updatedUsers = userData.map(user => {
      if (user.firstName.trim().toLowerCase() === assignedTo.trim().toLowerCase()) {
        const updatedTasks = user.tasks.map(task => {
          if (
            task.taskTitle.trim().toLowerCase() === data.taskTitle.trim().toLowerCase() &&
            task.taskDate === data.taskDate
          ) {
            return {
              ...task,
              completed: status === 'completed',
              failed: status === 'failed',
              active: false,
              newTask: false
            };
          }
          return task;
        });

        return {
          ...user,
          tasks: updatedTasks,
          taskCounts: {
            ...user.taskCounts,
            active: status === 'completed' || status === 'failed'
              ? Math.max(user.taskCounts.active - 1, 0)
              : user.taskCounts.active,
            completed: status === 'completed'
              ? user.taskCounts.completed + 1
              : user.taskCounts.completed,
            failed: status === 'failed'
              ? user.taskCounts.failed + 1
              : user.taskCounts.failed
          }
        };
      }
      return user;
    });

    setUserData(updatedUsers);
    localStorage.setItem("employees", JSON.stringify(updatedUsers)); // persist if needed
  };

  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
        <h4 className='text-sm'>{data.taskDate}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
      <p className='text-sm mt-2'>{data.taskDescription}</p>
      <div className='flex justify-between mt-6'>
        <button
          onClick={() => updateTaskStatus('completed')}
          className='bg-green-500 rounded font-medium py-1 px-2 text-xs'
        >
          Mark as Completed
        </button>
        <button
          onClick={() => updateTaskStatus('failed')}
          className='bg-red-500 rounded font-medium py-1 px-2 text-xs'
        >
          Mark as Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
