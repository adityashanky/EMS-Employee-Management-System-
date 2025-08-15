import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const NewTask = ({ data, assignedTo }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const acceptTask = () => {
    const updatedUsers = userData.map(user => {
      if (user.firstName.trim().toLowerCase() === assignedTo.trim().toLowerCase()) {
        const updatedTasks = user.tasks.map(task => {
          if (
            task.taskTitle.trim().toLowerCase() === data.taskTitle.trim().toLowerCase() &&
            task.taskDate === data.taskDate
          ) {
            return {
              ...task,
              active: true,
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
            newTask: Math.max(user.taskCounts.newTask - 1, 0),
            active: user.taskCounts.active + 1
          }
        };
      }
      return user;
    });

    setUserData(updatedUsers);
    localStorage.setItem("employees", JSON.stringify(updatedUsers));
  };

  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
        <h4 className='text-sm'>{data.taskDate}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
      <p className='text-sm mt-2'>{data.taskDescription}</p>
      <div className='mt-6'>
        <button
          onClick={acceptTask}
          className='bg-blue-500 rounded font-medium py-1 px-2 text-xs'
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
