// import React, { useState } from "react";

// const ToDo = () => {
//   const [tasks, setTasks] = useState([]);
//   const [task, setTask] = useState("");

//   const addTask = () => {
//     if (task.trim() !== "") {
//       setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
//       setTask("");
//     }
//   };

//   const toggleTaskCompletion = (id) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   return (
//     <div className="p-5 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-6">To-Do App</h1>
//       <div className="max-w-md mx-auto">
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             placeholder="Enter a task"
//             className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={addTask}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//           >
//             Add
//           </button>
//         </div>
//         <ul className="mt-6">
//           {tasks.map((task) => (
//             <li
//               key={task.id}
//               className={`flex items-center justify-between p-3 mb-2 rounded-md ${
//                 task.completed ? "bg-green-100" : "bg-white"
//               } shadow-md`}
//             >
//               <span
//                 onClick={() => toggleTaskCompletion(task.id)}
//                 className={`flex-grow cursor-pointer ${
//                   task.completed ? "line-through text-gray-500" : "text-gray-800"
//                 }`}
//               >
//                 {task.text}
//               </span>
//               <button
//                 onClick={() => deleteTask(task.id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ToDo;


import React, { useState, useEffect } from "react";
import axios from "axios";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [importance, setImportance] = useState(1);

  // Fetch tasks from MongoDB on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks").then((response) => {
      const sortedTasks = response.data.sort((a, b) => b.importance - a.importance); // Sort by importance
      setTasks(sortedTasks);
    });
  }, []);

  const addTask = async () => {
    if (task.trim() !== "") {
      const newTask = {
        text: task,
        completed: false,
        importance,
      };

      try {
        const response = await axios.post("http://localhost:5000/api/tasks", newTask);
        const updatedTasks = [...tasks, response.data].sort((a, b) => b.importance - a.importance); // Sort after adding
        setTasks(updatedTasks);
        setTask("");
        setImportance(1);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const toggleTaskCompletion = async (_id) => {
    const updatedTasks = tasks.map((task) =>
      task._id === _id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);

    try {
      const taskToUpdate = updatedTasks.find((task) => task._id === _id);
      await axios.put(`http://localhost:5000/api/tasks/${_id}`, taskToUpdate);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${_id}`);
      const updatedTasks = tasks.filter((task) => task._id !== _id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="pt-60 p-5 bg-primary min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-500">To-Do App</h1>
      <div className="max-w-md mx-auto">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="p-2 border border-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-dark-navy text-white"
          />
          <div className="flex items-center gap-3">
            <label className="text-lg">Importance:</label>
            <select
              value={importance}
              onChange={(e) => setImportance(Number(e.target.value))}
              className="p-2 border border-light-gray rounded-md bg-dark-navy text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>
          <button
            onClick={addTask}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
          >
            Add Task
          </button>
        </div>
        <ul className="mt-6">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`flex items-center justify-between p-3 mb-2 rounded-md shadow-md ${
                task.completed
                  ? "bg-teal-700"
                  : task.importance === 3
                  ? "bg-red-700"
                  : task.importance === 2
                  ? "bg-yellow-700"
                  : "bg-blue-700"
              }`}
            >
              <span
                onClick={() => toggleTaskCompletion(task._id)}
                className={`flex-grow cursor-pointer ${
                  task.completed ? "line-through text-gray-500" : "text-white"
                }`}
              >
                {task.text}
              </span>
              <span className="mr-4 text-lg font-bold">
                {"!".repeat(task.importance)} {/* Display importance level */}
              </span>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDo;

