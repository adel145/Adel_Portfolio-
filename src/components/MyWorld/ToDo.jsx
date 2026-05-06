import { useEffect, useState } from "react";

const STORAGE_KEY = "adel-portfolio-tasks";

const seedTasks = [
  { id: 1, text: "Review Miktsoan matching flow", completed: false, importance: 3 },
  { id: 2, text: "Polish portfolio project cards", completed: true, importance: 2 },
];

const sortTasks = (items) => [...items].sort((a, b) => b.importance - a.importance);

const ToDo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : seedTasks;
  });
  const [task, setTask] = useState("");
  const [importance, setImportance] = useState(1);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
      importance,
    };

    setTasks((currentTasks) => sortTasks([...currentTasks, newTask]));
    setTask("");
    setImportance(1);
  };

  const toggleTaskCompletion = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((item) => item.id !== id));
  };

  return (
    <main className="pt-40 p-5 bg-primary min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-3 text-purple-400">To-Do Demo</h1>
      <p className="text-center text-secondary mb-8">
        Client-only localStorage demo. No backend or MongoDB required.
      </p>

      <div className="max-w-xl mx-auto">
        <div className="flex flex-col gap-4 bg-tertiary p-5 rounded-lg">
          <label className="flex flex-col gap-2">
            <span className="font-medium">Task</span>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter a task"
              className="p-3 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-primary text-white"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-medium">Importance</span>
            <select
              value={importance}
              onChange={(e) => setImportance(Number(e.target.value))}
              className="p-3 border border-white/10 rounded-md bg-primary text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </label>

          <button
            onClick={addTask}
            className="px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition"
          >
            Add Task
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {tasks.map((item) => (
            <li
              key={item.id}
              className={`flex items-center justify-between gap-3 p-4 rounded-lg shadow-md ${
                item.completed
                  ? "bg-emerald-900/80"
                  : item.importance === 3
                  ? "bg-red-900/80"
                  : item.importance === 2
                  ? "bg-yellow-900/80"
                  : "bg-blue-900/80"
              }`}
            >
              <button
                onClick={() => toggleTaskCompletion(item.id)}
                className={`flex-grow text-left ${item.completed ? "line-through text-gray-300" : "text-white"}`}
              >
                {item.text}
              </button>
              <span className="text-lg font-bold" aria-label={`Importance ${item.importance}`}>
                {"!".repeat(item.importance)}
              </span>
              <button
                onClick={() => deleteTask(item.id)}
                className="text-red-200 hover:text-white"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default ToDo;
